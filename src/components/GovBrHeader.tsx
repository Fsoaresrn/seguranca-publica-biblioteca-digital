
import React from 'react';
import { Button } from '@/components/ui/button';

const GovBrHeader = () => {
  const handleCreateAccount = () => {
    window.open('https://cadastros.sinesp.gov.br/sinesp-cadastros/public/precadastro_envio_link.jsf?lg=pt', '_blank');
  };

  const handleOrgaosGoverno = () => {
    window.open('https://www.gov.br/pt-br/orgaos-do-governo', '_blank');
  };

  const handleAcessoInformacao = () => {
    window.open('https://www.gov.br/acessoainformacao/pt-br', '_blank');
  };

  const handleLegislacao = () => {
    window.open('https://www4.planalto.gov.br/legislacao', '_blank');
  };

  const handleAcessibilidade = () => {
    window.open('https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital', '_blank');
  };

  return (
    <div className="w-full bg-white border-b border-gray-200">
      {/* Top Gov.br Bar */}
      <div className="bg-govbr-blue-warm-vivid text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <img 
                src="https://barra.sistema.gov.br/v1/assets/govbr.webp" 
                alt="Gov.br" 
                className="h-6"
              />
              <span className="text-sm font-medium">Governo Federal</span>
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={handleOrgaosGoverno}
                className="text-white hover:text-blue-100 text-sm"
              >
                Órgãos do Governo
              </button>
              <button 
                onClick={handleAcessoInformacao}
                className="text-white hover:text-blue-100 text-sm"
              >
                Acesso à Informação
              </button>
              <button 
                onClick={handleLegislacao}
                className="text-white hover:text-blue-100 text-sm"
              >
                Legislação
              </button>
              <button 
                onClick={handleAcessibilidade}
                className="text-white hover:text-blue-100 text-sm"
              >
                Acessibilidade
              </button>
              <button className="text-white hover:text-blue-100 text-sm">
                PT
              </button>
              <Button 
                className="bg-white text-govbr-blue-warm-vivid hover:bg-gray-100 text-sm px-4 py-1 h-8"
                onClick={() => window.open('https://acesso.gov.br/', '_blank')}
              >
                Entrar com seg.br
              </Button>
              <Button 
                className="bg-transparent border border-white text-white hover:bg-white hover:text-govbr-blue-warm-vivid text-sm px-4 py-1 h-8"
                onClick={handleCreateAccount}
              >
                Criar Conta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovBrHeader;
