import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BKKResponse } from '../interfaces/bkk_response.interface';

const API_KEY = "5dce4891-d621-4400-9a6a-640ca1770b80";

@Injectable({
    providedIn: 'root'
})
export class BKKService {

    constructor(private http: HttpClient) {
    }

    getBkkInfo(stopId: string, minsBefore = 3, minsAfter = 20): Observable<BKKResponse[]> {
        const BKK_API_URL_KELENFOLD = `https://go.bkk.hu/api/query/v1/ws/otp/api/where/arrivals-and-departures-for-stop.json?key=${API_KEY}&version=3&appVersion=apiary-1.0&onlyDepartures=true&stopId=${stopId}&minutesAfter=${minsAfter}&minutesBefore=${minsBefore}`;
        return this.http.get(BKK_API_URL_KELENFOLD) as Observable<BKKResponse[]>;
    }
} 
