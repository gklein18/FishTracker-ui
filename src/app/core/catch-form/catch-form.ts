import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatchRecordService } from '../../service/catch-record/catch-record.service';
import { Fish } from '../../models/fish/fish';
import { FishService } from '../../service/fish/fish.service';
import { TripSummary } from '../../models/trip/trip-summary';
import { TripService } from '../../service/trip/trip.service';
import { NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NavigationBar } from '../navigation-bar/navigation-bar';

interface CreateCatchRequest {
  location: string;
  length: number;
  weight: number;
  dateCaught: string;
  fishId: number;
  tripId: number;
  userId: number;
}

@Component({
  selector: 'app-catch-form',
  imports: [ReactiveFormsModule, NgIf, NgForOf, NavigationBar],
  templateUrl: './catch-form.html',
  styleUrl: './catch-form.css',
})
export class CatchForm implements OnInit {
  fishList: Fish[] = [];
  tripList: TripSummary[] = [];
  catchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private catchRecordService: CatchRecordService,
    private fishService: FishService,
    private tripService: TripService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadItems();
  }

  initForm() {
    this.catchForm = this.fb.group({
      location: ['', Validators.required],
      length: [null, Validators.required],
      weight: [null],
      dateCaught: ['', Validators.required],
      fish: [null, Validators.required],
      trip: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.catchForm.invalid) {
      this.catchForm.markAllAsTouched();
      return;
    }

    const formValue = this.catchForm.value;

    const dto: CreateCatchRequest = {
      location: formValue.location!,
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
        this.catchForm.reset();
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error creating catch', err);
      },
    });
  }

  loadItems() {
    this.fishService.getAllFish().subscribe((fish) => {
      this.fishList = fish;

      if (fish.length > 0) {
        this.catchForm.patchValue({
          fish: fish[0],
        });
      }
    });

    this.tripService.getUserTrips(1).subscribe((trips) => {
      this.tripList = trips;

      if (trips.length > 0) {
        this.catchForm.patchValue({
          trip: trips[0],
        });
      }
    });
  }
}
