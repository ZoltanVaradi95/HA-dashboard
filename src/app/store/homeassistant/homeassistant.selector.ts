import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../appstate.interface";

export namespace HomeAssistantSelector {
    const getState = (state: AppStateInterface) => state.homeAssistantState;


    export const getEntities = createSelector(
        getState,
        (homeAssistantState) => homeAssistantState.entities || null
    )
}

