import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, filter, map, take, takeUntil, tap } from "rxjs";
import { HomeAssistantActions } from "./homeassistant.actions";
import { HomeAssistantService } from "../../services/home-assistant.service";
import { HomeAssistantEntity } from "../../interfaces/homeAssistantEntity.interface";

@Injectable()
export class HomeAssistantEffects {

    getEntities$ = createEffect((actions$ = inject(Actions), haService = inject(HomeAssistantService)) => actions$.pipe(
        ofType(HomeAssistantActions.getEntities),
        exhaustMap(() => {
            return haService.getEntities().pipe(
                map((entities: HomeAssistantEntity[]) => HomeAssistantActions.setEntities(entities)),
                tap(({ entities }) => {
                    entities.forEach((entity) => {
                        if (entity.entity_id.includes('light')) {
                            // console.log(entity);
                        }
                    });
                })
            )
        })
    ));
}