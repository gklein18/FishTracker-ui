import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fish } from '../../models/fish/fish';

@Injectable({
  providedIn: 'root',
})
export class FishService {
  constructor(private http: HttpClient) {}

  getAllFish(): Observable<Fish[]> {
    return this.http.get<Fish[]>('/api/fish/all');
  }

  getFishImage(species: string): string {
    return '/assets/fish/' + species.toLowerCase() + '.png';
  }
}
