
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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

export const useWorkFormValidation = () => {
  return {
    resolver: zodResolver(workSchema),
    defaultValues: {
      language: 'português',
    }
  };
};

export type WorkFormData = z.infer<typeof workSchema>;
