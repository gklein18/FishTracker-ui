import { Component, OnInit } from '@angular/core';
import { TripService } from '../../service/trip/trip.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TripSummary } from '../../models/trip/trip-summary';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { CatchRecordService } from '../../service/catch-record/catch-record.service';
import { CatchRecord } from '../../models/catch-record/catch-record';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { TripForm } from '../trip-form/trip-form';
import { TripRefreshService } from '../../service/shared/trip-refresh.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trips-list',
  imports: [NgForOf, NgIf, AsyncPipe, NavigationBar, TripForm, RouterLink],
  templateUrl: './trips-list.html',
  styleUrl: './trips-list.css',
})
export class TripsList implements OnInit {
  trips$!: Observable<TripSummary[]>;
  selectedTrip: TripSummary | null = null;
  catches$!: Observable<CatchRecord[]>;
  catchesLoading = false;
  isTripModalOpen = false;
  destroy$ = new Subject<void>();

  constructor(
    private tripService: TripService,
    private catchRecordService: CatchRecordService,
    private tripRefreshService: TripRefreshService,
  ) {}

  ngOnInit() {
    this.trips$ = this.tripService.getUserTrips(1);

    this.tripRefreshService.refresh$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.trips$ = this.tripService.getUserTrips(1);
    });
  }

  selectTrip(trip: TripSummary) {
    this.selectedTrip = trip;
    this.loadCatches(trip.id);
  }

  loadCatches(tripId: number) {
    this.catchesLoading = true;

    this.catches$ = this.catchRecordService.getCatchesByTripId(tripId);
    this.catchesLoading = false;
  }

  openTripModal() {
    this.isTripModalOpen = true;
  }

  closeTripModal() {
    this.isTripModalOpen = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
