
import React from 'react';
import { Bell, Clock, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Notifications: React.FC = () => {
  const notifications = [
    {
      id: 1,
      type: 'moderation',
      title: 'Novo trabalho para revisão',
      message: 'O artigo "Tecnologia Policial Moderna" foi submetido para moderação',
      time: '5 minutos atrás',
      unread: true,
      icon: AlertCircle,
      color: 'text-orange-600'
    },
    {
      id: 2,
      type: 'approval',
      title: 'Trabalho aprovado',
      message: 'Seu artigo "Investigação Digital" foi aprovado e publicado',
      time: '1 hora atrás',
      unread: true,
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'system',
      title: 'Sistema atualizado',
      message: 'Novas funcionalidades disponíveis na plataforma BNSP',
      time: '2 horas atrás',
      unread: false,
      icon: Info,
      color: 'text-blue-600'
    },
    {
      id: 4,
      type: 'download',
      title: 'Download realizado',
      message: 'Seu trabalho foi baixado por João Silva Santos',
      time: '3 horas atrás',
      unread: false,
      icon: Clock,
      color: 'text-purple-600'
    },
    {
      id: 5,
      type: 'comment',
      title: 'Novo comentário',
      message: 'Maria Santos comentou em seu artigo "Segurança Urbana"',
      time: '5 horas atrás',
      unread: false,
      icon: Bell,
      color: 'text-indigo-600'
    }
  ];

  const markAllAsRead = () => {
    console.log('Marcando todas as notificações como lidas');
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in px-4 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="govbr-heading-1 flex items-center text-xl md:text-3xl">
            <Bell className="h-6 w-6 md:h-8 md:w-8 mr-2 md:mr-3 text-govbr-blue-warm-vivid" />
            Notificações
          </h1>
          <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
            Acompanhe todas as atualizações e atividades da plataforma
          </p>
        </div>
        <Button 
          onClick={markAllAsRead} 
          variant="outline"
          className="w-full sm:w-auto text-sm"
        >
          Marcar todas como lidas
        </Button>
      </div>

      <div className="space-y-3 md:space-y-4">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <Card 
              key={notification.id} 
              className={`${notification.unread ? 'border-l-4 border-l-govbr-blue-warm-vivid bg-blue-50' : ''} hover:shadow-md transition-shadow`}
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className={`p-2 rounded-lg bg-gray-100 flex-shrink-0`}>
                    <Icon className={`h-4 w-4 md:h-5 md:w-5 ${notification.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                      <h3 className="font-semibold text-govbr-blue-warm-dark text-sm md:text-base truncate">
                        {notification.title}
                      </h3>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        {notification.unread && (
                          <Badge variant="secondary" className="bg-govbr-blue-warm-vivid text-white text-xs">
                            Nova
                          </Badge>
                        )}
                        <span className="text-xs md:text-sm text-gray-500 whitespace-nowrap">{notification.time}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{notification.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center py-6 md:py-8">
        <p className="text-gray-500 text-sm md:text-base">Você visualizou todas as notificações</p>
      </div>
    </div>
  );
};

export default Notifications;
