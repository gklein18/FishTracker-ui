import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TripSummary } from '../../models/trip/trip-summary';
import { TripService } from '../../service/trip/trip.service';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { TripRefreshService } from '../../service/shared/trip-refresh.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recent-trips',
  imports: [NgForOf, NgIf, AsyncPipe, DatePipe],
  templateUrl: './recent-trips.html',
  styleUrl: './recent-trips.css',
})
export class RecentTrips implements OnInit {
  trips$!: Observable<TripSummary[]>;
  destroy$ = new Subject<void>();

  constructor(
    private tripService: TripService,
    private tripRefreshService: TripRefreshService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.trips$ = this.tripService.getRecentTrips(1);

    this.tripRefreshService.refresh$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.trips$ = this.tripService.getRecentTrips(1);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  viewAllTrips() {
    this.router.navigate(['/trips']);
  }
}
