
import React, { useState } from 'react';
import { Heart, Download, Eye, Calendar, User, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Favorites: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const favoriteWorks = [
    {
      id: 1,
      title: 'Inteligência Artificial na Investigação Criminal Moderna',
      author: 'Dr. Carlos Mendes',
      institution: 'Academia Nacional de Polícia',
      category: 'Tecnologia Policial',
      type: 'Artigo Científico',
      year: '2024',
      downloads: 2456,
      views: 5670,
      favoriteDate: '2024-01-15',
      abstract: 'Estudo sobre a aplicação de IA em processos investigativos, incluindo reconhecimento facial, análise de padrões e predição de crimes.'
    },
    {
      id: 2,
      title: 'Mediação de Conflitos em Comunidades Vulneráveis: Abordagem Humanizada',
      author: 'Dra. Ana Paula Santos',
      institution: 'PMERJ',
      category: 'Policiamento Comunitário',
      type: 'Dissertação',
      year: '2023',
      downloads: 1834,
      views: 3421,
      favoriteDate: '2024-01-10',
      abstract: 'Análise das técnicas de mediação aplicadas em comunidades de alta vulnerabilidade social, focando na construção de confiança.'
    },
    {
      id: 3,
      title: 'Crimes Cibernéticos: Metodologias Avançadas de Investigação Digital',
      author: 'Ten. Cel. Roberto Lima',
      institution: 'PCSP',
      category: 'Investigação Criminal',
      type: 'Monografia',
      year: '2023',
      downloads: 3102,
      views: 4567,
      favoriteDate: '2024-01-08',
      abstract: 'Metodologias e ferramentas para investigação de crimes digitais, incluindo análise forense e rastreamento de evidências.'
    },
    {
      id: 4,
      title: 'Gestão de Crises em Operações de Segurança Pública',
      author: 'Maj. Fernanda Costa',
      institution: 'Bombeiros Militares',
      category: 'Gestão de Operações',
      type: 'TCC',
      year: '2023',
      downloads: 987,
      views: 1876,
      favoriteDate: '2024-01-05',
      abstract: 'Estratégias para gerenciamento de crises durante operações de segurança, incluindo protocolos e tomada de decisão.'
    },
    {
      id: 5,
      title: 'Direitos Humanos e Abordagem Policial: Boas Práticas',
      author: 'Del. Marcos Oliveira',
      institution: 'Polícia Civil',
      category: 'Direitos Humanos',
      type: 'Artigo Científico',
      year: '2024',
      downloads: 1456,
      views: 2834,
      favoriteDate: '2024-01-03',
      abstract: 'Estudo sobre a aplicação dos direitos humanos em abordagens policiais, promovendo práticas mais humanizadas.'
    }
  ];

  const filteredWorks = favoriteWorks.filter(work => {
    const matchesSearch = work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         work.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || work.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    'Tecnologia Policial',
    'Policiamento Comunitário',
    'Investigação Criminal',
    'Gestão de Operações',
    'Direitos Humanos'
  ];

  const removeFavorite = (workId: number) => {
    console.log('Removendo favorito:', workId);
    // Aqui seria feita a remoção do favorito
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="govbr-heading-1 flex items-center">
            <Heart className="h-8 w-8 mr-3 text-red-500" />
            Meus Favoritos
          </h1>
          <p className="text-gray-600 mt-2">
            Trabalhos marcados como favoritos para consulta rápida
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-govbr-blue-warm-vivid">{filteredWorks.length}</div>
          <div className="text-sm text-gray-600">trabalhos salvos</div>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por título ou autor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Favorites List */}
      {filteredWorks.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Nenhum favorito encontrado
            </h3>
            <p className="text-gray-500">
              {searchTerm || categoryFilter !== 'all' 
                ? 'Tente ajustar os filtros de busca'
                : 'Marque trabalhos como favoritos para vê-los aqui'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredWorks.map((work) => (
            <Card key={work.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {work.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {work.type}
                      </Badge>
                      <span className="text-xs text-gray-500">{work.year}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-govbr-blue-warm-dark hover:text-govbr-blue-warm-vivid cursor-pointer mb-2">
                      {work.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {work.abstract}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {work.author}
                      </span>
                      <span>•</span>
                      <span>{work.institution}</span>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        {work.downloads} downloads
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {work.views} visualizações
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Favoritado em {new Date(work.favoriteDate).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-6">
                    <Button size="sm" className="govbr-btn-primary">
                      <Eye className="h-4 w-4 mr-1" />
                      Visualizar
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeFavorite(work.id)}
                    >
                      <Heart className="h-4 w-4 mr-1 fill-current" />
                      Remover
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
