
import React from 'react';
import { Button } from '@/components/ui/button';

const GovBrHeader = () => {
  const handlePortalGovBr = () => {
    window.open('https://www.gov.br/pt-br', '_blank');
  };

  const handleSenasp = () => {
    window.open('https://www.gov.br/mj/pt-br/assuntos/sua-seguranca/seguranca-publica', '_blank');
  };

  const handleMinisterio = () => {
    window.open('https://www.gov.br/mj/pt-br', '_blank');
  };

  const handleSinesp = () => {
    window.open('https://seguranca.sinesp.gov.br/', '_blank');
  };

  const handleLgpd = () => {
    window.open('https://www.gov.br/esporte/pt-br/acesso-a-informacao/lgpd', '_blank');
  };

  return (
    <div className="w-full bg-white border-b border-gray-200">
      {/* Top Gov.br Bar */}
      <div className="bg-govbr-blue-warm-vivid text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/c3b99122-2a3f-4bd6-8a76-3acc528859ae.png" 
                alt="Gov.br" 
                className="h-6"
              />
              <span className="text-sm font-medium">Governo Federal</span>
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-white hover:text-blue-100 text-sm">
                Órgãos do Governo
              </button>
              <button className="text-white hover:text-blue-100 text-sm">
                Acesso à Informação
              </button>
              <button className="text-white hover:text-blue-100 text-sm">
                Legislação
              </button>
              <button className="text-white hover:text-blue-100 text-sm">
                Acessibilidade
              </button>
              <button className="text-white hover:text-blue-100 text-sm">
                PT
              </button>
              <Button 
                className="bg-white text-govbr-blue-warm-vivid hover:bg-gray-100 text-sm px-4 py-1 h-8"
                onClick={() => window.open('https://acesso.gov.br/', '_blank')}
              >
                Entrar com gov.br
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Links Bar */}
      <div className="bg-white py-3 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 text-sm">
            <button 
              onClick={handlePortalGovBr}
              className="text-govbr-blue-warm-vivid hover:text-govbr-blue-warm-dark font-medium"
            >
              Portal Gov.br
            </button>
            <button 
              onClick={handleSenasp}
              className="text-govbr-blue-warm-vivid hover:text-govbr-blue-warm-dark"
            >
              SENASP
            </button>
            <button 
              onClick={handleMinisterio}
              className="text-govbr-blue-warm-vivid hover:text-govbr-blue-warm-dark"
            >
              Ministério da Justiça e Segurança Pública
            </button>
            <button 
              onClick={handleSinesp}
              className="text-govbr-blue-warm-vivid hover:text-govbr-blue-warm-dark"
            >
              Sinesp Segurança
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovBrHeader;
