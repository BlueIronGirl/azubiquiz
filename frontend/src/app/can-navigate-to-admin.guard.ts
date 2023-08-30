import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanNavigateToAdminGuard implements CanActivate {
  accessGranted = true;

  canActivate(): boolean {
    if (!this.accessGranted) {
      const question = "Sind Sie ein Admin?";
      this.accessGranted = window.confirm(question);
    }
    return true;
  }

}
