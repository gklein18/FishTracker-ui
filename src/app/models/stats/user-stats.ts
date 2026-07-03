import { SpeciesCatch } from './species-catch';

export class UserStats {
  userId: number;
  totalCatches: number;
  totalTrips: number;
  tripWithMostCatches: number | null;
  maxCatchesInTrip: number | null;
  heaviestFishWeight: number | null;
  longestFishLength: number | null;
  averageCatchesPerTrip: number | null;
  speciesCounts: SpeciesCatch[];

  constructor(
    userId: number,
    totalCatches: number,
    totalTrips: number,
    tripWithMostCatches: number | null,
    maxCatchesInTrip: number | null,
    heaviestFishWeight: number | null,
    longestFishLength: number | null,
    averageCatchesPerTrip: number | null,
    speciesCounts: SpeciesCatch[]
  ) {
    this.userId = userId;
    this.totalCatches = totalCatches;
    this.totalTrips = totalTrips;
    this.tripWithMostCatches = tripWithMostCatches;
    this.maxCatchesInTrip = maxCatchesInTrip;
    this.heaviestFishWeight = heaviestFishWeight;
    this.longestFishLength = longestFishLength;
    this.averageCatchesPerTrip = averageCatchesPerTrip;
    this.speciesCounts = speciesCounts;
  }
}
