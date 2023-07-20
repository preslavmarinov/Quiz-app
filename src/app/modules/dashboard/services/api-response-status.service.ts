import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiResponseStatusService {

  private statusResponse = new BehaviorSubject<boolean>(false);
  public statusResp$ = this.statusResponse.asObservable();

  public setStatusResponse(value:boolean) {
    this.statusResponse.next(value);
  }
}
