
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (phone: string, password: string) => {
    // Очищаем состояние перед входом
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      // Игнорируем ошибки
    }

    const { error } = await supabase.auth.signInWithPassword({
      phone: phone,
      password,
    });
    return { error };
  };

  const signUp = async (phone: string, password: string, name: string) => {
    // Очищаем состояние перед регистрацией
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      // Игнорируем ошибки
    }

    const { error } = await supabase.auth.signUp({
      phone: phone,
      password,
      options: {
        data: {
          phone: phone,
          name: name,
        },
      },
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut({ scope: 'global' });
    if (!error) {
      // Принудительно обновляем страницу для чистого состояния
      window.location.href = '/';
    }
    return { error };
  };

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };
};
