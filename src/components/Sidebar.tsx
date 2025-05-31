
import React from 'react';
import { 
  BookOpen, 
  Search, 
  User, 
  FileText, 
  Calendar,
  Book
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen?: boolean;
  onNavigate?: (section: string) => void;
  currentSection?: string;
  userRole?: 'servidor' | 'moderador' | 'administrador';
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen = true, 
  onNavigate,
  currentSection = 'dashboard',
  userRole = 'servidor'
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
      description: 'Buscar trabalhos acadêmicos'
    },
    {
      name: 'Meus Trabalhos',
      id: 'my-works',
      icon: FileText,
      description: 'Gerenciar suas publicações'
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
  };

  const handleSubmitWorkClick = () => {
    if (onNavigate) {
      onNavigate('submit-work');
    }
  };

  return (
    <aside 
      className={cn(
        "bg-white border-r border-govbr-gray-20 shadow-sm transition-all duration-300",
        isOpen ? "w-64" : "w-0 overflow-hidden",
        "h-screen sticky top-16"
      )}
      aria-label="Menu de navegação principal"
    >
      <div className="p-6">
        <nav className="space-y-2">
          {/* Main Navigation */}
          <div className="mb-8">
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
                    "w-full justify-start space-x-3 h-12 mb-1",
                    isActive 
                      ? "bg-govbr-blue-warm-10 text-govbr-blue-warm-vivid border-r-2 border-govbr-blue-warm-vivid" 
                      : "text-gray-700 hover:bg-govbr-gray-5"
                  )}
                  onClick={() => handleNavigation(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Admin Navigation */}
          {showAdminMenu && (
            <div>
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
                      "w-full justify-start space-x-3 h-12 mb-1",
                      isActive 
                        ? "bg-govbr-green-cool-5 text-govbr-green-cool-vivid border-r-2 border-govbr-green-cool-vivid" 
                        : "text-gray-700 hover:bg-govbr-gray-5"
                    )}
                    onClick={() => handleNavigation(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          )}

          {/* Quick Actions */}
          <div className="pt-6 border-t border-govbr-gray-10">
            <Button className="govbr-btn-primary w-full" onClick={handleSubmitWorkClick}>
              Enviar Trabalho
            </Button>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
