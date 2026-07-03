/**
 * UserStats DTO - Represents comprehensive fishing statistics for a user
 */
export interface UserStats {
  userId: number;
  totalCatches: number;
  totalTrips: number;
  averageCatchesPerTrip: number;
  heaviestFishWeight: number;
  longestFishLength: number;
  maxCatchesInTrip: number;
  tripWithMostCatches: number;
  speciesCounts: SpeciesCount[];
}

/**
 * SpeciesCount - Represents the count of catches for a specific species
 */
export interface SpeciesCount {
  speciesId: number;
  speciesName: string;
  catchCount: number;
}
