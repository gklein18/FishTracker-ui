import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TripService } from '../../service/trip/trip.service';
import { TripRefreshService } from '../../service/shared/trip-refresh.service';
import { CreateTripRequest } from '../../models/trip/create-trip-request';

@Component({
  selector: 'app-trip-form',
  imports: [ReactiveFormsModule],
  templateUrl: './trip-form.html',
  styleUrl: './trip-form.css',
  standalone: true,
})
export class TripForm implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();
  tripForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private tripRefreshService: TripRefreshService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.tripForm = this.fb.group({
      location: ['', Validators.required],
      tripDate: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.tripForm.invalid) {
      this.tripForm.markAllAsTouched();
      return;
    }

    const formValue = this.tripForm.value;

    const dto: CreateTripRequest = {
      location: formValue.location!,
      tripDate: formValue.tripDate!,
      userId: 1,
    };

    this.tripService.createTrip(dto).subscribe({
      next: (res) => {
        console.log('Trip created!', res);
        this.created.emit();
        this.tripRefreshService.triggerRefresh();
        this.close.emit();
      },
      error: (err) => {
        console.log('Error creating trip', err);
      },
    });
  }

  onClose() {
    this.close.emit();
  }
}
