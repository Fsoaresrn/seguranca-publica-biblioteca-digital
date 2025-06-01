
import React from 'react';
import { BookOpen, Search, TrendingUp, Users, Award, Calendar, Download, Eye, Heart, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface LibraryHomeProps {
  onContribute?: () => void;
  onNavigate?: (section: string) => void;
}

const LibraryHome: React.FC<LibraryHomeProps> = ({ onContribute, onNavigate }) => {
  const stats = [
    { label: 'Trabalhos Publicados', value: '2.847', icon: BookOpen, color: 'text-govbr-blue-warm-vivid' },
    { label: 'Autores Ativos', value: '1.239', icon: Users, color: 'text-govbr-green-cool-vivid' },
    { label: 'Downloads Este Mês', value: '15.620', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Instituições Parceiras', value: '187', icon: Award, color: 'text-orange-600' }
  ];

  const categories = [
    {
      id: 'investigation',
      name: 'Investigação Criminal',
      description: 'Técnicas, metodologias e tecnologias aplicadas à investigação',
      count: 234,
      recent: 15,
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400&h=200'
    },
    {
      id: 'policing',
      name: 'Policiamento Comunitário',
      description: 'Estratégias de aproximação e relacionamento com a comunidade',
      count: 189,
      recent: 12,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400&h=200'
    },
    {
      id: 'technology',
      name: 'Tecnologia Policial',
      description: 'Inovações tecnológicas aplicadas à segurança pública',
      count: 156,
      recent: 8,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=400&h=200'
    },
    {
      id: 'intelligence',
      name: 'Inteligência Policial',
      description: 'Análise criminal, mapeamento e inteligência estratégica',
      count: 145,
      recent: 10,
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=400&h=200'
    },
    {
      id: 'forensics',
      name: 'Perícia Criminal',
      description: 'Métodos periciais e ciências forenses',
      count: 123,
      recent: 7,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&q=80&w=400&h=200'
    },
    {
      id: 'prevention',
      name: 'Prevenção Criminal',
      description: 'Estratégias preventivas e redução da criminalidade',
      count: 98,
      recent: 9,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400&h=200'
    }
  ];

  const featuredWorks = [
    {
      id: 1,
      title: 'Inteligência Artificial na Investigação Criminal',
      author: 'Dr. Carlos Eduardo Silva',
      institution: 'Academia Nacional de Polícia',
      category: 'Tecnologia Policial',
      downloads: 1205,
      views: 3420,
      rating: 4.8,
      date: '2025-01-15',
      isFavorited: false
    },
    {
      id: 2,
      title: 'Policiamento Comunitário: Estratégias Eficazes',
      author: 'Maj. Ana Santos',
      institution: 'PMERJ',
      category: 'Policiamento Comunitário',
      downloads: 890,
      views: 2150,
      rating: 4.6,
      date: '2025-01-10',
      isFavorited: true
    },
    {
      id: 3,
      title: 'Análise Balística Forense Avançada',
      author: 'Perito João Oliveira',
      institution: 'PCSP',
      category: 'Perícia Criminal',
      downloads: 675,
      views: 1890,
      rating: 4.9,
      date: '2025-01-08',
      isFavorited: false
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    if (onNavigate) {
      onNavigate('repository');
      // Simular filtro por categoria
      setTimeout(() => {
        const categoryElement = document.querySelector(`[data-category="${categoryId}"]`);
        if (categoryElement) {
          categoryElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleFavorite = (workId: number) => {
    console.log(`Favoritando trabalho ${workId}`);
    // Aqui seria implementada a lógica real de favoritar
  };

  const handleDownload = (workId: number, title: string) => {
    console.log(`Baixando trabalho ${workId}: ${title}`);
    // Simular download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-govbr-gray-5">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-govbr-blue-warm-dark to-govbr-blue-warm-vivid text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6">
              Biblioteca Nacional da<br />Segurança Pública
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
              Plataforma oficial da Secretaria Nacional de Segurança Pública - Senasp/MJSP para 
              compartilhamento de conhecimento acadêmico entre servidores de segurança pública.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-govbr-blue-warm-vivid hover:bg-gray-100 text-lg px-8 py-3"
                onClick={() => onNavigate && onNavigate('repository')}
              >
                Explorar Acervo
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-govbr-blue-warm-vivid text-lg px-8 py-3"
                onClick={onContribute}
              >
                Contribuir com Trabalho
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-4 lg:p-6">
                  <div className={`inline-flex items-center justify-center p-3 rounded-full bg-gray-50 mb-4 ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-govbr-blue-warm-dark mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm lg:text-base text-gray-600">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-govbr-blue-warm-dark mb-4">
              Busque Conhecimento Especializado
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore nossa vasta coleção de trabalhos acadêmicos, pesquisas e estudos 
              em segurança pública
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              <Input
                placeholder="Buscar por título, autor, palavras-chave..."
                className="pl-12 h-14 text-lg rounded-lg border-2 border-gray-200 focus:border-govbr-blue-warm-vivid"
              />
              <Button 
                className="absolute right-2 top-2 govbr-btn-primary h-10"
                onClick={() => onNavigate && onNavigate('search')}
              >
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-govbr-blue-warm-dark mb-4">
              Explore por Categoria
            </h2>
            <p className="text-lg text-gray-600">
              Navegue pelos diferentes temas em segurança pública
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((category) => (
              <Card 
                key={category.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-govbr-blue-warm-vivid text-white">
                      {category.count} trabalhos
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4 lg:p-6">
                  <h3 className="text-lg lg:text-xl font-semibold text-govbr-blue-warm-dark mb-2 group-hover:text-govbr-blue-warm-vivid">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm lg:text-base mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{category.recent} novos este mês</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-govbr-blue-warm-dark mb-4">
              Trabalhos em Destaque
            </h2>
            <p className="text-lg text-gray-600">
              Conheça os trabalhos mais relevantes da nossa biblioteca
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredWorks.map((work) => (
              <Card key={work.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {work.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="fill-yellow-400 text-yellow-400 h-4 w-4" />
                      <span className="text-sm font-medium">{work.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-govbr-blue-warm-dark mb-2 hover:text-govbr-blue-warm-vivid cursor-pointer">
                    {work.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>Autor:</strong> {work.author}<br />
                    <strong>Instituição:</strong> {work.institution}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {work.downloads}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {work.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(work.date).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleFavorite(work.id)}
                    >
                      <Heart className={`h-4 w-4 mr-1 ${work.isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                      Favoritar
                    </Button>
                    <Button 
                      size="sm" 
                      className="govbr-btn-primary flex-1"
                      onClick={() => handleDownload(work.id, work.title)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => onNavigate && onNavigate('repository')}
            >
              Ver Todos os Trabalhos
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LibraryHome;
