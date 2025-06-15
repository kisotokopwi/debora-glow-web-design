
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import Newsletter from '@/components/Newsletter';
import FAQSection from '@/components/FAQSection';
import WhatsAppSupport from '@/components/WhatsAppSupport';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Debora Cosmetics - Premium Beauty Products in Kenya | Original Makeup & Skincare</title>
        <meta name="description" content="Shop premium cosmetics and beauty products in Kenya. Original makeup, skincare, and beauty accessories with fast delivery. Call +254 759 910 385 or order online." />
        <meta name="keywords" content="cosmetics Kenya, makeup Nairobi, beauty products, skincare, lipstick, foundation, original cosmetics" />
        <meta property="og:title" content="Debora Cosmetics - Premium Beauty Products in Kenya" />
        <meta property="og:description" content="Shop premium cosmetics and beauty products in Kenya with fast delivery." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.origin} />
        <link rel="canonical" href={window.location.origin} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Debora Cosmetics",
            "url": window.location.origin,
            "logo": `${window.location.origin}/placeholder.svg`,
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+254759910385",
              "contactType": "customer service"
            },
            "sameAs": [
              "https://www.instagram.com/debrah_cosmetics"
            ]
          })}
        </script>
      </Helmet>
      
      <div>
        <Hero />
        <FeaturedProducts />
        <Categories />
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <FAQSection />
          </div>
        </div>
        <Newsletter />
        <WhatsAppSupport variant="floating" />
      </div>
    </>
  );
};

export default Index;
