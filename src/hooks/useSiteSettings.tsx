
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SiteSettings {
  [key: string]: string;
}

export const useSiteSettings = () => {
  return useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');
      
      if (error) throw error;
      
      // Convert array to object for easier access
      const settings: SiteSettings = {};
      data.forEach(setting => {
        settings[setting.key] = setting.value || '';
      });
      
      return settings;
    }
  });
};
