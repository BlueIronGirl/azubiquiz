import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {selectAllUsers} from "../../store/user/user.selectors";
import {UserActions} from "../../store/user/user.actions";

@Component({
  selector: 'pn-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  cols: any[] = [];
  users$ = this.store.pipe(select(selectAllUsers));

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.cols = [
      {field: 'username', header: 'Benutzername'},
      {field: 'name', header: 'Name'},
      {field: 'admin', header: 'Admin?'}
    ];

    this.store.dispatch(UserActions.loadUsers());
  }

  isBoolean(val: any) : boolean {
    return typeof val === 'boolean';
  }

}
