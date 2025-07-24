import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface NotificationData {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'compliance' | 'resources' | 'completion' | 'general';
  is_read: boolean;
  action_url?: string;
  action_text?: string;
  created_at: string;
  expires_at?: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.data.user.id)
        .or('expires_at.is.null,expires_at.gt.' + new Date().toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const notificationData = (data || []) as NotificationData[];
      setNotifications(notificationData);
      setUnreadCount(notificationData.filter(n => !n.is_read).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast({
        title: 'Error',
        description: 'Failed to load notifications',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) throw error;
      
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user.data.user.id)
        .eq('is_read', false);

      if (error) throw error;
      
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const createNotification = async (
    title: string,
    message: string,
    type: NotificationData['type'] = 'info',
    category: NotificationData['category'] = 'general',
    actionUrl?: string,
    actionText?: string,
    expiresAt?: string
  ) => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      const { error } = await supabase
        .from('notifications')
        .insert({
          user_id: user.data.user.id,
          title,
          message,
          type,
          category,
          action_url: actionUrl,
          action_text: actionText,
          expires_at: expiresAt,
        });

      if (error) throw error;
      
      // Refresh notifications
      await fetchNotifications();
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Set up real-time subscription for new notifications
    const channel = supabase
      .channel('notifications-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications'
        },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    createNotification,
    refreshNotifications: fetchNotifications,
  };
};