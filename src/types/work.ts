
export interface WorkSubmission {
  id?: string;
  title: string;
  abstract: string;
  author: string;
  email: string;
  registration: string;
  institution: string;
  state: string;
  force: string;
  course: string;
  year: string;
  advisor?: string;
  keywords: string;
  category: string;
  type: string;
  externalLink?: string;
  language: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  submittedAt?: Date;
  updatedAt?: Date;
}

export interface FileUploadResult {
  success: boolean;
  fileId?: string;
  fileName?: string;
  fileSize?: number;
  error?: string;
}
