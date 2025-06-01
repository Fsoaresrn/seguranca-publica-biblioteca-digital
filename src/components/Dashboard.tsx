import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Upload, 
  Search, 
  Heart, 
  TrendingUp, 
  Users, 
  FileText, 
  Download,
  Calendar,
  Star,
  Eye,
  ChevronRight,
  User
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Work {
  id: number;
  title: string;
  author: string;
  category: string;
  downloads: number;
  rating: number;
  publishedDate: string;
  views: number;
  institution: string;
  force: string;
}

interface DashboardProps {
  userRole?: 'servidor' | 'moderador' | 'administrador';
  userName?: string;
  onNavigate?: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const worksPerPage = 5;

  const allRecentWorks: Work[] = [
    {
      id: 1,
      title: "Inteligência Artificial na Investigação Criminal",
      author: "Dr. Roberto Silva",
      category: "Tecnologia Policial",
      downloads: 2341,
      rating: 4.8,
      publishedDate: "2025-01-15",
      views: 3456,
      institution: "Academia Nacional de Polícia",
      force: "Polícia Federal"
    },
    {
      id: 2,
      title: "Policiamento Comunitário em Áreas Vulneráveis",
      author: "Cap. Maria Fernanda",
      category: "Policiamento Comunitário",
      downloads: 1876,
      rating: 4.6,
      publishedDate: "2025-01-12",
      views: 2789,
      institution: "PMERJ",
      force: "Polícia Militar"
    },
    {
      id: 3,
      title: "Crimes Cibernéticos: Novas Abordagens",
      author: "Del. Ana Carolina",
      category: "Investigação Criminal",
      downloads: 3102,
      rating: 4.9,
      publishedDate: "2025-01-10",
      views: 4123,
      institution: "PCSP",
      force: "Polícia Civil"
    },
    {
      id: 4,
      title: "Gestão de Trânsito Urbano Inteligente",
      author: "Agente Carlos Mendes",
      category: "Gestão de Trânsito",
      downloads: 892,
      rating: 4.3,
      publishedDate: "2025-01-08",
      views: 1567,
      institution: "CET-SP",
      force: "Agente de Trânsito"
    },
    {
      id: 5,
      title: "Perícia Digital: Análise de Evidências",
      author: "Perito João Santos",
      category: "Perícia Criminal",
      downloads: 1234,
      rating: 4.7,
      publishedDate: "2025-01-05",
      views: 2345,
      institution: "Instituto de Criminalística",
      force: "Perícia Criminal"
    },
    {
      id: 6,
      title: "Sistema Penitenciário: Ressocialização",
      author: "Agente Pedro Lima",
      category: "Sistema Penitenciário",
      downloads: 567,
      rating: 4.2,
      publishedDate: "2025-01-03",
      views: 1890,
      institution: "SEAP",
      force: "Polícia Penal Estadual"
    },
    {
      id: 7,
      title: "Segurança Portuária: Controle e Monitoramento",
      author: "Guarda Roberto Costa",
      category: "Segurança Portuária",
      downloads: 723,
      rating: 4.4,
      publishedDate: "2025-01-01",
      views: 1456,
      institution: "Autoridade Portuária",
      force: "Guarda Portuária"
    },
    {
      id: 8,
      title: "Prevenção de Acidentes Rodoviários",
      author: "Inspetor Marcos Silva",
      category: "Segurança Rodoviária",
      downloads: 1456,
      rating: 4.6,
      publishedDate: "2024-12-28",
      views: 2678,
      institution: "Academia PRF",
      force: "Polícia Rodoviária Federal"
    },
    {
      id: 9,
      title: "Bombeiros: Gestão de Emergências",
      author: "Major Carlos Santos",
      category: "Gestão de Emergências",
      downloads: 987,
      rating: 4.5,
      publishedDate: "2024-12-25",
      views: 1823,
      institution: "Academia de Bombeiros",
      force: "Corpo de Bombeiros"
    },
    {
      id: 10,
      title: "Força Nacional: Operações Especiais",
      author: "Coronel Ana Silva",
      category: "Operações Especiais",
      downloads: 654,
      rating: 4.3,
      publishedDate: "2024-12-22",
      views: 1345,
      institution: "Academia da Força Nacional",
      force: "Força Nacional"
    },
    {
      id: 11,
      title: "Polícia Científica: Inovações Tecnológicas",
      author: "Dr. Paulo Oliveira",
      category: "Perícia Científica",
      downloads: 876,
      rating: 4.7,
      publishedDate: "2024-12-20",
      views: 1987,
      institution: "Instituto de Perícia",
      force: "Polícia Científica"
    },
    {
      id: 12,
      title: "Segurança Legislativa: Proteção Institucional",
      author: "Agente Maria Costa",
      category: "Segurança Institucional",
      downloads: 432,
      rating: 4.1,
      publishedDate: "2024-12-18",
      views: 987,
      institution: "Polícia Legislativa",
      force: "Polícia Legislativa Federal"
    }
  ];

