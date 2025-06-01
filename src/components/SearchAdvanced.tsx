import React, { useState } from 'react';
import { Search, Filter, Calendar, User, BookOpen, FileText, Download, Star, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface SearchFilters {
  query: string;
  category: string;
  author: string;
  institution: string;
  yearFrom: string;
  yearTo: string;
  docType: string;
  forceType: string[];
  state: string;
}

interface SearchResult {
  id: number;
  title: string;
  author: string;
  institution: string;
  year: string;
  category: string;
  force: string;
  state: string;
  downloads: number;
  rating: number;
  abstract: string;
  keywords: string[];
  publishedDate: Date;
  views: number;
}

const SearchAdvanced: React.FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'all',
    author: '',
    institution: '',
    yearFrom: '',
    yearTo: '',
    docType: '',
    forceType: [],
    state: 'all'
  });

  const [sortBy, setSortBy] = useState('rating');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([
    {
      id: 1,
      title: 'Inteligência Artificial aplicada à Investigação Criminal',
      author: 'Dr. Roberto Silva',
      institution: 'Academia Nacional de Polícia',
      year: '2024',
      category: 'Tecnologia Policial',
      force: 'Polícia Federal',
      state: 'DF',
      downloads: 2341,
      rating: 4.8,
      abstract: 'Este trabalho apresenta uma análise abrangente sobre o uso de inteligência artificial em processos investigativos criminais, destacando ferramentas de análise de dados, reconhecimento facial e predição de crimes.',
      keywords: ['IA', 'Investigação', 'Tecnologia', 'Análise Criminal'],
      publishedDate: new Date('2024-01-15'),
      views: 3456
    },
    {
      id: 2,
      title: 'Policiamento Comunitário em Áreas de Vulnerabilidade Social',
      author: 'Cap. Maria Fernanda',
      institution: 'PMERJ',
      year: '2023',
      category: 'Policiamento Comunitário',
      force: 'Polícia Militar',
      state: 'RJ',
      downloads: 1876,
      rating: 4.6,
      abstract: 'Análise de estratégias de policiamento comunitário implementadas em comunidades vulneráveis do Rio de Janeiro, com foco na redução da violência e melhoria da relação polícia-comunidade.',
      keywords: ['Policiamento Comunitário', 'Vulnerabilidade Social', 'Prevenção'],
      publishedDate: new Date('2023-12-20'),
      views: 2789
    },
    {
      id: 3,
      title: 'Crimes Cibernéticos: Novas Abordagens Investigativas',
      author: 'Del. Ana Carolina',
      institution: 'PCSP',
      year: '2024',
      category: 'Investigação Criminal',
      force: 'Polícia Civil',
      state: 'SP',
      downloads: 3102,
      rating: 4.9,
      abstract: 'Metodologias inovadoras para investigação de crimes cibernéticos, incluindo análise forense digital, rastreamento de criptomoedas e cooperação internacional.',
      keywords: ['Crimes Cibernéticos', 'Forense Digital', 'Investigação'],
      publishedDate: new Date('2024-02-10'),
      views: 4123
    },
    {
      id: 4,
      title: 'Gestão de Trânsito Urbano: Tecnologias Emergentes',
      author: 'Agente Carlos Mendes',
      institution: 'Academia de Trânsito SP',
      year: '2024',
      category: 'Gestão de Trânsito',
      force: 'Agente de Trânsito',
      state: 'SP',
      downloads: 892,
      rating: 4.3,
      abstract: 'Estudo sobre implementação de tecnologias inteligentes na gestão do trânsito urbano, incluindo semáforos adaptativos e sistemas de monitoramento.',
      keywords: ['Trânsito', 'Tecnologia', 'Gestão Urbana'],
      publishedDate: new Date('2024-01-28'),
      views: 1567
    },
    {
      id: 5,
      title: 'Perícia Criminal Digital: Análise de Evidências Eletrônicas',
      author: 'Perito João Santos',
      institution: 'Instituto de Criminalística',
      year: '2024',
      category: 'Perícia Criminal',
      force: 'Perícia Criminal',
      state: 'RS',
      downloads: 1234,
      rating: 4.7,
      abstract: 'Metodologias avançadas para análise de evidências digitais em crimes cibernéticos, incluindo recuperação de dados e análise forense de dispositivos móveis.',
      keywords: ['Perícia Digital', 'Evidências', 'Forense'],
      publishedDate: new Date('2024-02-05'),
      views: 2345
    },
    {
      id: 6,
      title: 'Sistema Penitenciário Federal: Desafios e Soluções',
      author: 'Agente Federal Pedro Lima',
      institution: 'Academia Penitenciária Federal',
      year: '2024',
      category: 'Sistema Penitenciário',
      force: 'Polícia Penal Federal',
      state: 'DF',
      downloads: 567,
      rating: 4.2,
      abstract: 'Análise dos principais desafios do sistema penitenciário federal brasileiro e propostas de soluções inovadoras para ressocialização.',
      keywords: ['Sistema Penitenciário', 'Ressocialização', 'Gestão'],
      publishedDate: new Date('2024-01-12'),
      views: 1890
    },
    {
      id: 7,
      title: 'Segurança Portuária: Controle e Monitoramento',
      author: 'Guarda Portuário Roberto Costa',
      institution: 'Autoridade Portuária Santos',
      year: '2024',
      category: 'Segurança Portuária',
      force: 'Guarda Portuária',
      state: 'SP',
      downloads: 723,
      rating: 4.4,
      abstract: 'Estudo sobre sistemas de segurança portuária, incluindo tecnologias de monitoramento e controle de acesso em áreas portuárias.',
      keywords: ['Segurança Portuária', 'Monitoramento', 'Controle'],
      publishedDate: new Date('2024-02-18'),
      views: 1456
    },
    {
      id: 8,
      title: 'Policiamento Rodoviário: Prevenção de Acidentes',
      author: 'Inspetor Marcos Silva',
      institution: 'Academia PRF',
      year: '2024',
      category: 'Segurança Rodoviária',
      force: 'Polícia Rodoviária Federal',
      state: 'MG',
      downloads: 1456,
      rating: 4.6,
      abstract: 'Estratégias preventivas para redução de acidentes rodoviários, incluindo uso de tecnologia e educação para o trânsito.',
      keywords: ['Segurança Rodoviária', 'Prevenção', 'Acidentes'],
      publishedDate: new Date('2024-01-30'),
      views: 2678
    }
  ]);

  const categories = [
    'Investigação Criminal',
    'Policiamento Comunitário', 
    'Tecnologia Policial',
    'Direitos Humanos',
    'Inteligência Policial',
    'Prevenção Criminal',
    'Gestão Policial',
    'Perícia Criminal',
    'Sistema Penitenciário',
    'Segurança Portuária',
    'Segurança Rodoviária',
    'Gestão de Trânsito'
  ];

  const forceTypes = [
    'Agente de Trânsito',
    'Corpo de Bombeiros',
    'Força Nacional',
    'Guarda Portuária',
    'Perícia Criminal',
    'Polícia Civil',
    'Polícia Científica',
    'Polícia Federal',
    'Polícia Legislativa Estadual',
    'Polícia Legislativa Federal',
    'Polícia Militar',
    'Polícia Penal Estadual',
    'Polícia Penal Federal',
    'Polícia Rodoviária Federal'
  ];

  const states = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const handleSearch = () => {
    console.log('Searching with filters:', filters);
    
    // Demonstração de busca funcional
    let filteredResults = [...searchResults];
    
    // Filtrar por termo de busca
    if (filters.query) {
      filteredResults = filteredResults.filter(result => 
        result.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        result.abstract.toLowerCase().includes(filters.query.toLowerCase()) ||
        result.keywords.some(keyword => keyword.toLowerCase().includes(filters.query.toLowerCase()))
      );
    }
    
    // Filtrar por instituição
    if (filters.institution) {
      filteredResults = filteredResults.filter(result => 
        result.institution.toLowerCase().includes(filters.institution.toLowerCase())
      );
    }
    
    // Filtrar por força de segurança
    if (filters.forceType.length > 0) {
      filteredResults = filteredResults.filter(result => 
        filters.forceType.includes(result.force)
      );
    }
    
    // Filtrar por estado
    if (filters.state !== 'all') {
      filteredResults = filteredResults.filter(result => 
        result.state === filters.state
      );
    }
    
    // Filtrar por categoria
    if (filters.category !== 'all') {
      filteredResults = filteredResults.filter(result => 
        result.category === filters.category
      );
    }
    
    setSearchResults(filteredResults);
  };

  const handleForceTypeChange = (force: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      forceType: checked 
        ? [...prev.forceType, force]
        : prev.forceType.filter(f => f !== force)
    }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      category: 'all',
      author: '',
      institution: '',
      yearFrom: '',
      yearTo: '',
      docType: '',
      forceType: [],
      state: 'all'
    });
    // Resetar para todos os resultados
    setSearchResults([
      {
        id: 1,
        title: 'Inteligência Artificial aplicada à Investigação Criminal',
        author: 'Dr. Roberto Silva',
        institution: 'Academia Nacional de Polícia',
        year: '2024',
        category: 'Tecnologia Policial',
        force: 'Polícia Federal',
        state: 'DF',
        downloads: 2341,
        rating: 4.8,
        abstract: 'Este trabalho apresenta uma análise abrangente sobre o uso de inteligência artificial em processos investigativos criminais, destacando ferramentas de análise de dados, reconhecimento facial e predição de crimes.',
        keywords: ['IA', 'Investigação', 'Tecnologia', 'Análise Criminal'],
        publishedDate: new Date('2024-01-15'),
        views: 3456
      },
      {
        id: 2,
        title: 'Policiamento Comunitário em Áreas de Vulnerabilidade Social',
        author: 'Cap. Maria Fernanda',
        institution: 'PMERJ',
        year: '2023',
        category: 'Policiamento Comunitário',
        force: 'Polícia Militar',
        state: 'RJ',
        downloads: 1876,
        rating: 4.6,
        abstract: 'Análise de estratégias de policiamento comunitário implementadas em comunidades vulneráveis do Rio de Janeiro, com foco na redução da violência e melhoria da relação polícia-comunidade.',
        keywords: ['Policiamento Comunitário', 'Vulnerabilidade Social', 'Prevenção'],
        publishedDate: new Date('2023-12-20'),
        views: 2789
      },
      {
        id: 3,
        title: 'Crimes Cibernéticos: Novas Abordagens Investigativas',
        author: 'Del. Ana Carolina',
        institution: 'PCSP',
        year: '2024',
        category: 'Investigação Criminal',
        force: 'Polícia Civil',
        state: 'SP',
        downloads: 3102,
        rating: 4.9,
        abstract: 'Metodologias inovadoras para investigação de crimes cibernéticos, incluindo análise forense digital, rastreamento de criptomoedas e cooperação internacional.',
        keywords: ['Crimes Cibernéticos', 'Forense Digital', 'Investigação'],
        publishedDate: new Date('2024-02-10'),
        views: 4123
      },
      {
        id: 4,
        title: 'Gestão de Trânsito Urbano: Tecnologias Emergentes',
        author: 'Agente Carlos Mendes',
        institution: 'Academia de Trânsito SP',
        year: '2024',
        category: 'Gestão de Trânsito',
        force: 'Agente de Trânsito',
        state: 'SP',
        downloads: 892,
        rating: 4.3,
        abstract: 'Estudo sobre implementação de tecnologias inteligentes na gestão do trânsito urbano, incluindo semáforos adaptativos e sistemas de monitoramento.',
        keywords: ['Trânsito', 'Tecnologia', 'Gestão Urbana'],
        publishedDate: new Date('2024-01-28'),
        views: 1567
      },
      {
        id: 5,
        title: 'Perícia Criminal Digital: Análise de Evidências Eletrônicas',
        author: 'Perito João Santos',
        institution: 'Instituto de Criminalística',
        year: '2024',
        category: 'Perícia Criminal',
        force: 'Perícia Criminal',
        state: 'RS',
        downloads: 1234,
        rating: 4.7,
        abstract: 'Metodologias avançadas para análise de evidências digitais em crimes cibernéticos, incluindo recuperação de dados e análise forense de dispositivos móveis.',
        keywords: ['Perícia Digital', 'Evidências', 'Forense'],
        publishedDate: new Date('2024-02-05'),
        views: 2345
      },
      {
        id: 6,
        title: 'Sistema Penitenciário Federal: Desafios e Soluções',
        author: 'Agente Federal Pedro Lima',
        institution: 'Academia Penitenciária Federal',
        year: '2024',
        category: 'Sistema Penitenciário',
        force: 'Polícia Penal Federal',
        state: 'DF',
        downloads: 567,
        rating: 4.2,
        abstract: 'Análise dos principais desafios do sistema penitenciário federal brasileiro e propostas de soluções inovadoras para ressocialização.',
        keywords: ['Sistema Penitenciário', 'Ressocialização', 'Gestão'],
        publishedDate: new Date('2024-01-12'),
        views: 1890
      },
      {
        id: 7,
        title: 'Segurança Portuária: Controle e Monitoramento',
        author: 'Guarda Portuário Roberto Costa',
        institution: 'Autoridade Portuária Santos',
        year: '2024',
        category: 'Segurança Portuária',
        force: 'Guarda Portuária',
        state: 'SP',
        downloads: 723,
        rating: 4.4,
        abstract: 'Estudo sobre sistemas de segurança portuária, incluindo tecnologias de monitoramento e controle de acesso em áreas portuárias.',
        keywords: ['Segurança Portuária', 'Monitoramento', 'Controle'],
        publishedDate: new Date('2024-02-18'),
        views: 1456
      },
      {
        id: 8,
        title: 'Policiamento Rodoviário: Prevenção de Acidentes',
        author: 'Inspetor Marcos Silva',
        institution: 'Academia PRF',
        year: '2024',
        category: 'Segurança Rodoviária',
        force: 'Polícia Rodoviária Federal',
        state: 'MG',
        downloads: 1456,
        rating: 4.6,
        abstract: 'Estratégias preventivas para redução de acidentes rodoviários, incluindo uso de tecnologia e educação para o trânsito.',
        keywords: ['Segurança Rodoviária', 'Prevenção', 'Acidentes'],
        publishedDate: new Date('2024-01-30'),
        views: 2678
      }
    ]);
  };

  const sortedResults = [...searchResults].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'recent':
        return b.publishedDate.getTime() - a.publishedDate.getTime();
      case 'downloads':
        return b.downloads - a.downloads;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="govbr-heading-1">Busca Avançada</h1>
        <p className="govbr-body mt-2">
          Encontre trabalhos acadêmicos com filtros específicos e busca semântica inteligente
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card className="govbr-card sticky top-24">
            <CardHeader>
              <CardTitle className="govbr-heading-3 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-govbr-blue-warm-vivid" />
                Filtros de Busca
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Search */}
              <div>
                <Label htmlFor="main-search" className="text-sm font-medium">
                  Busca Principal
                </Label>
                <Input
                  id="main-search"
                  placeholder="Palavras-chave, títulos, temas..."
                  value={filters.query}
                  onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                  className="mt-1"
                />
              </div>

              {/* Category */}
              <div>
                <Label className="text-sm font-medium">Categoria</Label>
                <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-govbr-gray-20 shadow-lg max-h-48 overflow-y-auto">
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Author */}
              <div>
                <Label htmlFor="author" className="text-sm font-medium">Autor</Label>
                <Input
                  id="author"
                  placeholder="Nome do autor"
                  value={filters.author}
                  onChange={(e) => setFilters(prev => ({ ...prev, author: e.target.value }))}
                  className="mt-1"
                />
              </div>

              {/* Institution */}
              <div>
                <Label htmlFor="institution" className="text-sm font-medium">Instituição</Label>
                <Input
                  id="institution"
                  placeholder="Ex: PMERJ, Academia Nacional..."
                  value={filters.institution}
                  onChange={(e) => setFilters(prev => ({ ...prev, institution: e.target.value }))}
                  className="mt-1"
                />
              </div>

              {/* Year Range */}
              <div>
                <Label className="text-sm font-medium">Período</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Input
                    placeholder="De"
                    value={filters.yearFrom}
                    onChange={(e) => setFilters(prev => ({ ...prev, yearFrom: e.target.value }))}
                  />
                  <Input
                    placeholder="Até"
                    value={filters.yearTo}
                    onChange={(e) => setFilters(prev => ({ ...prev, yearTo: e.target.value }))}
                  />
                </div>
              </div>

              {/* Force Type */}
              <div>
                <Label className="text-sm font-medium">Força de Segurança</Label>
                <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
                  {forceTypes.map((force) => (
                    <div key={force} className="flex items-center space-x-2">
                      <Checkbox
                        id={force}
                        checked={filters.forceType.includes(force)}
                        onCheckedChange={(checked) => handleForceTypeChange(force, checked as boolean)}
                      />
                      <Label htmlFor={force} className="text-sm">{force}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* State */}
              <div>
                <Label className="text-sm font-medium">Estado</Label>
                <Select value={filters.state} onValueChange={(value) => setFilters(prev => ({ ...prev, state: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione um estado" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-govbr-gray-20 shadow-lg max-h-48 overflow-y-auto">
                    <SelectItem value="all">Todos os estados</SelectItem>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button onClick={handleSearch} className="govbr-btn-primary w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
                <Button onClick={clearFilters} variant="outline" className="w-full">
                  Limpar Filtros
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="govbr-heading-2">Resultados da Busca</h2>
                <p className="govbr-small text-gray-600">
                  {sortedResults.length} trabalhos encontrados
                </p>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-govbr-gray-20 shadow-lg">
                  <SelectItem value="rating">Melhor Avaliados</SelectItem>
                  <SelectItem value="recent">Mais Recentes</SelectItem>
                  <SelectItem value="downloads">Mais Baixados</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results List */}
            <div className="space-y-6">
              {sortedResults.map((result) => (
                <Card key={result.id} className="govbr-card hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-govbr-blue-warm-dark hover:text-govbr-blue-warm-vivid cursor-pointer">
                          {result.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {result.author}
                          </span>
                          <span>{result.institution}</span>
                          <span>{result.year}</span>
                          <span className="flex items-center text-govbr-green-cool-vivid">
                            <Download className="h-4 w-4 mr-1" />
                            {result.downloads}
                          </span>
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {result.views}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-700 leading-relaxed">
                        {result.abstract}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-govbr-blue-warm-10 text-govbr-blue-warm-vivid">
                          {result.category}
                        </Badge>
                        <Badge variant="outline">
                          {result.force}
                        </Badge>
                        <Badge variant="outline">
                          {result.state}
                        </Badge>
                        {result.keywords.map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-govbr-gray-10">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                            <span className="text-sm text-gray-600">Avaliação:</span>
                            <span className="ml-1 font-medium text-govbr-green-cool-vivid">
                              {result.rating}/5.0
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            Publicado em {result.publishedDate.toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Visualizar
                          </Button>
                          <Button size="sm" className="govbr-btn-primary">
                            <FileText className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAdvanced;
