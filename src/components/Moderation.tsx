
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

  // Mock data expandido para demonstração
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
      views: 127,
      downloads: 45,
      rating: 4.2
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
      reviewedBy: 'Moderador João',
      views: 89,
      downloads: 23,
      rating: 4.5
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
      views: 156,
      downloads: 67,
      rating: 4.8
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
      status: 'approved',
      submittedAt: new Date('2024-01-20'),
      reviewedAt: new Date('2024-01-25'),
      reviewedBy: 'Moderador Maria',
      views: 298,
      downloads: 134,
      rating: 4.9
    },
    {
      id: '5',
      title: 'Inteligência Artificial na Perícia Criminal',
      abstract: 'Aplicação de algoritmos de IA na análise de evidências criminais e processamento de dados forenses.',
      author: 'Dr. João Mendes Silva',
      email: 'joao.silva@pericia.sp.gov.br',
      registration: '567890',
      institution: 'Instituto de Criminalística de São Paulo',
      state: 'São Paulo',
      force: 'Perícia Criminal',
      course: 'Especialização em Criminalística',
      year: '2024',
      keywords: 'inteligência artificial, perícia criminal, forense digital',
      category: 'tecnologia-seguranca',
      type: 'Dissertação',
      language: 'Português',
      fileName: 'ia_pericia_criminal.pdf',
      fileSize: 4123456,
      status: 'submitted',
      submittedAt: new Date('2024-01-22'),
      views: 78,
      downloads: 12,
      rating: 4.1
    },
    {
      id: '6',
      title: 'Policiamento Rodoviário e Tecnologia de Monitoramento',
      abstract: 'Estudo sobre implementação de sistemas tecnológicos de monitoramento em rodovias federais.',
      author: 'Inspetor Carlos Alberto',
      email: 'carlos.alberto@prf.gov.br',
      registration: '234567',
      institution: 'Academia Nacional da Polícia Rodoviária Federal',
      state: 'Distrito Federal',
      force: 'Polícia Rodoviária Federal',
      course: 'Curso de Formação de Inspetores',
      year: '2024',
      keywords: 'policiamento rodoviário, tecnologia, monitoramento',
      category: 'tecnologia-seguranca',
      type: 'Artigo Científico',
      language: 'Português',
      fileName: 'policiamento_rodoviario_tech.pdf',
      fileSize: 2987654,
      status: 'rejected',
      submittedAt: new Date('2024-01-12'),
      reviewedAt: new Date('2024-01-20'),
      reviewedBy: 'Moderador Pedro',
      moderatorNotes: 'Necessária revisão metodológica e atualização das referências.',
      views: 45,
      downloads: 8,
      rating: 3.2
    },
    {
      id: '7',
      title: 'Sistema Penitenciário: Gestão e Ressocialização',
      abstract: 'Análise dos métodos de gestão penitenciária e programas de ressocialização no sistema prisional brasileiro.',
      author: 'Dra. Mariana Santos',
      email: 'mariana.santos@seap.rj.gov.br',
      registration: '678901',
      institution: 'Escola de Gestão Penitenciária do Rio de Janeiro',
      state: 'Rio de Janeiro',
      force: 'Polícia Penal Estadual',
      course: 'Especialização em Gestão Penitenciária',
      year: '2024',
      keywords: 'sistema penitenciário, ressocialização, gestão prisional',
      category: 'gestao-policial',
      type: 'Dissertação',
      language: 'Português',
      fileName: 'sistema_penitenciario_gestao.pdf',
      fileSize: 3456789,
      status: 'under_review',
      submittedAt: new Date('2024-01-25'),
      reviewedBy: 'Moderador Ana',
      views: 234,
      downloads: 89,
      rating: 4.6
    },
    {
      id: '8',
      title: 'Segurança Portuária: Desafios e Soluções Tecnológicas',
      abstract: 'Estudo sobre os principais desafios de segurança em portos brasileiros e implementação de soluções tecnológicas.',
      author: 'Comandante Ricardo Oliveira',
      email: 'ricardo.oliveira@guardaportuaria.gov.br',
      registration: '456789',
      institution: 'Centro de Instrução Almirante Braz de Aguiar',
      state: 'Rio de Janeiro',
      force: 'Guarda Portuária',
      course: 'Curso de Segurança Portuária',
      year: '2024',
      keywords: 'segurança portuária, tecnologia, portos',
      category: 'seguranca-publica',
      type: 'Monografia',
      language: 'Português',
      fileName: 'seguranca_portuaria.pdf',
      fileSize: 2345678,
      status: 'submitted',
      submittedAt: new Date('2024-01-28'),
      views: 67,
      downloads: 15,
      rating: 4.0
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
    
    // Simular envio de notificação para o autor
    const work = works.find(w => w.id === workId);
    if (work) {
      console.log(`Notificação enviada para ${work.email}: Trabalho "${work.title}" foi rejeitado. Motivo: ${notes}`);
    }
    
    toast({
      title: 'Trabalho rejeitado',
      description: 'O trabalho foi rejeitado e o autor foi notificado.'
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
    
    // Simular envio de notificação para o autor
    const work = works.find(w => w.id === workId);
    if (work) {
      console.log(`Notificação enviada para ${work.email}: Solicitation de alterações para "${work.title}". Observações: ${notes}`);
    }
    
    toast({
      title: 'Alterações solicitadas',
      description: 'As alterações foram solicitadas e o autor foi notificado.'
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
