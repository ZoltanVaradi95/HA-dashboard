import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BKKService } from '../../services/bkk.service';
import { BKKResponse } from '../../interfaces/bkk_response.interface';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-bkk',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule
  ],
  templateUrl: './bkk.component.html',
  styleUrl: './bkk.component.scss'
})
export class BkkComponent implements OnInit {
  private bkkService = inject(BKKService);

  @Input({ required: true })
  stopKey!: string;

  bkkStopInfo$: Observable<BKKResponse[]> | undefined;

  ngOnInit(): void {
    this.bkkStopInfo$ = this.bkkService.getBkkInfo(this.stopKey).pipe(
      tap((response: any) => {
        console.log(response.data.entry.stopTimes);
      }),
      map((response: any) => {
        const resp = response.data.entry.stopTimes as BKKResponse[];
        return resp;
      })
    );;
  }

  calculateBusArrivalMinutes(arrivalTime: number): number {
    const now = new Date();
    const diff = arrivalTime * 1000 - now.getTime();
    const diffMins = Math.floor(diff / 60000);
    if (diffMins < 0) {
      return 0;
    }
    return diffMins;
  }
}

