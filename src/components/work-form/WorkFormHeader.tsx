
import React from 'react';
import { FileText } from 'lucide-react';

const WorkFormHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-govbr-blue-warm-vivid to-govbr-blue-warm-dark rounded-lg p-8 text-white">
      <h1 className="text-3xl font-bold mb-2 flex items-center">
        <FileText className="h-8 w-8 mr-3" />
        Envio de Trabalho Acadêmico
      </h1>
      <p className="text-govbr-blue-warm-10 text-lg">
        Compartilhe seu conhecimento com a comunidade de segurança pública brasileira
      </p>
      <p className="text-govbr-blue-warm-20 text-sm mt-2">
        Todos os campos marcados com * são obrigatórios
      </p>
    </div>
  );
};

export default WorkFormHeader;
