import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Store} from "@ngrx/store";
import {User} from "../../entity/user";
import {LoginActions} from "../../store/login.actions";
import {selectLogin} from "../../store/login.selectors";

@Component({
    selector: 'pn-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    items: MenuItem[] = [];
    menuRendered = false;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.store.select(selectLogin).subscribe(user =>
            user ? this.initMenu(user) : this.menuRendered = false);
    }

    private initMenu(user: User) {
        this.menuRendered = true;

        this.items = [
            {
                label: 'Home',
                routerLink: 'home'
            }
        ];

        if (user.admin) {
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

        this.items.push({label: 'Logout', command: this.logout()});
    }

    private logout() {
        return () => {
            this.items = [];
            this.store.dispatch(LoginActions.logout());
        };
    }

}
