
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Edit, FileText, Calendar, User, Building, ArrowUpDown } from 'lucide-react';
import { ModerationWork } from '@/types/moderation';

interface ModerationWorksListProps {
  works: ModerationWork[];
  onSelectWork: (work: ModerationWork) => void;
  selectedWorks: string[];
  onToggleSelection: (workId: string) => void;
  onBulkAction: (action: string) => void;
}

const ModerationWorksList: React.FC<ModerationWorksListProps> = ({
  works,
  onSelectWork,
  selectedWorks,
  onToggleSelection,
  onBulkAction
}) => {
  const [groupBy, setGroupBy] = useState<string>('none');
  const [sortBy, setSortBy] = useState<string>('submission_date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted': return 'Submetido';
      case 'under_review': return 'Em Revisão';
      case 'approved': return 'Aprovado';
      case 'rejected': return 'Rejeitado';
      default: return status;
    }
  };

  const getPriorityColor = (status: string, submittedAt: Date) => {
    const daysSinceSubmission = Math.floor((new Date().getTime() - submittedAt.getTime()) / (1000 * 60 * 60 * 24));
    
    if (status === 'submitted' && daysSinceSubmission > 7) return 'border-l-red-500';
    if (status === 'submitted' && daysSinceSubmission > 3) return 'border-l-yellow-500';
    if (status === 'submitted') return 'border-l-green-500';
    return 'border-l-gray-300';
  };

  const sortWorks = (works: ModerationWork[]) => {
    return [...works].sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'author':
          aValue = a.author.toLowerCase();
          bValue = b.author.toLowerCase();
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'category':
          aValue = a.category;
          bValue = b.category;
          break;
        case 'type':
          aValue = a.type;
          bValue = b.type;
          break;
        case 'submission_date':
          aValue = a.submittedAt.getTime();
          bValue = b.submittedAt.getTime();
          break;
        case 'views':
          aValue = a.views || 0;
          bValue = b.views || 0;
          break;
        case 'downloads':
          aValue = a.downloads || 0;
          bValue = b.downloads || 0;
          break;
        case 'rating':
          aValue = a.rating || 0;
          bValue = b.rating || 0;
          break;
        default:
          aValue = a.submittedAt.getTime();
          bValue = b.submittedAt.getTime();
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const groupWorks = (works: ModerationWork[]) => {
    if (groupBy === 'none') return { 'Todos os Trabalhos': works };
    
    return works.reduce((groups: Record<string, ModerationWork[]>, work) => {
      let groupKey: string;
      
      switch (groupBy) {
        case 'status':
          groupKey = getStatusText(work.status);
          break;
        case 'type':
          groupKey = work.type;
          break;
        case 'category':
          groupKey = work.category;
          break;
        case 'force':
          groupKey = work.force;
          break;
        default:
          groupKey = 'Outros';
      }
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(work);
      return groups;
    }, {});
  };

  const sortedWorks = sortWorks(works);
  const groupedWorks = groupWorks(sortedWorks);

  if (works.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhum trabalho encontrado
          </h3>
          <p className="text-gray-500">
            Não há trabalhos que correspondam aos filtros selecionados.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controles de agrupamento e ordenação */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Agrupar por:</label>
              <Select value={groupBy} onValueChange={setGroupBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem agrupamento</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="type">Tipo</SelectItem>
                  <SelectItem value="category">Categoria</SelectItem>
                  <SelectItem value="force">Força</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Ordenar por:</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Título (A-Z)</SelectItem>
                  <SelectItem value="author">Autor</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="category">Categoria</SelectItem>
                  <SelectItem value="type">Tipo</SelectItem>
                  <SelectItem value="submission_date">Data de Submissão</SelectItem>
                  <SelectItem value="views">Visualizações</SelectItem>
                  <SelectItem value="downloads">Downloads</SelectItem>
                  <SelectItem value="rating">Avaliação</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                <ArrowUpDown className="h-4 w-4" />
                {sortOrder === 'asc' ? 'Crescente' : 'Decrescente'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações em lote */}
      {selectedWorks.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedWorks.length} trabalho(s) selecionado(s)
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onBulkAction('approve')}
                >
                  Aprovar Selecionados
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onBulkAction('review')}
                >
                  Marcar em Revisão
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de trabalhos agrupados */}
      {Object.entries(groupedWorks).map(([groupName, groupWorks]) => (
        <Card key={groupName}>
          {groupBy !== 'none' && (
            <div className="bg-gray-50 px-6 py-3 border-b">
              <h3 className="font-semibold text-gray-900">{groupName} ({groupWorks.length})</h3>
            </div>
          )}
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            groupWorks.forEach(work => {
                              if (!selectedWorks.includes(work.id)) {
                                onToggleSelection(work.id);
                              }
                            });
                          } else {
                            groupWorks.forEach(work => {
                              if (selectedWorks.includes(work.id)) {
                                onToggleSelection(work.id);
                              }
                            });
                          }
                        }}
                        checked={groupWorks.every(work => selectedWorks.includes(work.id)) && groupWorks.length > 0}
                      />
                    </TableHead>
                    <TableHead>Trabalho</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Submetido</TableHead>
                    <TableHead>Visualizações</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Avaliação</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupWorks.map((work) => (
                    <TableRow 
                      key={work.id} 
                      className={`border-l-4 ${getPriorityColor(work.status, work.submittedAt)}`}
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedWorks.includes(work.id)}
                          onChange={() => onToggleSelection(work.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium text-sm">{work.title}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Building className="h-3 w-3" />
                            {work.institution}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <FileText className="h-3 w-3" />
                            {work.type} • {work.force}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 text-gray-500" />
                            <span className="text-sm font-medium">{work.author}</span>
                          </div>
                          <p className="text-xs text-gray-500">{work.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(work.status)}>
                          {getStatusText(work.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{work.category}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {work.submittedAt.toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{work.views || 0}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{work.downloads || 0}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{work.rating ? work.rating.toFixed(1) : '-'}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onSelectWork(work)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Revisar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ModerationWorksList;
