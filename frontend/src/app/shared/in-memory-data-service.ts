import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {User} from "./entities/user";
import {Test} from "./entities/test";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }

  createDb() {
    const users: User[] = [
      {
        smand: 'GFOS',
        swerk: 'GFOS',
        spers: '0502',
        kuerzel: 'ALB',
        passwort: '123',
        name: 'Bedow',
        vorname: 'Alice',
        lehrjahr: 1,
        admin: true
      }
    ];
    const tests: Test[] = [
      {
        id: 1,
        version: 1,
        lehrjahr: 1,
        name: 'Testtestst',
        description: 'Mein super Test'
      }
    ];
    return {tests, users};
  }
}
