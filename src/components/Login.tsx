
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, User, Lock } from 'lucide-react';

interface LoginProps {
  onLogin?: (user: { cpf: string; name: string }) => void;
  onNavigate?: (section: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }
    return cleaned;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de login
    setTimeout(() => {
      if (onLogin) {
        onLogin({
          cpf: cpf,
          name: 'João Silva Santos'
        });
      }
      if (onNavigate) {
        onNavigate('dashboard');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleCreateAccount = () => {
    window.open('https://cadastros.sinesp.gov.br/sinesp-cadastros/public/precadastro_envio_link.jsf?lg=pt', '_blank');
  };

  return (
    <div className="min-h-screen bg-govbr-gray-5 flex items-center justify-center p-4">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center p-4 md:p-6 bg-govbr-blue-warm-vivid rounded-full mb-4">
            <BookOpen className="h-8 w-8 md:h-12 md:w-12 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-govbr-blue-warm-dark mb-2">
            BNSP - Login
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Entre com suas credenciais do Sinesp Segurança
          </p>
        </div>

        <Card className="govbr-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-lg md:text-xl">Acesso ao Sistema</CardTitle>
          </CardHeader>
          <CardContent className="px-4 md:px-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="cpf" className="text-sm md:text-base">CPF do Usuário</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={handleCPFChange}
                    className="pl-10 text-sm md:text-base h-10 md:h-12"
                    maxLength={14}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm md:text-base">Senha</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 text-sm md:text-base h-10 md:h-12"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full govbr-btn-primary h-10 md:h-12 text-sm md:text-base"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar no Sistema'}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <p className="text-sm text-gray-600">
                Não possui conta?
              </p>
              <Button 
                variant="outline" 
                className="w-full h-10 md:h-12 text-sm md:text-base"
                onClick={handleCreateAccount}
              >
                Criar Conta no Sinesp Segurança
              </Button>
              
              <div className="text-xs text-gray-500 space-y-1">
                <p>Esqueceu sua senha?</p>
                <button className="text-govbr-blue-warm-vivid hover:underline text-xs md:text-sm">
                  Recuperar senha
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 md:mt-6 text-center text-xs text-gray-500">
          <p>Sistema integrado ao Sinesp Segurança</p>
          <p>Ministério da Justiça e Segurança Pública - MJSP</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
