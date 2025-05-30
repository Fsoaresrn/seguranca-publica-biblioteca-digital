
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
    { id: 'policing', name: 'Policiamento', count: 45 },
    { id: 'investigation', name: 'Investigação Criminal', count: 38 },
    { id: 'intelligence', name: 'Inteligência', count: 22 },
    { id: 'forensics', name: 'Perícia Criminal', count: 28 },
    { id: 'prevention', name: 'Prevenção', count: 23 }
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
      lastUpdate: '2024-01-15',
      tags: ['Crimes Cibernéticos', 'Forense Digital', 'Perícia']
    },
    {
      id: 2,
      title: 'Policiamento Comunitário e Proximidade',
      description: 'Estratégias e práticas para fortalecimento da relação polícia-comunidade',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400&h=200',
      category: 'Policiamento',
      totalWorks: 18,
      contributors: 12,
      downloads: 890,
      views: 2150,
      rating: 4.6,
      lastUpdate: '2024-01-10',
      tags: ['Policiamento Comunitário', 'Prevenção', 'Cidadania']
    },
    {
      id: 3,
      title: 'Inteligência em Segurança Pública',
      description: 'Metodologias e ferramentas para análise de inteligência criminal',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=400&h=200',
      category: 'Inteligência',
      totalWorks: 15,
      contributors: 6,
      downloads: 675,
      views: 1890,
      rating: 4.9,
      lastUpdate: '2024-01-08',
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
      title: 'Análise Comportamental em Interrogatórios',
      author: 'Dr. Carlos Mendes',
      category: 'Investigação Criminal',
      downloads: 234,
      date: '2024-01-20'
    },
    {
      title: 'Tecnologias de Reconhecimento Facial',
      author: 'Perita Ana Santos',
      category: 'Perícia Criminal',
      downloads: 189,
      date: '2024-01-18'
    },
    {
      title: 'Mediação de Conflitos Urbanos',
      author: 'Maj. Roberto Silva',
      category: 'Policiamento',
      downloads: 156,
      date: '2024-01-15'
    }
  ];

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
            <h4 className="font-semibold text-gray-700">Categorias</h4>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="govbr-card">
            <CardHeader>
              <CardTitle className="govbr-heading-3">Trabalhos Recentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentWorks.map((work, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-govbr-blue-warm-dark mb-1">
                      {work.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      por {work.author} • {work.category}
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center gap-1 mb-1">
                      <Download size={14} />
                      {work.downloads}
                    </div>
                    <div>{new Date(work.date).toLocaleDateString('pt-BR')}</div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Ver Todos os Trabalhos Recentes
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access Panel */}
        <div className="space-y-6">
          <Card className="govbr-card">
            <CardHeader>
              <CardTitle className="govbr-heading-3">Acesso Rápido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="mr-2" size={16} />
                Meus Favoritos
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Heart className="mr-2" size={16} />
                Lista de Desejos
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2" size={16} />
                Downloads Recentes
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="mr-2" size={16} />
                Mais Populares
              </Button>
            </CardContent>
          </Card>

          <Card className="govbr-card">
            <CardHeader>
              <CardTitle className="govbr-heading-3">Contribua</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="govbr-small">
                Compartilhe seu conhecimento e enriqueça o repositório da comunidade.
              </p>
              <Button className="w-full govbr-btn-secondary">
                Criar Nova Coleção
              </Button>
              <Button variant="outline" className="w-full">
                Submeter Trabalho
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Repository;
