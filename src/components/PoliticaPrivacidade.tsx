
import React from 'react';
import { Shield, Eye, Lock, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PoliticaPrivacidade = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="govbr-heading-1 mb-4 flex items-center justify-center">
          <Shield className="h-10 w-10 mr-3 text-govbr-green-cool-vivid" />
          Política de Privacidade
        </h1>
        <p className="govbr-body max-w-2xl mx-auto">
          Como coletamos, utilizamos e protegemos suas informações pessoais na BNSP
        </p>
        <Badge variant="secondary" className="mt-4">
          Conforme LGPD - Lei 13.709/2018
        </Badge>
      </div>

      {/* Informações Gerais */}
      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3 flex items-center">
            <Eye className="h-5 w-5 mr-2 text-govbr-blue-warm-vivid" />
            Informações Gerais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 leading-relaxed">
            Esta Política de Privacidade descreve como a Secretaria Nacional de Segurança Pública (SENASP), 
            vinculada ao Ministério da Justiça e Segurança Pública (MJSP), coleta, utiliza, armazena e 
            protege as informações pessoais dos usuários da Biblioteca Nacional da Segurança Pública (BNSP).
          </p>
        </CardContent>
      </Card>

      {/* Seções da Política */}
      <div className="space-y-6">
        <Card className="govbr-card">
          <CardHeader>
            <CardTitle className="govbr-heading-3">1. Dados Coletados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-govbr-blue-warm-dark mb-2">Dados de Identificação:</h4>
                <ul className="list-disc ml-6 space-y-1 text-gray-600">
                  <li>Nome completo</li>
                  <li>CPF</li>
                  <li>E-mail institucional ou pessoal</li>
                  <li>Instituição de vínculo</li>
                  <li>Cargo ou função</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-govbr-blue-warm-dark mb-2">Dados de Navegação:</h4>
                <ul className="list-disc ml-6 space-y-1 text-gray-600">
                  <li>Endereço IP</li>
                  <li>Logs de acesso</li>
                  <li>Páginas visitadas</li>
                  <li>Tempo de permanência</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="govbr-card">
          <CardHeader>
            <CardTitle className="govbr-heading-3">2. Finalidade do Tratamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-gray-600">
              <p>Os dados pessoais são coletados e tratados para:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Permitir o acesso e uso da plataforma BNSP</li>
                <li>Verificar a elegibilidade do usuário</li>
                <li>Personalizar a experiência do usuário</li>
                <li>Gerar estatísticas de uso (dados anonimizados)</li>
                <li>Comunicar atualizações e melhorias</li>
                <li>Garantir a segurança da plataforma</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="govbr-card">
          <CardHeader>
            <CardTitle className="govbr-heading-3">3. Base Legal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              O tratamento de dados pessoais na BNSP fundamenta-se no artigo 7º da LGPD, 
              especificamente na execução de políticas públicas (inciso III) e no exercício 
              regular de direitos em processo judicial, administrativo ou arbitral (inciso VI).
            </p>
          </CardContent>
        </Card>

        <Card className="govbr-card">
          <CardHeader>
            <CardTitle className="govbr-heading-3 flex items-center">
              <Lock className="h-5 w-5 mr-2 text-govbr-green-cool-vivid" />
              4. Medidas de Segurança
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-gray-600">
              <p>Para proteger seus dados, implementamos:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controles de acesso baseados em perfis</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Backups regulares e seguros</li>
                <li>Treinamento regular da equipe</li>
                <li>Auditorias periódicas de segurança</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="govbr-card">
          <CardHeader>
            <CardTitle className="govbr-heading-3">5. Compartilhamento de Dados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              Os dados pessoais não são comercializados, transferidos ou divulgados a terceiros, 
              exceto quando necessário para cumprir obrigação legal, regulatória ou ordem judicial, 
              ou quando autorizado expressamente pelo titular.
            </p>
          </CardContent>
        </Card>

        <Card className="govbr-card">
          <CardHeader>
            <CardTitle className="govbr-heading-3">6. Seus Direitos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-gray-600">
              <p>Como titular de dados, você tem direito a:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Confirmar a existência de tratamento</li>
                <li>Acessar seus dados</li>
                <li>Corrigir dados incompletos ou incorretos</li>
                <li>Anonimizar, bloquear ou eliminar dados desnecessários</li>
                <li>Solicitar portabilidade dos dados</li>
                <li>Eliminar dados tratados com consentimento</li>
                <li>Obter informações sobre compartilhamento</li>
                <li>Revogar consentimento</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="govbr-card">
          <CardHeader>
            <CardTitle className="govbr-heading-3 flex items-center">
              <Database className="h-5 w-5 mr-2 text-govbr-blue-warm-vivid" />
              7. Retenção de Dados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              Os dados pessoais são mantidos pelo tempo necessário para cumprir as finalidades 
              descritas nesta política, respeitando os prazos legais de retenção aplicáveis às 
              atividades da administração pública federal.
            </p>
          </CardContent>
        </Card>

        <Card className="govbr-card">
          <CardHeader>
            <CardTitle className="govbr-heading-3">8. Contato - Encarregado de Dados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-gray-600">
              <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta política:</p>
              <div className="bg-govbr-gray-5 p-4 rounded-lg">
                <p><strong>Encarregado de Dados Pessoais da SENASP/MJSP</strong></p>
                <p>E-mail: dpo.senasp@mj.gov.br</p>
                <p>Telefone: 0800 123 4567</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="govbr-card">
          <CardHeader>
            <CardTitle className="govbr-heading-3">9. Alterações na Política</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              Esta política pode ser atualizada periodicamente. Alterações significativas serão 
              comunicadas aos usuários através da plataforma ou por e-mail. A versão mais recente 
              estará sempre disponível na BNSP.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PoliticaPrivacidade;
