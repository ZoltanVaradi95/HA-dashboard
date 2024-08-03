import { HomeAssistantState } from "./homeassistant/homeassistant.reducer";

export interface AppStateInterface {
    homeAssistantState: HomeAssistantState;
}