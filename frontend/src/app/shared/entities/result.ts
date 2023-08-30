import {Test} from "./test";
import {Question} from "./question";
import {Answer} from "./answer";
import {User} from "./user";

export interface Result {
  test: Test,
  question: Question,
  answer: Answer,
  azubi: User,
  timestamp: Date,
  value: string
}
