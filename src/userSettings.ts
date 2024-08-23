import { AxiosInstance } from "axios";

export const UserSettingKeys = {
    quickBet: "quickBet",
    theme: "theme"
};

export interface Response {
    errorCode: string;
    message: string;
    isSuccessful: boolean;
}

const UpdateUserSettingsPath = "users/settings/update";

export default class UserSettings {
    constructor(readonly axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    async updateUserQuickBetSetting(session: string, username: string, value: boolean) {
        const response = await this.axiosInstance.post<Response>(UpdateUserSettingsPath, {
            session,
            username,
            browserUserAgent: navigator.userAgent,
            key: UserSettingKeys.quickBet,
            value
        });

        return response.data;
    }

    async updateUserThemeSetting(session: string, username: string, value: string) {
        const response = await this.axiosInstance.post<Response>(UpdateUserSettingsPath, {
            session,
            username,
            browserUserAgent: navigator.userAgent,
            key: UserSettingKeys.theme,
            value
        });

        return response.data;
    }

    async updateSignInSMStatus(session: string, username: string) {
        const response = await this.axiosInstance.post<Response>("users/firstSignInSM", {
            session,
            username,
            browserUserAgent: navigator.userAgent
        });

        return response.data;
    }

    async updateAvatar(session: string, username: string, avatarId: number) {
        const response = await this.axiosInstance.post<Response>("users/updateAvatar", {
            session,
            username,
            avatarId,
            browserUserAgent: navigator.userAgent
        });

        return response.data;
    }
}
