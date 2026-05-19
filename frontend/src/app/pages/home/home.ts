import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription, take } from 'rxjs';
import { RecommendationService } from '../../services/recommendation.service';
import { AuthService } from '../../auth/auth.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

interface HomeStat {
  value: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgFor, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private routerSubscription?: Subscription;

  stats: HomeStat[] = [
    {
      value: '0',
      title: 'home.stat.requests.title',
      description: 'home.stat.requests.desc',
    },
    {
      value: '0',
      title: 'home.stat.ideas.title',
      description: 'home.stat.ideas.desc',
    },
    {
      value: '0',
      title: 'home.stat.rating.title',
      description: 'home.stat.rating.desc',
    },
  ];

  readonly authService = inject(AuthService);

  constructor(
    private recommendationService: RecommendationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadStats();

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navigation = event as NavigationEnd;

        if (navigation.urlAfterRedirects === '/') {
          this.loadStats();
        }
      });
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }

  private loadStats() {
    this.recommendationService.getAllRecommendations()
      .pipe(take(1))
      .subscribe({
        next: (recommendations) => {
          const totalRequests = recommendations.length;
          const totalIdeas = recommendations.reduce(
            (sum, recommendation) => sum + recommendation.data.length,
            0
          );
          const ratedRecommendations = recommendations.filter(
            (recommendation) => recommendation.rating !== undefined && recommendation.rating !== null
          );
          const totalRating = ratedRecommendations.reduce(
            (sum, recommendation) => sum + (recommendation.rating ?? 0),
            0
          );
          const averageRating = ratedRecommendations.length > 0
            ? `${(totalRating / ratedRecommendations.length).toFixed(1)}/5`
            : '0/5';

          this.stats = [
            {
              value: `${totalRequests}`,
              title: 'home.stat.requests.title',
              description: 'home.stat.requests.desc',
            },
            {
              value: `${totalIdeas}`,
              title: 'home.stat.ideas.title',
              description: 'home.stat.ideas.desc',
            },
            {
              value: averageRating,
              title: 'home.stat.rating.title',
              description: 'home.stat.rating.desc',
            },
          ];
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error(error);
          this.cdr.detectChanges();
        },
      });
  }
}
