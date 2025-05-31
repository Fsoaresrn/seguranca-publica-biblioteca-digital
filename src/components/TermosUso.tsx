
import React from 'react';
import { FileText, Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
          Biblioteca Nacional da Segurança Pública - BNSP
        </p>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Última atualização: Janeiro de 2024. Ao utilizar esta plataforma, você concorda com os termos descritos abaixo.
        </AlertDescription>
      </Alert>

      {/* Terms Content */}
      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3">1. Definições</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="govbr-body">
            A Biblioteca Nacional da Segurança Pública (BNSP) é uma plataforma digital mantida pela Secretaria Nacional de Segurança Pública (SENASP) 
            do Ministério da Justiça e Segurança Pública, destinada ao compartilhamento de conhecimento acadêmico entre servidores de segurança pública.
          </p>
        </CardContent>
      </Card>

      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3">2. Acesso e Elegibilidade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-2 govbr-body">
            <li>O acesso à plataforma é restrito a servidores públicos da área de segurança pública</li>
            <li>Usuários devem comprovar vínculo institucional através de documentação oficial</li>
            <li>É vedado o compartilhamento de credenciais de acesso com terceiros</li>
            <li>O cadastro deve conter informações verdadeiras e atualizadas</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3">3. Uso da Plataforma</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-2 govbr-body">
            <li>O conteúdo disponibilizado destina-se exclusivamente a fins acadêmicos e profissionais</li>
            <li>É proibida a reprodução comercial dos materiais sem autorização expressa</li>
            <li>Usuários devem respeitar os direitos autorais dos trabalhos publicados</li>
            <li>A citação adequada das fontes é obrigatória em qualquer uso dos materiais</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3">4. Submissão de Trabalhos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-2 govbr-body">
            <li>Autores garantem a originalidade e veracidade dos trabalhos submetidos</li>
            <li>Trabalhos passarão por processo de revisão antes da publicação</li>
            <li>A BNSP reserva-se o direito de recusar publicações que não atendam aos critérios técnicos</li>
            <li>Autores mantêm os direitos autorais, concedendo licença de uso à BNSP</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-govbr-green-cool-vivid" />
            5. Responsabilidades
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="govbr-body">
            A BNSP não se responsabiliza por danos decorrentes do uso inadequado da plataforma ou do conteúdo disponibilizado. 
            Usuários são responsáveis por manter a segurança de suas credenciais e pelo uso apropriado dos recursos da plataforma.
          </p>
        </CardContent>
      </Card>

      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3">6. Modificações dos Termos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="govbr-body">
            Estes termos podem ser atualizados periodicamente. Usuários serão notificados sobre mudanças significativas 
            e o uso continuado da plataforma implica na aceitação dos novos termos.
          </p>
        </CardContent>
      </Card>

      <div className="text-center pt-6">
        <p className="text-sm text-gray-500">
          Para dúvidas sobre estes termos, entre em contato através da Central de Ajuda.
        </p>
      </div>
    </div>
  );
};

export default TermosUso;
