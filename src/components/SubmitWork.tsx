
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  FileText, 
  User, 
  Building, 
  Calendar,
  Tag,
  Users,
  Link as LinkIcon,
  Save,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Form,
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
import { useToast } from '@/hooks/use-toast';
import FileUpload from './FileUpload';

const workSchema = z.object({
  title: z.string().min(10, 'O título deve ter pelo menos 10 caracteres'),
  abstract: z.string().min(100, 'O resumo deve ter pelo menos 100 caracteres'),
  author: z.string().min(3, 'Nome do autor é obrigatório'),
  email: z.string().email('E-mail institucional válido é obrigatório'),
  registration: z.string().min(6, 'Matrícula/RG funcional é obrigatória'),
  institution: z.string().min(3, 'Instituição é obrigatória'),
  state: z.string().min(2, 'Estado é obrigatório'),
  force: z.string().min(1, 'Força de segurança é obrigatória'),
  course: z.string().min(3, 'Curso/Especialização é obrigatório'),
  year: z.string().min(4, 'Ano é obrigatório'),
  advisor: z.string().optional(),
  keywords: z.string().min(10, 'Palavras-chave são obrigatórias'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  type: z.string().min(1, 'Tipo de trabalho é obrigatório'),
  externalLink: z.string().url().optional().or(z.literal('')),
  language: z.string().default('português'),
});

type WorkFormData = z.infer<typeof workSchema>;

const SubmitWork: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<WorkFormData>({
    resolver: zodResolver(workSchema),
    defaultValues: {
      language: 'português',
    }
  });

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
    'Manual Operacional'
  ];

  const securityForces = [
    'Polícia Civil',
    'Polícia Militar',
    'Polícia Federal',
    'Polícia Rodoviária Federal',
    'Corpo de Bombeiros',
    'Guarda Municipal',
    'Polícia Penal',
    'Força Nacional'
  ];

  const brazilianStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const onSubmit = async (data: WorkFormData) => {
    if (!selectedFile) {
      toast({
        title: "Arquivo obrigatório",
        description: "É necessário fazer upload do arquivo do trabalho.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Trabalho enviado com sucesso!",
        description: "Seu trabalho está em análise e será moderado em até 72 horas.",
      });

      // Reset form
      form.reset();
      setSelectedFile(null);
      
    } catch (error) {
      toast({
        title: "Erro ao enviar trabalho",
        description: "Tente novamente em alguns minutos.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = () => {
    toast({
      title: "Rascunho salvo",
      description: "Suas alterações foram salvas automaticamente.",
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-govbr-blue-warm-vivid to-govbr-blue-warm-dark rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <FileText className="h-8 w-8 mr-3" />
          Envio de Trabalho Acadêmico
        </h1>
        <p className="text-govbr-blue-warm-10 text-lg">
          Compartilhe seu conhecimento com a comunidade de segurança pública brasileira
        </p>
        <p className="text-govbr-blue-warm-20 text-sm mt-2">
          Todos os campos marcados com * são obrigatórios
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Informações do Trabalho */}
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

          {/* Informações do Autor */}
          <Card className="govbr-card">
            <CardHeader>
              <CardTitle className="govbr-heading-3 flex items-center">
                <User className="h-5 w-5 mr-2 text-govbr-green-cool-vivid" />
                Informações do Autor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="govbr-label required">Nome Completo *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nome completo do autor"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="govbr-label required">E-mail Institucional *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@instituicao.gov.br"
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
                name="registration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="govbr-label required">Matrícula/RG Funcional *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Número da matrícula ou RG funcional"
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

          {/* Informações Institucionais */}
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
                          placeholder="2024"
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

          {/* Upload do Arquivo */}
          <Card className="govbr-card">
            <CardHeader>
              <CardTitle className="govbr-heading-3 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-orange-600" />
                Upload do Arquivo *
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload onFileSelect={setSelectedFile} />
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={saveDraft}
              className="govbr-btn-secondary"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Rascunho
            </Button>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="govbr-btn-primary"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Enviando...' : 'Enviar Trabalho'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SubmitWork;
