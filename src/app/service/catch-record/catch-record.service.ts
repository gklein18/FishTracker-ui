import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateCatchRequest } from '../../models/catch-record/create-catch-request';
import { UpdateCatchRequest } from '../../models/catch-record/update-catch-request';
import { CatchRecord } from '../../models/catch-record/catch-record';

@Injectable({
  providedIn: 'root',
})
export class CatchRecordService {
  constructor(private http: HttpClient) {}

  getRecentCatches(id: number): Observable<CatchRecord[]> {
    return this.http.get<CatchRecord[]>(`/api/catch/recent/${id}`);
  }

  getRecentPBs(id: number): Observable<CatchRecord[]> {
    return this.http.get<CatchRecord[]>(`/api/catch/pb/${id}`);
  }

  getAllCatches(): Observable<CatchRecord[]> {
    return this.http.get<CatchRecord[]>('/api/catch');
  }

  getUserCatches(id: number): Observable<CatchRecord[]> {
    return this.http.get<CatchRecord[]>(`/api/catch/user/${id}`);
  }

  createCatchRecord(request: CreateCatchRequest): Observable<CatchRecord> {
    return this.http.post<CatchRecord>('/api/catch/create', request);
  }

  createCatchRecordBatch(
    requests: CreateCatchRequest[]
  ): Observable<CatchRecord[]> {
    return this.http.post<CatchRecord[]>('/api/catch/bulk', requests);
  }

  updateCatchRecord(request: UpdateCatchRequest, tripId: number): Observable<CatchRecord> {
    return this.http.put<CatchRecord>(`/api/catch/update/${tripId}`, request);
  }

  deleteCatchRecord(id: number): Observable<void> {
    return this.http.delete<void>(`/api/catch/delete/${id}`);
  }

  getCatchById(id: number): Observable<CatchRecord> {
    return this.http.get<CatchRecord>(`/api/catch/${id}`);
  }

  getCatchesByTripId(id: number): Observable<CatchRecord[]> {
    return this.http.get<CatchRecord[]>(`/api/catch/trip/${id}`);
  }
}
