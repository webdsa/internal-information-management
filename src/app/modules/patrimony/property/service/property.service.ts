import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }

  // GET request
  getProperty(id: number): Observable<any> {
    return this.http.get(`/api/properties/${id}`);
  }

  // POST request
  createProperty(property: any): Observable<any> {
    return this.http.post('/api/properties', property);
  }

  // PUT request
  updateProperty(id: number, property: any): Observable<any> {
    return this.http.put(`/api/properties/${id}`, property);
  }

  // DELETE request
  deleteProperty(id: number): Observable<any> {
    return this.http.delete(`/api/properties/${id}`);
  }
}

