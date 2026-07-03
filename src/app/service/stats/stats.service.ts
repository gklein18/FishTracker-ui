import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStats } from '../models/stats/user-stats';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = '/api/stats';

  constructor(private http: HttpClient) { }

  /**
   * Retrieve comprehensive statistics for a specific user
   * @param userId The ID of the user
   * @returns Observable of UserStats DTO
   */
  getUserStats(userId: number): Observable<UserStats> {
    return this.http.get<UserStats>(`${this.apiUrl}/user/${userId}`);
  }
}
