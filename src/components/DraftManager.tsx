
import React, { useState, useEffect } from 'react';
import { WorkSubmission } from '@/types/work';
import { getDrafts, deleteDraft } from '@/utils/workSubmission';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, FileText, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DraftManagerProps {
  onLoadDraft: (draft: WorkSubmission) => void;
}

const DraftManager: React.FC<DraftManagerProps> = ({ onLoadDraft }) => {
  const [drafts, setDrafts] = useState<Record<string, WorkSubmission>>({});
  const { toast } = useToast();

  useEffect(() => {
    setDrafts(getDrafts());
  }, []);

  const handleLoadDraft = (draft: WorkSubmission) => {
    onLoadDraft(draft);
    toast({
      title: "Rascunho carregado",
      description: "Os dados do rascunho foram carregados no formulário.",
    });
  };

  const handleDeleteDraft = (draftId: string) => {
    deleteDraft(draftId);
    setDrafts(getDrafts());
    toast({
      title: "Rascunho excluído",
      description: "O rascunho foi removido com sucesso.",
    });
  };

  const draftList = Object.values(drafts);

  if (draftList.length === 0) {
    return null;
  }

  return (
    <Card className="govbr-card mb-6">
      <CardHeader>
        <CardTitle className="govbr-heading-3 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-amber-600" />
          Rascunhos Salvos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {draftList.map((draft) => (
            <div key={draft.id} className="flex items-center justify-between p-3 bg-govbr-gray-5 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-4 w-4 text-govbr-blue-warm-vivid" />
                <div>
                  <p className="font-medium text-sm">
                    {draft.title || 'Trabalho sem título'}
                  </p>
                  <p className="text-xs text-gray-500">
                    Salvo em {draft.updatedAt ? new Date(draft.updatedAt).toLocaleString('pt-BR') : 'Data desconhecida'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleLoadDraft(draft)}
                >
                  Carregar
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteDraft(draft.id!)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DraftManager;
