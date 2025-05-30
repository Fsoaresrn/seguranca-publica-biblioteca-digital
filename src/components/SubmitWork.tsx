
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import WorkFormHeader from '@/components/work-form/WorkFormHeader';
import WorkInfoSection from '@/components/work-form/WorkInfoSection';
import AuthorInfoSection from '@/components/work-form/AuthorInfoSection';
import InstitutionalInfoSection from '@/components/work-form/InstitutionalInfoSection';
import FileUploadSection from '@/components/work-form/FileUploadSection';
import SubmissionProgress from '@/components/work-form/SubmissionProgress';
import FormActions from '@/components/work-form/FormActions';
import DraftManager from '@/components/DraftManager';
import { WorkSubmission, WorkFormData } from '@/types/work';
import { saveDraft, submitWork, uploadFile, saveSubmission } from '@/utils/workSubmission';
import { useWorkFormValidation } from '@/hooks/useWorkFormValidation';

const SubmitWork: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(null);
  const { toast } = useToast();
  const { resolver, defaultValues } = useWorkFormValidation();

  const form = useForm<WorkFormData>({
    resolver,
    defaultValues
  });

  // Auto-save functionality
  useEffect(() => {
    const subscription = form.watch((data) => {
      if (Object.values(data).some(value => value && value !== '')) {
        const timer = setTimeout(() => {
          handleSaveDraft(true); // Silent save
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);

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
    setIsUploading(true);

    try {
      // Upload file first
      toast({
        title: "Enviando arquivo...",
        description: "Fazendo upload do arquivo, aguarde...",
      });

      const uploadResult = await uploadFile(selectedFile);
      
      if (!uploadResult.success) {
        throw new Error(uploadResult.error || 'Erro no upload do arquivo');
      }

      setIsUploading(false);
      setUploadProgress(100);

      // Submit work data
      toast({
        title: "Processando envio...",
        description: "Finalizando o envio do trabalho...",
      });

      const workData: WorkSubmission = {
        ...data,
        fileName: uploadResult.fileName,
        fileSize: uploadResult.fileSize,
        fileType: selectedFile.type,
        status: 'submitted',
        submittedAt: new Date(),
        updatedAt: new Date()
      };

      const submitResult = await submitWork(workData, selectedFile);
      
      if (!submitResult.success) {
        throw new Error(submitResult.error || 'Erro ao enviar trabalho');
      }

      // Save to submissions history
      workData.id = submitResult.id;
      saveSubmission(workData);
      
      toast({
        title: "Trabalho enviado com sucesso!",
        description: `Seu trabalho "${data.title}" está em análise e será moderado em até 72 horas. Número de protocolo: ${submitResult.id}`,
      });

      // Clear form and file
      form.reset();
      setSelectedFile(null);
      setCurrentDraftId(null);
      setUploadProgress(0);
      
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Erro ao enviar trabalho",
        description: error instanceof Error ? error.message : "Tente novamente em alguns minutos.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  const handleSaveDraft = (silent = false) => {
    const formData = form.getValues();
    
    const draftData: Partial<WorkSubmission> = {
      id: currentDraftId,
      ...formData,
      fileName: selectedFile?.name,
      fileSize: selectedFile?.size,
      fileType: selectedFile?.type,
      status: 'draft',
      updatedAt: new Date()
    };

    saveDraft(draftData);
    
    if (!currentDraftId) {
      setCurrentDraftId(draftData.id!);
    }

    if (!silent) {
      toast({
        title: "Rascunho salvo",
        description: "Suas alterações foram salvas automaticamente.",
      });
    }
  };

  const handleLoadDraft = (draft: WorkSubmission) => {
    form.reset(draft);
    setCurrentDraftId(draft.id!);
    
    // Note: File cannot be restored from draft as it's not stored locally
    if (draft.fileName) {
      toast({
        title: "Atenção",
        description: `Rascunho carregado. Será necessário fazer upload do arquivo "${draft.fileName}" novamente.`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <WorkFormHeader />
      <DraftManager onLoadDraft={handleLoadDraft} />
      <SubmissionProgress 
        isSubmitting={isSubmitting}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <WorkInfoSection form={form} />
          <AuthorInfoSection form={form} />
          <InstitutionalInfoSection form={form} />
          <FileUploadSection onFileSelect={setSelectedFile} />
          <FormActions 
            isSubmitting={isSubmitting}
            isUploading={isUploading}
            onSaveDraft={() => handleSaveDraft(false)}
          />
        </form>
      </Form>
    </div>
  );
};

export default SubmitWork;
