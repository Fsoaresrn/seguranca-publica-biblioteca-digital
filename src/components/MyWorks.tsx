import React, { useState } from 'react';
import { Search, Edit, Trash2, Eye, Download, Filter, Calendar, BookOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Dados mockados para demonstração
const mockWorks = [
  {
    id: 1,
    title: "Análise Comportamental em Operações de Segurança Pública",
    category: "Psicologia Aplicada",
    type: "Dissertação",
    status: "Aprovado",
    submissionDate: "2024-01-15",
    lastUpdate: "2024-01-20",
    views: 245,
    downloads: 67,
    rating: 4.5,
    force: "Polícia Civil",
    state: "SP",
    fileSize: "2.4 MB"
  },
  {
    id: 2,
    title: "Tecnologias Emergentes na Investigação Criminal",
    category: "Tecnologia e Inovação",
    type: "Artigo Científico",
    status: "Em Revisão",
    submissionDate: "2024-02-10",
    lastUpdate: "2024-02-28",
    views: 89,
    downloads: 12,
    rating: 0,
    force: "Polícia Federal",
    state: "DF",
    fileSize: "1.8 MB"
  },
  {
    id: 3,
    title: "Prevenção e Combate ao Crime Organizado: Estratégias Integradas",
    category: "Segurança Pública",
    type: "Monografia",
    status: "Pendente",
    submissionDate: "2024-03-05",
    lastUpdate: "2024-03-05",
    views: 23,
    downloads: 3,
    rating: 0,
    force: "Polícia Militar",
    state: "RJ",
    fileSize: "3.1 MB"
  },
  {
    id: 4,
    title: "Gestão de Riscos em Operações de Resgate",
    category: "Gestão de Emergências",
    type: "TCC",
    status: "Rejeitado",
    submissionDate: "2024-01-30",
    lastUpdate: "2024-02-15",
    views: 156,
    downloads: 34,
    rating: 3.8,
    force: "Corpo de Bombeiros",
    state: "MG",
    fileSize: "4.2 MB"
  }
];

const MyWorks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Aprovado': { color: 'bg-govbr-green-cool-vivid text-white', icon: '✓' },
      'Em Revisão': { color: 'bg-govbr-yellow-vivid text-govbr-blue-warm-dark', icon: '⏳' },
      'Pendente': { color: 'bg-govbr-gray-30 text-white', icon: '⏸' },
      'Rejeitado': { color: 'bg-red-600 text-white', icon: '✗' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={`${config.color} text-xs`}>
        {config.icon} {status}
      </Badge>
    );
  };

  const filteredWorks = mockWorks.filter(work => {
    const matchesSearch = work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         work.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || work.status === statusFilter;
    const matchesType = typeFilter === 'all' || work.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusSummary = () => {
    const summary = mockWorks.reduce((acc, work) => {
      acc[work.status] = (acc[work.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return summary;
  };

  const statusSummary = getStatusSummary();
  const totalViews = mockWorks.reduce((sum, work) => sum + work.views, 0);
  const totalDownloads = mockWorks.reduce((sum, work) => sum + work.downloads, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="govbr-heading-1 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-govbr-blue-warm-vivid" />
            Meus Trabalhos
          </h1>
          <p className="govbr-body text-gray-600 mt-2">
            Gerencie suas publicações acadêmicas na plataforma BNSP
          </p>
        </div>
        <Button className="govbr-btn-primary flex items-center gap-2">
          <Edit className="h-4 w-4" />
          Novo Trabalho
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Trabalhos</p>
                <p className="text-2xl font-bold text-govbr-blue-warm-dark">{mockWorks.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-govbr-blue-warm-vivid" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Visualizações</p>
                <p className="text-2xl font-bold text-govbr-green-cool-vivid">{totalViews}</p>
              </div>
              <Eye className="h-8 w-8 text-govbr-green-cool-vivid" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Downloads</p>
                <p className="text-2xl font-bold text-govbr-mint-vivid">{totalDownloads}</p>
              </div>
              <Download className="h-8 w-8 text-govbr-mint-vivid" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aprovados</p>
                <p className="text-2xl font-bold text-govbr-green-cool-vivid">{statusSummary['Aprovado'] || 0}</p>
              </div>
              <Star className="h-8 w-8 text-govbr-green-cool-vivid" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros e Busca
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por título ou categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="Aprovado">Aprovado</SelectItem>
                <SelectItem value="Em Revisão">Em Revisão</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Rejeitado">Rejeitado</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="Dissertação">Dissertação</SelectItem>
                <SelectItem value="Artigo Científico">Artigo Científico</SelectItem>
                <SelectItem value="Monografia">Monografia</SelectItem>
                <SelectItem value="TCC">TCC</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Works Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Trabalhos ({filteredWorks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submissão</TableHead>
                  <TableHead>Visualizações</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Avaliação</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorks.map((work) => (
                  <TableRow key={work.id} className="hover:bg-govbr-gray-5">
                    <TableCell>
                      <div>
                        <p className="font-medium text-govbr-blue-warm-dark line-clamp-2">
                          {work.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {work.force} - {work.state} | {work.fileSize}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {work.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{work.type}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(work.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="h-3 w-3" />
                        {new Date(work.submissionDate).toLocaleDateString('pt-BR')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3 text-gray-400" />
                        {work.views}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3 text-gray-400" />
                        {work.downloads}
                      </div>
                    </TableCell>
                    <TableCell>
                      {work.rating > 0 ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-sm">{work.rating}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">Sem avaliação</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-800">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredWorks.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum trabalho encontrado
              </h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'Tente ajustar os filtros de busca.' 
                  : 'Você ainda não enviou nenhum trabalho.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyWorks;
