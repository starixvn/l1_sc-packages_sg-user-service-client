import { AxiosInstance } from "axios";

export interface UMInfo {
    startTime: Date;
    endTime: Date;
    operatorId: string;
}

export interface SSOResponse {
    isAuthenticated: boolean;
    username: string;
    language: string;
    ss: string;
    memberName: string;
    isUM: boolean;
    umInfo: UMInfo;
    system: number;
    offerGames: OfferGame[];
    fractionalOddsFormat: boolean;
}

export interface Response {
    errorCode: string;
    message: string;
    isSuccessful: boolean;
    isUM: boolean;
    umInfo: UMInfo;
}

export interface ReCheckInResponse extends GetBalanceResponse {
    isDisableAccount: boolean;
    apiError: Response;
    availSpins: number;
    scoins: number;
}

export interface AuthorizeResponse {
    authorized: boolean;
    user: User;
}

export interface SignNameResponse {
    isSuccessful: boolean;
    message: string;
    user: User;
}

export interface UserSettings {
    quickBet?: boolean;
    theme: string;
}
export interface OfferGame {
    gameId: number;
    minBet: number;
    maxBet: number;
    maxBetPerChoices: object;
}

export interface User {
    UID: number;
    avatarId: number;
    currency: string;
    name: string;
    red: number;
    settings: UserSettings;
    isSignedInSM: boolean;
    offerGames: OfferGame[];
    enabledGameIds: number[];
    availSpins: number;
    scoins: number;
    fractionalOddsFormat: boolean;
    isDisplayPlayerCurrency: boolean;
    currencyGroup: string;
}

export interface BetSettingResponse {
    settingGames: number[];
}

export interface GetBalanceResponse extends Response {
    balance: number;
    scoins?: number;
    availableSpins?: number;
}

export default class Auth {
    constructor(readonly axiosInstance: AxiosInstance) {}

    async sso(token: string, system = 1) {
        const response = await this.axiosInstance.get<SSOResponse>(`/auth/sso?token=${token}&system=${system}`);
        return response.data;
    }

    async reCheckIn(session: string, username: string) {
        const request = {
            session,
            username,
            browserUserAgent: navigator.userAgent
        };
        const response = await this.axiosInstance.post<ReCheckInResponse>("/auth/reCheckIn", request);
        return response.data;
    }

    async authorize(session: string, username: string) {
        const request = {
            session,
            username,
            browserUserAgent: navigator.userAgent
        };
        const response = await this.axiosInstance.post<AuthorizeResponse | Response>("/auth/authorize", request);
        return response.data;
    }

    async verifySession(session: string, username: string) {
        const request = {
            session,
            username,
            browserUserAgent: navigator.userAgent
        };
        const response = await this.axiosInstance.post<Response>("/auth/session/verify", request);
        return response.data;
    }

    async signName(session: string, username: string, nickname: string, avatar = 0) {
        const request = {
            session,
            username,
            nickname,
            browserUserAgent: navigator.userAgent,
            avatar
        };
        const response = await this.axiosInstance.post<AuthorizeResponse | Response>("/auth/signName", request);
        return response.data;
    }

    async getBalance(session: string, username: string) {
        const request = {
            session,
            username,
            browserUserAgent: navigator.userAgent
        };

        const response = await this.axiosInstance.post<GetBalanceResponse>("/auth/balance", request);
        return response.data;
    }

    async getSettingGames(session: string, username: string) {
        const request = {
            session,
            username,
            browserUserAgent: navigator.userAgent
        };

        const response = await this.axiosInstance.post<BetSettingResponse>("/auth/getSettingGames", request);
        return response.data;
    }
}
