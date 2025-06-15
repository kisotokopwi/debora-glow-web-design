import React from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import Newsletter from '@/components/Newsletter';
import WhatsAppSupport from '@/components/WhatsAppSupport';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Debora Cosmetics - Premium Beauty Products in Tanzania | Original Makeup & Skincare</title>
        <meta name="description" content="Shop premium cosmetics and beauty products in Tanzania. Original makeup, skincare, and beauty accessories with fast delivery across Dar es Salaam. Call +255 759 910 385 or order online." />
        <meta name="keywords" content="cosmetics Tanzania, makeup Dar es Salaam, beauty products, skincare Tanzania, lipstick, foundation, original cosmetics Tanzania, beauty store Dar es Salaam" />
        <meta property="og:title" content="Debora Cosmetics - Premium Beauty Products in Tanzania" />
        <meta property="og:description" content="Shop premium cosmetics and beauty products in Tanzania with fast delivery across Dar es Salaam and other regions." />
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
              "telephone": "+255759910385",
              "contactType": "customer service"
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Tanzania",
              "addressLocality": "Dar es Salaam"
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
        {/* Removed FAQSection */}
        {/* Spacing/visual polish: Add a soft divider and breathing room */}
        <div className="my-12" />
        <Newsletter />
        <WhatsAppSupport variant="floating" />
      </div>
    </>
  );
};

export default Index;
