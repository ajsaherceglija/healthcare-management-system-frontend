import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentDto } from '../models/document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private baseUrl = 'https://healthcare-management-system-04601a8f10ae.herokuapp.com/documents';

  constructor(private http: HttpClient) {}

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
  getSentDocuments(userId: number): Observable<DocumentDto[]> {
    return this.http.get<DocumentDto[]>(`${this.baseUrl}/user/${userId}?role=doctor`, { headers: this.getAuthHeaders(false) });
  }

  getReceivedDocuments(userId: number): Observable<DocumentDto[]> {
    return this.http.get<DocumentDto[]>(`${this.baseUrl}/user/${userId}?role=patient`, { headers: this.getAuthHeaders(false) });
  }

}
