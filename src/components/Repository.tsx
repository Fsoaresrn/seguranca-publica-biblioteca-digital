
import React, { useState } from 'react';
import { Search, Filter, BookOpen, Users, Award, TrendingUp, Calendar, Download, Eye, Heart, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Repository = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todas as Coleções', count: 156 },
    { id: 'investigation', name: 'Investigação Criminal', count: 38 },
    { id: 'policing', name: 'Policiamento Comunitário', count: 45 },
    { id: 'technology', name: 'Tecnologia Policial', count: 22 },
    { id: 'intelligence', name: 'Inteligência Policial', count: 28 },
    { id: 'forensics', name: 'Perícia Criminal', count: 23 },
    { id: 'prevention', name: 'Prevenção Criminal', count: 18 }
  ];

  const featuredCollections = [
    {
      id: 1,
      title: 'Técnicas Avançadas de Investigação Digital',
      description: 'Coleção especializada em crimes cibernéticos e análise forense digital',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=400&h=200',
      category: 'Investigação Criminal',
      totalWorks: 24,
      contributors: 8,
      downloads: 1205,
      views: 3420,
      rating: 4.8,
      lastUpdate: '2025-01-15',
      tags: ['Crimes Cibernéticos', 'Forense Digital', 'Perícia']
    },
    {
      id: 2,
      title: 'Policiamento Comunitário e Proximidade',
      description: 'Estratégias e práticas para fortalecimento da relação polícia-comunidade',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400&h=200',
      category: 'Policiamento Comunitário',
      totalWorks: 18,
      contributors: 12,
      downloads: 890,
      views: 2150,
      rating: 4.6,
      lastUpdate: '2025-01-10',
      tags: ['Policiamento Comunitário', 'Prevenção', 'Cidadania']
    },
    {
      id: 3,
      title: 'Inteligência em Segurança Pública',
      description: 'Metodologias e ferramentas para análise de inteligência criminal',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=400&h=200',
      category: 'Inteligência Policial',
      totalWorks: 15,
      contributors: 6,
      downloads: 675,
      views: 1890,
      rating: 4.9,
      lastUpdate: '2025-01-08',
      tags: ['Análise Criminal', 'Mapeamento', 'Estatística']
    }
  ];

  const repositoryStats = [
    { label: 'Total de Coleções', value: '156', icon: BookOpen, color: 'text-govbr-blue-warm-vivid' },
    { label: 'Trabalhos Publicados', value: '2,847', icon: Award, color: 'text-govbr-green-cool-vivid' },
    { label: 'Colaboradores Ativos', value: '389', icon: Users, color: 'text-purple-600' },
    { label: 'Downloads Este Mês', value: '12,450', icon: TrendingUp, color: 'text-orange-600' }
  ];

  const recentWorks = [
    {
      id: 1,
      title: 'Análise Comportamental em Interrogatórios',
      author: 'Dr. Carlos Mendes',
      institution: 'Academia Nacional de Polícia',
      category: 'Investigação Criminal',
      abstract: 'Estudo sobre técnicas de análise comportamental aplicadas em interrogatórios policiais.',
      downloads: 234,
      views: 567,
      date: '2025-01-20',
      tags: ['Psicologia', 'Interrogatório', 'Comportamento']
    },
    {
      id: 2,
      title: 'Tecnologias de Reconhecimento Facial na Segurança Pública',
      author: 'Perita Ana Santos',
      institution: 'Instituto de Criminalística - PCSP',
      category: 'Tecnologia Policial',
      abstract: 'Análise das tecnologias de reconhecimento facial e sua aplicação na segurança pública.',
      downloads: 189,
      views: 423,
      date: '2025-01-18',
      tags: ['Reconhecimento Facial', 'IA', 'Tecnologia']
    },
    {
      id: 3,
      title: 'Mediação de Conflitos em Áreas Urbanas Vulneráveis',
      author: 'Maj. Roberto Silva',
      institution: 'PMERJ',
      category: 'Policiamento Comunitário',
      abstract: 'Estratégias de mediação de conflitos em comunidades urbanas de alta vulnerabilidade social.',
      downloads: 156,
      views: 298,
      date: '2025-01-15',
      tags: ['Mediação', 'Conflitos', 'Comunidade']
    },
    {
      id: 4,
      title: 'Inteligência Artificial na Análise Criminal',
      author: 'Del. Patricia Costa',
      institution: 'PCDF',
      category: 'Inteligência Policial',
      abstract: 'Aplicação de algoritmos de machine learning para análise de padrões criminais.',
      downloads: 298,
      views: 645,
      date: '2025-01-12',
      tags: ['IA', 'Machine Learning', 'Análise Criminal']
    },
    {
      id: 5,
      title: 'Perícia em Crimes Ambientais',
      author: 'Perito João Alves',
      institution: 'Polícia Civil - MG',
      category: 'Perícia Criminal',
      abstract: 'Metodologias periciais aplicadas na investigação de crimes contra o meio ambiente.',
      downloads: 145,
      views: 267,
      date: '2025-01-10',
      tags: ['Meio Ambiente', 'Perícia', 'Crimes Ambientais']
    }
  ];

  const getFilteredWorks = () => {
    if (selectedCategory === 'all') {
      return recentWorks;
    }
    
    const categoryMap: { [key: string]: string } = {
      'investigation': 'Investigação Criminal',
      'policing': 'Policiamento Comunitário',
      'technology': 'Tecnologia Policial',
      'intelligence': 'Inteligência Policial',
      'forensics': 'Perícia Criminal',
      'prevention': 'Prevenção Criminal'
    };
    
    return recentWorks.filter(work => work.category === categoryMap[selectedCategory]);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="govbr-heading-1">Repositório BNSP</h1>
        <p className="govbr-body text-lg max-w-3xl mx-auto">
          Explore coleções temáticas especializadas e repositórios de conhecimento 
          organizados por área de atuação em segurança pública.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {repositoryStats.map((stat, index) => (
          <Card key={index} className="govbr-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-govbr-blue-warm-dark">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter Section */}
      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3 flex items-center gap-2">
            <Search size={24} />
            Explorar Repositório
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por título, autor, palavras-chave..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="govbr-input pl-10 w-full"
                />
              </div>
            </div>
            <Button className="govbr-btn-primary flex items-center gap-2">
              <Filter size={20} />
              Filtros Avançados
            </Button>
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-700">Filtrar por Categoria</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="text-sm"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Collections */}
      <div className="space-y-6">
        <h2 className="govbr-heading-2">Coleções em Destaque</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {featuredCollections.map((collection) => (
            <Card key={collection.id} className="govbr-card hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-3 right-3 bg-govbr-blue-warm-vivid text-white">
                  {collection.category}
                </Badge>
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="govbr-heading-3 text-xl mb-2">{collection.title}</h3>
                  <p className="govbr-body text-sm text-gray-600 line-clamp-2">
                    {collection.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {collection.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <BookOpen size={16} />
                    {collection.totalWorks} trabalhos
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    {collection.contributors} autores
                  </div>
                  <div className="flex items-center gap-1">
                    <Download size={16} />
                    {collection.downloads} downloads
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={16} />
                    {collection.views} visualizações
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="fill-yellow-400 text-yellow-400" size={16} />
                    <span className="text-sm font-medium">{collection.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar size={14} />
                    Atualizado em {new Date(collection.lastUpdate).toLocaleDateString('pt-BR')}
                  </div>
                </div>

                <Button className="w-full govbr-btn-primary">
                  Explorar Coleção
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Works Section */}
      <div className="space-y-6">
        <h2 className="govbr-heading-2">
          {selectedCategory === 'all' ? 'Trabalhos Recentes' : `Trabalhos Recentes - ${categories.find(c => c.id === selectedCategory)?.name}`}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {getFilteredWorks().map((work) => (
            <Card key={work.id} className="govbr-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {work.category}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={14} />
                      {new Date(work.date).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  <h3 className="govbr-heading-3 text-lg mb-2 hover:text-govbr-blue-warm-vivid cursor-pointer">
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
                    <Button variant="outline" size="sm">
                      <Heart size={14} className="mr-1" />
                      Favoritar
                    </Button>
                    <Button size="sm" className="govbr-btn-primary">
                      <Download size={14} className="mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {getFilteredWorks().length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum trabalho encontrado para esta categoria.</p>
          </div>
        )}
        
        {getFilteredWorks().length > 0 && (
          <div className="text-center">
            <Button variant="outline" size="lg">
              Carregar Mais Trabalhos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Repository;
