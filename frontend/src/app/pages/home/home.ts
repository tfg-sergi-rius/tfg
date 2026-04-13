import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription, take } from 'rxjs';
import { RecommendationService } from '../../services/recommendation.service';
import { AuthService } from '../../auth/auth.service';

interface HomeStat {
  value: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private routerSubscription?: Subscription;

  stats: HomeStat[] = [
    {
      value: '0',
      title: 'Consultes totals',
      description: 'Sollicituds de recomanacio registrades des de la creacio de l aplicacio.',
    },
    {
      value: '0',
      title: 'Idees generades',
      description: 'Nombre total de propostes de TFG guardades fins ara.',
    },
    {
      value: '0',
      title: 'Mitjana de valoracions',
      description: 'Puntuacio mitjana de les valoracions deixades pels usuaris.',
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
              title: 'Consultes totals',
              description: 'Sollicituds de recomanacio registrades des de la creacio de l aplicacio.',
            },
            {
              value: `${totalIdeas}`,
              title: 'Idees generades',
              description: 'Nombre total de propostes de TFG guardades fins ara.',
            },
            {
              value: averageRating,
              title: 'Mitjana de valoracions',
              description: 'Puntuacio mitjana de les valoracions deixades pels usuaris.',
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
