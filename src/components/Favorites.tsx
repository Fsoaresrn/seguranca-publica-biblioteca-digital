import React, { useState } from 'react';
import { Heart, Download, Eye, Star, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FavoritesProps {
  userRole?: 'servidor' | 'moderador' | 'administrador';
  userName?: string;
  onNavigate?: (section: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ userRole, userName, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterCategory, setFilterCategory] = useState('all');

  const [favoriteWorks] = useState([
    {
      id: 1,
      title: 'Tecnologia Policial e Direitos Humanos',
      author: 'Dr. Carlos Silva',
      category: 'Tecnologia Policial',
      type: 'Dissertação',
      year: 2024,
      rating: 4.8,
      downloads: 342,
      views: 1250,
      favoritedAt: '2024-12-15',
      abstract: 'Análise sobre o uso de tecnologias emergentes nas operações policiais...'
    },
    {
      id: 2,
      title: 'Políticas de Segurança Comunitária',
      author: 'Dra. Ana Santos',
      category: 'Políticas Públicas',
      type: 'Artigo',
      year: 2024,
      rating: 4.6,
      downloads: 278,
      views: 890,
      favoritedAt: '2024-12-10',
      abstract: 'Estudo sobre implementação de políticas de segurança comunitária...'
    },
    {
      id: 3,
      title: 'Análise Criminal Forense Digital',
      author: 'Prof. Roberto Lima',
      category: 'Perícia Criminal',
      type: 'TCC',
      year: 2024,
      rating: 4.9,
      downloads: 456,
      views: 1580,
      favoritedAt: '2024-12-05',
      abstract: 'Técnicas avançadas de análise forense em crimes digitais...'
    },
    {
      id: 4,
      title: 'Gestão de Crises em Segurança Pública',
      author: 'Maj. Patricia Costa',
      category: 'Gestão',
      type: 'Monografia',
      year: 2023,
      rating: 4.7,
      downloads: 389,
      views: 1120,
      favoritedAt: '2024-11-28',
      abstract: 'Protocolos e estratégias para gestão de crises em operações policiais...'
    },
    {
      id: 5,
      title: 'Inteligência Artificial na Investigação Criminal',
      author: 'Dr. Fernando Oliveira',
      category: 'Tecnologia Policial',
      type: 'Artigo',
      year: 2024,
      rating: 4.8,
      downloads: 512,
      views: 1890,
      favoritedAt: '2024-11-20',
      abstract: 'Aplicação de IA para otimização de processos investigativos...'
    }
  ]);

  const filteredWorks = favoriteWorks.filter(work => {
    const matchesSearch = work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         work.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || work.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedWorks = [...filteredWorks].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return b.downloads - a.downloads;
      case 'title':
        return a.title.localeCompare(b.title);
      case 'recent':
      default:
        return new Date(b.favoritedAt).getTime() - new Date(a.favoritedAt).getTime();
    }
  });

  const handleRemoveFavorite = (workId: number) => {
    console.log('Removendo dos favoritos:', workId);
  };

  const handleDownload = (workId: number, title: string) => {
    console.log('Fazendo download de:', title);
    
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-govbr-blue-warm-dark mb-2">Meus Favoritos</h1>
        <p className="text-gray-600">
          Trabalhos acadêmicos que você marcou como favoritos para consulta rápida
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg border border-govbr-gray-20">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar nos favoritos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full md:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Categorias</SelectItem>
            <SelectItem value="Tecnologia Policial">Tecnologia Policial</SelectItem>
            <SelectItem value="Políticas Públicas">Políticas Públicas</SelectItem>
            <SelectItem value="Perícia Criminal">Perícia Criminal</SelectItem>
            <SelectItem value="Gestão">Gestão</SelectItem>
            <SelectItem value="Direitos Humanos">Direitos Humanos</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Mais Recentes</SelectItem>
            <SelectItem value="rating">Melhor Avaliados</SelectItem>
            <SelectItem value="downloads">Mais Baixados</SelectItem>
            <SelectItem value="title">Ordem Alfabética</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          {sortedWorks.length} trabalho{sortedWorks.length !== 1 ? 's' : ''} favorito{sortedWorks.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Favorite Works Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedWorks.map((work) => (
          <Card key={work.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2 line-clamp-2">{work.title}</CardTitle>
                  <p className="text-sm text-gray-600 mb-2">Por {work.author}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary">{work.category}</Badge>
                    <Badge variant="outline">{work.type}</Badge>
                    <Badge variant="outline">{work.year}</Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFavorite(work.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Heart className="h-4 w-4 fill-current" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                {work.abstract}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{work.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    <span>{work.downloads}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{work.views}</span>
                  </div>
                </div>
                <span className="text-xs">
                  Favoritado em {new Date(work.favoritedAt).toLocaleDateString('pt-BR')}
                </span>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleDownload(work.id, work.title)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  size="sm"
                  className="govbr-btn-primary flex-1"
                >
                  Visualizar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedWorks.length === 0 && (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum favorito encontrado</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || filterCategory !== 'all' 
              ? 'Tente ajustar os filtros de busca'
              : 'Você ainda não favoritou nenhum trabalho'}
          </p>
          {!searchTerm && filterCategory === 'all' && (
            <Button 
              className="govbr-btn-primary"
              onClick={() => onNavigate?.('repository')}
            >
              Explorar Trabalhos
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;
