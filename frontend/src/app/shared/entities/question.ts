import {Test} from "./test";
import {Answer} from "./answer";

export interface Question {
  test?: Test,
  id: number,
  name: string,
  description: string,
  hint: string,
  answerType: number,
  answers: Answer[]
}
