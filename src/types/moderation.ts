
export interface ModerationWork {
  id: string;
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
  language: string;
  fileName: string;
  fileSize: number;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';
  submittedAt: Date;
  moderatorNotes?: string;
  reviewedAt?: Date;
  reviewedBy?: string;
  views?: number;
  downloads?: number;
  rating?: number;
}

export interface ModerationAction {
  action: 'approve' | 'reject' | 'request_changes';
  notes: string;
  categoryChange?: string;
}

export interface ModerationFilters {
  status: string;
  category: string;
  force: string;
  dateRange: string;
  searchTerm: string;
}
