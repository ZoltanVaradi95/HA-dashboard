import { createAction } from "@ngrx/store";
import { HomeAssistantEntity } from "../../interfaces/homeAssistantEntity.interface";

export namespace HomeAssistantActions {

    export const getEntities = createAction(
        '[HA] Get Entities');

    export const setEntities = createAction(
        '[HA] Set Entities',
        (entities: HomeAssistantEntity[]) => ({ entities }));
}