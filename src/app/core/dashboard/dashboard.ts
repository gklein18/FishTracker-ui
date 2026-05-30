import { Component, OnInit } from '@angular/core';
import { TripService } from '../../service/trip/trip.service';
import { CatchRecordService } from '../../service/catch-record/catch-record.service';
import { RecentCatches } from '../recent-catches/recent-catches';
import { FishService } from '../../service/fish/fish.service';
import { RecentTrips } from '../recent-trips/recent-trips';
import { TripForm } from '../trip-form/trip-form';
import { NgIf } from '@angular/common';
import { PersonalBests } from '../personal-bests/personal-bests';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { TripRefreshService } from '../../service/shared/trip-refresh.service';
import { Subject, takeUntil } from 'rxjs';
import { CatchRefreshService } from '../../service/shared/catch-refresh.service';
import { CatchForm } from '../catch-form/catch-form';
import { DurationForm } from '../duration-form/duration-form';
import { TripSummary } from '../../models/trip/trip-summary';

@Component({
  selector: 'app-dashboard',
  imports: [
    RecentCatches,
    RecentTrips,
    TripForm,
    NgIf,
    PersonalBests,
    NavigationBar,
    CatchForm,
    DurationForm,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true,
})
export class Dashboard implements OnInit {
  totalTrips = 0;
  totalCatches = 0;
  personalBests = 0;
  isTripModalOpen = false;
  isCatchModalOpen = false;
  isDurationModalOpen = false;
  selectedTripForEdit: TripSummary | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private tripService: TripService,
    private catchService: CatchRecordService,
    private fishService: FishService,
    private tripRefreshService: TripRefreshService,
    private catchRefreshService: CatchRefreshService,
  ) {}

  ngOnInit(): void {
    this.loadStats();

    this.tripRefreshService.refresh$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadStats());

    this.catchRefreshService.refresh$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadStats());
  }

  loadStats() {
    this.tripService.getUserStats(1).subscribe((stats) => {
      this.totalTrips = stats[0];
      this.totalCatches = stats[1];
      this.personalBests = stats[2];
    })
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

  openDurationModal(trip: TripSummary) {
    this.selectedTripForEdit = trip;
    this.isDurationModalOpen = true;
  }

  closeDurationModal() {
    this.isDurationModalOpen = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
