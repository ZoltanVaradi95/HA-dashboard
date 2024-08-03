import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { WeatherService } from '../../services/weather.service';
import { WeatherDayData, WeatherResponseData } from '../../interfaces/weather.interface';
import { map, Observable, pipe, tap } from 'rxjs';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit {
  private weatherService = inject(WeatherService);

  weatherInfo$: Observable<WeatherResponseData> | undefined;
  weatherDaysSignal = signal<WeatherDayData[]>([]);

  ngOnInit(): void {
    this.weatherInfo$ = this.weatherService.getWeatherInfo().pipe(
      tap((response: WeatherResponseData) => {
        console.log("weatherResponse",response);
        this.weatherDaysSignal.set(response.days);
      }
      ));
  };

}
