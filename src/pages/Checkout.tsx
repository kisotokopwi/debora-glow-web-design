
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useProfile } from '@/hooks/useProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCreateOrder } from '@/hooks/useOrders';
import { toast } from 'sonner';

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: cart = [] } = useCart();
  const { data: profile } = useProfile();
  const createOrder = useCreateOrder();

  const [orderData, setOrderData] = useState({
    customer_name: '',
    customer_email: user?.email || '',
    customer_phone: '',
    delivery_address: '',
    notes: ''
  });

  React.useEffect(() => {
    if (profile) {
      setOrderData(prev => ({
        ...prev,
        customer_name: profile.full_name || '',
        customer_phone: profile.phone || '',
        delivery_address: profile.address || ''
      }));
    }
  }, [profile]);

  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const cartTotal = cart.reduce((total, item) => total + (item.products.price * item.quantity), 0);
  const shippingCost = cartTotal > 50 ? 0 : 5.99;
  const finalTotal = cartTotal + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!orderData.customer_name || !orderData.delivery_address) {
      toast.error('Please fill in all required fields');
      return;
    }

    const orderItems = cart.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.products.price
    }));

    createOrder.mutate({
      ...orderData,
      total_amount: finalTotal,
      order_items: orderItems
    }, {
      onSuccess: () => {
        toast.success('Order placed successfully!');
        navigate('/dashboard?tab=orders');
      }
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1>
          <Button onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <Input
                    value={orderData.customer_name}
                    onChange={(e) => setOrderData(prev => ({ ...prev, customer_name: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input
                    type="email"
                    value={orderData.customer_email}
                    onChange={(e) => setOrderData(prev => ({ ...prev, customer_email: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input
                    value={orderData.customer_phone}
                    onChange={(e) => setOrderData(prev => ({ ...prev, customer_phone: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Address *</label>
                  <Textarea
                    value={orderData.delivery_address}
                    onChange={(e) => setOrderData(prev => ({ ...prev, delivery_address: e.target.value }))}
                    required
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Order Notes</label>
                  <Textarea
                    value={orderData.notes}
                    onChange={(e) => setOrderData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any special instructions..."
                    rows={2}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
                  disabled={createOrder.isPending}
                >
                  {createOrder.isPending ? 'Placing Order...' : `Place Order - $${finalTotal.toFixed(2)}`}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img 
                    src={item.products.images?.[0] || '/placeholder.svg'} 
                    alt={item.products.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.products.name}</h3>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold">${(item.products.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                {cartTotal > 50 && (
                  <p className="text-sm text-green-600">🎉 Free shipping on orders over $50!</p>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
