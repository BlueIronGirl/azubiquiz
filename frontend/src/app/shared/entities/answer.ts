import {Test} from "./test";
import {Question} from "./question";

export interface Answer {
  test?: Test,
  question?: Question,
  id: number,
  description: string,
  correctValue: boolean,
  correctAnswertext: string
}

export const ANSWERTYPE_MULTIPLECHOICE = 0;
export const ANSWERTYPE_TEXT = 1;

