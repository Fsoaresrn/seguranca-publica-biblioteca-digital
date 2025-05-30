
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface SubmissionProgressProps {
  isSubmitting: boolean;
  isUploading: boolean;
  uploadProgress: number;
}

const SubmissionProgress: React.FC<SubmissionProgressProps> = ({
  isSubmitting,
  isUploading,
  uploadProgress
}) => {
  if (!isSubmitting && !isUploading) {
    return null;
  }

  return (
    <Card className="border-govbr-blue-warm-vivid">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-govbr-blue-warm-vivid"></div>
          <div className="flex-1">
            <p className="font-medium">
              {isUploading ? 'Fazendo upload do arquivo...' : 'Processando envio...'}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-govbr-blue-warm-vivid h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmissionProgress;
