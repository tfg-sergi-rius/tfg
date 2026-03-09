import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { NgbCarousel, NgbSlide } from '@ng-bootstrap/ng-bootstrap/carousel';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [NgFor, NgIf, NgbCarousel, NgbSlide],
  templateUrl: './results.html',
  styleUrl: './results.css'
})
export class Results implements OnInit {

  ideas: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    this.http.get<any>(`http://127.0.0.1:8000/recommendation/${id}`)
      .subscribe(res => {

        console.log("Respuesta backend:", res);

        if (res.status === "done") {
          this.ideas = res.data;
        }

        this.loading = false;

        // 👇 fuerza actualización del template
        this.cdr.detectChanges();

      });

  }

}