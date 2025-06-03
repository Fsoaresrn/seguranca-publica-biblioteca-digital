
import React from 'react';
import { 
  BookOpen, 
  Search, 
  User, 
  FileText, 
  Calendar,
  Book,
  Heart,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen?: boolean;
  onNavigate?: (section: string) => void;
  currentSection?: string;
  userRole?: 'servidor' | 'moderador' | 'administrador';
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen = true, 
  onNavigate,
  currentSection = 'dashboard',
  userRole = 'servidor',
  onClose
}) => {
  const navigation = [
    {
      name: 'Dashboard',
      id: 'dashboard',
      icon: BookOpen,
      description: 'Visão geral da plataforma'
    },
    {
      name: 'Busca Avançada',
      id: 'search',
      icon: Search,
      description: 'Buscar trabalhos'
    },
    {
      name: 'Meus Trabalhos',
      id: 'my-works',
      icon: FileText,
      description: 'Gerenciar publicações'
    },
    {
      name: 'Meus Favoritos',
      id: 'favorites',
      icon: Heart,
      description: 'Trabalhos favoritados'
    },
    {
      name: 'Repositório',
      id: 'repository',
      icon: Book,
      description: 'Explorar coleções'
    }
  ];

  const adminNavigation = [
    {
      name: 'Painel Admin',
      id: 'admin',
      icon: User,
      description: 'Gestão da plataforma'
    },
    {
      name: 'Moderação',
      id: 'moderation',
      icon: Calendar,
      description: 'Revisar submissões'
    }
  ];

  const showAdminMenu = userRole === 'administrador' || userRole === 'moderador';

  const handleNavigation = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    }
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  const handleSubmitWorkClick = () => {
    if (onNavigate) {
      onNavigate('submit-work');
    }
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white border-r border-govbr-gray-20 shadow-sm transition-all duration-300 z-50",
          "fixed md:sticky top-0 md:top-16 h-screen",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "w-64 md:w-64",
          isOpen ? "md:w-64" : "md:w-0 md:overflow-hidden"
        )}
        aria-label="Menu de navegação principal"
      >
        <div className="p-4 md:p-6">
          {/* Mobile Close Button */}
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h2 className="text-lg font-semibold text-govbr-blue-warm-dark">Menu</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="space-y-2">
            {/* Main Navigation */}
            <div className="mb-6 md:mb-8">
              <h2 className="text-xs font-semibold text-govbr-gray-cool-30 uppercase tracking-wider mb-3">
                Navegação Principal
              </h2>
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentSection === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start space-x-3 h-10 md:h-12 mb-1 text-left",
                      isActive 
                        ? "bg-govbr-blue-warm-10 text-govbr-blue-warm-vivid border-r-2 border-govbr-blue-warm-vivid" 
                        : "text-gray-700 hover:bg-govbr-gray-5"
                    )}
                    onClick={() => handleNavigation(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500 hidden md:block">{item.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>

            {/* Admin Navigation */}
            {showAdminMenu && (
              <div className="mb-6">
                <h2 className="text-xs font-semibold text-govbr-gray-cool-30 uppercase tracking-wider mb-3">
                  Administração
                </h2>
                {adminNavigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentSection === item.id;
                  
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start space-x-3 h-10 md:h-12 mb-1 text-left",
                        isActive 
                          ? "bg-govbr-green-cool-5 text-govbr-green-cool-vivid border-r-2 border-govbr-green-cool-vivid" 
                          : "text-gray-700 hover:bg-govbr-gray-5"
                      )}
                      onClick={() => handleNavigation(item.id)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <Icon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500 hidden md:block">{item.description}</div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            )}

            {/* Quick Actions */}
            <div className="pt-4 md:pt-6 border-t border-govbr-gray-10">
              <Button 
                className="govbr-btn-primary w-full text-sm md:text-base py-2 md:py-3" 
                onClick={handleSubmitWorkClick}
              >
                Enviar Trabalho
              </Button>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
