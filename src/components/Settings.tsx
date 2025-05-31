
import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Eye, Shield, Download, Mail, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      browser: true,
      newSubmissions: true,
      approvals: true,
      comments: false,
      newsletter: true
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showPhone: false,
      allowContact: true
    },
    preferences: {
      language: 'pt-BR',
      theme: 'light',
      itemsPerPage: '10',
      autoSave: true,
      downloadFormat: 'pdf'
    }
  });

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const saveSettings = () => {
    console.log('Salvando configurações:', settings);
    // Aqui seria feita a chamada para salvar as configurações
  };

  const resetSettings = () => {
    console.log('Restaurando configurações padrão');
    // Aqui seria feita a restauração das configurações padrão
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="govbr-heading-1 flex items-center">
            <SettingsIcon className="h-8 w-8 mr-3 text-govbr-blue-warm-vivid" />
            Configurações
          </h1>
          <p className="text-gray-600 mt-2">
            Personalize sua experiência na plataforma BNSP
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetSettings}>
            Restaurar Padrão
          </Button>
          <Button className="govbr-btn-primary" onClick={saveSettings}>
            Salvar Alterações
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2 text-govbr-blue-warm-vivid" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Notificações por Email</Label>
                <p className="text-sm text-gray-500">Receber notificações no seu email</p>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.notifications.email}
                onCheckedChange={(checked) => updateSetting('notifications', 'email', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="browser-notifications">Notificações do Navegador</Label>
                <p className="text-sm text-gray-500">Notificações push no navegador</p>
              </div>
              <Switch
                id="browser-notifications"
                checked={settings.notifications.browser}
                onCheckedChange={(checked) => updateSetting('notifications', 'browser', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="new-submissions">Novas Submissões</Label>
                <p className="text-sm text-gray-500">Avisar sobre novos trabalhos para moderar</p>
              </div>
              <Switch
                id="new-submissions"
                checked={settings.notifications.newSubmissions}
                onCheckedChange={(checked) => updateSetting('notifications', 'newSubmissions', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="approvals">Aprovações</Label>
                <p className="text-sm text-gray-500">Notificar sobre aprovações de trabalhos</p>
              </div>
              <Switch
                id="approvals"
                checked={settings.notifications.approvals}
                onCheckedChange={(checked) => updateSetting('notifications', 'approvals', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="comments">Comentários</Label>
                <p className="text-sm text-gray-500">Avisar sobre novos comentários</p>
              </div>
              <Switch
                id="comments"
                checked={settings.notifications.comments}
                onCheckedChange={(checked) => updateSetting('notifications', 'comments', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newsletter">Newsletter</Label>
                <p className="text-sm text-gray-500">Receber newsletter mensal</p>
              </div>
              <Switch
                id="newsletter"
                checked={settings.notifications.newsletter}
                onCheckedChange={(checked) => updateSetting('notifications', 'newsletter', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-govbr-green-cool-vivid" />
              Privacidade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="profile-visible">Perfil Visível</Label>
                <p className="text-sm text-gray-500">Permitir que outros vejam seu perfil</p>
              </div>
              <Switch
                id="profile-visible"
                checked={settings.privacy.profileVisible}
                onCheckedChange={(checked) => updateSetting('privacy', 'profileVisible', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-email">Mostrar Email</Label>
                <p className="text-sm text-gray-500">Exibir email no perfil público</p>
              </div>
              <Switch
                id="show-email"
                checked={settings.privacy.showEmail}
                onCheckedChange={(checked) => updateSetting('privacy', 'showEmail', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-phone">Mostrar Telefone</Label>
                <p className="text-sm text-gray-500">Exibir telefone no perfil público</p>
              </div>
              <Switch
                id="show-phone"
                checked={settings.privacy.showPhone}
                onCheckedChange={(checked) => updateSetting('privacy', 'showPhone', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="allow-contact">Permitir Contato</Label>
                <p className="text-sm text-gray-500">Outros usuários podem entrar em contato</p>
              </div>
              <Switch
                id="allow-contact"
                checked={settings.privacy.allowContact}
                onCheckedChange={(checked) => updateSetting('privacy', 'allowContact', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-purple-600" />
              Preferências
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="language">Idioma</Label>
              <Select value={settings.preferences.language} onValueChange={(value) => updateSetting('preferences', 'language', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="es-ES">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="theme">Tema</Label>
              <Select value={settings.preferences.theme} onValueChange={(value) => updateSetting('preferences', 'theme', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="dark">Escuro</SelectItem>
                  <SelectItem value="auto">Automático</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="items-per-page">Itens por Página</Label>
              <Select value={settings.preferences.itemsPerPage} onValueChange={(value) => updateSetting('preferences', 'itemsPerPage', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 itens</SelectItem>
                  <SelectItem value="10">10 itens</SelectItem>
                  <SelectItem value="25">25 itens</SelectItem>
                  <SelectItem value="50">50 itens</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="download-format">Formato de Download Padrão</Label>
              <Select value={settings.preferences.downloadFormat} onValueChange={(value) => updateSetting('preferences', 'downloadFormat', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="docx">DOCX</SelectItem>
                  <SelectItem value="original">Formato Original</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-save">Salvamento Automático</Label>
                <p className="text-sm text-gray-500">Salvar rascunhos automaticamente</p>
              </div>
              <Switch
                id="auto-save"
                checked={settings.preferences.autoSave}
                onCheckedChange={(checked) => updateSetting('preferences', 'autoSave', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Management */}
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Gerenciamento da Conta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Exportar Dados</h4>
              <p className="text-sm text-gray-500 mb-3">
                Baixar uma cópia de todos os seus dados da plataforma
              </p>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Exportar Meus Dados
              </Button>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-2 text-red-600">Zona de Perigo</h4>
              <p className="text-sm text-gray-500 mb-3">
                Ações irreversíveis que afetam permanentemente sua conta
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                  Desativar Conta
                </Button>
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                  Excluir Conta Permanentemente
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
