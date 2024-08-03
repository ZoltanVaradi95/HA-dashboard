export interface BKKResponse {
    stopHeadsign: string;
    arrivalTime: number;
    departureTime: number;
    predictedArrivalTime: number;
    predictedDepartureTime: number;
    stopSequence: number;
    tripId: string;
    serviceDate: string;
    wheelchairAccessible: boolean;
    mayRequireBooking: boolean;
    canceled: boolean
    alertIds: string[];
}