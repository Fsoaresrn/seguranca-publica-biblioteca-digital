
import React, { useState } from 'react';
import { TrendingUp, Eye, Download, Star, Heart, Calendar, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MostPopular: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [timePeriod, setTimePeriod] = useState('month');

  const popularWorks = [
    {
      id: 1,
      title: 'Inteligência Artificial na Investigação Criminal',
      author: 'Dr. Carlos Eduardo Silva',
      institution: 'Polícia Federal',
      category: 'Tecnologia Policial',
      type: 'Artigo Científico',
      views: 15420,
      downloads: 3250,
      rating: 4.9,
      publishDate: '2023-11-15',
      trend: '+25%',
      description: 'Análise completa das aplicações de IA em investigações criminais modernas'
    },
    {
      id: 2,
      title: 'Policiamento Comunitário: Estratégias de Implementação',
      author: 'Maj. Ana Maria Santos',
      institution: 'Polícia Militar - SP',
      category: 'Policiamento Comunitário',
      type: 'Dissertação',
      views: 12800,
      downloads: 2890,
      rating: 4.8,
      publishDate: '2023-10-22',
      trend: '+18%',
      description: 'Guia prático para implementação de estratégias de policiamento comunitário'
    },
    {
      id: 3,
      title: 'Perícia Digital em Crimes Cibernéticos',
      author: 'Perito João Oliveira',
      institution: 'Polícia Civil - RJ',
      category: 'Investigação Criminal',
      type: 'Monografia',
      views: 11250,
      downloads: 2650,
      rating: 4.7,
      publishDate: '2023-12-01',
      trend: '+32%',
      description: 'Técnicas avançadas de perícia digital aplicadas a crimes cibernéticos'
    },
    {
      id: 4,
      title: 'Gestão de Crises em Operações de Segurança',
      author: 'Cel. Roberto Costa',
      institution: 'Polícia Militar - RJ',
      category: 'Gestão Policial',
      type: 'Artigo Científico',
      views: 9840,
      downloads: 2100,
      rating: 4.6,
      publishDate: '2023-09-18',
      trend: '+12%',
      description: 'Metodologias para gestão eficaz de crises em operações policiais'
    },
    {
      id: 5,
      title: 'Direitos Humanos e Uso da Força Policial',
      author: 'Dra. Maria Helena Ferreira',
      institution: 'SENASP',
      category: 'Direitos Humanos',
      type: 'Dissertação',
      views: 8960,
      downloads: 1950,
      rating: 4.8,
      publishDate: '2023-11-30',
      trend: '+22%',
      description: 'Análise jurídica sobre o uso proporcional da força nas ações policiais'
    },
    {
      id: 6,
      title: 'Prevenção ao Crime Organizado',
      author: 'Delegado Paulo Mendes',
      institution: 'Polícia Civil - SP',
      category: 'Prevenção Criminal',
      type: 'Monografia',
      views: 7680,
      downloads: 1780,
      rating: 4.5,
      publishDate: '2023-10-05',
      trend: '+8%',
      description: 'Estratégias preventivas no combate ao crime organizado'
    }
  ];

  const categories = [
    'Tecnologia Policial',
    'Policiamento Comunitário',
    'Investigação Criminal',
    'Gestão Policial',
    'Direitos Humanos',
    'Prevenção Criminal'
  ];

  const filteredWorks = filterCategory === 'all' 
    ? popularWorks 
    : popularWorks.filter(work => work.category === filterCategory);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="govbr-heading-1 flex items-center">
            <TrendingUp className="h-8 w-8 mr-3 text-orange-600" />
            Mais Populares
          </h1>
          <p className="text-gray-600 mt-2">
            Os trabalhos mais acessados e baixados da plataforma
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          Top {filteredWorks.length}
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Select value={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Última semana</SelectItem>
            <SelectItem value="month">Último mês</SelectItem>
            <SelectItem value="quarter">Último trimestre</SelectItem>
            <SelectItem value="year">Último ano</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Todas as categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Mais filtros
        </Button>
      </div>

      {/* Popular Works List */}
      <div className="space-y-4">
        {filteredWorks.map((work, index) => (
          <Card key={work.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  {/* Ranking */}
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-orange-600' : 
                      'bg-govbr-blue-warm-vivid'
                    }`}>
                      {index + 1}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-govbr-blue-warm-dark">
                        {work.title}
                      </h3>
                      <Badge variant="outline">{work.type}</Badge>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {work.trend}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{work.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <p><strong>Autor:</strong> {work.author}</p>
                        <p><strong>Instituição:</strong> {work.institution}</p>
                      </div>
                      <div>
                        <p><strong>Categoria:</strong> {work.category}</p>
                        <p><strong>Publicado em:</strong> {new Date(work.publishDate).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {work.views.toLocaleString()} visualizações
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        {work.downloads.toLocaleString()} downloads
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {work.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        Tendência: {work.trend}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button size="sm" className="govbr-btn-primary">
                    <Eye className="h-4 w-4 mr-1" />
                    Visualizar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline">
                    <Heart className="h-4 w-4 mr-1" />
                    Favoritar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredWorks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Nenhum resultado encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros para ver os trabalhos mais populares
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MostPopular;
