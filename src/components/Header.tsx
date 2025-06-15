
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Menu, X, User, Heart, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useProfile } from '@/hooks/useProfile';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { data: profile } = useProfile();
  const { data: cart = [] } = useCart();
  const navigate = useNavigate();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleCartClick = () => {
    // Navigate to checkout or cart page instead
    navigate('/checkout');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-2 rounded-lg shadow-md">
              <Heart className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Debora Cosmetics
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-rose-600 transition-colors font-medium relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-rose-600 transition-colors font-medium relative group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-rose-600 transition-colors font-medium relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-rose-600 transition-colors font-medium relative group">
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-600 transition-all group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-rose-50 hover:text-rose-600 transition-colors">
              <Search className="h-5 w-5" />
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-rose-50 hover:text-rose-600 transition-colors">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 shadow-lg border-rose-100">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">My Account</Link>
                  </DropdownMenuItem>
                  {profile?.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="icon" className="hover:bg-rose-50 hover:text-rose-600 transition-colors">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {/* Cart */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-rose-50 hover:text-rose-600 transition-colors"
              onClick={handleCartClick}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-rose-600 hover:bg-rose-700 border-2 border-white">
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-rose-50 hover:text-rose-600 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t bg-white shadow-sm">
            <nav className="py-4 space-y-1">
              <Link 
                to="/" 
                className="block px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-colors font-medium rounded-md mx-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="block px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-colors font-medium rounded-md mx-2"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/about" 
                className="block px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-colors font-medium rounded-md mx-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/blog" 
                className="block px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-colors font-medium rounded-md mx-2"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              {user && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="block px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-colors font-medium rounded-md mx-2"
                    onClick={() => setIsOpen(false)}
                  >
                    My Account
                  </Link>
                  {profile?.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="block px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-colors font-medium rounded-md mx-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </>
              )}
              {!user && (
                <Link 
                  to="/auth" 
                  className="block px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-colors font-medium rounded-md mx-2"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
