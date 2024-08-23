import { AxiosInstance } from "axios";

export interface GameSetting {
    gameId: number;
    bigSize: boolean;
    newTag: boolean;
}

export interface GameCategory {
    name: object;
    gameSettings: GameSetting[];
}

export interface Banner {
    gameId: number;
    displayTime: number;
}

export interface Game {
    id: number;

    name: string;
}

export interface RoundTimerGame {
    games: Game[];

    main: number;
}

export interface LobbyConfigs {
    name: string;
    currencyGroupIds: string[];
    miniPanelGameIds: number[];
    categories: GameCategory[];
    banners: Banner[];
    roundTimerGame: RoundTimerGame;
}

export interface LobbyResponse {
    lobbyConfigs: LobbyConfigs;
}

export default class Lobby {
    constructor(readonly axiosInstance: AxiosInstance) {}

    async getLobbyConfigs(session: string, username: string) {
        const request = {
            session,
            username,
            browserUserAgent: navigator.userAgent
        };

        const response = await this.axiosInstance.post<LobbyResponse>("/lobby/configs", request);
        return response.data;
    }
}