  const totalPages = Math.ceil(allRecentWorks.length / worksPerPage);
  const startIndex = (currentPage - 1) * worksPerPage;
  const endIndex = startIndex + worksPerPage;
  const currentWorks = allRecentWorks.slice(startIndex, endIndex);

  const handleQuickAction = (action: string) => {
    if (onNavigate) {
      switch (action) {
        case 'advanced-search':
          onNavigate('search');
          break;
        case 'favorites':
          onNavigate('favorites');
          break;
        case 'submit-work':
          onNavigate('submit-work');
          break;
        default:
          break;
      }
    }
  };

  const handleViewAllWorks = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Cabeçalho Principal */}
      <div className="bg-gradient-to-r from-govbr-blue-warm-vivid to-govbr-blue-warm-dark rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Bem-vindo à Biblioteca Nacional da Segurança Pública
        </h1>
        <p className="text-govbr-blue-warm-10 text-lg">
          Acesse conhecimento acadêmico especializado em segurança pública
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="govbr-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Trabalhos</CardTitle>
            <BookOpen className="h-4 w-4 text-govbr-blue-warm-vivid" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-govbr-blue-warm-dark">1,247</div>
            <p className="text-xs text-gray-600">+12 esta semana</p>
          </CardContent>
        </Card>

        <Card className="govbr-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads Totais</CardTitle>
            <Download className="h-4 w-4 text-govbr-green-cool-vivid" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-govbr-green-cool-vivid">45,678</div>
            <p className="text-xs text-gray-600">+2,341 este mês</p>
          </CardContent>
        </Card>

        <Card className="govbr-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <Users className="h-4 w-4 text-govbr-mint-vivid" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-govbr-mint-vivid">8,932</div>
            <p className="text-xs text-gray-600">+156 hoje</p>
          </CardContent>
        </Card>

        <Card className="govbr-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">4.7</div>
            <p className="text-xs text-gray-600">de 5.0 estrelas</p>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3">Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="govbr-btn-primary h-16 flex flex-col gap-2"
              onClick={() => handleQuickAction('advanced-search')}
            >
              <Search className="h-6 w-6" />
              Busca Avançada
            </Button>
            <Button 
              className="govbr-btn-secondary h-16 flex flex-col gap-2"
              onClick={() => handleQuickAction('favorites')}
            >
              <Heart className="h-6 w-6" />
              Meus Favoritos
            </Button>
            <Button 
              className="govbr-btn-outline h-16 flex flex-col gap-2"
              onClick={() => handleQuickAction('submit-work')}
            >
              <Upload className="h-6 w-6" />
              Enviar Trabalho
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Trabalhos Recentes */}
      <Card className="govbr-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="govbr-heading-3">Trabalhos Recentes</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Página {currentPage} de {totalPages}
            </span>
            {currentPage < totalPages && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleViewAllWorks}
              >
                Ver Todos os Trabalhos
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentWorks.map((work) => (
              <div key={work.id} className="border border-govbr-gray-20 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-govbr-blue-warm-dark hover:text-govbr-blue-warm-vivid cursor-pointer">
                      {work.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {work.author}
                      </span>
                      <span>{work.institution}</span>
                      <span className="px-2 py-1 bg-govbr-gray-5 rounded text-xs">
                        {work.category}
                      </span>
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                        {work.force}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {work.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {work.downloads}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      {work.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(work.publishedDate).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "govbr-btn-primary" : ""}
                  >
                    {page}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Categorias Populares */}
      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3">Categorias Populares</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Investigação Criminal", count: 234, icon: "🔍" },
              { name: "Tecnologia Policial", count: 189, icon: "💻" },
              { name: "Policiamento Comunitário", count: 156, icon: "👥" },
              { name: "Perícia Criminal", count: 134, icon: "🔬" },
              { name: "Gestão Policial", count: 123, icon: "📊" },
              { name: "Segurança Rodoviária", count: 98, icon: "🛣️" },
              { name: "Sistema Penitenciário", count: 87, icon: "🏢" },
              { name: "Segurança Portuária", count: 76, icon: "⚓" }
            ].map((category) => (
              <div 
                key={category.name}
                className="p-4 border border-govbr-gray-20 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <h4 className="font-medium text-sm mb-1">{category.name}</h4>
                <p className="text-xs text-gray-600">{category.count} trabalhos</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
