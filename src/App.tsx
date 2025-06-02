import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LibraryHome from './components/LibraryHome';
import Repository from './components/Repository';
import SearchAdvanced from './components/SearchAdvanced';
import CentralAjuda from './components/CentralAjuda';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import SystemSettings from './components/admin/SystemSettings';
import Yearbook from './components/Yearbook';

function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Verificar se há um usuário no localStorage ao carregar o aplicativo
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAdmin(JSON.parse(storedUser).isAdmin || false);
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsAdmin(userData.isAdmin || false);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
    setCurrentView('home');
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentView('repository');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <LibraryHome onNavigate={setCurrentView} />;
      case 'repository':
        return <Repository onNavigate={setCurrentView} searchTerm={searchTerm} />;
      case 'search-advanced':
        return <SearchAdvanced onNavigate={setCurrentView} onSearch={handleSearch} />;
      case 'central-ajuda':
        return <CentralAjuda onNavigate={setCurrentView} />;
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'admin':
        return <AdminPanel onNavigate={setCurrentView} />;
      case 'settings':
        return <SystemSettings />;
      case 'yearbook':
        return <Yearbook />;
      default:
        return <LibraryHome onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="app-container">
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        onSearch={handleSearch}
        user={user}
        onLogin={() => setCurrentView('login')}
        onLogout={handleLogout}
      />
      <main className="content-container">
        {renderContent()}
      </main>
      <footer className="footer">
        <p>© 2024 Biblioteca Nacional de Segurança Pública</p>
      </footer>
    </div>
  );
}

export default App;
