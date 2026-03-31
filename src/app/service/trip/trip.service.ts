import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TripDetail } from '../../models/trip/trip-detail';
import { TripSummary } from '../../models/trip/trip-summary';
import { CreateTripRequest } from '../../models/trip/create-trip-request';
import { UpdateTripRequest } from '../../models/trip/update-trip-request';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private http: HttpClient) {}

  getTrips(): Observable<TripSummary[]> {
    return this.http.get<TripSummary[]>('/api/trips');
  }

  getRecentTrips(id: number): Observable<TripSummary[]> {
    return this.http.get<TripSummary[]>(`/api/trips/recent/${id}`);
  }

  getTrip(id: number): Observable<TripDetail> {
    return this.http.get<TripDetail>(`/api/trips/${id}`);
  }

  getUserTrips(id: number): Observable<TripSummary[]> {
    return this.http.get<TripSummary[]>(`/api/trips/user/${id}`);
  }

  createTrip(request: CreateTripRequest): Observable<TripDetail> {
    return this.http.post<TripDetail>('/api/trips', request);
  }

  updateTrip(request: UpdateTripRequest): Observable<TripDetail> {
    return this.http.put<TripDetail>('/api/trips/update', request);
  }

  deleteTrip(id: number): Observable<void> {
    return this.http.delete<void>(`/api/trips/delete/${id}`);
  }
}
