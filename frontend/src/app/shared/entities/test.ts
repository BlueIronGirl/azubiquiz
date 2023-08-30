import {Question} from "./question";

export interface Test {
  id: number,
  version: number,
  lehrjahr: number,
  name: string,
  description: string,
  questions: Question[]
}
