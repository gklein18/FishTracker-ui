import { Component, OnInit } from '@angular/core';
import { FishService } from '../../service/fish/fish.service';
import { Observable } from 'rxjs';
import { TripSummary } from '../../models/trip/trip-summary';
import { Fish } from '../../models/fish/fish';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { NavigationBar } from '../navigation-bar/navigation-bar';

@Component({
  selector: 'app-fish-list',
  imports: [NgForOf, AsyncPipe, NgIf, NavigationBar],
  templateUrl: './fish-list.html',
  styleUrl: './fish-list.css',
  standalone: true,
})
export class FishList implements OnInit {
  fishList$!: Observable<Fish[]>;

  constructor(private fishService: FishService) {}

  ngOnInit() {
    this.fishList$ = this.fishService.getAllFish();
  }

  getFishImage(species: string): string {
    return this.fishService.getFishImage(species);
  }
}
