import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  isAuthorized(allowedRole: string): boolean {
    if (allowedRole == null) {
      return true;
    }
    return allowedRole == localStorage.getItem('role');
  }


}
