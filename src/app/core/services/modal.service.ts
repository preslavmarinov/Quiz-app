import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalStates: {id:string, state: BehaviorSubject<boolean>}[] = [];
  private currElementId = new BehaviorSubject<number>(-1);
  public currElementId$ = this.currElementId.asObservable();

  addModal(id:string, initialState:boolean = false) {
    this.modalStates.push({id:id, state: new BehaviorSubject<boolean>(initialState)});
  }

  removeModal(id:string) {
    this.modalStates = this.modalStates.filter(el => el.id !== id);
  }

  openModal(id:string) {
    console.log(id);
    this.setModalState(id, true);
  }

  closeModal(id:string) {
    console.log(id);
    this.setModalState(id, false);
  }

  getModalState(id:string): BehaviorSubject<boolean> | null {
    let modal = this.modalStates.find(el => el.id === id);
    if(modal) {
      return modal.state;
    }
    return null;
  }

  private setModalState(id:string, state:boolean) {
    console.log(state);
    let modal = this.modalStates.find(el => el.id === id);
    if(modal) {
      modal.state.next(state);
    }
  }

  setCurrElementId(value:number) :void {
    console.log('service modal ', value)
     this.currElementId.next(value);
  }
}
