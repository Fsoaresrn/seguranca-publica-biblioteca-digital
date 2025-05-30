
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Send } from 'lucide-react';

interface FormActionsProps {
  isSubmitting: boolean;
  isUploading: boolean;
  onSaveDraft: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({
  isSubmitting,
  isUploading,
  onSaveDraft
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-end">
      <Button
        type="button"
        variant="outline"
        onClick={onSaveDraft}
        className="govbr-btn-secondary"
        disabled={isSubmitting}
      >
        <Save className="h-4 w-4 mr-2" />
        Salvar Rascunho
      </Button>
      
      <Button
        type="submit"
        disabled={isSubmitting || isUploading}
        className="govbr-btn-primary"
      >
        <Send className="h-4 w-4 mr-2" />
        {isSubmitting ? 'Enviando...' : 'Enviar Trabalho'}
      </Button>
    </div>
  );
};

export default FormActions;
