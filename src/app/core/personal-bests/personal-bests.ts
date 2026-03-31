import { Component, OnInit } from '@angular/core';
import { CatchRecordService } from '../../service/catch-record/catch-record.service';
import { Observable } from 'rxjs';
import { CatchRecord } from '../../models/catch-record/catch-record';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-personal-bests',
  imports: [AsyncPipe, NgIf, NgForOf],
  templateUrl: './personal-bests.html',
  styleUrl: './personal-bests.css',
})
export class PersonalBests implements OnInit {
  pbs$!: Observable<CatchRecord[]>;

  constructor(private catchService: CatchRecordService) {}

  ngOnInit() {
    this.pbs$ = this.catchService.getRecentPBs(1);
  }
}
