import { CatchRecord } from '../catch-record/catch-record';

export interface TripDetail {
  id: number;
  location: string;
  tripDate: string;
  catches: CatchRecord[];
}
