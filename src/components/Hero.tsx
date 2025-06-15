
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-orange-50" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23f472b6%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="h-8 w-8 text-rose-400 mr-2" />
          <span className="text-rose-600 font-medium tracking-wide">BEAUTY REDEFINED</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-rose-600 via-pink-600 to-orange-500 bg-clip-text text-transparent leading-tight">
          Embrace Your
          <br />
          Natural Glow
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover premium cosmetics crafted with love and the finest ingredients. 
          Enhance your natural beauty with our curated collection.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Shop Collection
          </Button>
          <Button size="lg" variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-6 text-lg rounded-full transition-all duration-300">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
