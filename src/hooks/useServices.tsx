
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DatabaseService {
  id: string;
  name: string;
  price: number;
}

export interface DatabaseMaterial {
  id: string;
  name: string;
  price: number;
}

export const useServices = () => {
  const { data: services = [], isLoading: servicesLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as DatabaseService[];
    },
  });

  const { data: materials = [], isLoading: materialsLoading } = useQuery({
    queryKey: ['materials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as DatabaseMaterial[];
    },
  });

  return {
    services,
    materials,
    isLoading: servicesLoading || materialsLoading,
  };
};
