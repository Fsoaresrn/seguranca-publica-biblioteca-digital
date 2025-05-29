
import React, { useCallback, useState } from 'react';
import { Upload, File, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  acceptedTypes?: string;
  maxSize?: number; // in MB
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedTypes = ".pdf,.docx,.pptx",
  maxSize = 50
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFile = useCallback((file: File) => {
    // Validar tipo de arquivo
    const allowedTypes = ['.pdf', '.docx', '.pptx'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      toast({
        title: "Tipo de arquivo não permitido",
        description: "Apenas arquivos PDF, DOCX e PPTX são aceitos.",
        variant: "destructive"
      });
      return;
    }

    // Validar tamanho
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: `O arquivo deve ter no máximo ${maxSize}MB.`,
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
    
    toast({
      title: "Arquivo selecionado",
      description: `${file.name} foi carregado com sucesso.`,
    });
  }, [maxSize, onFileSelect, toast]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  const removeFile = () => {
    setSelectedFile(null);
    onFileSelect(null);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {!selectedFile ? (
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-govbr-blue-warm-vivid bg-govbr-blue-warm-10'
                : 'border-govbr-gray-30 hover:border-govbr-blue-warm-vivid'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept={acceptedTypes}
              onChange={handleChange}
            />
            
            <Upload className="mx-auto h-12 w-12 text-govbr-gray-30 mb-4" />
            <p className="text-lg font-medium text-govbr-blue-warm-dark mb-2">
              Arraste seu arquivo aqui ou clique para selecionar
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Formatos aceitos: PDF, DOCX, PPTX (máximo {maxSize}MB)
            </p>
            <Button variant="outline" className="govbr-btn-secondary">
              Selecionar Arquivo
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-govbr-green-cool-5 rounded-lg border border-govbr-green-cool-vivid">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-govbr-green-cool-vivid" />
              <div>
                <p className="font-medium text-govbr-blue-warm-dark">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-red-600 hover:text-red-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUpload;
