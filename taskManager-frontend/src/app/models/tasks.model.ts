export interface TaskModel {
  id?: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed';
}
