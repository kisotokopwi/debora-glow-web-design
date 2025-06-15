
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

interface WhatsAppSupportProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'floating';
}

const WhatsAppSupport = ({ className = '', size = 'md', variant = 'default' }: WhatsAppSupportProps) => {
  const { data: settings } = useSiteSettings();
  const whatsappNumber = settings?.whatsapp_number || '+255759910385';

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Habari! I need help with Debora Cosmetics products.');
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (variant === 'floating') {
    return (
      <Button
        onClick={handleWhatsAppClick}
        className={`fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-xl bg-green-500 hover:bg-green-600 border-2 border-white hover:scale-110 transition-all duration-300 ${className}`}
        size="icon"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    );
  }

  const sizeClasses = {
    sm: 'h-8 text-sm px-3',
    md: 'h-10 px-4',
    lg: 'h-12 text-lg px-6'
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className={`bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg transition-all duration-200 ${sizeClasses[size]} ${className}`}
    >
      <MessageCircle className="h-4 w-4 mr-2" />
      Chat on WhatsApp
    </Button>
  );
};

export default WhatsAppSupport;
