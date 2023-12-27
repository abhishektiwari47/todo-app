// atoms.ts
import mongoose from 'mongoose';
import { atom } from 'recoil';

export interface Todo {
  // id:mongoose.Types.ObjectId;
  username: string;
  todo: string;
}


export const todosState = atom<Todo[]>({
  key: 'todosState',
  default: [ ],
});

export const userState = atom({
key:'userState',
default:''
});


