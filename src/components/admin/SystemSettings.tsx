import React, { useState } from 'react';
import { Settings, Database, Mail, Shield, Globe, Bell, Server, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import SystemDataManagement from './SystemDataManagement';

const SystemSettings: React.FC = () => {
  const { toast } = useToast();
  
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'BNSP - Biblioteca Nacional da Segurança Pública',
    siteDescription: 'Plataforma oficial da Secretaria Nacional de Segurança Pública para compartilhamento de conhecimento acadêmico',
    contactEmail: 'contato@bnsp.senasp.gov.br',
    supportEmail: 'suporte@bnsp.senasp.gov.br',
    maxFileSize: '50',
    allowedFileTypes: 'PDF, DOC, DOCX',
    maintenanceMode: false,
    registrationEnabled: true
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: 'smtp.gov.br',
    smtpPort: '587',
    smtpUsername: 'bnsp@senasp.gov.br',
    smtpPassword: '••••••••••',
    fromEmail: 'noreply@bnsp.senasp.gov.br',
    fromName: 'BNSP - Sistema Automatizado',
    enableEmailNotifications: true,
    enableModerationEmails: true,
    enableUserRegistrationEmails: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeout: '120',
    passwordMinLength: '8',
    requireSpecialChars: true,
    requireNumbers: true,
    enableTwoFactor: false,
    loginAttempts: '3',
    lockoutDuration: '30',
    enableCaptcha: true,
    allowedDomains: 'gov.br, militar.gov.br, bombeiros.gov.br'
  });

  const [moderationSettings, setModerationSettings] = useState({
    autoApprovalEnabled: false,
    requiredReviewers: '1',
    reviewTimeLimit: '7',
    enablePlagiarismCheck: true,
    minWorkLength: '1000',
    enableCategoryAutoCorrection: true,
    notifyAuthorsOnDecision: true,
    enableBulkActions: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    enableSystemNotifications: true,
    enableEmailDigest: true,
    digestFrequency: 'weekly',
    enableMaintenanceNotifications: true,
    enableSecurityAlerts: true,
    notificationRetentionDays: '30'
  });

  const handleSaveSettings = (category: string) => {
    console.log(`💾 Salvando configurações de ${category}:`);
    
    switch (category) {
      case 'general':
        console.log('Configurações Gerais:', generalSettings);
        break;
      case 'email':
        console.log('Configurações de Email:', emailSettings);
        break;
      case 'security':
        console.log('Configurações de Segurança:', securitySettings);
        break;
      case 'moderation':
        console.log('Configurações de Moderação:', moderationSettings);
        break;
      case 'notifications':
        console.log('Configurações de Notificações:', notificationSettings);
        break;
    }

    toast({
      title: 'Configurações salvas',
      description: `As configurações de ${category} foram atualizadas com sucesso.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center">
          <Settings className="h-6 w-6 mr-2" />
          Configurações do Sistema
        </h1>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="moderation">Moderação</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="data">Dados do Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Configurações Gerais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Nome do Site</label>
                  <Input
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email de Contato</label>
                  <Input
                    value={generalSettings.contactEmail}
                    onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Descrição do Site</label>
                <Textarea
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Tamanho Máximo de Arquivo (MB)</label>
                  <Input
                    value={generalSettings.maxFileSize}
                    onChange={(e) => setGeneralSettings({...generalSettings, maxFileSize: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Tipos de Arquivo Permitidos</label>
                  <Input
                    value={generalSettings.allowedFileTypes}
                    onChange={(e) => setGeneralSettings({...generalSettings, allowedFileTypes: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Modo de Manutenção</label>
                  <Switch
                    checked={generalSettings.maintenanceMode}
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, maintenanceMode: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Permitir Novos Registros</label>
                  <Switch
                    checked={generalSettings.registrationEnabled}
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, registrationEnabled: checked})}
                  />
                </div>
              </div>

              <Button onClick={() => handleSaveSettings('general')} className="govbr-btn-primary">
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações Gerais
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Configurações de Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Servidor SMTP</label>
                  <Input
                    value={emailSettings.smtpServer}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpServer: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Porta SMTP</label>
                  <Input
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Usuário SMTP</label>
                  <Input
                    value={emailSettings.smtpUsername}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Senha SMTP</label>
                  <Input
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Email de Origem</label>
                  <Input
                    value={emailSettings.fromEmail}
                    onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Nome de Origem</label>
                  <Input
                    value={emailSettings.fromName}
                    onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Habilitar Notificações por Email</label>
                  <Switch
                    checked={emailSettings.enableEmailNotifications}
                    onCheckedChange={(checked) => setEmailSettings({...emailSettings, enableEmailNotifications: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Emails de Moderação</label>
                  <Switch
                    checked={emailSettings.enableModerationEmails}
                    onCheckedChange={(checked) => setEmailSettings({...emailSettings, enableModerationEmails: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Emails de Registro de Usuário</label>
                  <Switch
                    checked={emailSettings.enableUserRegistrationEmails}
                    onCheckedChange={(checked) => setEmailSettings({...emailSettings, enableUserRegistrationEmails: checked})}
                  />
                </div>
              </div>

              <Button onClick={() => handleSaveSettings('email')} className="govbr-btn-primary">
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações de Email
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Configurações de Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Timeout de Sessão (minutos)</label>
                  <Input
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Tamanho Mínimo da Senha</label>
                  <Input
                    value={securitySettings.passwordMinLength}
                    onChange={(e) => setSecuritySettings({...securitySettings, passwordMinLength: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Tentativas de Login</label>
                  <Input
                    value={securitySettings.loginAttempts}
                    onChange={(e) => setSecuritySettings({...securitySettings, loginAttempts: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Duração do Bloqueio (minutos)</label>
                  <Input
                    value={securitySettings.lockoutDuration}
                    onChange={(e) => setSecuritySettings({...securitySettings, lockoutDuration: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Domínios Permitidos</label>
                <Textarea
                  value={securitySettings.allowedDomains}
                  onChange={(e) => setSecuritySettings({...securitySettings, allowedDomains: e.target.value})}
                  rows={2}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Exigir Caracteres Especiais</label>
                  <Switch
                    checked={securitySettings.requireSpecialChars}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, requireSpecialChars: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Exigir Números</label>
                  <Switch
                    checked={securitySettings.requireNumbers}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, requireNumbers: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Habilitar Autenticação de Dois Fatores</label>
                  <Switch
                    checked={securitySettings.enableTwoFactor}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, enableTwoFactor: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Habilitar CAPTCHA</label>
                  <Switch
                    checked={securitySettings.enableCaptcha}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, enableCaptcha: checked})}
                  />
                </div>
              </div>

              <Button onClick={() => handleSaveSettings('security')} className="govbr-btn-primary">
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações de Segurança
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="h-5 w-5 mr-2" />
                Configurações de Moderação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Revisores Necessários</label>
                  <Select
                    value={moderationSettings.requiredReviewers}
                    onValueChange={(value) => setModerationSettings({...moderationSettings, requiredReviewers: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Revisor</SelectItem>
                      <SelectItem value="2">2 Revisores</SelectItem>
                      <SelectItem value="3">3 Revisores</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Prazo para Revisão (dias)</label>
                  <Input
                    value={moderationSettings.reviewTimeLimit}
                    onChange={(e) => setModerationSettings({...moderationSettings, reviewTimeLimit: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Tamanho Mínimo do Trabalho (palavras)</label>
                <Input
                  value={moderationSettings.minWorkLength}
                  onChange={(e) => setModerationSettings({...moderationSettings, minWorkLength: e.target.value})}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Aprovação Automática</label>
                  <Switch
                    checked={moderationSettings.autoApprovalEnabled}
                    onCheckedChange={(checked) => setModerationSettings({...moderationSettings, autoApprovalEnabled: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Verificação de Plágio</label>
                  <Switch
                    checked={moderationSettings.enablePlagiarismCheck}
                    onCheckedChange={(checked) => setModerationSettings({...moderationSettings, enablePlagiarismCheck: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Correção Automática de Categoria</label>
                  <Switch
                    checked={moderationSettings.enableCategoryAutoCorrection}
                    onCheckedChange={(checked) => setModerationSettings({...moderationSettings, enableCategoryAutoCorrection: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Notificar Autores sobre Decisões</label>
                  <Switch
                    checked={moderationSettings.notifyAuthorsOnDecision}
                    onCheckedChange={(checked) => setModerationSettings({...moderationSettings, notifyAuthorsOnDecision: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Habilitar Ações em Lote</label>
                  <Switch
                    checked={moderationSettings.enableBulkActions}
                    onCheckedChange={(checked) => setModerationSettings({...moderationSettings, enableBulkActions: checked})}
                  />
                </div>
              </div>

              <Button onClick={() => handleSaveSettings('moderation')} className="govbr-btn-primary">
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações de Moderação
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Configurações de Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Frequência do Resumo por Email</label>
                  <Select
                    value={notificationSettings.digestFrequency}
                    onValueChange={(value) => setNotificationSettings({...notificationSettings, digestFrequency: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Retenção de Notificações (dias)</label>
                  <Input
                    value={notificationSettings.notificationRetentionDays}
                    onChange={(e) => setNotificationSettings({...notificationSettings, notificationRetentionDays: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Notificações do Sistema</label>
                  <Switch
                    checked={notificationSettings.enableSystemNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, enableSystemNotifications: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Resumo por Email</label>
                  <Switch
                    checked={notificationSettings.enableEmailDigest}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, enableEmailDigest: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Notificações de Manutenção</label>
                  <Switch
                    checked={notificationSettings.enableMaintenanceNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, enableMaintenanceNotifications: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Alertas de Segurança</label>
                  <Switch
                    checked={notificationSettings.enableSecurityAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, enableSecurityAlerts: checked})}
                  />
                </div>
              </div>

              <Button onClick={() => handleSaveSettings('notifications')} className="govbr-btn-primary">
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações de Notificações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data">
          <SystemDataManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
