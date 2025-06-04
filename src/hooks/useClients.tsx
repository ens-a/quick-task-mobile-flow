
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface DatabaseClient {
  id: string;
  name: string;
  phone: string;
  address: string;
  description: string;
  status: 'active' | 'completed';
  created_at: string;
  updated_at: string;
}

export const useClients = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: clients = [], isLoading, error } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as DatabaseClient[];
    },
  });

  const createClientMutation = useMutation({
    mutationFn: async (clientData: Omit<DatabaseClient, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('clients')
        .insert([{
          ...clientData,
          executor_id: (await supabase.auth.getUser()).data.user?.id,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: "Клиент создан",
        description: "Новый клиент успешно добавлен",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateClientMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<DatabaseClient> & { id: string }) => {
      const { data, error } = await supabase
        .from('clients')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: "Клиент обновлен",
        description: "Информация о клиенте успешно обновлена",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    clients,
    isLoading,
    error,
    createClient: createClientMutation.mutate,
    updateClient: updateClientMutation.mutate,
    isCreating: createClientMutation.isPending,
    isUpdating: updateClientMutation.isPending,
  };
};
