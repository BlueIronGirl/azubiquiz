import {Test} from "./test";
import {Frage} from "./frage";
import {Antwort} from "./antwort";
import {User} from "./user";

export interface Result {
  test: Test,
  question: Frage,
  answer: Antwort,
  azubi: User,
  timestamp: Date,
  value: string
}
