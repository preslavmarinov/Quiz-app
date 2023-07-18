import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private typeQuestions = new BehaviorSubject<string>('');
  selectedType$ = this.typeQuestions.asObservable();
  private baseUrl:string = 'http://localhost:3000/questions';
  private randomUrl:string = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple&encode=base64';

  constructor(private http: HttpClient) { }

  setTypeQuestions(type:string) {
    this.typeQuestions.next(type);
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.baseUrl);
  }

  getRandomQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.randomUrl).pipe(map((data:any) => data.results));
  }


}
