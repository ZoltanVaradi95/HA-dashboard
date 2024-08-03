import { createReducer, on } from "@ngrx/store";
import { HomeAssistantActions } from "./homeassistant.actions";
import { HomeAssistantEntity } from "../../interfaces/homeAssistantEntity.interface";

export interface HomeAssistantState {
    entities: HomeAssistantEntity[];
}

const initialState: HomeAssistantState = {
    entities: [],
}

export const haReducer = createReducer(
    initialState,
    on(HomeAssistantActions.setEntities, (state, { entities }) => {
        return {
            ...state,
            entities
        };
    }),
);
