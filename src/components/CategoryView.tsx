
import React, { useState } from 'react';
import { ArrowLeft, Download, Eye, Star, Calendar, User, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

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
  abstract: string;
}

interface CategoryViewProps {
  category: string;
  onNavigate?: (section: string) => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({ category, onNavigate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const worksPerPage = 10;

  // Exemplo de dados baseados na categoria
  const generateWorksForCategory = (categoryName: string): Work[] => {
    const baseWorks: { [key: string]: Work[] } = {
      "Investigação Criminal": [
        {
          id: 1,
          title: "Inteligência Artificial na Investigação Criminal",
          author: "Dr. Roberto Silva",
          category: "Investigação Criminal",
          downloads: 2341,
          rating: 4.8,
          publishedDate: "2025-01-15",
          views: 3456,
          institution: "Academia Nacional de Polícia",
          force: "Polícia Federal",
          abstract: "Análise das aplicações de inteligência artificial em investigações criminais modernas, abordando técnicas de machine learning e processamento de dados."
        },
        {
          id: 2,
          title: "Crimes Cibernéticos: Novas Abordagens",
          author: "Del. Ana Carolina",
          category: "Investigação Criminal",
          downloads: 3102,
          rating: 4.9,
          publishedDate: "2025-01-10",
          views: 4123,
          institution: "PCSP",
          force: "Polícia Civil",
          abstract: "Estudo sobre métodos inovadores de investigação de crimes cibernéticos e análise forense digital."
        },
        {
          id: 3,
          title: "Investigação de Homicídios: Metodologia Científica",
          author: "Delegado Carlos Mendes",
          category: "Investigação Criminal",
          downloads: 1876,
          rating: 4.7,
          publishedDate: "2025-01-08",
          views: 2789,
          institution: "PCRJ",
          force: "Polícia Civil",
          abstract: "Metodologias científicas aplicadas à investigação de homicídios, incluindo análise de local de crime."
        },
        {
          id: 4,
          title: "Investigação Patrimonial: Técnicas Avançadas",
          author: "Agente Federal Maria Santos",
          category: "Investigação Criminal",
          downloads: 1234,
          rating: 4.6,
          publishedDate: "2025-01-05",
          views: 2345,
          institution: "Polícia Federal",
          force: "Polícia Federal",
          abstract: "Técnicas avançadas para investigação de crimes patrimoniais e lavagem de dinheiro."
        },
        {
          id: 5,
          title: "Análise Criminal: Estatística e Padrões",
          author: "Perito João Oliveira",
          category: "Investigação Criminal",
          downloads: 987,
          rating: 4.5,
          publishedDate: "2025-01-03",
          views: 1567,
          institution: "Instituto de Criminalística",
          force: "Perícia Criminal",
          abstract: "Aplicação de métodos estatísticos na análise criminal para identificação de padrões."
        },
        {
          id: 6,
          title: "Investigação de Tráfico de Drogas",
          author: "Inspetor Pedro Costa",
          category: "Investigação Criminal",
          downloads: 1456,
          rating: 4.8,
          publishedDate: "2024-12-28",
          views: 2678,
          institution: "Polícia Civil",
          force: "Polícia Civil",
          abstract: "Estratégias e técnicas para investigação de organizações criminosas ligadas ao tráfico de drogas."
        },
        {
          id: 7,
          title: "Criminalística Digital: Evidências Eletrônicas",
          author: "Perito Digital Ana Lima",
          category: "Investigação Criminal",
          downloads: 2187,
          rating: 4.9,
          publishedDate: "2024-12-25",
          views: 3234,
          institution: "Instituto de Perícia",
          force: "Perícia Criminal",
          abstract: "Coleta e análise de evidências eletrônicas em dispositivos digitais para investigação criminal."
        },
        {
          id: 8,
          title: "Interrogatório Criminal: Técnicas Psicológicas",
          author: "Psicólogo Forense Roberto Santos",
          category: "Investigação Criminal",
          downloads: 1543,
          rating: 4.7,
          publishedDate: "2024-12-22",
          views: 2456,
          institution: "Academia de Polícia",
          force: "Polícia Civil",
          abstract: "Aplicação de técnicas psicológicas em interrogatórios criminais respeitando direitos humanos."
        },
        {
          id: 9,
          title: "Investigação de Corrupção: Metodologia",
          author: "Procurador Federal Carlos Silva",
          category: "Investigação Criminal",
          downloads: 1876,
          rating: 4.6,
          publishedDate: "2024-12-20",
          views: 2987,
          institution: "Ministério Público Federal",
          force: "Polícia Federal",
          abstract: "Metodologias específicas para investigação de crimes de corrupção no setor público."
        },
        {
          id: 10,
          title: "Análise de DNA em Investigações",
          author: "Perito Geneticista Maria Fernanda",
          category: "Investigação Criminal",
          downloads: 2345,
          rating: 4.8,
          publishedDate: "2024-12-18",
          views: 3567,
          institution: "Laboratório de Genética Forense",
          force: "Perícia Criminal",
          abstract: "Aplicação de análise de DNA como ferramenta fundamental em investigações criminais."
        }
      ],
      "Tecnologia Policial": [
        {
          id: 11,
          title: "Sistemas de Reconhecimento Facial na Segurança",
          author: "Eng. Carlos Tech",
          category: "Tecnologia Policial",
          downloads: 1890,
          rating: 4.7,
          publishedDate: "2025-01-12",
          views: 2567,
          institution: "Instituto de Tecnologia Policial",
          force: "Polícia Militar",
          abstract: "Implementação e eficácia de sistemas de reconhecimento facial em operações policiais."
        },
        {
          id: 12,
          title: "Drones na Vigilância Urbana",
          author: "Cap. Maria Drone",
          category: "Tecnologia Policial",
          downloads: 1456,
          rating: 4.6,
          publishedDate: "2025-01-09",
          views: 2123,
          institution: "PMESP",
          force: "Polícia Militar",
          abstract: "Uso de aeronaves não tripuladas para vigilância e monitoramento em centros urbanos."
        },
        {
          id: 13,
          title: "Big Data aplicado à Segurança Pública",
          author: "Dr. João Data",
          category: "Tecnologia Policial",
          downloads: 2234,
          rating: 4.9,
          publishedDate: "2025-01-07",
          views: 3456,
          institution: "Universidade Federal",
          force: "Polícia Federal",
          abstract: "Análise de grandes volumes de dados para prevenção e investigação criminal."
        },
        {
          id: 14,
          title: "Aplicativos Móveis para Policiamento",
          author: "Desenvolvedora Ana App",
          category: "Tecnologia Policial",
          downloads: 987,
          rating: 4.5,
          publishedDate: "2025-01-04",
          views: 1789,
          institution: "Centro de Inovação",
          force: "Polícia Civil",
          abstract: "Desenvolvimento de aplicações móveis para otimização do trabalho policial."
        },
        {
          id: 15,
          title: "Inteligência Artificial em Patrulhamento",
          author: "Ten. Pedro AI",
          category: "Tecnologia Policial",
          downloads: 1678,
          rating: 4.8,
          publishedDate: "2025-01-01",
          views: 2890,
          institution: "Academia Militar",
          force: "Polícia Militar",
          abstract: "Uso de IA para otimização de rotas de patrulhamento e previsão de ocorrências."
        },
        {
          id: 16,
          title: "Câmeras Corporais: Impacto na Transparência",
          author: "Sgt. Carlos Camera",
          category: "Tecnologia Policial",
          downloads: 1345,
          rating: 4.7,
          publishedDate: "2024-12-29",
          views: 2345,
          institution: "Polícia Militar",
          force: "Polícia Militar",
          abstract: "Análise do impacto das câmeras corporais na transparência e accountability policial."
        },
        {
          id: 17,
          title: "Blockchain na Cadeia de Custódia",
          author: "Perito Tech Maria",
          category: "Tecnologia Policial",
          downloads: 876,
          rating: 4.4,
          publishedDate: "2024-12-26",
          views: 1567,
          institution: "Instituto de Perícia",
          force: "Perícia Criminal",
          abstract: "Aplicação da tecnologia blockchain para garantir integridade na cadeia de custódia."
        },
        {
          id: 18,
          title: "Sensores IoT em Segurança Urbana",
          author: "Eng. João IoT",
          category: "Tecnologia Policial",
          downloads: 1234,
          rating: 4.6,
          publishedDate: "2024-12-23",
          views: 2123,
          institution: "Centro de Tecnologia",
          force: "Guarda Municipal",
          abstract: "Implementação de sensores IoT para monitoramento inteligente de espaços urbanos."
        },
        {
          id: 19,
          title: "Realidade Virtual no Treinamento Policial",
          author: "Instrutor VR Roberto",
          category: "Tecnologia Policial",
          downloads: 1567,
          rating: 4.8,
          publishedDate: "2024-12-21",
          views: 2678,
          institution: "Academia de Polícia",
          force: "Polícia Civil",
          abstract: "Uso de realidade virtual para simulação de cenários de treinamento policial."
        },
        {
          id: 20,
          title: "Criptografia em Comunicações Policiais",
          author: "Especialista Crypto Ana",
          category: "Tecnologia Policial",
          downloads: 2098,
          rating: 4.9,
          publishedDate: "2024-12-19",
          views: 3234,
          institution: "Centro de Cibersegurança",
          force: "Polícia Federal",
          abstract: "Implementação de sistemas criptográficos seguros para comunicações policiais."
        }
      ]
      // Adicionar mais categorias conforme necessário
    };

    return baseWorks[categoryName] || [];
  };

  const allWorks = generateWorksForCategory(category);
  
  const filteredWorks = allWorks.filter(work =>
    work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    work.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    work.institution.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredWorks.length / worksPerPage);
  const startIndex = (currentPage - 1) * worksPerPage;
  const endIndex = startIndex + worksPerPage;
  const currentWorks = filteredWorks.slice(startIndex, endIndex);

  const handleDownload = (workId: number, title: string) => {
    console.log(`Baixando trabalho ${workId}: ${title}`);
  };

  const getCategoryIcon = (categoryName: string) => {
    const icons: { [key: string]: string } = {
      "Investigação Criminal": "🔍",
      "Tecnologia Policial": "💻",
      "Policiamento Comunitário": "👥",
      "Perícia Criminal": "🔬",
      "Gestão Policial": "📊",
      "Segurança Rodoviária": "🛣️",
      "Sistema Penitenciário": "🏢",
      "Segurança Portuária": "⚓"
    };
    return icons[categoryName] || "📚";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => onNavigate?.('dashboard')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao Dashboard
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{getCategoryIcon(category)}</span>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-govbr-blue-warm-dark">
              {category}
            </h1>
            <p className="text-gray-600">
              {filteredWorks.length} {filteredWorks.length === 1 ? 'trabalho encontrado' : 'trabalhos encontrados'}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={`Buscar em ${category}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtros Avançados
        </Button>
      </div>

      {/* Works List */}
      <div className="space-y-4">
        {currentWorks.map((work) => (
          <Card key={work.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-govbr-blue-warm-dark hover:text-govbr-blue-warm-vivid cursor-pointer">
                      {work.title}
                    </h3>
                    <Badge variant="outline">{work.force}</Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-3 text-sm">{work.abstract}</p>
                  
                  <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span><strong>Autor:</strong> {work.author}</span>
                    </div>
                    <span className="hidden lg:inline">•</span>
                    <span><strong>Instituição:</strong> {work.institution}</span>
                    <span className="hidden lg:inline">•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(work.publishedDate).toLocaleDateString('pt-BR')}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {work.views} visualizações
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {work.downloads} downloads
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {work.rating}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col gap-2 lg:ml-4 w-full lg:w-auto">
                  <Button size="sm" className="govbr-btn-primary flex-1 lg:flex-none">
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 lg:flex-none"
                    onClick={() => handleDownload(work.id, work.title)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Empty State */}
      {filteredWorks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-4xl mb-4">{getCategoryIcon(category)}</div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {searchQuery ? 'Nenhum resultado encontrado' : 'Categoria em desenvolvimento'}
            </h3>
            <p className="text-gray-500">
              {searchQuery 
                ? 'Tente usar termos diferentes na busca' 
                : 'Novos trabalhos desta categoria serão adicionados em breve'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CategoryView;
