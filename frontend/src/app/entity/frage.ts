import {Test} from "./test";
import {Antwort} from "./antwort";

export interface Frage {
  test?: Test,
  id: number,
  name: string,
  beschreibung: string,
  hinweis: string,
  antwortTyp: number,
  antworten: Antwort[]
}
