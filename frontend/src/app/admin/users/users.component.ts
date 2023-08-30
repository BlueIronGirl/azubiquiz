import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/entities/user";
import {select, Store} from "@ngrx/store";
import {selectAllUsers} from "../store/user/user.selectors";
import {loadUsers} from "../store/user/user.actions";
import {Test} from "../../shared/entities/test";

@Component({
  selector: 'pn-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  cols: any[] = [];
  users$ = this.store.pipe(select(selectAllUsers));
  testvalue: boolean = true;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.cols = [
      {field: 'smand', header: 'Mandant'},
      {field: 'swerk', header: 'OrgEinheit'},
      {field: 'spers', header: 'Person'},
      {field: 'kuerzel', header: 'Kürzel'},
      {field: 'name', header: 'Name'},
      {field: 'vorname', header: 'Vorname'},
      {field: 'lehrjahr', header: 'Lehrjahr'},
      {field: 'admin', header: 'Admin?'}
    ];

    this.store.dispatch(loadUsers());
  }

  isBoolean(val: any) : boolean {
    return typeof val === 'boolean';
  }

}
