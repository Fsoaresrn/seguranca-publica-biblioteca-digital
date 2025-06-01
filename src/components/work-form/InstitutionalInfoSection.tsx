
import React from 'react';
import { Building } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { WorkFormData } from '@/types/work';

interface InstitutionalInfoSectionProps {
  form: UseFormReturn<WorkFormData>;
}

const securityForces = [
  'Agente de Trânsito',
  'Corpo de Bombeiros',
  'Força Nacional',
  'Guarda Portuária',
  'Perícia Criminal',
  'Polícia Civil',
  'Polícia Científica',
  'Polícia Federal',
  'Polícia Militar',
  'Polícia Penal Estadual',
  'Polícia Penal Federal',
  'Polícia Rodoviária Federal'
];

const brazilianStates = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const InstitutionalInfoSection: React.FC<InstitutionalInfoSectionProps> = ({ form }) => {
  return (
    <Card className="govbr-card">
      <CardHeader>
        <CardTitle className="govbr-heading-3 flex items-center">
          <Building className="h-5 w-5 mr-2 text-purple-600" />
          Informações Institucionais
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="govbr-label required">Instituição *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nome da instituição de ensino"
                    className="govbr-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="govbr-label required">Curso/Especialização *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nome do curso ou especialização"
                    className="govbr-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="force"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="govbr-label required">Força de Segurança *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="govbr-input">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {securityForces.map((force) => (
                      <SelectItem key={force} value={force}>
                        {force}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="govbr-label required">Estado *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="govbr-input">
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {brazilianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="govbr-label required">Ano *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="2025"
                    className="govbr-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="advisor"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="govbr-label">Orientador</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nome do orientador (opcional)"
                  className="govbr-input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default InstitutionalInfoSection;
