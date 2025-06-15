
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Gift } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="flex items-center justify-center mb-6">
            <Gift className="h-8 w-8 mr-3" />
            <span className="text-lg font-medium tracking-wide">EXCLUSIVE OFFERS</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get 15% Off Your First Order
          </h2>
          
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new products, 
            exclusive offers, and beauty tips from our experts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="pl-10 py-6 text-lg border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/70 focus:bg-white/30"
              />
            </div>
            <Button 
              size="lg" 
              className="bg-white text-rose-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Subscribe
            </Button>
          </div>
          
          <p className="text-sm mt-4 opacity-75">
            No spam, unsubscribe at any time. By subscribing you agree to our Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
