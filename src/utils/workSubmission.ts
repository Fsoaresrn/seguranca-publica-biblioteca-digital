
import { WorkSubmission, FileUploadResult } from '@/types/work';

// Simulated file upload function
export const uploadFile = async (file: File): Promise<FileUploadResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate upload process
      const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      resolve({
        success: true,
        fileId,
        fileName: file.name,
        fileSize: file.size
      });
    }, 2000);
  });
};

// Simulated work submission function
export const submitWork = async (workData: WorkSubmission, file: File): Promise<{ success: boolean; id?: string; error?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate submission process
      const workId = `work_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      resolve({
        success: true,
        id: workId
      });
    }, 1500);
  });
};

// Local storage functions for draft management
export const saveDraft = (workData: Partial<WorkSubmission>): void => {
  const drafts = getDrafts();
  const draftId = workData.id || `draft_${Date.now()}`;
  
  const updatedDraft: WorkSubmission = {
    ...workData,
    id: draftId,
    status: 'draft',
    updatedAt: new Date()
  } as WorkSubmission;
  
  drafts[draftId] = updatedDraft;
  localStorage.setItem('work_drafts', JSON.stringify(drafts));
};

export const getDrafts = (): Record<string, WorkSubmission> => {
  const stored = localStorage.getItem('work_drafts');
  return stored ? JSON.parse(stored) : {};
};

export const deleteDraft = (draftId: string): void => {
  const drafts = getDrafts();
  delete drafts[draftId];
  localStorage.setItem('work_drafts', JSON.stringify(drafts));
};

export const getSubmissions = (): WorkSubmission[] => {
  const stored = localStorage.getItem('work_submissions');
  return stored ? JSON.parse(stored) : [];
};

export const saveSubmission = (workData: WorkSubmission): void => {
  const submissions = getSubmissions();
  submissions.push(workData);
  localStorage.setItem('work_submissions', JSON.stringify(submissions));
};
