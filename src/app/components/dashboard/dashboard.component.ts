import { Component, inject, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../store/appstate.interface';
import { HomeAssistantActions } from '../../store/homeassistant/homeassistant.actions';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HomeAssistantEntity } from '../../interfaces/homeAssistantEntity.interface';
import { HomeAssistantService } from '../../services/home-assistant.service';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatToolbar } from '@angular/material/toolbar';
import { LightStateType } from './dashboard.model';
import { ColorPickerModule } from 'ngx-color-picker';
import { ClimateComponent } from '../shared/climate/climate.component';
import { BkkComponent } from '../bkk/bkk.component';
import { WeatherComponent } from '../weather/weather.component';

const BKK_STOP_KEY = "BKK_F02073";
const BKK_STOP_KEY_2 = "BKK_F02074";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatSlideToggle,
    ColorPickerModule,
    ClimateComponent,
    BkkComponent,
    WeatherComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private store = inject(Store<AppStateInterface>);
  private haService = inject(HomeAssistantService);

  color: string = '#ff0000';
  lightStateType = LightStateType;
  entities$: Observable<HomeAssistantEntity[]> | undefined;
  stopKey_1 = BKK_STOP_KEY;
  stopKey_2 = BKK_STOP_KEY_2;

  constructor() {
    this.store.dispatch(HomeAssistantActions.getEntities());
  }

  ngOnInit(): void {
    // this.entities$ = this.store.select(HomeAssistantSelector.getEntities).pipe(
    //   map((entities: HomeAssistantEntity[]) => {
    //     return entities.filter((entity) => entity.entity_id.includes('light'));
    //   })
    // );
  }

  toggleItem(entity: HomeAssistantEntity) {
    const color = {
      "entity_id": entity.entity_id,
      "brightness": 120,
      "rgb_color": [255, 0, 0]
    };
    this.haService.setEntityState('turn_on', 'light', color).subscribe();
  }

  switchEntity(isToggled: MatSlideToggleChange, entity: HomeAssistantEntity) {
    const color = {
      "entity_id": entity.entity_id,
    };
    const ligthState = isToggled.checked ? 'turn_on' : 'turn_off';
    this.haService.setEntityState(ligthState, 'light', color).subscribe();
  }

}
