import React from 'react';
import { 
  BookOpen, 
  Users, 
  FileText, 
  Download, 
  TrendingUp, 
  Eye, 
  Heart, 
  FolderPlus, 
  Clock 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DashboardProps {
  userRole?: 'servidor' | 'moderador' | 'administrador';
  userName?: string;
  onNavigate?: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  userRole = 'servidor',
  userName = 'João Silva',
  onNavigate
}) => {
  const stats = [
    {
      title: 'Trabalhos Publicados',
      value: '12.543',
      change: '+12%',
      icon: BookOpen,
      color: 'text-govbr-blue-warm-vivid'
    },
    {
      title: 'Autores Ativos',
      value: '3.421',
      change: '+8%',
      icon: Users,
      color: 'text-govbr-green-cool-vivid'
    },
    {
      title: 'Downloads este Mês',
      value: '45.892',
      change: '+25%',
      icon: FileText,
      color: 'text-purple-600'
    },
    {
      title: 'Categorias Ativas',
      value: '156',
      change: '+3%',
      icon: Book,
      color: 'text-orange-600'
    }
  ];

  const recentWorks = [
    {
      title: 'Tecnologia Policial e Direitos Humanos na Era Digital',
      author: 'Dra. Maria Santos',
      institution: 'Academia Nacional de Polícia',
      category: 'Tecnologia Policial',
      date: '2024-01-15',
      downloads: 1243,
      status: 'aprovado'
    },
    {
      title: 'Mediação de Conflitos em Comunidades Vulneráveis',
      author: 'Ten. Carlos Oliveira',
      institution: 'PMERJ',
      category: 'Policiamento Comunitário',
      date: '2024-01-12',
      downloads: 856,
      status: 'aprovado'
    },
    {
      title: 'Investigação de Crimes Cibernéticos: Metodologias Avançadas',
      author: 'Del. Ana Paula',
      institution: 'PCSP',
      category: 'Investigação Criminal',
      date: '2024-01-10',
      downloads: 2034,
      status: 'aprovado'
    }
  ];

  const categories = [
    { name: 'Investigação Criminal', count: 2134, color: 'bg-blue-100 text-blue-800' },
    { name: 'Policiamento Comunitário', count: 1856, color: 'bg-green-100 text-green-800' },
    { name: 'Tecnologia Policial', count: 1432, color: 'bg-purple-100 text-purple-800' },
    { name: 'Direitos Humanos', count: 1203, color: 'bg-orange-100 text-orange-800' },
    { name: 'Inteligência Policial', count: 987, color: 'bg-red-100 text-red-800' },
    { name: 'Prevenção Criminal', count: 834, color: 'bg-yellow-100 text-yellow-800' }
  ];

  const handleNavigation = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    }
  };

  const quickActions = [
    {
      title: 'Lista de Desejos',
      description: 'Trabalhos salvos para ler depois',
      icon: Heart,
      action: () => handleNavigation('wishlist'),
      color: 'text-red-500'
    },
    {
      title: 'Downloads Recentes',
      description: 'Últimos trabalhos baixados',
      icon: Clock,
      action: () => handleNavigation('recent-downloads'),
      color: 'text-blue-500'
    },
    {
      title: 'Mais Populares',
      description: 'Trabalhos em destaque',
      icon: TrendingUp,
      action: () => handleNavigation('most-popular'),
      color: 'text-orange-500'
    },
    {
      title: 'Criar Nova Coleção',
      description: 'Organize trabalhos por tema',
      icon: FolderPlus,
      action: () => handleNavigation('create-collection'),
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="govbr-heading-1 mb-4">
          Bem-vindo, {userName}!
        </h1>
        <p className="govbr-body max-w-2xl mx-auto">
          Explore o conhecimento acadêmico em segurança pública. 
          Acesse trabalhos, compartilhe pesquisas e contribua para o avanço da área.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="govbr-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-govbr-blue-warm-dark">
                  {stat.value}
                </div>
                <p className="text-xs text-govbr-green-cool-vivid font-medium">
                  {stat.change} em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h2 className="govbr-heading-2 mb-6">Acesso Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={action.action}>
                <CardContent className="p-6 text-center">
                  <Icon className={`h-12 w-12 mx-auto mb-4 ${action.color}`} />
                  <h3 className="font-semibold text-govbr-blue-warm-dark mb-2">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Works */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="govbr-card">
            <CardHeader>
              <CardTitle className="govbr-heading-3 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-govbr-blue-warm-vivid" />
                Trabalhos Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentWorks.map((work, index) => (
                  <div key={index} className="border-b border-govbr-gray-10 pb-4 last:border-b-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-govbr-blue-warm-dark hover:text-govbr-blue-warm-vivid cursor-pointer">
                          {work.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {work.author} • {work.institution}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {work.category}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(work.date).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="text-xs text-govbr-green-cool-vivid">
                            {work.downloads} downloads
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  Ver Todos os Trabalhos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <div>
          <Card className="govbr-card">
            <CardHeader>
              <CardTitle className="govbr-heading-3 flex items-center">
                <Book className="h-5 w-5 mr-2 text-govbr-green-cool-vivid" />
                Categorias Populares
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {category.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {category.count} trabalhos
                      </p>
                    </div>
                    <Badge className={category.color}>
                      {category.count}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  Explorar Categorias
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="govbr-card mt-6">
            <CardHeader>
              <CardTitle className="govbr-heading-3">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Busca Avançada
              </Button>
              <Button variant="outline" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Meus Favoritos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
