import {Test} from "./test";
import {Frage} from "./frage";

export interface Antwort {
  test?: Test,
  question?: Frage,
  id: number,
  beschreibung: string,
  korrekt: boolean,
  korrekterAntwortText: string
}

export const ANSWERTYPE_MULTIPLECHOICE = 0;
export const ANSWERTYPE_TEXT = 1;

