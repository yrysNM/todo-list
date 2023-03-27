type Due = {
  date: string;
  is_recurring: boolean;
  datetime?: Date;
  string: string;
  timezone: string;
  lang?: string;
};

export interface ITodoistData {
  creator_id: string;
  created_at: Date;
  assignee_id: string | null;
  assigner_id: string | null;
  comment_count: number;
  is_completed: boolean;
  content: string;
  description: string;
  due: Due | null;
  id: string;
  labels: string[];
  order: number;
  priority: number;
  project_id: string;
  section_id: string | null;
  parent_id: string | null;
  url: string;
}

export interface IViewComponent {
  content: string;
  description: string;
  is_completed: boolean;
  id: string;
}

export interface IArchiveItem {
  added_at: Date;
  added_by_uid: string;
  assigned_by_uid: string | null;
  checked: boolean;
  child_order: number;
  collapsed: boolean;
  completed_at: Date;
  content: string;
  description: string;
  due: Due | null;
  id: string;
  is_deleted: boolean;
  labels: string[];
  notes_count: number;
  parent_id: null | string;
  priority: number;
  project_id: string;
  responsible_uid: string | null;
  section_id: null | string;
  sync_id: null | string;
  user_id: string;
}

export interface IArchiveCompleted {
  completed_info: string[];
  has_more: boolean;
  items: IArchiveItem[];
  total: number;
}

export interface ITodoistMethod {
  content: string;
  description: string;
  due_lang?: "en";
  task_id?: string;
}
