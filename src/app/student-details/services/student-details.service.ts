import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StudentDetails } from '../models/student-details.model';

@Injectable({
  providedIn: 'root'
})
export class StudentDetailsService {
  private data: StudentDetails[] = [];
  private dataSubject: BehaviorSubject<StudentDetails[]> = new BehaviorSubject<StudentDetails[]>([]);
  private totalDataCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private successDataCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private failedDataCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  getData(): Observable<StudentDetails[]> {
    return this.dataSubject.asObservable();
  }

  setData(parsedData: StudentDetails[]): void {
    this.data = parsedData;
    this.dataSubject.next(this.data);
    this.totalDataCountSubject.next(this.data.length);
  }

  getTotalDataCount(): Observable<number> {
    return this.totalDataCountSubject.asObservable();
  }

  getSuccessDataCount(): Observable<number> {
    return this.successDataCountSubject.asObservable();
  }

  setSuccessDataCount(count:number){
    this.successDataCountSubject.next(count);
  }

  getFailedDataCount(): Observable<number> {
    return this.failedDataCountSubject.asObservable();
  }

  setFailedDataCount(count:number){
    this.failedDataCountSubject.next(count);
  }

}
