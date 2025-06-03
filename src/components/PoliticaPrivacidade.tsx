
import React from 'react';
import { Shield, Lock, FileText, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PoliticaPrivacidade = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="govbr-heading-1 mb-4 flex items-center justify-center">
          <Shield className="h-10 w-10 mr-3 text-govbr-blue-warm-vivid" />
          Política de Privacidade
        </h1>
        <p className="govbr-body max-w-2xl mx-auto">
          Biblioteca Nacional da Segurança Pública - BNSP
        </p>
      </div>

      <Alert>
        <Lock className="h-4 w-4" />
        <AlertDescription>
          Esta política descreve como coletamos, usamos e protegemos suas informações pessoais na plataforma BNSP.
        </AlertDescription>
      </Alert>

      {/* Privacy Content */}
      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3 flex items-center">
            <Eye className="h-5 w-5 mr-2 text-govbr-blue-warm-vivid" />
            1. Coleta de Informações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="govbr-body">
            Coletamos informações necessárias para o funcionamento da plataforma e verificação de elegibilidade dos usuários:
          </p>
          <ul className="list-disc list-inside space-y-2 govbr-body">
            <li>Dados de identificação profissional (CPF, nome, órgão de vinculação)</li>
            <li>Informações de contato (email institucional)</li>
            <li>Dados de navegação e uso da plataforma</li>
            <li>Metadados dos trabalhos acadêmicos submetidos</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3">2. Finalidade do Tratamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="govbr-body">
            Os dados pessoais são tratados para as seguintes finalidades:
          </p>
          <ul className="list-disc list-inside space-y-2 govbr-body">
            <li>Verificação da elegibilidade para acesso à plataforma</li>
            <li>Personalização da experiência do usuário</li>
            <li>Gestão e moderação de conteúdo</li>
            <li>Comunicação sobre atualizações e funcionalidades</li>
            <li>Cumprimento de obrigações legais</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3">3. Base Legal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="govbr-body">
            O tratamento de dados pessoais na BNSP tem como base legal:
          </p>
          <ul className="list-disc list-inside space-y-2 govbr-body">
            <li>Execução de política pública (Art. 7º, III da LGPD)</li>
            <li>Legítimo interesse para segurança e funcionalidade da plataforma</li>
            <li>Consentimento para funcionalidades específicas</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3">4. Compartilhamento de Dados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="govbr-body">
            Os dados pessoais não são compartilhados com terceiros, exceto:
          </p>
          <ul className="list-disc list-inside space-y-2 govbr-body">
            <li>Quando necessário para cumprimento de obrigação legal</li>
            <li>Para execução de políticas públicas</li>
            <li>Com autorização expressa do titular</li>
            <li>Para proteção da vida ou integridade física</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3">5. Segurança dos Dados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="govbr-body">
            Implementamos medidas técnicas e organizacionais para proteger seus dados:
          </p>
          <ul className="list-disc list-inside space-y-2 govbr-body">
            <li>Criptografia de dados em trânsito e em repouso</li>
            <li>Controles de acesso baseados em perfis</li>
            <li>Monitoramento de segurança contínuo</li>
            <li>Backup e recuperação de dados</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3">6. Direitos dos Titulares</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="govbr-body">
            Conforme a LGPD, você tem direito a:
          </p>
          <ul className="list-disc list-inside space-y-2 govbr-body">
            <li>Confirmação da existência de tratamento</li>
            <li>Acesso aos dados</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados</li>
            <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
            <li>Portabilidade dos dados</li>
            <li>Informação sobre o compartilhamento</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3">7. Retenção de Dados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="govbr-body">
            Os dados pessoais são mantidos pelo período necessário para cumprimento das finalidades 
            ou conforme exigido por lei. Dados de trabalhos acadêmicos podem ser preservados por 
            interesse histórico e científico.
          </p>
        </CardContent>
      </Card>

      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3">8. Contato</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="govbr-body">
            Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato 
            através da Central de Ajuda ou pelo canal oficial da SENASP.
          </p>
        </CardContent>
      </Card>

      <div className="text-center pt-6">
        <p className="text-sm text-gray-500">
          Última atualização: Janeiro de 2025
        </p>
      </div>
    </div>
  );
};

export default PoliticaPrivacidade;
