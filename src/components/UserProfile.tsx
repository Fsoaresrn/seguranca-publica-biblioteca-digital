
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Shield, Edit, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface UserProfileProps {
  userName: string;
  userRole: 'servidor' | 'moderador' | 'administrador';
}

const UserProfile: React.FC<UserProfileProps> = ({ userName, userRole }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userName,
    email: 'joao.silva@ssp.go.gov.br',
    phone: '(62) 99999-9999',
    registration: '123456',
    force: 'Polícia Civil',
    state: 'Goiás',
    position: 'Delegado',
    institution: 'Polícia Civil do Estado de Goiás',
    experience: '15 anos',
    specialization: 'Investigação Criminal'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Aqui seria feita a chamada para salvar os dados
    console.log('Dados salvos:', profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reverter alterações se necessário
  };

  const getRoleLabel = (role: string) => {
    const roles = {
      servidor: 'Servidor Público',
      moderador: 'Moderador',
      administrador: 'Administrador SENASP'
    };
    return roles[role as keyof typeof roles] || 'Usuário';
  };

  const getRoleColor = (role: string) => {
    const colors = {
      servidor: 'bg-blue-100 text-blue-800',
      moderador: 'bg-green-100 text-green-800',
      administrador: 'bg-purple-100 text-purple-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="govbr-heading-1">Meu Perfil</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="govbr-btn-primary">
            <Edit className="h-4 w-4 mr-2" />
            Editar Perfil
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} className="govbr-btn-primary">
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
            <Button onClick={handleCancel} variant="outline">
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-xl bg-govbr-blue-warm-vivid text-white">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-govbr-blue-warm-dark mb-2">
                {profileData.name}
              </h2>
              <Badge className={`mb-2 ${getRoleColor(userRole)}`}>
                {getRoleLabel(userRole)}
              </Badge>
              <p className="text-gray-600 mb-1">{profileData.position}</p>
              <p className="text-sm text-gray-500">{profileData.institution}</p>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-govbr-blue-warm-vivid" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="registration">Matrícula</Label>
                <Input
                  id="registration"
                  value={profileData.registration}
                  disabled={true}
                  className="mt-1 bg-gray-50"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-govbr-green-cool-vivid" />
              Informações Profissionais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="force">Força</Label>
                <Input
                  id="force"
                  value={profileData.force}
                  disabled={true}
                  className="mt-1 bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="state">Estado</Label>
                <Input
                  id="state"
                  value={profileData.state}
                  disabled={true}
                  className="mt-1 bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="position">Cargo</Label>
                <Input
                  id="position"
                  value={profileData.position}
                  onChange={(e) => setProfileData({...profileData, position: e.target.value})}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="institution">Instituição</Label>
                <Input
                  id="institution"
                  value={profileData.institution}
                  onChange={(e) => setProfileData({...profileData, institution: e.target.value})}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="experience">Tempo de Experiência</Label>
                <Input
                  id="experience"
                  value={profileData.experience}
                  onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div className="md:col-span-3">
                <Label htmlFor="specialization">Área de Especialização</Label>
                <Input
                  id="specialization"
                  value={profileData.specialization}
                  onChange={(e) => setProfileData({...profileData, specialization: e.target.value})}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Estatísticas da Conta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-govbr-blue-warm-vivid">8</div>
                <div className="text-sm text-gray-600">Trabalhos Publicados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-govbr-green-cool-vivid">1,234</div>
                <div className="text-sm text-gray-600">Total de Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">456</div>
                <div className="text-sm text-gray-600">Visualizações</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">15</div>
                <div className="text-sm text-gray-600">Trabalhos Favoritos</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
