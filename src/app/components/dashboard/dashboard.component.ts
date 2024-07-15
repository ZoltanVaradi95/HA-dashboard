import { Component, inject, OnInit } from '@angular/core';
import { HomeAssistantService } from '../../services/home-assistant.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private homeAssistantService = inject(HomeAssistantService);

  ngOnInit(): void {
    this.homeAssistantService.connectToHomeAssistant().then(() => {
      const unSubscribe = this.homeAssistantService.subsribeToEntities()?.pipe(
        tap((entities) => { console.log('entities', entities) })
      ).subscribe();
      // this.homeAssistantService.subsribeToCollections();
    });
  }
}
