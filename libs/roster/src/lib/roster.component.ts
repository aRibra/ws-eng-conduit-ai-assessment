// libs/roster/src/lib/roster.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RosterItem } from './roster.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'realworld-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css'],
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class RosterComponent implements OnInit {
  rosterItems$!: Observable<RosterItem[]>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('Navigated to Roster page');
    this.rosterItems$ = this.http.get<RosterItem[]>('/api/roster').pipe(
      tap((data) => console.log('Roster API response:', data)),
      catchError((error) => {
        console.error('Error fetching roster data:', error);
        return of([]);
      })
    );
  }
}