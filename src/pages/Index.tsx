
import React, { useState } from 'react';
import GovBrHeader from '@/components/GovBrHeader';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import SearchAdvanced from '@/components/SearchAdvanced';
import SubmitWork from '@/components/SubmitWork';
import MyWorks from '@/components/MyWorks';
import Repository from '@/components/Repository';
import Moderation from '@/components/Moderation';
import UserProfile from '@/components/UserProfile';
import Favorites from '@/components/Favorites';
import Settings from '@/components/Settings';
import LibraryHome from '@/components/LibraryHome';
import Notifications from '@/components/Notifications';
import Wishlist from '@/components/Wishlist';
import RecentDownloads from '@/components/RecentDownloads';
import MostPopular from '@/components/MostPopular';
import CreateCollection from '@/components/CreateCollection';
import AdminPanel from '@/components/AdminPanel';
import CentralAjuda from '@/components/CentralAjuda';
import TermosUso from '@/components/TermosUso';
import PoliticaPrivacidade from '@/components/PoliticaPrivacidade';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [userRole] = useState<'servidor' | 'moderador' | 'administrador'>('moderador');
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
        return <Dashboard userRole={userRole} userName={userName} onNavigate={handleNavigation} />;
      case 'search':
        return <SearchAdvanced />;
      case 'submit-work':
        return <SubmitWork />;
      case 'my-works':
        return <MyWorks />;
      case 'repository':
        return <Repository />;
      case 'admin':
        return <AdminPanel />;
      case 'moderation':
        return <Moderation />;
      case 'profile':
        return <UserProfile userName={userName} userRole={userRole} />;
      case 'favorites':
        return <Favorites />;
      case 'settings':
        return <Settings />;
      case 'library-home':
        return <LibraryHome />;
      case 'notifications':
        return <Notifications />;
      case 'wishlist':
        return <Wishlist />;
      case 'recent-downloads':
        return <RecentDownloads />;
      case 'most-popular':
        return <MostPopular />;
      case 'create-collection':
        return <CreateCollection />;
      case 'central-ajuda':
        return <CentralAjuda />;
      case 'termos-uso':
        return <TermosUso />;
      case 'politica-privacidade':
        return <PoliticaPrivacidade />;
      default:
        return <Dashboard userRole={userRole} userName={userName} onNavigate={handleNavigation} />;
    }
  };

  const handleLgpd = () => {
    window.open('https://www.gov.br/esporte/pt-br/acesso-a-informacao/lgpd', '_blank');
  };

  return (
    <div className="min-h-screen bg-govbr-gray-5">
      <GovBrHeader />
      <Header 
        onMenuClick={handleMenuClick}
        userRole={userRole}
        userName={userName}
        onNavigate={handleNavigation}
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
                <li><a href="https://www.gov.br/pt-br" target="_blank" className="hover:text-white">Portal Gov.br</a></li>
                <li><a href="https://www.gov.br/mj/pt-br/assuntos/sua-seguranca/seguranca-publica" target="_blank" className="hover:text-white">SENASP</a></li>
                <li><a href="https://www.gov.br/mj/pt-br" target="_blank" className="hover:text-white">Ministério da Justiça e Segurança Pública</a></li>
                <li><a href="https://seguranca.sinesp.gov.br/" target="_blank" className="hover:text-white">Sinesp Segurança</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-sm text-govbr-blue-warm-20">
                <li><button onClick={() => handleNavigation('central-ajuda')} className="hover:text-white">Central de Ajuda</button></li>
                <li><button onClick={() => handleNavigation('termos-uso')} className="hover:text-white">Termos de Uso</button></li>
                <li><button onClick={() => handleNavigation('politica-privacidade')} className="hover:text-white">Política de Privacidade</button></li>
                <li><button onClick={handleLgpd} className="hover:text-white">LGPD</button></li>
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
