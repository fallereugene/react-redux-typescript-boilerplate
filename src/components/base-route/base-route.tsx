import { Route } from 'react-router-dom';
import { WithRouterProps } from '@/contracts';

/**
 * Базовый компонент роута приложения
 */
export default class BaseRoute<TProps extends {} = {}> extends Route<WithRouterProps<TProps>> {}
