import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatchRecordService } from '../../service/catch-record/catch-record.service';
import { Fish } from '../../models/fish/fish';
import { FishService } from '../../service/fish/fish.service';
import { TripSummary } from '../../models/trip/trip-summary';
import { TripService } from '../../service/trip/trip.service';
import { NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CreateCatchRequest } from '../../models/catch-record/create-catch-request';
import { TripRefreshService } from '../../service/shared/trip-refresh.service';
import { CatchRefreshService } from '../../service/shared/catch-refresh.service';


@Component({
  selector: 'app-catch-form',
  imports: [ReactiveFormsModule, NgIf, NgForOf],
  templateUrl: './catch-form.html',
  styleUrl: './catch-form.css',
  standalone: true,
})
export class CatchForm implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();
  @Input() selectedTrip: TripSummary | null = null;
  fishList: Fish[] = [];
  tripList: TripSummary[] = [];
  catchForm!: FormGroup;
  selectedFish: any = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private catchRecordService: CatchRecordService,
    private fishService: FishService,
    private tripService: TripService,
    private router: Router,
    private tripRefreshService: TripRefreshService,
    private catchRefreshService: CatchRefreshService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadItems();
    this.catchForm.get('fish')?.valueChanges.subscribe((fish) => {
      this.selectedFish = fish;
    });
  }

  initForm() {
    this.catchForm = this.fb.group({
      length: [null, [Validators.required, Validators.min(1), Validators.max(10)]],
      weight: [null, [Validators.min(1), Validators.max(200)]],
      dateCaught: ['', [Validators.required]],
      fish: [null, [Validators.required]],
      trip: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.catchForm.invalid) {
      this.catchForm.markAllAsTouched();
      return;
    }

    const formValue = this.catchForm.value;

    const dto: CreateCatchRequest = {
      length: formValue.length!,
      weight: formValue.weight!,
      dateCaught: formValue.dateCaught!,
      fishId: formValue.fish!.id,
      tripId: formValue.trip!.id,
      userId: 1,
    };

    this.catchRecordService.createCatchRecord(dto).subscribe({
      next: (res) => {
        console.log('Catch created!', res);
        this.created.emit();
        this.catchForm.reset();
        this.tripRefreshService.triggerRefresh();
        this.catchRefreshService.triggerRefresh();
        this.close.emit();
      },
      error: (err) => {
        console.error('Error creating catch', err);
      },
    });
  }

  loadItems() {
    this.fishService.getAllFish().subscribe((fish) => {
      this.fishList = fish;
    });

    this.tripService.getUserTrips(1).subscribe((trips) => {
      this.tripList = trips;

      if (this.selectedTrip) {
        this.catchForm.patchValue({
          trip: this.selectedTrip,
        });
      } else if (trips.length > 0) {
        this.catchForm.patchValue({
          trip: trips[0],
        });
      }
    });
  }

  getFishImage(species: string): string {
    if (!species) return '/assets/fish/largemouth bass.png';
    return this.fishService.getFishImage(species);
  }

  onClose() {
    this.close.emit();
  }

  compareTrips(t1: TripSummary, t2: TripSummary): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }
}
