import { Locales } from '@/contracts';
import ru from './ru';
import en from './en';

const locales: { [key in Locales]: { [key in keyof typeof ru]: string } } = {
    ru,
    en,
};

export default locales;
