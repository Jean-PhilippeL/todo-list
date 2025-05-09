export type Status = 'created' | 'started' | 'completed'

export interface Task {
  id: uuid
  name: string
  status: TaskStatus
}