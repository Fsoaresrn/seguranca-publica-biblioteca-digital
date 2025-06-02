
import React, { useState } from 'react';
import { Book, Download, Star, Calendar, User, Building, Award, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Work {
  id: number;
  title: string;
  author: string;
  institution: string;
  category: string;
  type: string;
  votes: number;
  downloads: number;
  publishDate: string;
  description: string;
}

const Yearbook: React.FC = () => {
  const { toast } = useToast();
  const [selectedYear, setSelectedYear] = useState('2024');
  const [viewMode, setViewMode] = useState<'grid' | 'magazine'>('grid');

  const topWorks: Work[] = [
    {
      id: 1,
      title: 'Inteligência Artificial na Investigação Criminal: Novas Perspectivas',
      author: 'Dr. Pedro Henrique Silva',
      institution: 'Academia Nacional de Polícia',
      category: 'Tecnologia em Segurança',
      type: 'Livro',
      votes: 847,
      downloads: 2341,
      publishDate: '2024-03-15',
      description: 'Análise abrangente sobre o uso de IA em investigações policiais modernas.'
    },
    {
      id: 2,
      title: 'Policiamento Comunitário: Estratégias Eficazes',
      author: 'Dra. Maria Santos Oliveira',
      institution: 'Academia de Polícia Civil - SP',
      category: 'Policiamento Comunitário',
      type: 'Ebook',
      votes: 723,
      downloads: 1876,
      publishDate: '2024-02-22',
      description: 'Guia prático para implementação de políticas de policiamento comunitário.'
    },
    {
      id: 3,
      title: 'Revista de Segurança Pública - Edição Especial',
      author: 'Conselho Editorial SENASP',
      institution: 'Secretaria Nacional de Segurança Pública',
      category: 'Segurança Pública',
      type: 'Revista',
      votes: 692,
      downloads: 3124,
      publishDate: '2024-01-10',
      description: 'Compilação dos melhores artigos sobre segurança pública do ano.'
    },
    {
      id: 4,
      title: 'Gestão de Crises em Segurança Pública',
      author: 'Cel. João Carlos Mendes',
      institution: 'Academia de Polícia Militar - RJ',
      category: 'Gestão Policial',
      type: 'Monografia',
      votes: 654,
      downloads: 1432,
      publishDate: '2024-04-08',
      description: 'Metodologias para gestão eficaz de crises em operações policiais.'
    },
    {
      id: 5,
      title: 'Direitos Humanos e Ação Policial: Um Equilíbrio Necessário',
      author: 'Dra. Ana Beatriz Costa',
      institution: 'Instituto Superior de Ciências Policiais',
      category: 'Direitos Humanos',
      type: 'Dissertação',
      votes: 612,
      downloads: 1287,
      publishDate: '2024-05-12',
      description: 'Estudo sobre a conciliação entre eficiência policial e respeito aos direitos humanos.'
    },
    {
      id: 6,
      title: 'Manual de Prevenção da Violência Urbana',
      author: 'Equipe de Pesquisa BNSP',
      institution: 'Biblioteca Nacional de Segurança Pública',
      category: 'Prevenção da Violência',
      type: 'Livro',
      votes: 589,
      downloads: 2156,
      publishDate: '2024-06-03',
      description: 'Compêndio de estratégias comprovadas para prevenção da violência urbana.'
    }
  ];

  const handleDownloadYearbook = () => {
    console.log(`📥 Baixando Anuário ${selectedYear} em PDF`);
    toast({
      title: 'Download iniciado',
      description: `O Anuário ${selectedYear} está sendo preparado para download.`
    });
  };

  const handleViewWork = (workId: number) => {
    console.log(`👁️ Visualizando trabalho ID: ${workId}`);
    toast({
      title: 'Visualizando trabalho',
      description: 'Redirecionando para visualização completa do trabalho.'
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Livro': return 'bg-blue-100 text-blue-800';
      case 'Ebook': return 'bg-green-100 text-green-800';
      case 'Revista': return 'bg-purple-100 text-purple-800';
      case 'Artigo Científico': return 'bg-orange-100 text-orange-800';
      case 'Dissertação': return 'bg-red-100 text-red-800';
      case 'Monografia': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="govbr-heading-1 flex items-center">
            <Book className="h-8 w-8 mr-3 text-govbr-blue-warm-vivid" />
            Anuário BNSP
          </h1>
          <p className="text-gray-600 mt-2">
            Os 30 trabalhos mais votados do ano na Biblioteca Nacional de Segurança Pública
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleDownloadYearbook} className="govbr-btn-primary">
            <Download className="h-4 w-4 mr-2" />
            Baixar Anuário PDF
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Trabalhos</p>
                <p className="text-2xl font-bold text-govbr-blue-warm-dark">30</p>
              </div>
              <Book className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Votos</p>
                <p className="text-2xl font-bold text-govbr-blue-warm-dark">18.547</p>
              </div>
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Downloads</p>
                <p className="text-2xl font-bold text-govbr-blue-warm-dark">45.789</p>
              </div>
              <Download className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Instituições</p>
                <p className="text-2xl font-bold text-govbr-blue-warm-dark">23</p>
              </div>
              <Building className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Mode Toggle */}
      <div className="flex justify-center gap-2">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'outline'}
          onClick={() => setViewMode('grid')}
          size="sm"
        >
          Visualização em Lista
        </Button>
        <Button
          variant={viewMode === 'magazine' ? 'default' : 'outline'}
          onClick={() => setViewMode('magazine')}
          size="sm"
        >
          Visualização de Revista
        </Button>
      </div>

      {/* Works List */}
      {viewMode === 'grid' ? (
        <div className="space-y-4">
          {topWorks.map((work, index) => (
            <Card key={work.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-govbr-blue-warm-vivid text-white rounded-full font-bold text-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-govbr-blue-warm-dark">{work.title}</h3>
                        <Badge className={getTypeColor(work.type)}>
                          {work.type}
                        </Badge>
                        <Award className="h-4 w-4 text-yellow-500" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span>Autor: {work.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-1" />
                          <span>{work.institution}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Publicado em: {new Date(work.publishDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center">
                          <Badge variant="outline">{work.category}</Badge>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{work.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center text-yellow-600">
                          <Star className="h-4 w-4 mr-1" />
                          <span>{work.votes} votos</span>
                        </div>
                        <div className="flex items-center text-green-600">
                          <Download className="h-4 w-4 mr-1" />
                          <span>{work.downloads} downloads</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleViewWork(work.id)}
                    className="govbr-btn-primary"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Magazine View */
        <div className="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-govbr-blue-warm-dark mb-2">
              ANUÁRIO BNSP {selectedYear}
            </h2>
            <p className="text-lg text-gray-600">
              Os Trabalhos Mais Votados da Biblioteca Nacional de Segurança Pública
            </p>
            <div className="w-24 h-1 bg-govbr-blue-warm-vivid mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {topWorks.slice(0, 10).map((work, index) => (
              <div key={work.id} className="border-b border-gray-200 pb-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-govbr-blue-warm-vivid text-white rounded-full font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-govbr-blue-warm-dark mb-1">{work.title}</h4>
                    <p className="text-sm text-gray-600 mb-1">{work.author}</p>
                    <p className="text-xs text-gray-500">{work.institution}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge size="sm" className={getTypeColor(work.type)}>{work.type}</Badge>
                      <span className="text-xs text-yellow-600 flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        {work.votes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              © {selectedYear} Biblioteca Nacional de Segurança Pública - SENASP
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Yearbook;
