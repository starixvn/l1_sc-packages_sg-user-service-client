import { AxiosInstance } from "axios";

export interface SettingResponse {
    chips: ChipInfo[];
}

export interface ChipInfo {
    time: string;
    text: string;
    value: number;
    color: string;
}

export interface CurrencyGroupGameResponse {
    minBet: number;
    maxBet: number;
    chips: string[];
}

export default class Setting {
    constructor(readonly axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    async getSettings(session: string, username: string) {
        const request = {
            session,
            username,
            browserUserAgent: navigator.userAgent
        };
        const response = await this.axiosInstance.post<SettingResponse>("/settings", request);

        return response.data;
    }

    async getGameSettingsByCurrencyGroup(session: string, username: string, gameIds: number[]) {
        const request = {
            session,
            username,
            browserUserAgent: navigator.userAgent,
            gameIds
        };
        const response = await this.axiosInstance.post<CurrencyGroupGameResponse>(
            "/settings/currency-group-game",
            request
        );

        return response.data;
    }
}
