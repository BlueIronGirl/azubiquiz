import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectAllTests} from '../../store/test/test.selectors';
import {TreeNode} from 'primeng/api';
import {deleteTest, loadTests} from '../../store/test/test.actions';
import {Test} from '../../../entity/test';

@Component({
    selector: 'pn-tests',
    templateUrl: './tests.component.html',
    styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
    cols: { field: string, header: string, readonly?: boolean, width?: number }[] = [];

    tests$ = this.store.pipe(select(selectAllTests));

    constructor(private store: Store) {

    }

    ngOnInit(): void {
        this.cols = [
            {field: 'id', header: 'Id', readonly: true, width: 6},
            {field: 'version', header: 'Version', readonly: true, width: 6},
            {field: 'name', header: 'Name'},
            {field: 'beschreibung', header: 'Beschreibung'}
        ];

        this.store.dispatch(loadTests());
    }

    isBoolean(val: any): boolean {
        return typeof val === 'boolean';
    }

    refresh(): void {
        this.ngOnInit();
    }

    deleteTest(treenode: TreeNode): void {
        const test = treenode as Test;
        this.store.dispatch(deleteTest({test}));
    }
}
