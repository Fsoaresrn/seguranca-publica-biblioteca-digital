
import React, { useState } from 'react';
import { Users, Search, Plus, Edit, Trash2, Shield, CheckCircle, XCircle, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  institution: string;
  force: string;
  state: string;
  role: 'servidor' | 'moderador' | 'administrador';
  status: 'active' | 'inactive' | 'pending';
  registeredAt: Date;
  lastLogin?: Date;
  worksSubmitted: number;
  worksApproved: number;
}

const UserManagement: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Carlos Silva Santos',
      email: 'carlos.santos@pm.sp.gov.br',
      cpf: '123.456.789-01',
      institution: 'Academia de Polícia Militar do Estado de São Paulo',
      force: 'Polícia Militar',
      state: 'São Paulo',
      role: 'servidor',
      status: 'active',
      registeredAt: new Date('2024-01-15'),
      lastLogin: new Date('2024-02-10'),
      worksSubmitted: 3,
      worksApproved: 2
    },
    {
      id: '2',
      name: 'Ana Paula Rodrigues',
      email: 'ana.rodrigues@pc.rj.gov.br',
      cpf: '987.654.321-02',
      institution: 'Academia de Polícia Civil do Rio de Janeiro',
      force: 'Polícia Civil',
      state: 'Rio de Janeiro',
      role: 'moderador',
      status: 'active',
      registeredAt: new Date('2024-01-10'),
      lastLogin: new Date('2024-02-09'),
      worksSubmitted: 5,
      worksApproved: 4
    },
    {
      id: '3',
      name: 'Roberto Lima Pereira',
      email: 'roberto.pereira@pf.gov.br',
      cpf: '456.789.123-03',
      institution: 'Academia Nacional de Polícia Federal',
      force: 'Polícia Federal',
      state: 'Distrito Federal',
      role: 'servidor',
      status: 'active',
      registeredAt: new Date('2024-01-18'),
      lastLogin: new Date('2024-02-08'),
      worksSubmitted: 2,
      worksApproved: 1
    },
    {
      id: '4',
      name: 'Major Fernanda Costa',
      email: 'fernanda.costa@bombeiros.mg.gov.br',
      cpf: '789.123.456-04',
      institution: 'Academia de Bombeiros Militar de Minas Gerais',
      force: 'Bombeiros',
      state: 'Minas Gerais',
      role: 'servidor',
      status: 'active',
      registeredAt: new Date('2024-01-20'),
      lastLogin: new Date('2024-02-07'),
      worksSubmitted: 1,
      worksApproved: 1
    },
    {
      id: '5',
      name: 'João Mendes Silva',
      email: 'joao.silva@pericia.sp.gov.br',
      cpf: '321.654.987-05',
      institution: 'Instituto de Criminalística de São Paulo',
      force: 'Perícia Criminal',
      state: 'São Paulo',
      role: 'servidor',
      status: 'pending',
      registeredAt: new Date('2024-02-01'),
      worksSubmitted: 0,
      worksApproved: 0
    },
    {
      id: '6',
      name: 'Mariana Santos Admin',
      email: 'mariana.admin@senasp.gov.br',
      cpf: '654.321.987-06',
      institution: 'Secretaria Nacional de Segurança Pública',
      force: 'SENASP',
      state: 'Distrito Federal',
      role: 'administrador',
      status: 'active',
      registeredAt: new Date('2024-01-05'),
      lastLogin: new Date('2024-02-10'),
      worksSubmitted: 0,
      worksApproved: 0
    },
    {
      id: '7',
      name: 'Paulo Henrique Delegado',
      email: 'paulo.henrique@pc.go.gov.br',
      cpf: '147.258.369-07',
      institution: 'Academia de Polícia Civil de Goiás',
      force: 'Polícia Civil',
      state: 'Goiás',
      role: 'servidor',
      status: 'inactive',
      registeredAt: new Date('2024-01-25'),
      lastLogin: new Date('2024-01-30'),
      worksSubmitted: 1,
      worksApproved: 0
    }
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchTerm || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.institution.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    pending: users.filter(u => u.status === 'pending').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    moderators: users.filter(u => u.role === 'moderador').length,
    admins: users.filter(u => u.role === 'administrador').length
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = () => {
    if (!selectedUser) return;

    setUsers(prev => prev.map(user => 
      user.id === selectedUser.id ? selectedUser : user
    ));

    toast({
      title: 'Usuário atualizado',
      description: `As informações de ${selectedUser.name} foram atualizadas.`
    });

    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleApproveUser = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: 'active' as const } : user
    ));

    const user = users.find(u => u.id === userId);
    if (user) {
      console.log(`📧 Email de aprovação enviado para ${user.email}`);
      toast({
        title: 'Usuário aprovado',
        description: `${user.name} foi aprovado e notificado por email.`
      });
    }
  };

  const handleDeactivateUser = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: 'inactive' as const } : user
    ));

    const user = users.find(u => u.id === userId);
    if (user) {
      toast({
        title: 'Usuário desativado',
        description: `${user.name} foi desativado.`
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800">Inativo</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'administrador':
        return <Badge className="bg-purple-100 text-purple-800">Administrador</Badge>;
      case 'moderador':
        return <Badge className="bg-blue-100 text-blue-800">Moderador</Badge>;
      case 'servidor':
        return <Badge className="bg-gray-100 text-gray-800">Servidor</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center">
          <Users className="h-6 w-6 mr-2" />
          Gestão de Usuários
        </h1>
        <Button className="govbr-btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Novo Usuário
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-gray-600">Total de Usuários</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-sm text-gray-600">Ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-sm text-gray-600">Pendentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.inactive}</div>
            <p className="text-sm text-gray-600">Inativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.moderators}</div>
            <p className="text-sm text-gray-600">Moderadores</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{stats.admins}</div>
            <p className="text-sm text-gray-600">Administradores</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome, email ou instituição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por papel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os papéis</SelectItem>
                <SelectItem value="servidor">Servidor</SelectItem>
                <SelectItem value="moderador">Moderador</SelectItem>
                <SelectItem value="administrador">Administrador</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de usuários */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Instituição</TableHead>
                <TableHead>Força</TableHead>
                <TableHead>Papel</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Trabalhos</TableHead>
                <TableHead>Último Login</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{user.institution}</div>
                    <div className="text-xs text-gray-500">{user.state}</div>
                  </TableCell>
                  <TableCell>{user.force}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{user.worksApproved}/{user.worksSubmitted} aprovados</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.lastLogin ? (
                      <div className="text-sm">
                        {user.lastLogin.toLocaleDateString('pt-BR')}
                      </div>
                    ) : (
                      <span className="text-gray-400">Nunca</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      {user.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 hover:text-green-700"
                          onClick={() => handleApproveUser(user.id)}
                        >
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                      )}
                      {user.status === 'active' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeactivateUser(user.id)}
                        >
                          <XCircle className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de edição */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Nome</label>
                  <Input
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Papel</label>
                <Select
                  value={selectedUser.role}
                  onValueChange={(value) => setSelectedUser({...selectedUser, role: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="servidor">Servidor</SelectItem>
                    <SelectItem value="moderador">Moderador</SelectItem>
                    <SelectItem value="administrador">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={selectedUser.status}
                  onValueChange={(value) => setSelectedUser({...selectedUser, status: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateUser} className="govbr-btn-primary">
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
