import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {select, Store} from "@ngrx/store";
import {LoginService} from "../../service/login.service";
import {UserActions} from "../../admin/store/user/user.actions";
import {selectAllUsers, selectLogin} from "../../admin/store/user/user.selectors";
import {User} from "../../entity/user";

@Component({
    selector: 'pn-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    user$ = this.store.pipe(select(selectLogin));

    constructor(private store: Store, private loginService: LoginService, private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.initMenu();
    }

    menuItems(user: User): MenuItem[] {
        let items: MenuItem[] = [
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
            items.push(adminItem);
        }

        items.push({label: 'Logout', command: this.logout()});

        return items;
    }

    private initMenu() {

    }

    private logout() {
        return () => {
            this.store.dispatch(UserActions.logout());
        };
    }

}
