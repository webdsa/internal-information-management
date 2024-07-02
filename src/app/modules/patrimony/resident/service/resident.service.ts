import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {

  constructor(private http: HttpClient) { }

  // GET request
  getResident(id: number): Observable<any> {
    return this.http.get(`/api/properties/${id}`);
  }

  // POST request
  createResident(property: any): Observable<any> {
    return this.http.post('/api/properties', property);
  }

  // PUT request
  updateResident(id: number, property: any): Observable<any> {
    return this.http.put(`/api/properties/${id}`, property);
  }

  // DELETE request
  deleteResident(id: number): Observable<any> {
    return this.http.delete(`/api/properties/${id}`);
  }

}





