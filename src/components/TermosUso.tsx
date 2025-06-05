
import React from 'react';
import { FileText, Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermosUso = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="govbr-heading-1 mb-4 flex items-center justify-center">
          <FileText className="h-10 w-10 mr-3 text-govbr-blue-warm-vivid" />
          Termos de Uso
        </h1>
        <p className="govbr-body max-w-2xl mx-auto">
          Termos e condições para utilização da Biblioteca Nacional da Segurança Pública
        </p>
      </div>

      {/* Última Atualização */}
      <Card className="govbr-card">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <AlertTriangle className="h-4 w-4" />
            <span>Última atualização: Janeiro de 2025</span>
          </div>
        </CardContent>
      </Card>

      {/* Seções dos Termos */}
      <div className="space-y-6">
        <Card className="govbr-card">
          <CardHeader>
            <CardTitle className="govbr-heading-3">1. Aceitação dos Termos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              Ao acessar e utilizar a Biblioteca Nacional da Segurança Pública (BNSP), você concorda 
              em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não 
              concordar com qualquer parte destes termos, não poderá acessar o serviço.
            </p>
          </CardContent>
        </Card>

        <Card className="govbr-card">
          <CardHeader>
            <CardTitle className="govbr-heading-3">2. Definições</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-600">
              <p><strong>BNSP:</strong> Biblioteca Nacional da Segurança Pública</p>
              <p><strong>SENASP:</strong> Secretaria Nacional de Segurança Pública</p>
              <p><strong>MJSP:</strong> Ministério da Justiça e Segurança Pública</p>
              <p><strong>Usuário:</strong> Qualquer pessoa que acesse ou utilize a plataforma</p>
              <p><strong>Conteúdo:</strong> Trabalhos acadêmicos, documentos e materiais disponibilizados na plataforma</p>
            </div>
          </CardContent>
        </Card>

        <Card className="govbr-card">
          <CardHeader>
            <CardTitle className="govbr-heading-3">3. Uso Permitido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-gray-600">
              <p>A BNSP destina-se exclusivamente a:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Servidores de segurança pública</li>
                <li>Pesquisadores acadêmicos da área de segurança pública</li>
                <li>Estudantes de cursos relacionados à segurança pública</li>
                <li>Profissionais autorizados pela SENASP</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="govbr-card">
          <CardHeader>
            <CardTitle className="govbr-heading-3">4. Responsabilidades do Usuário</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-gray-600">
              <p>O usuário compromete-se a:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Fornecer informações verdadeiras e atualizadas</li>
                <li>Manter a confidencialidade de suas credenciais de acesso</li>
                <li>Utilizar a plataforma apenas para fins legítimos e educacionais</li>
                <li>Respeitar os direitos autorais dos materiais disponibilizados</li>
                <li>Não compartilhar conteúdo confidencial ou sensível</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="govbr-card">
          <CardHeader>
            <CardTitle className="govbr-heading-3">5. Propriedade Intelectual</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              Todos os direitos de propriedade intelectual dos materiais disponibilizados na BNSP 
              pertencem aos seus respectivos autores ou à SENASP/MJSP. O uso dos materiais deve 
              respeitar as licenças e direitos autorais aplicáveis.
            </p>
          </CardContent>
        </Card>

        <Card className="govbr-card">
          <CardHeader>
            <CardTitle className="govbr-heading-3">6. Limitação de Responsabilidade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              A SENASP/MJSP não se responsabiliza por danos diretos, indiretos, incidentais ou 
              consequenciais decorrentes do uso da plataforma. O conteúdo é fornecido "como está" 
              sem garantias de qualquer tipo.
            </p>
          </CardContent>
        </Card>

        <Card className="govbr-card">
          <CardHeader>
            <CardTitle className="govbr-heading-3">7. Modificações dos Termos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              A SENASP/MJSP reserva-se o direito de modificar estes termos a qualquer momento. 
              As alterações entrarão em vigor imediatamente após a publicação na plataforma. 
              O uso continuado da BNSP constitui aceitação dos termos modificados.
            </p>
          </CardContent>
        </Card>

        <Card className="govbr-card">
          <CardHeader>
            <CardTitle className="govbr-heading-3 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-govbr-green-cool-vivid" />
              8. Contato
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              Para dúvidas sobre estes termos de uso, entre em contato com a SENASP através dos 
              canais oficiais disponíveis na Central de Ajuda da plataforma.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermosUso;
