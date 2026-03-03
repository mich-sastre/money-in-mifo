import type { CountryConfig } from '../types';

export const co: CountryConfig = {
  code: 'co',
  displayName: 'Colombia',
  copy: {
    welcomeTitle: 'Trae tu salario',
    welcomeDescription: 'Conecta el banco donde te consignan y traemos tu salario automáticamente cada mes.',
    connectBankTitle: 'Conectar banco',
    connectBankDescription: 'Elige la institución donde recibes tu salario.',
    connectBankCta: 'Continuar',
    successTitle: 'Listo',
    successDescription: 'Cuando llegue tu salario a la otra cuenta, lo traemos automáticamente.',
  },
  bankNames: ['Bancolombia', 'Davivienda', 'BBVA', 'Banco de Bogotá', 'Otros'],
  hasExtraLegalStep: false,
};
