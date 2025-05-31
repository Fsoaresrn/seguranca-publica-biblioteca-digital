
import React, { useState } from 'react';
import { Download, Calendar, FileText, Eye, Star, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const RecentDownloads: React.FC = () => {
  const [filterPeriod, setFilterPeriod] = useState('all');

  const downloads = [
    {
      id: 1,
      title: 'Investigação Digital e Crimes Cibernéticos',
      author: 'Dr. Roberto Lima',
      institution: 'Polícia Federal',
      type: 'Artigo Científico',
      downloadDate: '2024-01-20T14:30:00',
      fileSize: '2.5 MB',
      format: 'PDF',
      rating: 4.9
    },
    {
      id: 2,
      title: 'Gestão de Crises em Operações Policiais',
      author: 'Cel. Marina Costa',
      institution: 'Polícia Militar - RJ',
      type: 'Dissertação',
      downloadDate: '2024-01-19T09:15:00',
      fileSize: '1.8 MB',
      format: 'PDF',
      rating: 4.7
    },
    {
      id: 3,
      title: 'Análise de DNA em Investigações Criminais',
      author: 'Dra. Paula Santos',
      institution: 'Instituto de Criminalística',
      type: 'Monografia',
      downloadDate: '2024-01-18T16:45:00',
      fileSize: '3.2 MB',
      format: 'PDF',
      rating: 4.8
    },
    {
      id: 4,
      title: 'Policiamento Preventivo em Áreas Urbanas',
      author: 'Cap. José Silva',
      institution: 'Polícia Militar - SP',
      type: 'TCC',
      downloadDate: '2024-01-17T11:20:00',
      fileSize: '1.5 MB',
      format: 'PDF',
      rating: 4.5
    },
    {
      id: 5,
      title: 'Tecnologia Biométrica na Segurança Pública',
      author: 'Prof. Antonio Oliveira',
      institution: 'SENASP',
      type: 'Artigo Científico',
      downloadDate: '2024-01-15T13:10:00',
      fileSize: '2.1 MB',
      format: 'PDF',
      rating: 4.6
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} horas atrás`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} dias atrás`;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="govbr-heading-1 flex items-center">
            <Download className="h-8 w-8 mr-3 text-govbr-green-cool-vivid" />
            Downloads Recentes
          </h1>
          <p className="text-gray-600 mt-2">
            Histórico dos trabalhos que você baixou recentemente
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {downloads.length} downloads
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Select value={filterPeriod} onValueChange={setFilterPeriod}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os períodos</SelectItem>
            <SelectItem value="today">Hoje</SelectItem>
            <SelectItem value="week">Última semana</SelectItem>
            <SelectItem value="month">Último mês</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Mais filtros
        </Button>
      </div>

      {/* Downloads List */}
      <div className="space-y-4">
        {downloads.map((download) => (
          <Card key={download.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-govbr-blue-warm-vivid" />
                    <h3 className="text-lg font-semibold text-govbr-blue-warm-dark">
                      {download.title}
                    </h3>
                    <Badge variant="outline">{download.type}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                    <div>
                      <p><strong>Autor:</strong> {download.author}</p>
                      <p><strong>Instituição:</strong> {download.institution}</p>
                    </div>
                    <div>
                      <p><strong>Formato:</strong> {download.format}</p>
                      <p><strong>Tamanho:</strong> {download.fileSize}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Baixado em {formatDate(download.downloadDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {download.rating}
                    </div>
                    <span className="text-govbr-green-cool-vivid font-medium">
                      {getTimeAgo(download.downloadDate)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button size="sm" className="govbr-btn-primary">
                    <Eye className="h-4 w-4 mr-1" />
                    Visualizar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Baixar novamente
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {downloads.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Download className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Nenhum download realizado
            </h3>
            <p className="text-gray-500">
              Quando você baixar trabalhos, eles aparecerão aqui
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecentDownloads;
