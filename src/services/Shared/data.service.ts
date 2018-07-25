import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

    private messageSource = new BehaviorSubject<boolean>(false);

    currentMsg = this.messageSource.asObservable();

    constructor(){ }

    changeMessage(message:boolean){
        this.messageSource.next(message)
    }
}