import { page } from './urls';

export interface dto {
  page: page;
  writtenDate: string;
  title: string;
  content: string;
  writer: string;
}
