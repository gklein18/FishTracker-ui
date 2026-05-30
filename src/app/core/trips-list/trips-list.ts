import { Component, OnInit } from '@angular/core';
import { TripService } from '../../service/trip/trip.service';
import { BehaviorSubject, filter, Observable, Subject, switchMap, take, takeUntil } from 'rxjs';
import { TripSummary } from '../../models/trip/trip-summary';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { CatchRecordService } from '../../service/catch-record/catch-record.service';
import { CatchRecord } from '../../models/catch-record/catch-record';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { TripForm } from '../trip-form/trip-form';
import { TripRefreshService } from '../../service/shared/trip-refresh.service';
import { ActivatedRoute } from '@angular/router';
import { FishService } from '../../service/fish/fish.service';
import { CatchForm } from '../catch-form/catch-form';
import { CatchRefreshService } from '../../service/shared/catch-refresh.service';

@Component({
  selector: 'app-trips-list',
  imports: [NgForOf, NgIf, AsyncPipe, NavigationBar, TripForm, CatchForm],
  templateUrl: './trips-list.html',
  styleUrl: './trips-list.css',
  standalone: true,
})
export class TripsList implements OnInit {
  trips$!: Observable<TripSummary[]>;
  selectedTrip: TripSummary | null = null;
  catches$!: Observable<CatchRecord[]>;
  catchesLoading = false;
  isTripModalOpen = false;
  destroy$ = new Subject<void>();
  isCatchModalOpen = false;
  private refreshedCatches$ = new BehaviorSubject<number | null>(null);
  private refreshTrips$ = new BehaviorSubject<void>(undefined);

  constructor(
    private tripService: TripService,
    private catchRecordService: CatchRecordService,
    private tripRefreshService: TripRefreshService,
    private catchRefreshService: CatchRefreshService,
    private fishService: FishService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.trips$ = this.refreshTrips$.pipe(switchMap(() => this.tripService.getUserTrips(1)));

    this.tripRefreshService.refresh$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.refreshTrips$.next();
    });

    this.catchRefreshService.refresh$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.selectedTrip) {
        this.loadCatches(this.selectedTrip.id);
      }
    });

    this.catches$ = this.refreshedCatches$.pipe(
      filter((tripId): tripId is number => tripId !== null),

      switchMap((tripId) => {
        this.catchesLoading = true;

        return this.catchRecordService.getCatchesByTripId(tripId);
      }),
    );

    this.catches$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (catches) => {
        console.log('Catches refreshed:', catches);

        this.catchesLoading = false;
      },
      error: (err) => {
        console.error(err);

        this.catchesLoading = false;
      },
    });

    this.route.queryParams.subscribe((params) => {
      const selectedTripId = Number(params['selectedTrip']);

      if (!selectedTripId) return;

      this.trips$.pipe(take(1)).subscribe((trips) => {
        const trip = trips.find((t) => t.id === selectedTripId);

        if (trip) {
          this.selectTrip(trip);
        }
      });
    });
  }

  selectTrip(trip: TripSummary) {
    console.log('Trip selected:', trip);
    this.selectedTrip = trip;
    this.loadCatches(trip.id);
  }

  loadCatches(tripId: number) {
    this.catchesLoading = true;

    this.refreshedCatches$.next(tripId);
    this.catchesLoading = false;
  }

  openTripModal() {
    this.isTripModalOpen = true;
  }

  closeTripModal() {
    this.isTripModalOpen = false;
  }

  openCatchModal() {
    this.isCatchModalOpen = true;
  }

  closeCatchModal() {
    this.isCatchModalOpen = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getFishImage(species: string): string {
    return this.fishService.getFishImage(species);
  }

  deleteCatch(catchId: number, tripId: number) {
    this.catchRecordService.deleteCatchRecord(catchId).subscribe({
      next: () => {
        this.loadCatches(tripId);
        this.tripRefreshService.triggerRefresh();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  deleteTrip(tripId: number) {
    this.tripService.deleteTrip(tripId).subscribe({
      next: () => {
        this.refreshTrips$.next();
        this.tripRefreshService.triggerRefresh();

        if (this.selectedTrip?.id === tripId) {
          this.selectedTrip = null;
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getFishIcons(count: number): number[] {
    const maxIcons = 11;

    return Array(Math.min(count, maxIcons)).fill(0);
  }
}
