import React, { useState } from 'react';
import { Shield, Users, FileText, BarChart3, Settings, Database, AlertTriangle, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserManagement from './admin/UserManagement';
import SystemSettings from './admin/SystemSettings';
import PendingActionsDetail from './admin/PendingActionsDetail';
import { useToast } from '@/hooks/use-toast';

interface AdminPanelProps {
  onNavigate?: (section: string) => void;
}

interface PendingAction {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  count: number;
  type: 'users' | 'moderation' | 'categories' | 'backup';
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigate }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAction, setSelectedAction] = useState<PendingAction | null>(null);
  const [isActionDetailOpen, setIsActionDetailOpen] = useState(false);
  const [pendingActions, setPendingActions] = useState<PendingAction[]>([
    {
      id: 1,
      title: 'Revisar novos usuários',
      description: '15 usuários aguardando aprovação de cadastro',
      priority: 'high',
      count: 15,
      type: 'users'
    },
    {
      id: 2,
      title: 'Moderar trabalhos',
      description: '8 trabalhos aguardando aprovação',
      priority: 'medium',
      count: 8,
      type: 'moderation'
    },
    {
      id: 3,
      title: 'Atualizar categorias',
      description: 'Revisão das categorias de trabalhos solicitada',
      priority: 'low',
      count: 1,
      type: 'categories'
    },
    {
      id: 4,
      title: 'Configurar backup',
      description: 'Backup automático precisa ser configurado',
      priority: 'high',
      count: 1,
      type: 'backup'
    }
  ]);

  const systemStats = [
    {
      title: 'Total de Usuários',
      value: '3.421',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Trabalhos Publicados',
      value: '12.543',
      change: '+8%',
      icon: FileText,
      color: 'text-green-600'
    },
    {
      title: 'Downloads Realizados',
      value: '85.692',
      change: '+25%',
      icon: BarChart3,
      color: 'text-purple-600'
    },
    {
      title: 'Instituições Ativas',
      value: '127',
      change: '+3%',
      icon: Database,
      color: 'text-orange-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'user_registration',
      message: 'Novo usuário cadastrado: João Silva Santos (Polícia Federal)',
      time: '10 minutos atrás',
      severity: 'info'
    },
    {
      id: 2,
      type: 'work_published',
      message: 'Trabalho "Investigação Digital" foi publicado',
      time: '25 minutos atrás',
      severity: 'success'
    },
    {
      id: 3,
      type: 'system_error',
      message: 'Erro no sistema de upload detectado',
      time: '1 hora atrás',
      severity: 'warning'
    },
    {
      id: 4,
      type: 'moderation',
      message: '5 trabalhos pendentes de moderação',
      time: '2 horas atrás',
      severity: 'info'
    }
  ];

  const systemHealth = [
    { name: 'Servidor Principal', status: 'online', uptime: '99.9%' },
    { name: 'Banco de Dados', status: 'online', uptime: '99.8%' },
    { name: 'CDN', status: 'online', uptime: '100%' },
    { name: 'Sistema de Busca', status: 'warning', uptime: '98.5%' },
    { name: 'Backup', status: 'online', uptime: '99.7%' }
  ];

  const handleViewActionDetails = (action: PendingAction) => {
    setSelectedAction(action);
    setIsActionDetailOpen(true);
  };

  const handleResolveAction = (actionId: number, resolution: string) => {
    setPendingActions(prev => prev.filter(action => action.id !== actionId));
    
    console.log(`✅ Ação resolvida - ID: ${actionId}`);
    console.log(`📝 Resolução: ${resolution}`);
    
    toast({
      title: 'Ação resolvida',
      description: 'A ação pendente foi marcada como resolvida com sucesso.'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'offline': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="govbr-heading-1 flex items-center">
            <Shield className="h-8 w-8 mr-3 text-govbr-blue-warm-vivid" />
            Painel Administrativo
          </h1>
          <p className="text-gray-600 mt-2">
            Gestão e monitoramento da plataforma BNSP
          </p>
        </div>
        <Button 
          className="govbr-btn-primary"
          onClick={() => onNavigate?.('settings')}
        >
          <Settings className="h-4 w-4 mr-2" />
          Configurações
        </Button>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-govbr-blue-warm-dark">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} vs mês anterior</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
          <TabsTrigger value="actions">Ações Pendentes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Atividades Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        activity.severity === 'success' ? 'bg-green-500' :
                        activity.severity === 'warning' ? 'bg-yellow-500' :
                        activity.severity === 'error' ? 'bg-red-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Status do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemHealth.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          service.status === 'online' ? 'bg-green-500' :
                          service.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <span className="font-medium">{service.name}</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-medium ${getStatusColor(service.status)}`}>
                          {service.status === 'online' ? 'Online' : 
                           service.status === 'warning' ? 'Atenção' : 'Offline'}
                        </span>
                        <p className="text-xs text-gray-500">Uptime: {service.uptime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="system">
          <SystemSettings />
        </TabsContent>

        <TabsContent value="actions">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Ações Pendentes</h2>
            {pendingActions.map((action) => (
              <Card key={action.id} className={`border-l-4 ${getPriorityColor(action.priority)}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-govbr-blue-warm-dark">{action.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {action.count} {action.count === 1 ? 'item' : 'itens'}
                        </Badge>
                      </div>
                      <p className="text-gray-600">{action.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewActionDetails(action)}
                      >
                        Ver Detalhes
                      </Button>
                      <Button 
                        size="sm" 
                        className="govbr-btn-primary"
                        onClick={() => handleViewActionDetails(action)}
                      >
                        Resolver
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {pendingActions.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">Nenhuma ação pendente no momento.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de detalhes da ação */}
      <PendingActionsDetail
        action={selectedAction}
        isOpen={isActionDetailOpen}
        onClose={() => {
          setIsActionDetailOpen(false);
          setSelectedAction(null);
        }}
        onResolve={handleResolveAction}
      />
    </div>
  );
};

export default AdminPanel;
