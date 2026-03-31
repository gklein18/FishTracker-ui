import { Component, OnInit } from '@angular/core';
import { CatchRecord } from '../../models/catch-record/catch-record';
import { CatchRecordService } from '../../service/catch-record/catch-record.service';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recent-catches',
  imports: [NgForOf, NgIf, AsyncPipe, RouterLink],
  templateUrl: './recent-catches.html',
  styleUrl: './recent-catches.css',
})
export class RecentCatches implements OnInit {
  catches$!: Observable<CatchRecord[]>;

  constructor(private catchService: CatchRecordService) {}

  ngOnInit() {
    this.catches$ = this.catchService.getRecentCatches(1);
  }

  getFishImage(species: string): string {
    return 'bass.png';
    // switch (species.toLowerCase()) {
    //   case 'largemouth bass':
    //     return 'assets/fish/largemouth.png';
    //   case 'rainbow trout':
    //     return 'assets/fish/rainbow-trout.png';
    //   case 'northern pike':
    //     return 'assets/fish/northern-pike.png';
    //   case 'smallmouth bass':
    //     return 'assets/fish/smallmouth.png';
    //   case 'crappie':
    //     return 'assets/fish/crappie.png';
    //   default:
    //     return 'assets/fish/default.png';
    // }
  }
}
