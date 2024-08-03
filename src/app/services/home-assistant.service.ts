import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HomeAssistantEntity } from '../interfaces/homeAssistantEntity.interface';
import { HOMEASSISTANT_REST_API_TOKEN } from '../app.consts';

export const HOMEASSISTANT_BASEURL = "http://homeassistant.local:8123";

@Injectable({
  providedIn: 'root'
})
export class HomeAssistantService {

  constructor(private http: HttpClient) { }

  getEntities(): Observable<HomeAssistantEntity[]> {
    return this.http.get(`${HOMEASSISTANT_BASEURL}/api/states`, {
      headers: {
        'Authorization': `Bearer ${HOMEASSISTANT_REST_API_TOKEN}`,
        "content-type": "application/json",
      }
    }) as Observable<HomeAssistantEntity[]>;
  }

  setEntityState(state: string, type: string, data?: Object): Observable<any> {
    console.log("setState");
    return this.http.post(`${HOMEASSISTANT_BASEURL}/api/services/${type}/${state}`, data, {
      headers: {
        'Authorization': `Bearer ${HOMEASSISTANT_REST_API_TOKEN}`,
        "content-type": "application/json",
      },
    }).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    )
  }
} 
