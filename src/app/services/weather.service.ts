import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BKKResponse } from '../interfaces/bkk_response.interface';
import { WeatherResponseData } from '../interfaces/weather.interface';

const API_KEY = "6XGFYMNWZPDEBZTK7LATP7PTF";

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    constructor(private http: HttpClient) {
    }

    getWeatherInfo(location = "Budapest"): Observable<WeatherResponseData> {
        return this.http.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${API_KEY}`) as Observable<WeatherResponseData>;
    }
} 
