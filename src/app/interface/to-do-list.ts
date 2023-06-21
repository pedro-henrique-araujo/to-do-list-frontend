import { ToDo } from "./to-do";

export interface ToDoList {
  id?: string;
  title: string;
  toDos: ToDo[];
  accessType?: number;
}
