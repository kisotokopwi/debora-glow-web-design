
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
  const whatsappNumber = settings?.whatsapp_number || '+254759910385';

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hello! I need help with Debora Cosmetics products.');
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (variant === 'floating') {
    return (
      <Button
        onClick={handleWhatsAppClick}
        className={`fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg bg-green-500 hover:bg-green-600 ${className}`}
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    );
  }

  const sizeClasses = {
    sm: 'h-8 text-sm',
    md: 'h-10',
    lg: 'h-12 text-lg'
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className={`bg-green-500 hover:bg-green-600 text-white ${sizeClasses[size]} ${className}`}
    >
      <MessageCircle className="h-4 w-4 mr-2" />
      Chat on WhatsApp
    </Button>
  );
};

export default WhatsAppSupport;
