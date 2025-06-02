
import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface DataItem {
  id: number;
  name: string;
}

const SystemDataManagement: React.FC = () => {
  const { toast } = useToast();
  
  const [categories, setCategories] = useState<DataItem[]>([
    { id: 1, name: 'Segurança Pública' },
    { id: 2, name: 'Investigação Criminal' },
    { id: 3, name: 'Policiamento Comunitário' },
    { id: 4, name: 'Gestão Policial' },
    { id: 5, name: 'Direitos Humanos' },
    { id: 6, name: 'Tecnologia em Segurança' },
    { id: 7, name: 'Prevenção da Violência' }
  ]);

  const [securityForces, setSecurityForces] = useState<DataItem[]>([
    { id: 1, name: 'Polícia Federal' },
    { id: 2, name: 'Polícia Civil' },
    { id: 3, name: 'Polícia Militar' },
    { id: 4, name: 'Corpo de Bombeiros' },
    { id: 5, name: 'Polícia Rodoviária Federal' },
    { id: 6, name: 'Guarda Municipal' }
  ]);

  const [institutions, setInstitutions] = useState<DataItem[]>([
    { id: 1, name: 'Academia Nacional de Polícia' },
    { id: 2, name: 'Academia de Polícia Civil - SP' },
    { id: 3, name: 'Academia de Polícia Militar - RJ' },
    { id: 4, name: 'Centro de Formação e Aperfeiçoamento - RS' },
    { id: 5, name: 'Instituto Superior de Ciências Policiais' }
  ]);

  const [workTypes, setWorkTypes] = useState<DataItem[]>([
    { id: 1, name: 'Artigo Científico' },
    { id: 2, name: 'Monografia' },
    { id: 3, name: 'Dissertação' },
    { id: 4, name: 'Tese' },
    { id: 5, name: 'TCC' },
    { id: 6, name: 'Livro' },
    { id: 7, name: 'Ebook' },
    { id: 8, name: 'Revista' }
  ]);

  const [editingItem, setEditingItem] = useState<{ type: string; item: DataItem | null }>({ type: '', item: null });
  const [newItemName, setNewItemName] = useState('');

  const handleAdd = (type: string) => {
    if (!newItemName.trim()) return;

    const newItem = {
      id: Date.now(),
      name: newItemName.trim()
    };

    switch (type) {
      case 'categories':
        setCategories([...categories, newItem]);
        break;
      case 'securityForces':
        setSecurityForces([...securityForces, newItem]);
        break;
      case 'institutions':
        setInstitutions([...institutions, newItem]);
        break;
      case 'workTypes':
        setWorkTypes([...workTypes, newItem]);
        break;
    }

    setNewItemName('');
    toast({
      title: 'Item adicionado',
      description: 'O novo item foi adicionado com sucesso.'
    });
  };

  const handleEdit = (type: string, item: DataItem) => {
    setEditingItem({ type, item });
    setNewItemName(item.name);
  };

  const handleSaveEdit = () => {
    if (!newItemName.trim() || !editingItem.item) return;

    const updatedItem = { ...editingItem.item, name: newItemName.trim() };

    switch (editingItem.type) {
      case 'categories':
        setCategories(categories.map(cat => cat.id === updatedItem.id ? updatedItem : cat));
        break;
      case 'securityForces':
        setSecurityForces(securityForces.map(force => force.id === updatedItem.id ? updatedItem : force));
        break;
      case 'institutions':
        setInstitutions(institutions.map(inst => inst.id === updatedItem.id ? updatedItem : inst));
        break;
      case 'workTypes':
        setWorkTypes(workTypes.map(type => type.id === updatedItem.id ? updatedItem : type));
        break;
    }

    setEditingItem({ type: '', item: null });
    setNewItemName('');
    toast({
      title: 'Item atualizado',
      description: 'O item foi atualizado com sucesso.'
    });
  };

  const handleDelete = (type: string, itemId: number) => {
    switch (type) {
      case 'categories':
        setCategories(categories.filter(cat => cat.id !== itemId));
        break;
      case 'securityForces':
        setSecurityForces(securityForces.filter(force => force.id !== itemId));
        break;
      case 'institutions':
        setInstitutions(institutions.filter(inst => inst.id !== itemId));
        break;
      case 'workTypes':
        setWorkTypes(workTypes.filter(type => type.id !== itemId));
        break;
    }

    toast({
      title: 'Item removido',
      description: 'O item foi removido com sucesso.'
    });
  };

  const renderDataList = (items: DataItem[], type: string, title: string) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder={`Nome do novo ${title.toLowerCase()}`}
            value={editingItem.type === type ? newItemName : ''}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          {editingItem.type === type && editingItem.item ? (
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSaveEdit}>
                <Save className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => {
                setEditingItem({ type: '', item: null });
                setNewItemName('');
              }}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={() => handleAdd(type)}>
              <Plus className="h-3 w-3 mr-1" />
              Adicionar
            </Button>
          )}
        </div>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-2 border rounded">
              <span>{item.name}</span>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(type, item)}
                >
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(type, item.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <Badge variant="secondary">
          Total: {items.length} itens
        </Badge>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Gestão de Dados do Sistema</h2>
        <p className="text-gray-600">
          Gerencie as categorias, forças de segurança, instituições e tipos de trabalho do sistema.
        </p>
      </div>

      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="categories">Categorias</TabsTrigger>
          <TabsTrigger value="forces">Forças de Segurança</TabsTrigger>
          <TabsTrigger value="institutions">Instituições</TabsTrigger>
          <TabsTrigger value="workTypes">Tipos de Trabalho</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          {renderDataList(categories, 'categories', 'Categorias')}
        </TabsContent>

        <TabsContent value="forces">
          {renderDataList(securityForces, 'securityForces', 'Forças de Segurança')}
        </TabsContent>

        <TabsContent value="institutions">
          {renderDataList(institutions, 'institutions', 'Instituições')}
        </TabsContent>

        <TabsContent value="workTypes">
          {renderDataList(workTypes, 'workTypes', 'Tipos de Trabalho')}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemDataManagement;
