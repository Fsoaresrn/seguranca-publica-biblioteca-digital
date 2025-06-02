
import React, { useState } from 'react';
import { X, User, FileText, Settings, Server, CheckCircle, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface PendingAction {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  count: number;
  type: 'users' | 'moderation' | 'categories' | 'backup';
  details?: any[];
}

interface PendingActionsDetailProps {
  action: PendingAction | null;
  isOpen: boolean;
  onClose: () => void;
  onResolve: (actionId: number, resolution: string) => void;
}

const PendingActionsDetail: React.FC<PendingActionsDetailProps> = ({
  action,
  isOpen,
  onClose,
  onResolve
}) => {
  const { toast } = useToast();
  const [resolution, setResolution] = useState('');

  if (!action) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'users': return User;
      case 'moderation': return FileText;
      case 'categories': return Settings;
      case 'backup': return Server;
      default: return FileText;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const mockDetails = {
    1: [ // Revisar novos usuários
      {
        id: 1,
        name: 'Maria Silva Oliveira',
        email: 'maria.oliveira@pc.ce.gov.br',
        institution: 'Academia de Polícia Civil do Ceará',
        force: 'Polícia Civil',
        registeredAt: '2024-02-08',
        cpf: '123.456.789-10'
      },
      {
        id: 2,
        name: 'João Carlos Santos',
        email: 'joao.santos@pm.pe.gov.br',
        institution: 'Academia de Polícia Militar de Pernambuco',
        force: 'Polícia Militar',
        registeredAt: '2024-02-09',
        cpf: '987.654.321-11'
      },
      {
        id: 3,
        name: 'Ana Beatriz Costa',
        email: 'ana.costa@bombeiros.sc.gov.br',
        institution: 'Academia do Corpo de Bombeiros de SC',
        force: 'Bombeiros',
        registeredAt: '2024-02-10',
        cpf: '456.789.123-12'
      }
    ],
    2: [ // Moderar trabalhos
      {
        id: 1,
        title: 'Inteligência Artificial na Investigação Criminal',
        author: 'Dr. Pedro Henrique Silva',
        institution: 'Academia de Polícia Federal',
        submittedAt: '2024-02-05',
        category: 'Tecnologia em Segurança'
      },
      {
        id: 2,
        title: 'Prevenção da Violência Urbana: Novas Abordagens',
        author: 'Dra. Carla Mendes',
        institution: 'Academia de Polícia Civil - RJ',
        submittedAt: '2024-02-07',
        category: 'Prevenção da Violência'
      }
    ],
    3: [ // Atualizar categorias
      {
        description: 'Revisão geral das categorias de trabalhos conforme nova taxonomia da SENASP',
        affectedCategories: ['Segurança Pública', 'Investigação Criminal', 'Gestão Policial'],
        requestedBy: 'Coordenação Acadêmica SENASP',
        deadline: '2024-02-20'
      }
    ],
    4: [ // Configurar backup
      {
        description: 'Sistema de backup automático precisa ser configurado para garantir a segurança dos dados',
        currentStatus: 'Backup manual funcionando',
        requiredActions: ['Configurar agendamento automático', 'Testar restauração', 'Documentar procedimentos'],
        priority: 'Crítica - dados em risco'
      }
    ]
  };

  const handleResolveAction = () => {
    if (!resolution.trim()) {
      toast({
        title: 'Erro',
        description: 'Por favor, adicione uma descrição da resolução.',
        variant: 'destructive'
      });
      return;
    }

    onResolve(action.id, resolution);
    setResolution('');
    onClose();
  };

  const Icon = getIcon(action.type);
  const details = mockDetails[action.id as keyof typeof mockDetails] || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {action.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações da ação */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <Badge className={getPriorityColor(action.priority)}>
                  Prioridade: {action.priority === 'high' ? 'Alta' : action.priority === 'medium' ? 'Média' : 'Baixa'}
                </Badge>
                <Badge variant="outline">
                  {action.count} {action.count === 1 ? 'item' : 'itens'}
                </Badge>
              </div>
              <p className="text-gray-600">{action.description}</p>
            </CardContent>
          </Card>

          {/* Detalhes específicos */}
          <Card>
            <CardHeader>
              <CardTitle>Detalhes</CardTitle>
            </CardHeader>
            <CardContent>
              {action.id === 1 && ( // Usuários pendentes
                <div className="space-y-4">
                  {details.map((user: any) => (
                    <div key={user.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-sm text-gray-600">{user.institution}</p>
                          <p className="text-sm text-gray-600">Força: {user.force}</p>
                          <p className="text-sm text-gray-600">CPF: {user.cpf}</p>
                          <p className="text-sm text-gray-500">Registrado em: {user.registeredAt}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-green-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Aprovar
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <XCircle className="h-3 w-3 mr-1" />
                            Rejeitar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {action.id === 2 && ( // Trabalhos para moderar
                <div className="space-y-4">
                  {details.map((work: any) => (
                    <div key={work.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{work.title}</h4>
                          <p className="text-sm text-gray-600">Autor: {work.author}</p>
                          <p className="text-sm text-gray-600">{work.institution}</p>
                          <p className="text-sm text-gray-600">Categoria: {work.category}</p>
                          <p className="text-sm text-gray-500">Submetido em: {work.submittedAt}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Revisar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {action.id === 3 && ( // Atualizar categorias
                <div className="space-y-4">
                  {details.map((item: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <p className="mb-2">{item.description}</p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Categorias afetadas:</strong> {item.affectedCategories.join(', ')}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Solicitado por:</strong> {item.requestedBy}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Prazo:</strong> {item.deadline}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {action.id === 4 && ( // Configurar backup
                <div className="space-y-4">
                  {details.map((item: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <p className="mb-2">{item.description}</p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Status atual:</strong> {item.currentStatus}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Ações necessárias:</strong>
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-600 mb-2">
                        {item.requiredActions.map((action: string, i: number) => (
                          <li key={i}>{action}</li>
                        ))}
                      </ul>
                      <Badge className="bg-red-100 text-red-800">
                        {item.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resolução */}
          <Card>
            <CardHeader>
              <CardTitle>Resolução da Ação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Descrição da resolução</label>
                  <Textarea
                    placeholder="Descreva como esta ação foi resolvida..."
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button onClick={handleResolveAction} className="govbr-btn-primary">
                    Marcar como Resolvida
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PendingActionsDetail;
