export interface ITodoistData extends Due {
  creator_id: string;
  created_at: Date;
  assignee_id: string;
  assigner_id: string;
  comment_count: number;
  is_completed: boolean;
  content: string;
  description?: string;
  id: string;
  labels: string[];
  order: number;
  priority: number;
  project_id: string;
  section_id: string;
  parent_id: string;
  url: string;
}

interface Due {
  due: {
    date: string;
    is_recurring: boolean;
    datetime: Date;
    string: string;
    timezone: string;
  };
}

export interface IViewComponent {
  content: string;
  description: string;
  is_completed: boolean;
  id: string;
}
