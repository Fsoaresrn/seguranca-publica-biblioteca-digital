
import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Users, Download, Eye, Star, Heart, Calendar, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CollectionExplorerProps {
  collectionId: number;
  onNavigate: (section: string) => void;
}

const CollectionExplorer: React.FC<CollectionExplorerProps> = ({ collectionId, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [favorites, setFavorites] = useState<number[]>([2, 5]);

  const collections = {
    1: {
      title: 'Técnicas Avançadas de Investigação Digital',
      description: 'Coleção especializada em crimes cibernéticos e análise forense digital',
      category: 'Investigação Criminal',
      totalWorks: 24,
      contributors: 8,
      works: [
        {
          id: 1,
          title: 'Análise de Malware em Dispositivos Móveis',
          author: 'Dr. Carlos Mendes',
          institution: 'Polícia Federal',
          abstract: 'Técnicas avançadas para análise de malware em smartphones e tablets.',
          downloads: 234,
          views: 567,
          rating: 4.8,
          date: '2025-01-20',
          tags: ['Malware', 'Dispositivos Móveis', 'Perícia Digital']
        },
        {
          id: 2,
          title: 'Recuperação de Dados em Discos Rígidos Danificados',
          author: 'Perita Ana Santos',
          institution: 'Instituto de Criminalística - PCSP',
          abstract: 'Metodologias para recuperação de evidências digitais em dispositivos danificados.',
          downloads: 189,
          views: 423,
          rating: 4.6,
          date: '2025-01-18',
          tags: ['Recuperação de Dados', 'Perícia Digital', 'Hardware']
        },
        {
          id: 3,
          title: 'Criptografia e Quebra de Senhas',
          author: 'Perito Roberto Silva',
          institution: 'Polícia Civil - RJ',
          abstract: 'Técnicas de criptografia e métodos para quebra de senhas em investigações.',
          downloads: 156,
          views: 298,
          rating: 4.9,
          date: '2025-01-15',
          tags: ['Criptografia', 'Senhas', 'Segurança Digital']
        }
      ]
    },
    2: {
      title: 'Policiamento Comunitário e Proximidade',
      description: 'Estratégias e práticas para fortalecimento da relação polícia-comunidade',
      category: 'Policiamento Comunitário',
      totalWorks: 18,
      contributors: 12,
      works: [
        {
          id: 4,
          title: 'Estratégias de Aproximação Comunitária',
          author: 'Cap. Patricia Costa',
          institution: 'PMERJ',
          abstract: 'Metodologias para estreitar laços entre polícia e comunidade.',
          downloads: 298,
          views: 645,
          rating: 4.7,
          date: '2025-01-12',
          tags: ['Comunidade', 'Policiamento', 'Relacionamento']
        },
        {
          id: 5,
          title: 'Mediação de Conflitos Urbanos',
          author: 'Sgt. João Alves',
          institution: 'Polícia Civil - MG',
          abstract: 'Técnicas de mediação aplicadas em contextos urbanos vulneráveis.',
          downloads: 145,
          views: 267,
          rating: 4.5,
          date: '2025-01-10',
          tags: ['Mediação', 'Conflitos', 'Área Urbana']
        }
      ]
    },
    3: {
      title: 'Inteligência em Segurança Pública',
      description: 'Metodologias e ferramentas para análise de inteligência criminal',
      category: 'Inteligência Policial',
      totalWorks: 15,
      contributors: 6,
      works: [
        {
          id: 6,
          title: 'Análise de Redes Criminosas',
          author: 'Del. Fernando Oliveira',
          institution: 'PCDF',
          abstract: 'Metodologias para mapeamento e análise de organizações criminosas.',
          downloads: 312,
          views: 789,
          rating: 4.8,
          date: '2025-01-08',
          tags: ['Redes Criminosas', 'Mapeamento', 'Análise']
        },
        {
          id: 7,
          title: 'Inteligência Artificial na Prevenção Criminal',
          author: 'Dra. Maria Santos',
          institution: 'Academia Nacional de Polícia',
          abstract: 'Aplicação de IA para predição e prevenção de crimes.',
          downloads: 267,
          views: 534,
          rating: 4.9,
          date: '2025-01-05',
          tags: ['IA', 'Prevenção', 'Predição Criminal']
        }
      ]
    }
  };

  const collection = collections[collectionId as keyof typeof collections];

  if (!collection) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => onNavigate('repository')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Repositório
          </Button>
        </div>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Coleção não encontrada</h2>
          <p className="text-gray-600">A coleção solicitada não existe ou foi removida.</p>
        </div>
      </div>
    );
  }

  const filteredWorks = collection.works.filter(work =>
    work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    work.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    work.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedWorks = [...filteredWorks].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return b.downloads - a.downloads;
      case 'views':
        return b.views - a.views;
      case 'title':
        return a.title.localeCompare(b.title);
      case 'recent':
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const handleFavorite = (workId: number) => {
    setFavorites(prev => 
      prev.includes(workId) 
        ? prev.filter(id => id !== workId)
        : [...prev, workId]
    );
  };

  const handleDownload = (workId: number, title: string) => {
    console.log(`Baixando trabalho ${workId}: ${title}`);
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => onNavigate('repository')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Repositório
        </Button>
      </div>

      {/* Collection Header */}
      <div className="bg-gradient-to-r from-govbr-blue-warm-vivid to-govbr-blue-warm-dark text-white p-6 rounded-lg">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Badge className="bg-white text-govbr-blue-warm-vivid mb-3">
              {collection.category}
            </Badge>
            <h1 className="text-2xl lg:text-3xl font-bold mb-3">{collection.title}</h1>
            <p className="text-govbr-blue-warm-20 text-lg mb-4">{collection.description}</p>
            
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{collection.totalWorks} trabalhos</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{collection.contributors} contribuidores</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Buscar trabalhos nesta coleção..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Mais Recentes</SelectItem>
                <SelectItem value="rating">Melhor Avaliados</SelectItem>
                <SelectItem value="downloads">Mais Baixados</SelectItem>
                <SelectItem value="views">Mais Visualizados</SelectItem>
                <SelectItem value="title">Ordem Alfabética</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          {sortedWorks.length} de {collection.totalWorks} trabalho{sortedWorks.length !== 1 ? 's' : ''} encontrado{sortedWorks.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Works Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedWorks.map((work) => (
          <Card key={work.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={14} />
                    {new Date(work.date).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="fill-yellow-400 text-yellow-400" size={16} />
                    <span className="text-sm font-medium">{work.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 hover:text-govbr-blue-warm-vivid cursor-pointer">
                  {work.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Autor:</strong> {work.author} • {work.institution}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {work.abstract}
                </p>
              </div>

              <div className="flex flex-wrap gap-1">
                {work.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Download size={14} />
                    {work.downloads}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    {work.views}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFavorite(work.id)}
                  >
                    <Heart 
                      size={14} 
                      className={`mr-1 ${favorites.includes(work.id) ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                    Favoritar
                  </Button>
                  <Button 
                    size="sm" 
                    className="govbr-btn-primary"
                    onClick={() => handleDownload(work.id, work.title)}
                  >
                    <Download size={14} className="mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedWorks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum trabalho encontrado</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Tente ajustar os termos de busca' : 'Esta coleção ainda não possui trabalhos'}
          </p>
        </div>
      )}

      {sortedWorks.length > 0 && sortedWorks.length < collection.totalWorks && (
        <div className="text-center">
          <Button variant="outline" size="lg">
            Carregar Mais Trabalhos
          </Button>
        </div>
      )}
    </div>
  );
};

export default CollectionExplorer;
