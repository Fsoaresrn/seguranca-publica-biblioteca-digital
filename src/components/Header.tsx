
import React, { useState } from 'react';
import { Search, User, Bell, Menu, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface HeaderProps {
  onMenuClick?: () => void;
  userRole?: 'servidor' | 'moderador' | 'administrador';
  userName?: string;
  onNavigate?: (section: string) => void;
  onLogout?: () => void;
  isLoggedIn?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onMenuClick, 
  userRole = 'servidor',
  userName = 'João Silva',
  onNavigate,
  onLogout,
  isLoggedIn = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const getRoleLabel = (role: string) => {
    const roles = {
      servidor: 'Servidor Público',
      moderador: 'Moderador',
      administrador: 'Administrador SENASP'
    };
    return roles[role as keyof typeof roles] || 'Usuário';
  };

  const handleNavigation = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    }
  };

  const handleLogoClick = () => {
    if (onNavigate) {
      onNavigate('library-home');
    }
  };

  const notifications = [
    {
      id: 1,
      title: 'Novo trabalho para revisão',
      message: 'Um novo artigo foi submetido para moderação',
      time: '5 min atrás',
      unread: true
    },
    {
      id: 2,
      title: 'Trabalho aprovado',
      message: 'Seu artigo "Tecnologia Policial" foi aprovado',
      time: '1 hora atrás',
      unread: true
    },
    {
      id: 3,
      title: 'Sistema atualizado',
      message: 'Novas funcionalidades disponíveis na plataforma',
      time: '2 horas atrás',
      unread: false
    }
  ];

  const handleNotificationsClick = () => {
    if (onNavigate) {
      onNavigate('notifications');
    }
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className="bg-white border-b border-govbr-gray-20 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="lg:hidden"
              aria-label="Abrir menu de navegação"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLogoClick}>
                <BookOpen className="h-8 w-8 text-govbr-blue-warm-vivid" />
                <div>
                  <h1 className="text-lg font-bold text-govbr-blue-warm-dark">BNSP</h1>
                  <p className="text-xs text-govbr-gray-cool-30 leading-none">
                    Biblioteca Nacional da Segurança Pública
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Buscar trabalhos acadêmicos, autores, temas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="govbr-input w-full pl-10 pr-4"
                  aria-label="Campo de busca"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative" aria-label="Notificações">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-80">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Notificações</h3>
                      <div className="space-y-3">
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-3 rounded-lg border ${notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}
                          >
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full text-sm" onClick={handleNotificationsClick}>
                        Ver todas as notificações
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 h-10" aria-label="Menu do usuário">
                      <div className="hidden sm:block text-right">
                        <p className="text-sm font-medium text-gray-900">{userName}</p>
                        <p className="text-xs text-gray-500">{getRoleLabel(userRole)}</p>
                      </div>
                      <div className="h-8 w-8 bg-govbr-blue-warm-vivid rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white border border-govbr-gray-20 shadow-lg">
                    <div className="px-3 py-2 border-b border-govbr-gray-10">
                      <p className="text-sm font-medium">{userName}</p>
                      <p className="text-xs text-gray-500">{getRoleLabel(userRole)}</p>
                    </div>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => handleNavigation('profile')}>
                      Meu Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => handleNavigation('my-works')}>
                      Meus Trabalhos
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => handleNavigation('favorites')}>
                      Favoritos
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => handleNavigation('settings')}>
                      Configurações
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogoutClick}>
                      Sair do Sistema
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button 
                className="govbr-btn-primary" 
                onClick={() => handleNavigation('login')}
              >
                Entrar
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Input
                type="search"
                placeholder="Buscar trabalhos, autores, temas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="govbr-input w-full pl-10 pr-4"
                aria-label="Campo de busca mobile"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
