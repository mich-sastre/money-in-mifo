/**
 * Códigos de país soportados (agnóstico: el flujo no conoce países por nombre).
 */
export type CountryCode = 'br' | 'co' | 'mx' | 'us';

/**
 * Configuración por país. Los componentes del flujo reciben estos datos,
 * no conocen "Brasil" o "México"; solo muestran lo que viene en la config.
 */
export interface CountryConfig {
  /** Código del país (para selector y lógica interna). */
  code: CountryCode;
  /** Nombre para mostrar en selector / debug. */
  displayName: string;
  /** Textos del flujo "traer el sueldo" (títulos, descripciones, CTAs). */
  copy: {
    /** Pantalla de bienvenida / inicio del flujo. */
    welcomeTitle: string;
    welcomeDescription: string;
    /** Conectar banco. */
    connectBankTitle: string;
    connectBankDescription: string;
    connectBankCta: string;
    /** Éxito / sueldo traído. */
    successTitle: string;
    successDescription: string;
  };
  /** Nombres de bancos de ejemplo o lista (según diseño por país). */
  bankNames?: string[];
  /** Si este país tiene pasos extra (ej. términos legales). */
  hasExtraLegalStep?: boolean;
}
