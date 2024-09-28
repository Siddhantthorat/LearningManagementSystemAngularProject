import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { coursemodel } from './Model/coursemodel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  apiurls='http://localhost:3000/course';

  Getallcourse():Observable<coursemodel[]>
  {
      return this.http.get<coursemodel[]>(this.apiurls);
  }

  CreateCourse(coursedata: any) {
    return this.http.post(this.apiurls,coursedata);
  }

  GetCoursebycode(id: any): Observable<coursemodel> {
    return this.http.get<coursemodel>(this.apiurls + '/' + id);
  }


  RemoveCoursebycode(id: any) {
    return this.http.delete(this.apiurls + '/' + id);
  }

 

  UpdateCourse(id: any, coursedata: any) {
    return this.http.put(this.apiurls + '/' + id, coursedata);
  }

 

}
