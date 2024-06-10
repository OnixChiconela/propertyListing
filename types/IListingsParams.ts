
export interface IListingsParams {
    userId?: string;
    category?: string;
    clientCount?: number;

    addressLine1?: string;
    country?: string;
    city?: string;
    state?: string

    latitude?: number
    longitude?: number

    startDate?: string
    endDate?: string
}