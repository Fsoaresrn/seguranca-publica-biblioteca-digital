
import React, { useState, useEffect } from 'react';
import { Shield, FileCheck, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ModerationFilters from './moderation/ModerationFilters';
import ModerationWorksList from './moderation/ModerationWorksList';
import ModerationReviewModal from './moderation/ModerationReviewModal';
import { ModerationWork, ModerationFilters as FilterType } from '@/types/moderation';

const Moderation: React.FC = () => {
  const { toast } = useToast();
  const [selectedWork, setSelectedWork] = useState<ModerationWork | null>(null);
  const [selectedWorks, setSelectedWorks] = useState<string[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  
  const [filters, setFilters] = useState<FilterType>({
    status: 'all',
    category: 'all',
    force: 'all',
    dateRange: 'all',
    searchTerm: ''
  });

  // Mock data para demonstração
  const [works, setWorks] = useState<ModerationWork[]>([
    {
      id: '1',
      title: 'Análise Comportamental em Operações Policiais',
      abstract: 'Este trabalho apresenta uma análise detalhada sobre padrões comportamentais em operações de segurança pública, com foco na eficiência operacional.',
      author: 'Carlos Silva Santos',
      email: 'carlos.santos@pm.sp.gov.br',
      registration: '123456',
      institution: 'Academia de Polícia Militar do Estado de São Paulo',
      state: 'São Paulo',
      force: 'Polícia Militar',
      course: 'Curso Superior de Polícia',
      year: '2024',
      advisor: 'Dr. Maria Fernanda Lima',
      keywords: 'análise comportamental, operações policiais, segurança pública',
      category: 'seguranca-publica',
      type: 'Dissertação',
      language: 'Português',
      fileName: 'analise_comportamental_operacoes.pdf',
      fileSize: 2456789,
      status: 'submitted',
      submittedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      title: 'Tecnologias Emergentes na Investigação Criminal',
      abstract: 'Estudo sobre a aplicação de novas tecnologias no processo investigativo criminal, incluindo inteligência artificial e análise de dados.',
      author: 'Ana Paula Rodrigues',
      email: 'ana.rodrigues@pc.rj.gov.br',
      registration: '789012',
      institution: 'Academia de Polícia Civil do Rio de Janeiro',
      state: 'Rio de Janeiro',
      force: 'Polícia Civil',
      course: 'Especialização em Investigação Criminal',
      year: '2024',
      keywords: 'tecnologia, investigação criminal, inteligência artificial',
      category: 'investigacao-criminal',
      type: 'Artigo Científico',
      language: 'Português',
      fileName: 'tecnologias_investigacao_criminal.pdf',
      fileSize: 1875432,
      status: 'under_review',
      submittedAt: new Date('2024-01-10'),
      moderatorNotes: 'Em análise inicial. Verificar referências bibliográficas.',
      reviewedBy: 'Moderador João'
    },
    {
      id: '3',
      title: 'Prevenção da Violência Doméstica: Estratégias Policiais',
      abstract: 'Análise das estratégias de prevenção da violência doméstica implementadas pelas forças policiais brasileiras.',
      author: 'Roberto Lima Pereira',
      email: 'roberto.pereira@pf.gov.br',
      registration: '345678',
      institution: 'Academia Nacional de Polícia Federal',
      state: 'Distrito Federal',
      force: 'Polícia Federal',
      course: 'Curso de Formação Profissional',
      year: '2024',
      keywords: 'violência doméstica, prevenção, estratégias policiais',
      category: 'prevencao-violencia',
      type: 'Monografia',
      language: 'Português',
      fileName: 'prevencao_violencia_domestica.pdf',
      fileSize: 3124567,
      status: 'submitted',
      submittedAt: new Date('2024-01-18'),
    },
    {
      id: '4',
      title: 'Gestão de Crises em Operações de Resgate',
      abstract: 'Metodologias de gestão de crises aplicadas em operações de resgate do Corpo de Bombeiros.',
      author: 'Major Fernanda Costa',
      email: 'fernanda.costa@bombeiros.mg.gov.br',
      registration: '901234',
      institution: 'Academia de Bombeiros Militar de Minas Gerais',
      state: 'Minas Gerais',
      force: 'Bombeiros',
      course: 'Curso de Aperfeiçoamento de Oficiais',
      year: '2024',
      keywords: 'gestão de crises, operações de resgate, bombeiros',
      category: 'gestao-policial',
      type: 'TCC',
      language: 'Português',
      fileName: 'gestao_crises_resgate.pdf',
      fileSize: 2789123,
      status: 'submitted',
      submittedAt: new Date('2024-01-20'),
    }
  ]);

  // Filtrar trabalhos
  const filteredWorks = works.filter(work => {
    const matchesStatus = filters.status === 'all' || work.status === filters.status;
    const matchesCategory = filters.category === 'all' || work.category === filters.category;
    const matchesForce = filters.force === 'all' || work.force.toLowerCase().includes(filters.force.toLowerCase());
    const matchesSearch = !filters.searchTerm || 
      work.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      work.author.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    return matchesStatus && matchesCategory && matchesForce && matchesSearch;
  });

  // Estatísticas
  const stats = {
    total: works.length,
    pending: works.filter(w => w.status === 'submitted').length,
    inReview: works.filter(w => w.status === 'under_review').length,
    approved: works.filter(w => w.status === 'approved').length,
    rejected: works.filter(w => w.status === 'rejected').length
  };

  const handleSelectWork = (work: ModerationWork) => {
    setSelectedWork(work);
    setIsReviewModalOpen(true);
  };

  const handleToggleSelection = (workId: string) => {
    setSelectedWorks(prev => 
      prev.includes(workId) 
        ? prev.filter(id => id !== workId)
        : [...prev, workId]
    );
  };

  const handleBulkAction = (action: string) => {
    if (action === 'approve') {
      setWorks(prev => prev.map(work => 
        selectedWorks.includes(work.id) 
          ? { ...work, status: 'approved' as const, reviewedAt: new Date(), reviewedBy: 'Moderador Atual' }
          : work
      ));
      toast({
        title: 'Trabalhos aprovados',
        description: `${selectedWorks.length} trabalho(s) foram aprovados.`
      });
    } else if (action === 'review') {
      setWorks(prev => prev.map(work => 
        selectedWorks.includes(work.id) 
          ? { ...work, status: 'under_review' as const, reviewedBy: 'Moderador Atual' }
          : work
      ));
      toast({
        title: 'Status atualizado',
        description: `${selectedWorks.length} trabalho(s) marcados em revisão.`
      });
    }
    setSelectedWorks([]);
  };

  const handleApprove = (workId: string, notes: string, categoryChange?: string) => {
    setWorks(prev => prev.map(work => 
      work.id === workId 
        ? { 
            ...work, 
            status: 'approved' as const, 
            moderatorNotes: notes,
            reviewedAt: new Date(),
            reviewedBy: 'Moderador Atual',
            category: categoryChange || work.category
          }
        : work
    ));
    
    toast({
      title: 'Trabalho aprovado',
      description: 'O trabalho foi aprovado com sucesso.'
    });
  };

  const handleReject = (workId: string, notes: string) => {
    setWorks(prev => prev.map(work => 
      work.id === workId 
        ? { 
            ...work, 
            status: 'rejected' as const, 
            moderatorNotes: notes,
            reviewedAt: new Date(),
            reviewedBy: 'Moderador Atual'
          }
        : work
    ));
    
    toast({
      title: 'Trabalho rejeitado',
      description: 'O trabalho foi rejeitado.'
    });
  };

  const handleRequestChanges = (workId: string, notes: string) => {
    setWorks(prev => prev.map(work => 
      work.id === workId 
        ? { 
            ...work, 
            status: 'submitted' as const, 
            moderatorNotes: notes,
            reviewedBy: 'Moderador Atual'
          }
        : work
    ));
    
    toast({
      title: 'Alterações solicitadas',
      description: 'As alterações foram solicitadas ao autor.'
    });
  };

  const clearFilters = () => {
    setFilters({
      status: 'all',
      category: 'all',
      force: 'all',
      dateRange: 'all',
      searchTerm: ''
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-govbr-blue-warm-vivid to-govbr-blue-warm-dark rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Shield className="h-8 w-8 mr-3" />
          Moderação de Trabalhos
        </h1>
        <p className="text-govbr-blue-warm-10 text-lg">
          Revisão e aprovação de trabalhos acadêmicos submetidos à plataforma
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Revisão</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.inReview}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejeitados</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <ModerationFilters
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={clearFilters}
      />

      {/* Lista de trabalhos */}
      <ModerationWorksList
        works={filteredWorks}
        onSelectWork={handleSelectWork}
        selectedWorks={selectedWorks}
        onToggleSelection={handleToggleSelection}
        onBulkAction={handleBulkAction}
      />

      {/* Modal de revisão */}
      <ModerationReviewModal
        work={selectedWork}
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setSelectedWork(null);
        }}
        onApprove={handleApprove}
        onReject={handleReject}
        onRequestChanges={handleRequestChanges}
      />
    </div>
  );
};

export default Moderation;
