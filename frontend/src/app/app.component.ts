import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {Store} from "@ngrx/store";
import {LoginService} from "./service/login.service";
import {selectLogin} from "./admin/store/user/user.selectors";

@Component({
    selector: 'pn-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    items: MenuItem[] = [];
    adminModus = false;

    constructor(private store: Store, private loginService: LoginService, private messageService: MessageService) {
        if (this.loginService.isLoginStateValid()) {
            this.store.select(selectLogin)
                .subscribe(user => this.adminModus = user?.admin ? user.admin : false);
        }
    }

    ngOnInit(): void {
        this.items = [
            {
                label: 'Home',
                routerLink: 'home'
            }
        ];

        const adminItem = {
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
        };
        this.items.push(adminItem);
    }


}
