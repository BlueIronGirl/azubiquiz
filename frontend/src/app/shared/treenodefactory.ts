import {TreeNode} from "primeng/api";
import {Test} from "./entities/test";
import {Question} from "./entities/question";
import {Answer} from "./entities/answer";

export class TreenodeFactory {
  static fromTestsToTreeNodes(tests: Test[]): TreeNode[] {
    let treeNodes: TreeNode[] = [];

    for (const test of tests) {
      let questionNodes: TreeNode[] = [];

      for (let question of test.questions) {
        let answerNodes: TreeNode[] = [];
        for (let answer of question.answers) {
          answerNodes.push({
            data: {...answer},
            expanded: true
          })
        }

        questionNodes.push({
          data: {...question},
          expanded: false,
          children: answerNodes
        })
      }

      treeNodes.push({
          data: {...test},
          expanded: false,
          children: questionNodes
        }
      )
    }

    return treeNodes;
  }

  static fromNodeToTest(treeNode: TreeNode): Test {
    let questions: Question[] = [];

    let questionNodes = treeNode.children;
    for (let questionNode of questionNodes!) {
      let answers: Answer[] = [];

      for (let answerNode of questionNode.children!) {
        answers.push(answerNode.data);
      }
      questions.push({...questionNode.data, answers});
    }

    return {...treeNode.data, questions};
  }
}
