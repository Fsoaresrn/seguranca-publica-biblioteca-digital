
import React, { useState } from 'react';
import { FolderPlus, Save, X, Plus, Search, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const CreateCollection: React.FC = () => {
  const [collectionData, setCollectionData] = useState({
    name: '',
    description: '',
    category: '',
    isPublic: true,
    tags: [] as string[],
    selectedWorks: [] as number[]
  });

  const [currentTag, setCurrentTag] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data para trabalhos disponíveis
  const availableWorks = [
    {
      id: 1,
      title: 'Investigação Digital e Crimes Cibernéticos',
      author: 'Dr. Roberto Lima',
      type: 'Artigo Científico'
    },
    {
      id: 2,
      title: 'Policiamento Comunitário Eficaz',
      author: 'Maj. Ana Santos',
      type: 'Dissertação'
    },
    {
      id: 3,
      title: 'Análise Balística Forense',
      author: 'Perito João Silva',
      type: 'Monografia'
    },
    {
      id: 4,
      title: 'Gestão de Crises Policiais',
      author: 'Cel. Marina Costa',
      type: 'TCC'
    }
  ];

  const categories = [
    'Investigação Criminal',
    'Policiamento Comunitário',
    'Tecnologia Policial',
    'Direitos Humanos',
    'Gestão Policial',
    'Prevenção Criminal'
  ];

  const filteredWorks = availableWorks.filter(work =>
    work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    work.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addTag = () => {
    if (currentTag.trim() && !collectionData.tags.includes(currentTag.trim())) {
      setCollectionData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setCollectionData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const toggleWorkSelection = (workId: number) => {
    setCollectionData(prev => ({
      ...prev,
      selectedWorks: prev.selectedWorks.includes(workId)
        ? prev.selectedWorks.filter(id => id !== workId)
        : [...prev.selectedWorks, workId]
    }));
  };

  const handleSave = () => {
    console.log('Salvando coleção:', collectionData);
    // Aqui seria feita a chamada para salvar a coleção
  };

  const handleCancel = () => {
    console.log('Cancelando criação de coleção');
    // Voltar para a página anterior
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="govbr-heading-1 flex items-center">
            <FolderPlus className="h-8 w-8 mr-3 text-govbr-blue-warm-vivid" />
            Criar Nova Coleção
          </h1>
          <p className="text-gray-600 mt-2">
            Organize trabalhos acadêmicos por tema ou área de interesse
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button className="govbr-btn-primary" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Salvar Coleção
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informações da Coleção */}
        <Card>
          <CardHeader>
            <CardTitle>Informações da Coleção</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="collection-name">Nome da Coleção *</Label>
              <Input
                id="collection-name"
                placeholder="Ex: Investigação Criminal Digital"
                value={collectionData.name}
                onChange={(e) => setCollectionData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="collection-description">Descrição</Label>
              <Textarea
                id="collection-description"
                placeholder="Descreva o objetivo e conteúdo desta coleção..."
                value={collectionData.description}
                onChange={(e) => setCollectionData(prev => ({ ...prev, description: e.target.value }))}
                className="mt-1"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="collection-category">Categoria</Label>
              <Select value={collectionData.category} onValueChange={(value) => setCollectionData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="is-public">Coleção Pública</Label>
                <p className="text-sm text-gray-500">Outros usuários podem visualizar esta coleção</p>
              </div>
              <Switch
                id="is-public"
                checked={collectionData.isPublic}
                onCheckedChange={(checked) => setCollectionData(prev => ({ ...prev, isPublic: checked }))}
              />
            </div>

            <div>
              <Label>Tags</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  placeholder="Adicionar tag..."
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button type="button" size="sm" onClick={addTag}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {collectionData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                    {tag} <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seleção de Trabalhos */}
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Trabalhos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar trabalhos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredWorks.map((work) => (
                  <div 
                    key={work.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      collectionData.selectedWorks.includes(work.id)
                        ? 'border-govbr-blue-warm-vivid bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleWorkSelection(work.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="h-4 w-4 text-govbr-blue-warm-vivid" />
                          <h4 className="font-medium text-sm">{work.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600">por {work.author}</p>
                        <Badge variant="outline" className="text-xs mt-1">{work.type}</Badge>
                      </div>
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        collectionData.selectedWorks.includes(work.id)
                          ? 'border-govbr-blue-warm-vivid bg-govbr-blue-warm-vivid'
                          : 'border-gray-300'
                      }`}>
                        {collectionData.selectedWorks.includes(work.id) && (
                          <div className="w-2 h-2 bg-white rounded-sm"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {collectionData.selectedWorks.length > 0 && (
                <div className="mt-4 p-3 bg-govbr-blue-warm-10 rounded-lg">
                  <p className="text-sm font-medium text-govbr-blue-warm-dark">
                    {collectionData.selectedWorks.length} {collectionData.selectedWorks.length === 1 ? 'trabalho selecionado' : 'trabalhos selecionados'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateCollection;
