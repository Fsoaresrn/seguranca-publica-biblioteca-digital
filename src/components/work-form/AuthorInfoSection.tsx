
import React from 'react';
import { User } from 'lucide-react';
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
import { WorkFormData } from '@/types/work';

interface AuthorInfoSectionProps {
  form: UseFormReturn<WorkFormData>;
}

const AuthorInfoSection: React.FC<AuthorInfoSectionProps> = ({ form }) => {
  return (
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
  );
};

export default AuthorInfoSection;
