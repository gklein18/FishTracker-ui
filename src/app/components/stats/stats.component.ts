import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatsService } from '../../service/stats/stats.service';
import { UserStats } from '../../models/stats/user-stats';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  userStats: UserStats | null = null;
  loading: boolean = true;
  error: string | null = null;
  userId: number | null = null;

  constructor(
    private statsService: StatsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      if (this.userId) {
        this.loadUserStats(this.userId);
      }
    });
  }

  /**
   * Load user statistics from the backend service
   * @param userId The ID of the user
   */
  loadUserStats(userId: number): void {
    this.loading = true;
    this.error = null;

    this.statsService.getUserStats(userId).subscribe(
      (data: UserStats) => {
        this.userStats = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading user stats:', error);
        this.error = 'Failed to load statistics. Please try again later.';
        this.loading = false;
      }
    );
  }

  /**
   * Format a number to 2 decimal places
   * @param value The number to format
   * @returns Formatted string or 'N/A'
   */
  formatNumber(value: number | null | undefined): string {
    if (value === null || value === undefined) {
      return 'N/A';
    }
    return value.toFixed(2);
  }

  /**
   * Get the top 5 species by catch count
   * @returns Array of top 5 species
   */
  getTopSpecies(): any[] {
    if (!this.userStats || !this.userStats.speciesCounts) {
      return [];
    }
    return this.userStats.speciesCounts.slice(0, 5);
  }
}
