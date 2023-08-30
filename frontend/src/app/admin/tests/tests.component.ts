import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectAllTests} from '../store/test/test.selectors';
import {TreeNode} from 'primeng/api';
import {deleteTest, loadTests, updateTest} from '../store/test/test.actions';
import {Test} from '../../shared/entities/test';
import {TreenodeFactory} from '../../shared/treenodefactory';
import {map} from 'rxjs/operators';

@Component({
  selector: 'pn-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  cols: { field: string, header: string, readonly?: boolean, width?: number }[] = [];

  testsAsNodes$ = this.store.select(selectAllTests).pipe(
    map(tests => TreenodeFactory.fromTestsToTreeNodes(tests))
  );

  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.cols = [
      {field: 'id', header: 'Id', readonly: true, width: 6},
      {field: 'version', header: 'Version', readonly: true, width: 6},
      {field: 'lehrjahr', header: 'Lehrjahr', width: 6},
      {field: 'name', header: 'Name'},
      {field: 'description', header: 'Beschreibung'}
    ];

    this.store.dispatch(loadTests());
  }

  isColTest(treenode: TreeNode): boolean {
    return 'lehrjahr' in treenode;
  }

  refresh(): void {
    this.ngOnInit();
  }

  updateTest(treenode: any): void {
    const test: Test = TreenodeFactory.fromNodeToTest(treenode.node);
    this.store.dispatch(updateTest({test}));
  }

  deleteTest(treenode: TreeNode): void {
    const test = treenode as Test;
    this.store.dispatch(deleteTest({test}));
  }
}
