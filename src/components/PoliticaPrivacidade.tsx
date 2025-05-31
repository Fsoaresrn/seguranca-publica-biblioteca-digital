
import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck } from 'lucide-react';
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
          Como coletamos, usamos e protegemos suas informações na BNSP
        </p>
      </div>

      <Alert>
        <Lock className="h-4 w-4" />
        <AlertDescription>
          Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD) - Lei nº 13.709/2018.
        </AlertDescription>
      </Alert>

      {/* Privacy Content */}
      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3 flex items-center">
            <Database className="h-5 w-5 mr-2 text-govbr-blue-warm-vivid" />
            1. Coleta de Dados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="govbr-body mb-4">Coletamos as seguintes informações:</p>
          <ul className="list-disc list-inside space-y-2 govbr-body">
            <li><strong>Dados pessoais:</strong> Nome, email, CPF, instituição de origem</li>
            <li><strong>Dados profissionais:</strong> Cargo, área de atuação, histórico acadêmico</li>
            <li><strong>Dados de navegação:</strong> Páginas visitadas, downloads realizados, tempo de sessão</li>
            <li><strong>Dados de interação:</strong> Trabalhos favoritados, comentários, avaliações</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3 flex items-center">
            <Eye className="h-5 w-5 mr-2 text-govbr-green-cool-vivid" />
            2. Finalidade do Uso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-2 govbr-body">
            <li>Verificação de elegibilidade e autenticação de usuários</li>
            <li>Personalização da experiência na plataforma</li>
            <li>Comunicação sobre atualizações e novos conteúdos</li>
            <li>Geração de estatísticas e relatórios de uso (dados anonimizados)</li>
            <li>Melhoria dos serviços oferecidos</li>
            <li>Cumprimento de obrigações legais e regulamentares</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3">3. Compartilhamento de Dados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="govbr-body">
            Seus dados pessoais não são compartilhados com terceiros, exceto:
          </p>
          <ul className="list-disc list-inside space-y-2 govbr-body mt-4">
            <li>Quando exigido por lei ou ordem judicial</li>
            <li>Para prestadores de serviço que auxiliam na operação da plataforma (sob contrato de confidencialidade)</li>
            <li>Em caso de transferência de responsabilidade da plataforma (com prévia notificação)</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3 flex items-center">
            <Lock className="h-5 w-5 mr-2 text-orange-600" />
            4. Segurança dos Dados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-2 govbr-body">
            <li>Criptografia de dados em trânsito e em repouso</li>
            <li>Controles de acesso baseados em funções</li>
            <li>Monitoramento contínuo de segurança</li>
            <li>Backups regulares e seguros</li>
            <li>Treinamento regular da equipe em segurança da informação</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3 flex items-center">
            <UserCheck className="h-5 w-5 mr-2 text-purple-600" />
            5. Seus Direitos (LGPD)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="govbr-body mb-4">Você tem direito a:</p>
          <ul className="list-disc list-inside space-y-2 govbr-body">
            <li><strong>Acesso:</strong> Conhecer quais dados possuímos sobre você</li>
            <li><strong>Correção:</strong> Atualizar dados incorretos ou desatualizados</li>
            <li><strong>Exclusão:</strong> Solicitar a remoção de seus dados pessoais</li>
            <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
            <li><strong>Oposição:</strong> Contestar o tratamento de seus dados</li>
            <li><strong>Informação:</strong> Obter detalhes sobre o uso de seus dados</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3">6. Retenção de Dados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="govbr-body">
            Os dados são mantidos pelo tempo necessário para cumprimento das finalidades descritas, 
            respeitando os prazos legais de retenção. Dados de navegação são anonimizados após 24 meses.
          </p>
        </CardContent>
      </Card>

      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3">7. Contato</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="govbr-body">
            Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
          </p>
          <ul className="list-none space-y-2 govbr-body mt-4">
            <li><strong>Email:</strong> privacidade@senasp.gov.br</li>
            <li><strong>Telefone:</strong> 0800 123 4567</li>
            <li><strong>Endereço:</strong> SENASP - Ministério da Justiça e Segurança Pública</li>
          </ul>
        </CardContent>
      </Card>

      <div className="text-center pt-6">
        <p className="text-sm text-gray-500">
          Esta política pode ser atualizada periodicamente. A versão mais atual estará sempre disponível nesta página.
        </p>
      </div>
    </div>
  );
};

export default PoliticaPrivacidade;
