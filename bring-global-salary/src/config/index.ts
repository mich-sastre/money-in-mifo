import type { CountryCode, CountryConfig } from './types';
import { br } from './countries/br';
import { co } from './countries/co';
import { mx } from './countries/mx';
import { us } from './countries/us';

const configs: Record<CountryCode, CountryConfig> = {
  br,
  co,
  mx,
  us,
};

/** Lista de países disponibles (para selector y preview). */
export const COUNTRY_CODES: CountryCode[] = ['br', 'co', 'mx', 'us'];

/** País por defecto cuando no hay uno seleccionado. */
export const DEFAULT_COUNTRY: CountryCode = 'br';

/**
 * Devuelve la configuración del flujo para el país indicado.
 * Los componentes del flujo usan esta función (o un contexto que la use)
 * para obtener textos y opciones sin conocer el país.
 */
export function getCountryConfig(code: CountryCode): CountryConfig {
  return configs[code];
}

/**
 * Lista de configuraciones (para mostrar en selector por país).
 */
export function getAllCountryConfigs(): CountryConfig[] {
  return COUNTRY_CODES.map((code) => configs[code]);
}

export type { CountryCode, CountryConfig } from './types';
