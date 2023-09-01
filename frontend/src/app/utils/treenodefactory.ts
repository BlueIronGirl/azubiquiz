import {TreeNode} from "primeng/api";
import {Test} from "../entity/test";
import {Frage} from "../entity/frage";
import {Antwort} from "../entity/antwort";

export class TreenodeFactory {
  static fromTestsToTreeNodes(tests: Test[]): TreeNode[] {
    let treeNodes: TreeNode[] = [];

    for (const test of tests) {
      let questionNodes: TreeNode[] = [];

      for (let question of test.fragen) {
        let answerNodes: TreeNode[] = [];
        for (let answer of question.antworten) {
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
    let questions: Frage[] = [];

    let questionNodes = treeNode.children;
    for (let questionNode of questionNodes!) {
      let answers: Antwort[] = [];

      for (let answerNode of questionNode.children!) {
        answers.push(answerNode.data);
      }
      questions.push({...questionNode.data, antworten: answers});
    }

    return {...treeNode.data, fragen: questions};
  }
}
