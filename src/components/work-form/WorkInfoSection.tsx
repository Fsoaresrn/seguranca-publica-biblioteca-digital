
import React from 'react';
import { FileText } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  FormControl,
  FormDescription,
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

interface WorkInfoSectionProps {
  form: UseFormReturn<WorkFormData>;
}

const categories = [
  'Investigação Criminal',
  'Policiamento Comunitário',
  'Tecnologia Policial',
  'Direitos Humanos',
  'Inteligência Policial',
  'Prevenção Criminal',
  'Gestão Policial',
  'Perícia Criminal',
  'Bombeiros e Resgate',
  'Trânsito e Mobilidade',
  'Segurança Cibernética',
  'Mediação de Conflitos'
];

const workTypes = [
  'TCC - Graduação',
  'TCC - Especialização',
  'Dissertação - Mestrado',
  'Tese - Doutorado',
  'Artigo Científico',
  'Monografia',
  'Relatório Técnico',
  'Manual Operacional',
  'Livro',
  'Ebook',
  'Revista'
];

const WorkInfoSection: React.FC<WorkInfoSectionProps> = ({ form }) => {
  return (
    <Card className="govbr-card">
      <CardHeader>
        <CardTitle className="govbr-heading-3 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-govbr-blue-warm-vivid" />
          Informações do Trabalho
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="govbr-label required">Título *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Título completo do trabalho acadêmico"
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
          name="abstract"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="govbr-label required">Resumo *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Resumo executivo do trabalho (mínimo 100 caracteres)"
                  className="govbr-input min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {field.value?.length || 0}/100 caracteres mínimos
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="govbr-label required">Categoria *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="govbr-input">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="govbr-label required">Tipo de Trabalho *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="govbr-input">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {workTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="govbr-label required">Palavras-chave *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Separe as palavras-chave por vírgulas"
                  className="govbr-input"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Ex: investigação criminal, tecnologia, inteligência artificial
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="externalLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="govbr-label">Link Externo</FormLabel>
              <FormControl>
                <Input
                  placeholder="DOI, link do repositório ou URL externa (opcional)"
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

export default WorkInfoSection;
