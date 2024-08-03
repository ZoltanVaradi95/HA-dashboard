import { Injectable } from '@angular/core';
import {
  getAuth,
  createConnection,
  subscribeEntities,
  ERR_HASS_HOST_REQUIRED,
  Connection,
  getAuthOptions,
  Auth,
  entitiesColl,
  UnsubscribeFunc,
} from "home-assistant-js-websocket";
import { Observable, of } from 'rxjs';

export const HOMEASSISTANT_BASEURL = "http://homeassistant.local:8123";

@Injectable({
  providedIn: 'root'
})
export class HomeAssistantSocketService {
  connection: Connection | undefined;

  constructor() { }

  getAuthOptions(): getAuthOptions {
    return {
      hassUrl: HOMEASSISTANT_BASEURL,
      loadTokens() {
        return JSON.parse(localStorage.getItem("auth") || "{}");
      },
      saveTokens(data) {
        localStorage.setItem("auth", JSON.stringify(data));
      }
    }
  }

  async connectToHomeAssistant() {
    let auth: Auth | undefined;
    try {
      // Try to pick up authentication after user logs in
      auth = await getAuth(this.getAuthOptions());
      if (auth.expired) {
        auth.refreshAccessToken();
      }
    } catch (err) {
      console.log(err)
      if (err === ERR_HASS_HOST_REQUIRED) {
        // Redirect user to log in on their instance
        auth = await getAuth(this.getAuthOptions());
      }
    };
    if (auth) {
      this.connection = await createConnection({
        auth
      });
    }

    if (location.search.includes('auth_callback=1')) {
      history.replaceState(null, '', location.pathname);
    }
  }

  subsribeToEntities(): Observable<UnsubscribeFunc> | undefined {
    if (!this.connection) {
      return;
    }
    return of(subscribeEntities(this.connection, (ent) => ent));
  }

  async subsribeToCollections() {
    if (!this.connection) {
      return;
    }
    // conn is the connection from earlier.
    const coll = entitiesColl(this.connection);
    console.log(coll);
    await coll.refresh();
    coll.subscribe((entities) => console.log(entities));
  }

}

