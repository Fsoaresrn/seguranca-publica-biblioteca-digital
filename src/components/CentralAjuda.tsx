
import React from 'react';
import { HelpCircle, BookOpen, Mail, Phone, MessageCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CentralAjuda = () => {
  const faqItems = [
    {
      question: "Como submeter um trabalho acadêmico?",
      answer: "Para submeter um trabalho, acesse o menu 'Enviar Trabalho' no menu lateral e preencha todas as informações solicitadas."
    },
    {
      question: "Quais formatos de arquivo são aceitos?",
      answer: "Aceitamos arquivos em PDF, DOC, DOCX e TXT. O tamanho máximo é de 50MB por arquivo."
    },
    {
      question: "Como faço para baixar um trabalho?",
      answer: "Clique no título do trabalho desejado e em seguida no botão 'Download' na página de detalhes."
    },
    {
      question: "Posso salvar trabalhos como favoritos?",
      answer: "Sim! Clique no ícone de coração ao lado do trabalho para adicioná-lo aos seus favoritos."
    }
  ];

  const helpCategories = [
    {
      title: "Submissão de Trabalhos",
      icon: FileText,
      description: "Como enviar e gerenciar seus trabalhos acadêmicos",
      color: "text-blue-600"
    },
    {
      title: "Navegação e Busca",
      icon: BookOpen,
      description: "Aprenda a encontrar e filtrar conteúdos",
      color: "text-green-600"
    },
    {
      title: "Conta e Perfil",
      icon: MessageCircle,
      description: "Configurações de conta e personalização",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="govbr-heading-1 mb-4 flex items-center justify-center">
          <HelpCircle className="h-10 w-10 mr-3 text-govbr-blue-warm-vivid" />
          Central de Ajuda
        </h1>
        <p className="govbr-body max-w-2xl mx-auto">
          Encontre respostas para suas dúvidas sobre a Biblioteca Nacional da Segurança Pública
        </p>
      </div>

      {/* Quick Help Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {helpCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Icon className={`h-12 w-12 mx-auto mb-4 ${category.color}`} />
                <h3 className="font-semibold text-govbr-blue-warm-dark mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQ Section */}
      <Card className="govbr-card">
        <CardHeader>
          <CardTitle className="govbr-heading-3">Perguntas Frequentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-govbr-gray-10 pb-4 last:border-b-0">
                <h4 className="font-semibold text-govbr-blue-warm-dark mb-2">
                  {item.question}
                </h4>
                <p className="text-gray-600 text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="govbr-card">
          <CardHeader>
            <CardTitle className="govbr-heading-3 flex items-center">
              <Mail className="h-5 w-5 mr-2 text-govbr-blue-warm-vivid" />
              Suporte por Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Entre em contato conosco por email para dúvidas específicas
            </p>
            <Button variant="outline" className="w-full">
              Enviar Email
            </Button>
          </CardContent>
        </Card>

        <Card className="govbr-card">
          <CardHeader>
            <CardTitle className="govbr-heading-3 flex items-center">
              <Phone className="h-5 w-5 mr-2 text-govbr-green-cool-vivid" />
              Suporte Telefônico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-2">
              <strong>Horário:</strong> Segunda a Sexta, 8h às 18h
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Telefone:</strong> 0800 123 4567
            </p>
            <Badge variant="secondary" className="text-xs">
              Ligação Gratuita
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CentralAjuda;
