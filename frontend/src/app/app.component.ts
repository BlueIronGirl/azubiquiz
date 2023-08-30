import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'pn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        routerLink: 'home'
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        routerLink: 'admin',
        items: [{
          label: 'Benutzer',
          icon: 'pi pi-fw pi-pencil',
          routerLink: 'admin/users'
        }, {
          label: 'Tests',
          icon: 'pi pi-fw pi-pencil',
          routerLink: 'admin/tests'
        }]
      }
    ];
  }
}
