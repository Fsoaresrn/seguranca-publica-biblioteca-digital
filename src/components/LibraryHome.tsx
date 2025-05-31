
import React from 'react';
import { BookOpen, Users, FileText, Award, Search, TrendingUp, Shield, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LibraryHomeProps {
  onContribute?: () => void;
  onNavigate?: (section: string) => void;
}

const LibraryHome: React.FC<LibraryHomeProps> = ({ onContribute, onNavigate }) => {
  const features = [
    {
      icon: BookOpen,
      title: 'Repositório Acadêmico',
      description: 'Acesso a milhares de trabalhos acadêmicos de segurança pública',
      color: 'text-govbr-blue-warm-vivid'
    },
    {
      icon: Users,
      title: 'Comunidade Especializada',
      description: 'Conecte-se com profissionais e pesquisadores da área',
      color: 'text-govbr-green-cool-vivid'
    },
    {
      icon: Shield,
      title: 'Conteúdo Verificado',
      description: 'Todos os trabalhos passam por processo de moderação acadêmica',
      color: 'text-purple-600'
    },
    {
      icon: Globe,
      title: 'Acesso Nacional',
      description: 'Plataforma integrada ao Sinesp para todas as forças de segurança',
      color: 'text-orange-600'
    }
  ];

  const statistics = [
    { label: 'Trabalhos Publicados', value: '12.543', icon: FileText },
    { label: 'Pesquisadores Ativos', value: '3.421', icon: Users },
    { label: 'Downloads Realizados', value: '85.692', icon: TrendingUp },
    { label: 'Instituições Parceiras', value: '127', icon: Award }
  ];

  const categories = [
    'Investigação Criminal',
    'Policiamento Comunitário',
    'Tecnologia Policial',
    'Direitos Humanos',
    'Inteligência Policial',
    'Prevenção Criminal',
    'Gestão Policial',
    'Segurança Pública'
  ];

  const handleExploreRepository = () => {
    if (onNavigate) {
      onNavigate('repository');
    }
  };

  const handleContributeClick = () => {
    if (onContribute) {
      onContribute();
    }
  };

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center p-6 bg-govbr-blue-warm-vivid rounded-full mb-6">
          <BookOpen className="h-16 w-16 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-govbr-blue-warm-dark mb-4">
          Biblioteca Nacional da Segurança Pública
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Plataforma oficial da Secretaria Nacional de Segurança Pública - Senasp/MJSP para 
          compartilhamento de conhecimento acadêmico entre servidores de segurança pública do Brasil. 
          Conectando pesquisa, prática e inovação.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="govbr-btn-primary" onClick={handleExploreRepository}>
            <Search className="h-5 w-5 mr-2" />
            Explorar Acervo
          </Button>
          <Button size="lg" variant="outline" onClick={handleContributeClick}>
            <FileText className="h-5 w-5 mr-2" />
            Contribuir com Trabalho
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statistics.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <Icon className="h-8 w-8 mx-auto mb-4 text-govbr-blue-warm-vivid" />
                <div className="text-3xl font-bold text-govbr-blue-warm-dark mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features */}
      <div>
        <h2 className="text-3xl font-bold text-center text-govbr-blue-warm-dark mb-8">
          Por que usar a BNSP?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-gray-50`}>
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-govbr-blue-warm-dark mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Mission */}
      <Card className="bg-gradient-to-r from-govbr-blue-warm-vivid to-govbr-blue-warm-dark text-white">
        <CardContent className="p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Nossa Missão</h2>
            <p className="text-xl text-govbr-blue-warm-10 max-w-4xl mx-auto">
              Promover o avanço do conhecimento em segurança pública através do compartilhamento 
              de pesquisas acadêmicas, estudos de caso e melhores práticas, contribuindo para 
              uma segurança pública mais eficaz, humana e baseada em evidências científicas.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div>
        <h2 className="text-3xl font-bold text-center text-govbr-blue-warm-dark mb-8">
          Áreas de Conhecimento
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <h3 className="font-medium text-govbr-blue-warm-dark">{category}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Partners */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Instituições Parceiras</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <h4 className="font-semibold text-govbr-blue-warm-dark">SENASP</h4>
              <p className="text-sm text-gray-600">Secretaria Nacional de Segurança Pública</p>
            </div>
            <div>
              <h4 className="font-semibold text-govbr-blue-warm-dark">Academia Nacional</h4>
              <p className="text-sm text-gray-600">Academia Nacional de Polícia</p>
            </div>
            <div>
              <h4 className="font-semibold text-govbr-blue-warm-dark">ENAP</h4>
              <p className="text-sm text-gray-600">Escola Nacional de Administração Pública</p>
            </div>
            <div>
              <h4 className="font-semibold text-govbr-blue-warm-dark">Universidades</h4>
              <p className="text-sm text-gray-600">Instituições de Ensino Superior</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-govbr-green-cool-5 border-govbr-green-cool-20">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold text-govbr-green-cool-dark mb-4">
            Faça Parte da Comunidade
          </h2>
          <p className="text-govbr-green-cool-60 mb-6 max-w-2xl mx-auto">
            Contribua com seu conhecimento e experiência. Compartilhe seus trabalhos 
            acadêmicos e ajude a construir uma base sólida de conhecimento em segurança pública.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="govbr-btn-primary"
              onClick={() => window.open('https://cadastros.sinesp.gov.br/sinesp-cadastros/public/precadastro_envio_link.jsf?lg=pt', '_blank')}
            >
              Criar Conta
            </Button>
            <Button variant="outline" onClick={() => onNavigate && onNavigate('central-ajuda')}>
              Saiba Mais
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LibraryHome;
