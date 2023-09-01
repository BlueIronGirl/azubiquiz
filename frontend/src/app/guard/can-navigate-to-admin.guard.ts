import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Store} from "@ngrx/store";
import {LoginService} from "../service/login.service";
import {MessageService} from "primeng/api";
import {selectLogin} from "../store/login.selectors";

@Injectable({
    providedIn: 'root'
})
export class CanNavigateToAdminGuard implements CanActivate {
    accessGranted = true;

    constructor(private store: Store, private loginService: LoginService, private messageService: MessageService) {
        if (this.loginService.isLoginStateValid()) {
            this.store.select(selectLogin)
                .subscribe(user => this.accessGranted = user?.admin ? user.admin : false);
        }
    }

    canActivate(): boolean {
        if (!this.accessGranted) {
            this.messageService.add({severity: 'error', summary: `Sie sind leider kein Admin :(`});
        }
        return this.accessGranted;
    }

}
