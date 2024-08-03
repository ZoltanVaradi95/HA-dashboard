export interface HomeAssistantEntity {
    entity_id: string;
    last_changed: Date;
    state: string;
    attributes: Record<string, any>;
}