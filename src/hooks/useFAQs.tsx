
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order_index: number;
  active: boolean;
  created_at: string;
}

export const useFAQs = (category?: string) => {
  return useQuery({
    queryKey: ['faqs', category],
    queryFn: async () => {
      let query = supabase
        .from('faqs')
        .select('*')
        .eq('active', true)
        .order('order_index');

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data as FAQ[];
    }
  });
};
