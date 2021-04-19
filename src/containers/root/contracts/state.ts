import { Locales } from '@/contracts';

export interface IRootState {
    isApplicationReady: boolean;
    isAuthenticated: boolean;
    currentLocale: Locales;
}
