import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RosterItem } from './roster.model';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css'],
})
export class RosterComponent implements OnInit {
  rosterItems$: Observable<RosterItem[]>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.rosterItems$ = this.http.get<RosterItem[]>('/api/roster').pipe(
      catchError((error) => {
        console.error('Error fetching roster data:', error);
        return of([]);
      })
    );
  }
}
