import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CatchRecord } from '../../models/catch-record/catch-record';
import { CatchRecordService } from '../../service/catch-record/catch-record.service';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { BehaviorSubject, Observable, startWith, Subject, switchMap, takeUntil } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { FishService } from '../../service/fish/fish.service';
import { CatchRefreshService } from '../../service/shared/catch-refresh.service';
import { CatchForm } from '../catch-form/catch-form';
import { TripSummary } from '../../models/trip/trip-summary';

@Component({
  selector: 'app-recent-catches',
  imports: [NgForOf, NgIf, AsyncPipe],
  templateUrl: './recent-catches.html',
  styleUrl: './recent-catches.css',
  standalone: true,
})
export class RecentCatches implements OnInit {
  catches$!: Observable<CatchRecord[]>;
  destroy$ = new Subject<void>();
  private refreshedCatches$ = new Subject<void>();
  @Output() addCatch = new EventEmitter<void>();

  constructor(
    private catchService: CatchRecordService,
    private fishService: FishService,
    private catchRefreshService: CatchRefreshService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.catches$ = this.refreshedCatches$.pipe(
      startWith(void 0),

      switchMap(() => this.catchService.getRecentCatches(1)),
    );

    this.catchRefreshService.refresh$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.refreshedCatches$.next();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getFishImage(species: string): string {
    return this.fishService.getFishImage(species);
  }

  deleteCatch(catchId: number) {
    this.catchService.deleteCatchRecord(catchId).subscribe({
      next: () => {
        this.refreshedCatches$.next();
        this.catchRefreshService.triggerRefresh();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  viewTrip(tripId: number) {
    this.router.navigate(['/trips'], {
      queryParams: {
        selectedTrip: tripId,
      },
    });
  }
}
