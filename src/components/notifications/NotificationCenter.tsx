import React, { useState } from 'react';
import { Bell, Check, CheckCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useNotifications, NotificationData } from '@/hooks/useNotifications';
import { useTranslation } from 'react-i18next';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

const notificationIcons = {
  info: '💡',
  success: '✅',
  warning: '⚠️',
  error: '❌',
};

const NotificationItem: React.FC<{
  notification: NotificationData;
  onMarkAsRead: (id: string) => void;
}> = ({ notification, onMarkAsRead }) => {
  const { t } = useTranslation();

  return (
    <Card className={cn(
      'transition-colors cursor-pointer hover:bg-accent/50',
      !notification.is_read && 'border-l-4 border-l-primary bg-accent/20'
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">
              {notificationIcons[notification.type]}
            </span>
            <div>
              <CardTitle className="text-sm font-medium">
                {notification.title}
              </CardTitle>
              <Badge variant="secondary" className="text-xs mt-1">
                {t(`notifications.${notification.category}`)}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {!notification.is_read && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkAsRead(notification.id);
                }}
                className="h-6 w-6 p-0"
              >
                <Check className="h-3 w-3" />
              </Button>
            )}
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-2">
          {notification.message}
        </p>
        {notification.action_url && notification.action_text && (
          <Button variant="outline" size="sm" className="mt-2">
            {notification.action_text}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export const NotificationCenter: React.FC = () => {
  const { t } = useTranslation();
  const { notifications, unreadCount, markAsRead, markAllAsRead, loading } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">{t('notifications.title')}</h3>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                <CheckCheck className="h-3 w-3 mr-1" />
                {t('notifications.markAllRead')}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <ScrollArea className="max-h-96">
          <div className="p-4 space-y-3">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">
                {t('common.loading')}
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>{t('notifications.noNotifications')}</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};