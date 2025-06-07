import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentDto } from '../models/document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private baseUrl = 'http://localhost:8080/documents';

  constructor(private http: HttpClient) {}

  getDocumentsForUser(userId: number): Observable<DocumentDto[]> {
    const headers = this.getAuthHeaders(false);
    return this.http.get<DocumentDto[]>(`${this.baseUrl}/user/${userId}`, { headers });
  }

  sendDocument(documentData: any): Observable<DocumentDto> {
    const headers = this.getAuthHeaders(true);
    return this.http.post<DocumentDto>(`${this.baseUrl}/send`, documentData, { headers });
  }

  private getAuthHeaders(includeJsonContentType: boolean = true): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authorization token not found in localStorage');

    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if (includeJsonContentType) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return headers;
  }
}
