
import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FileUpload from '@/components/FileUpload';

interface FileUploadSectionProps {
  onFileSelect: (file: File | null) => void;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({ onFileSelect }) => {
  return (
    <Card className="govbr-card">
      <CardHeader>
        <CardTitle className="govbr-heading-3 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-orange-600" />
          Upload do Arquivo *
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FileUpload onFileSelect={onFileSelect} />
      </CardContent>
    </Card>
  );
};

export default FileUploadSection;
