import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TripService } from '../../service/trip/trip.service';
import { TripRefreshService } from '../../service/shared/trip-refresh.service';
import { UpdateTripRequest } from '../../models/trip/update-trip-request';
import { TripSummary } from '../../models/trip/trip-summary';

@Component({
  selector: 'app-duration-form',
  imports: [ReactiveFormsModule],
  templateUrl: './duration-form.html',
  styleUrl: './duration-form.css',
  standalone: true,
})
export class DurationForm implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();
  @Input() selectedTrip: TripSummary | null = null;
  durationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private tripRefreshService: TripRefreshService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.durationForm = this.fb.group({
      tripDuration: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.durationForm.invalid) {
      this.durationForm.markAllAsTouched();
      return;
    }

    const formValue = this.durationForm.value;

    const dto: UpdateTripRequest = {
      durationHours: formValue.tripDuration!,
      tripId: this.selectedTrip!.id,
    };

    this.tripService.updateTrip(dto).subscribe({
      next: (res) => {
        console.log('Trip updated!', res);
        this.created.emit();
        this.tripRefreshService.triggerRefresh();
        this.close.emit();
      },
      error: (err) => {
        console.error('Error updating trip', err);
      },
    });
  }

  onClose() {
    this.close.emit();
  }
}
