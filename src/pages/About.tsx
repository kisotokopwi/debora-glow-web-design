
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Award, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            About Debora Cosmetics
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Since 2010, we've been dedicated to bringing you the finest cosmetics that enhance your natural beauty 
            while caring for your skin with premium, ethically-sourced ingredients.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded by Debora Martinez, a passionate makeup artist with over 15 years of experience in the beauty industry, 
              Debora Cosmetics was born from a simple vision: to create high-quality, accessible cosmetics that make every person feel confident and beautiful.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              What started as a small collection of handcrafted lipsticks has grown into a comprehensive beauty brand, 
              trusted by thousands of customers worldwide. Every product is carefully formulated with love, 
              ensuring that quality and ethics go hand in hand.
            </p>
            <Link to="/products">
              <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700">
                Explore Our Products
              </Button>
            </Link>
          </div>
          <div className="relative">
            <img 
              src="/placeholder.svg" 
              alt="Debora Cosmetics Story" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Cruelty-Free</h3>
                <p className="text-gray-600">
                  We never test on animals and are committed to ethical beauty practices.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Quality</h3>
                <p className="text-gray-600">
                  Only the finest ingredients make it into our carefully crafted formulations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Inclusive Beauty</h3>
                <p className="text-gray-600">
                  Beauty is for everyone. Our products celebrate diversity and individuality.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We continuously innovate to bring you the latest in beauty technology.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Meet Our Founder</h2>
          <div className="max-w-2xl mx-auto">
            <img 
              src="/placeholder.svg" 
              alt="Debora Martinez" 
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Debora Martinez</h3>
            <p className="text-rose-600 font-medium mb-4">Founder & Creative Director</p>
            <p className="text-gray-600 leading-relaxed">
              "Beauty is not about perfection; it's about confidence and self-expression. 
              Every product we create is designed to help you feel your most beautiful, authentic self."
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Discover Your Beauty?</h3>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of satisfied customers who trust Debora Cosmetics for their beauty needs.
          </p>
          <div className="space-x-4">
            <Link to="/products">
              <Button className="bg-white text-rose-600 hover:bg-gray-100">
                Shop Now
              </Button>
            </Link>
            <Link to="/blog">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-rose-600">
                Read Our Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
