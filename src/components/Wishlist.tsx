
import React, { useState } from 'react';
import { Heart, Download, Eye, Star, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const Wishlist: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<number[]>([1, 2, 3]); // IDs da wishlist

  const wishlistItems = [
    {
      id: 1,
      title: 'Inteligência Artificial na Investigação Criminal',
      author: 'Dr. Carlos Eduardo Silva',
      institution: 'Polícia Federal',
      type: 'Artigo Científico',
      addedDate: '2025-01-15',
      views: 1250,
      downloads: 420,
      rating: 4.8,
      description: 'Análise das aplicações de IA em investigações criminais modernas'
    },
    {
      id: 2,
      title: 'Policiamento Comunitário: Estratégias Eficazes',
      author: 'Maj. Ana Maria Santos',
      institution: 'Polícia Militar - SP',
      type: 'Dissertação',
      addedDate: '2025-01-10',
      views: 850,
      downloads: 230,
      rating: 4.6,
      description: 'Estudo sobre implementação de policiamento comunitário em grandes centros urbanos'
    },
    {
      id: 3,
      title: 'Análise Balística Forense Avançada',
      author: 'Perito João Oliveira',
      institution: 'Polícia Civil - RJ',
      type: 'Monografia',
      addedDate: '2025-01-08',
      views: 650,
      downloads: 180,
      rating: 4.7,
      description: 'Técnicas modernas de análise balística aplicadas à perícia criminal'
    }
  ];

  const filteredItems = wishlistItems.filter(item =>
    wishlist.includes(item.id) && (
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const removeFromWishlist = (id: number) => {
    setWishlist(prev => prev.filter(itemId => itemId !== id));
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
    <div className="space-y-4 lg:space-y-6 animate-fade-in px-4 lg:px-0">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="govbr-heading-1 text-2xl lg:text-4xl flex items-center">
            <Heart className="h-6 w-6 lg:h-8 lg:w-8 mr-3 text-red-500" />
            Lista de Desejos
          </h1>
          <p className="text-gray-600 mt-2 text-sm lg:text-base">
            Trabalhos que você salvou para ler posteriormente
          </p>
        </div>
        <Badge variant="outline" className="text-base lg:text-lg px-3 lg:px-4 py-1 lg:py-2">
          {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'itens'}
        </Badge>
      </div>

      {/* Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar na lista de desejos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="text-sm lg:text-base">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Wishlist Items */}
      <div className="grid gap-4 lg:gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg lg:text-xl font-semibold text-govbr-blue-warm-dark">
                      {item.title}
                    </h3>
                    <Badge variant="outline" className="text-xs">{item.type}</Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-2 text-sm lg:text-base">{item.description}</p>
                  
                  <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 text-xs lg:text-sm text-gray-500 mb-4">
                    <span><strong>Autor:</strong> {item.author}</span>
                    <span className="hidden lg:inline">•</span>
                    <span><strong>Instituição:</strong> {item.institution}</span>
                    <span className="hidden lg:inline">•</span>
                    <span><strong>Adicionado em:</strong> {new Date(item.addedDate).toLocaleDateString('pt-BR')}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs lg:text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3 lg:h-4 lg:w-4" />
                      {item.views} visualizações
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3 lg:h-4 lg:w-4" />
                      {item.downloads} downloads
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 lg:h-4 lg:w-4 fill-yellow-400 text-yellow-400" />
                      {item.rating}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col gap-2 lg:ml-4 w-full lg:w-auto">
                  <Button size="sm" className="govbr-btn-primary flex-1 lg:flex-none text-xs lg:text-sm">
                    <Eye className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                    <span className="hidden lg:inline">Visualizar</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 lg:flex-none text-xs lg:text-sm"
                    onClick={() => handleDownload(item.id, item.title)}
                  >
                    <Download className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                    <span className="hidden lg:inline">Download</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-red-600 hover:bg-red-50 flex-1 lg:flex-none text-xs lg:text-sm"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Heart className="h-3 w-3 lg:h-4 lg:w-4 mr-1 fill-current" />
                    <span className="hidden lg:inline">Remover</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="p-8 lg:p-12 text-center">
            <Heart className="h-12 w-12 lg:h-12 lg:w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-base lg:text-lg font-semibold text-gray-600 mb-2">
              {searchQuery ? 'Nenhum resultado encontrado' : 'Lista vazia'}
            </h3>
            <p className="text-sm lg:text-base text-gray-500">
              {searchQuery 
                ? 'Tente usar termos diferentes na busca' 
                : 'Adicione trabalhos à sua lista de desejos para vê-los aqui'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Wishlist;
