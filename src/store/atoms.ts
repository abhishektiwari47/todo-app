// atoms.ts
import mongoose from 'mongoose';
import { atom } from 'recoil';

export interface Todo {
  _id?:string,
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


