import { Component, OnInit } from '@angular/core';
import { CatchRecordService } from '../../service/catch-record/catch-record.service';
import { Observable, startWith, switchMap } from 'rxjs';
import { CatchRecord } from '../../models/catch-record/catch-record';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { FishService } from '../../service/fish/fish.service';
import { CatchRefreshService } from '../../service/shared/catch-refresh.service';

@Component({
  selector: 'app-personal-bests',
  imports: [AsyncPipe, NgIf, NgForOf],
  templateUrl: './personal-bests.html',
  styleUrl: './personal-bests.css',
  standalone: true,
})
export class PersonalBests implements OnInit {
  pbs$!: Observable<CatchRecord[]>;

  constructor(
    private catchService: CatchRecordService,
    private fishService: FishService,
    private catchRefreshService: CatchRefreshService,
  ) {}

  ngOnInit() {
    this.pbs$ = this.catchRefreshService.refresh$.pipe(
      startWith(void 0),

      switchMap(() => this.catchService.getRecentPBs(1)),
    );
  }

  getFishImage(species: string): string {
    return this.fishService.getFishImage(species);
  }
}
