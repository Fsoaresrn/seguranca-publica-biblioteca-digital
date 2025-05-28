
import React, { useState } from 'react';
import { Search, Filter, Calendar, User, BookOpen, FileText } from 'lucide-react';
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

const SearchAdvanced: React.FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    author: '',
    institution: '',
    yearFrom: '',
    yearTo: '',
    docType: '',
    forceType: [],
    state: ''
  });

  const [searchResults, setSearchResults] = useState([
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
      keywords: ['IA', 'Investigação', 'Tecnologia', 'Análise Criminal']
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
      keywords: ['Policiamento Comunitário', 'Vulnerabilidade Social', 'Prevenção']
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
      keywords: ['Crimes Cibernéticos', 'Forense Digital', 'Investigação']
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
    'Perícia Criminal'
  ];

  const forceTypes = [
    'Polícia Federal',
    'Polícia Civil',
    'Polícia Militar',
    'Corpo de Bombeiros',
    'Polícia Rodoviária Federal',
    'Guarda Municipal',
    'Força Nacional'
  ];

  const states = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const handleSearch = () => {
    console.log('Searching with filters:', filters);
    // Implement search logic
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
      category: '',
      author: '',
      institution: '',
      yearFrom: '',
      yearTo: '',
      docType: '',
      forceType: [],
      state: ''
    });
  };

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
                  placeholder="Nome da instituição"
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
                <div className="space-y-2 mt-2">
                  {forceTypes.slice(0, 5).map((force) => (
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
                  {searchResults.length} trabalhos encontrados
                </p>
              </div>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-govbr-gray-20 shadow-lg">
                  <SelectItem value="relevance">Mais Relevantes</SelectItem>
                  <SelectItem value="recent">Mais Recentes</SelectItem>
                  <SelectItem value="downloads">Mais Baixados</SelectItem>
                  <SelectItem value="rating">Melhor Avaliados</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results List */}
            <div className="space-y-6">
              {searchResults.map((result) => (
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
                          <span className="text-govbr-green-cool-vivid">
                            {result.downloads} downloads
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
                            <span className="text-sm text-gray-600">Avaliação:</span>
                            <span className="ml-1 font-medium text-govbr-green-cool-vivid">
                              {result.rating}/5.0
                            </span>
                          </div>
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
