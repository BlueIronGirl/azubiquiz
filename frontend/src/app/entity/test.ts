import {Frage} from "./frage";

export interface Test {
  id: number,
  version: number,
  name: string,
  beschreibung: string,
  fragen: Frage[]
}
