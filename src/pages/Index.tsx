import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import SearchAdvanced from '@/components/SearchAdvanced';
import SubmitWork from '@/components/SubmitWork';
import MyWorks from '@/components/MyWorks';
import Repository from '@/components/Repository';
import Moderation from '@/components/Moderation';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [userRole] = useState<'servidor' | 'moderador' | 'administrador'>('servidor');
  const [userName] = useState('João Silva Santos');

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (section: string) => {
    setCurrentSection(section);
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard userRole={userRole} userName={userName} />;
      case 'search':
        return <SearchAdvanced />;
      case 'submit-work':
        return <SubmitWork />;
      case 'my-works':
        return <MyWorks />;
      case 'repository':
        return <Repository />;
      case 'admin':
        return (
          <div className="space-y-6 animate-fade-in">
            <h1 className="govbr-heading-1">Painel Administrativo</h1>
            <p className="govbr-body">Gestão e administração da plataforma BNSP.</p>
            <div className="bg-govbr-gray-5 rounded-lg p-8 text-center">
              <p className="text-gray-600">Funcionalidade em desenvolvimento...</p>
            </div>
          </div>
        );
      case 'moderation':
        return <Moderation />;
      default:
        return <Dashboard userRole={userRole} userName={userName} />;
    }
  };

  return (
    <div className="min-h-screen bg-govbr-gray-5">
      <Header 
        onMenuClick={handleMenuClick}
        userRole={userRole}
        userName={userName}
      />
      
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen}
          onNavigate={handleNavigation}
          currentSection={currentSection}
          userRole={userRole}
        />
        
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Government Footer */}
      <footer className="bg-govbr-blue-warm-dark text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">BNSP</h3>
              <p className="text-govbr-blue-warm-20 text-sm">
                Biblioteca Nacional da Segurança Pública - Plataforma oficial para 
                compartilhamento de conhecimento acadêmico entre servidores de segurança pública.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Importantes</h3>
              <ul className="space-y-2 text-sm text-govbr-blue-warm-20">
                <li><a href="#" className="hover:text-white">Portal Gov.br</a></li>
                <li><a href="#" className="hover:text-white">SENASP</a></li>
                <li><a href="#" className="hover:text-white">Ministério da Justiça</a></li>
                <li><a href="#" className="hover:text-white">Sinesp Segurança</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-sm text-govbr-blue-warm-20">
                <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white">LGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-govbr-blue-warm-vivid mt-8 pt-6 text-center">
            <p className="text-govbr-blue-warm-20 text-sm">
              © 2024 Governo Federal - Ministério da Justiça e Segurança Pública - SENASP
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
