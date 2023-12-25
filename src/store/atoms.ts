// atoms.ts
import { atom } from 'recoil';

export interface Todo {
  id: number;
  todo: string;
}

export const todosState = atom<Todo[]>({
  key: 'todosState',
  default: [ ],
});
