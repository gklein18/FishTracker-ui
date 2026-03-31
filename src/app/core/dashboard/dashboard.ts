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

@Component({
  selector: 'app-dashboard',
  imports: [RecentCatches, RecentTrips, TripForm, NgIf, PersonalBests, NavigationBar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  totalTrips = 0;
  totalCatches = 0;
  personalBests = 0;
  isTripModalOpen = false;
  private destroy$ = new Subject<void>();

  constructor(
    private tripService: TripService,
    private catchService: CatchRecordService,
    private fishService: FishService,
    private tripRefreshService: TripRefreshService,
  ) {}

  ngOnInit(): void {
    this.loadStats();

    this.tripRefreshService.refresh$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadStats());
  }

  loadStats() {
    this.tripService.getUserTrips(1).subscribe((trips) => {
      this.totalTrips = trips.length;
    });

    this.catchService.getUserCatches(1).subscribe((catches) => {
      this.totalCatches = catches.length;
      this.personalBests = catches.filter((c) => c.personalBest).length;
    });
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
