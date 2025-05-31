
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Edit, FileText, User, Building } from 'lucide-react';
import { ModerationWork } from '@/types/moderation';

interface ModerationReviewModalProps {
  work: ModerationWork | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (workId: string, notes: string, categoryChange?: string) => void;
  onReject: (workId: string, notes: string) => void;
  onRequestChanges: (workId: string, notes: string) => void;
}

const ModerationReviewModal: React.FC<ModerationReviewModalProps> = ({
  work,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onRequestChanges
}) => {
  const [notes, setNotes] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [action, setAction] = useState<'approve' | 'reject' | 'request_changes' | null>(null);

  if (!work) return null;

  const handleSubmit = () => {
    if (!action) return;

    switch (action) {
      case 'approve':
        onApprove(work.id, notes, newCategory || undefined);
        break;
      case 'reject':
        onReject(work.id, notes);
        break;
      case 'request_changes':
        onRequestChanges(work.id, notes);
        break;
    }

    setNotes('');
    setNewCategory('');
    setAction(null);
    onClose();
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Revisão de Trabalho
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header do trabalho */}
          <div className="bg-govbr-gray-5 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold text-govbr-blue-warm-dark">{work.title}</h3>
              <Badge className={getStatusColor(work.status)}>
                {getStatusText(work.status)}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span><strong>Autor:</strong> {work.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-500" />
                <span><strong>Instituição:</strong> {work.institution}</span>
              </div>
              <div>
                <strong>Categoria:</strong> {work.category}
              </div>
              <div>
                <strong>Tipo:</strong> {work.type}
              </div>
              <div>
                <strong>Força:</strong> {work.force}
              </div>
              <div>
                <strong>Estado:</strong> {work.state}
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div>
            <h4 className="font-semibold mb-2">Resumo</h4>
            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
              {work.abstract}
            </p>
          </div>

          {/* Palavras-chave */}
          <div>
            <h4 className="font-semibold mb-2">Palavras-chave</h4>
            <div className="flex flex-wrap gap-2">
              {work.keywords.split(',').map((keyword, index) => (
                <Badge key={index} variant="outline">
                  {keyword.trim()}
                </Badge>
              ))}
            </div>
          </div>

          {/* Arquivo */}
          <div>
            <h4 className="font-semibold mb-2">Arquivo</h4>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm"><strong>Nome:</strong> {work.fileName}</p>
              <p className="text-sm"><strong>Tamanho:</strong> {(work.fileSize / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>

          {/* Alteração de categoria */}
          <div>
            <h4 className="font-semibold mb-2">Correção de Categoria (opcional)</h4>
            <Select value={newCategory} onValueChange={setNewCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar nova categoria se necessário" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seguranca-publica">Segurança Pública</SelectItem>
                <SelectItem value="investigacao-criminal">Investigação Criminal</SelectItem>
                <SelectItem value="prevencao-violencia">Prevenção da Violência</SelectItem>
                <SelectItem value="gestao-policial">Gestão Policial</SelectItem>
                <SelectItem value="tecnologia-seguranca">Tecnologia em Segurança</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notas da moderação */}
          <div>
            <h4 className="font-semibold mb-2">Notas da Moderação *</h4>
            <Textarea
              placeholder="Adicione suas observações sobre a revisão..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          {/* Ações */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              variant={action === 'approve' ? 'default' : 'outline'}
              onClick={() => setAction('approve')}
              className="w-full"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Aprovar
            </Button>
            <Button
              variant={action === 'request_changes' ? 'default' : 'outline'}
              onClick={() => setAction('request_changes')}
              className="w-full"
            >
              <Edit className="h-4 w-4 mr-2" />
              Solicitar Alterações
            </Button>
            <Button
              variant={action === 'reject' ? 'destructive' : 'outline'}
              onClick={() => setAction('reject')}
              className="w-full"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Rejeitar
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!action || !notes.trim()}
            className="bg-govbr-blue-warm-vivid hover:bg-govbr-blue-warm-dark"
          >
            Confirmar Decisão
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModerationReviewModal;
