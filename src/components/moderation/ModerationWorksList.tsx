
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Edit, FileText, Calendar, User, Building } from 'lucide-react';
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

      {/* Lista de trabalhos */}
      <Card>
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
                          works.forEach(work => {
                            if (!selectedWorks.includes(work.id)) {
                              onToggleSelection(work.id);
                            }
                          });
                        } else {
                          selectedWorks.forEach(workId => onToggleSelection(workId));
                        }
                      }}
                      checked={selectedWorks.length === works.length && works.length > 0}
                    />
                  </TableHead>
                  <TableHead>Trabalho</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Submetido</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {works.map((work) => (
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
    </div>
  );
};

export default ModerationWorksList;
