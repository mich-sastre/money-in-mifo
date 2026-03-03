/**
 * Punto de entrada de la carpeta src.
 * Exporta config y theme para que App y el flujo importen desde aquí.
 */
export {
  getCountryConfig,
  getAllCountryConfigs,
  COUNTRY_CODES,
  DEFAULT_COUNTRY,
  type CountryCode,
  type CountryConfig,
} from './config';
export { colors, spacing } from './theme';
