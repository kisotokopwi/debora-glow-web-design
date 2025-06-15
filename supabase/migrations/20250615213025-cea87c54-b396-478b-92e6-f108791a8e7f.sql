
-- Add FAQ table
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  order_index INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add settings table for site configuration
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  type TEXT DEFAULT 'string',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add user addresses table
CREATE TABLE IF NOT EXISTS public.user_addresses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT,
  postal_code TEXT,
  country TEXT NOT NULL DEFAULT 'Kenya',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_addresses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for FAQs
CREATE POLICY "Everyone can view active FAQs" ON public.faqs FOR SELECT USING (active = true);
CREATE POLICY "Admins can manage FAQs" ON public.faqs FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS Policies for site settings
CREATE POLICY "Everyone can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage site settings" ON public.site_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS Policies for user addresses
CREATE POLICY "Users can view their own addresses" ON public.user_addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own addresses" ON public.user_addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own addresses" ON public.user_addresses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own addresses" ON public.user_addresses FOR DELETE USING (auth.uid() = user_id);

-- Insert default site settings
INSERT INTO public.site_settings (key, value, type) VALUES
('site_name', 'Debora Cosmetics', 'string'),
('instagram_url', 'https://www.instagram.com/debrah_cosmetics', 'string'),
('whatsapp_number', '+254759910385', 'string'),
('default_language', 'en', 'string'),
('currency', 'KSH', 'string'),
('support_email', 'support@deboracosmetics.com', 'string')
ON CONFLICT (key) DO NOTHING;

-- Insert sample FAQs
INSERT INTO public.faqs (question, answer, category, order_index) VALUES
('How do I place an order?', 'You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. You''ll need to create an account to complete your purchase.', 'orders', 1),
('What payment methods do you accept?', 'We accept mobile money (M-Pesa), bank transfers, and cash on delivery for orders within Nairobi.', 'payment', 2),
('How long does delivery take?', 'Delivery within Nairobi takes 1-2 business days. For other locations in Kenya, delivery takes 3-5 business days.', 'shipping', 3),
('Do you offer returns?', 'Yes, we offer returns within 7 days of delivery for unopened products in their original packaging.', 'returns', 4),
('Are your products original?', 'Yes, all our cosmetics are 100% original and sourced directly from authorized distributors.', 'products', 5),
('How can I contact customer support?', 'You can reach us via WhatsApp at +254 759 910 385, email at support@deboracosmetics.com, or through our social media channels.', 'support', 6)
ON CONFLICT DO NOTHING;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_addresses_user_id ON public.user_addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON public.faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_active ON public.faqs(active);
