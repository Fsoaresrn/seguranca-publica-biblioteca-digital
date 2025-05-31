
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

interface ModerationFiltersProps {
  filters: {
    status: string;
    category: string;
    force: string;
    dateRange: string;
    searchTerm: string;
  };
  onFiltersChange: (filters: any) => void;
  onClearFilters: () => void;
}

const ModerationFilters: React.FC<ModerationFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters
}) => {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-govbr-blue-warm-vivid" />
          <h3 className="text-lg font-semibold">Filtros de Moderação</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por título ou autor..."
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="submitted">Submetido</SelectItem>
              <SelectItem value="under_review">Em Revisão</SelectItem>
              <SelectItem value="approved">Aprovado</SelectItem>
              <SelectItem value="rejected">Rejeitado</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Categorias</SelectItem>
              <SelectItem value="seguranca-publica">Segurança Pública</SelectItem>
              <SelectItem value="investigacao-criminal">Investigação Criminal</SelectItem>
              <SelectItem value="prevencao-violencia">Prevenção da Violência</SelectItem>
              <SelectItem value="gestao-policial">Gestão Policial</SelectItem>
              <SelectItem value="tecnologia-seguranca">Tecnologia em Segurança</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filters.force} onValueChange={(value) => handleFilterChange('force', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Força" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Forças</SelectItem>
              <SelectItem value="policia-militar">Polícia Militar</SelectItem>
              <SelectItem value="policia-civil">Polícia Civil</SelectItem>
              <SelectItem value="policia-federal">Polícia Federal</SelectItem>
              <SelectItem value="bombeiros">Bombeiros</SelectItem>
              <SelectItem value="policia-rodoviaria">Polícia Rodoviária</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange('dateRange', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Períodos</SelectItem>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">Última Semana</SelectItem>
              <SelectItem value="month">Último Mês</SelectItem>
              <SelectItem value="quarter">Último Trimestre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClearFilters}>
            Limpar Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModerationFilters;
