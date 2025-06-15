
-- Create security definer function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Update RLS policies to allow admins to manage all data

-- Products: Allow admins to insert, update, and delete
DROP POLICY IF EXISTS "Only admins can manage products" ON public.products;
CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (public.is_current_user_admin());

-- Categories: Allow admins to manage
DROP POLICY IF EXISTS "Only admins can manage categories" ON public.categories;
CREATE POLICY "Admins can manage categories" ON public.categories
  FOR ALL USING (public.is_current_user_admin());

-- Blog posts: Allow admins to manage
DROP POLICY IF EXISTS "Only admins can manage blog posts" ON public.blog_posts;
CREATE POLICY "Admins can manage blog posts" ON public.blog_posts
  FOR ALL USING (public.is_current_user_admin());

-- Orders: Allow admins to view and update all orders
CREATE POLICY "Admins can manage all orders" ON public.orders
  FOR ALL USING (public.is_current_user_admin());

-- Profiles: Allow admins to view all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_current_user_admin());

-- Create an admin user (you can change the email to your preferred admin email)
-- First, we need to manually create an admin profile for testing
-- This assumes you'll sign up with this email first, then run this to make it admin
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'admin@example.com';

-- If you want to create a different admin user, replace the email above
