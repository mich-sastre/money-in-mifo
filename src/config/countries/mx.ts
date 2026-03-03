import type { CountryConfig } from '../types';

export const mx: CountryConfig = {
  code: 'mx',
  displayName: 'México',
  copy: {
    welcomeTitle: 'Trae tu nómina',
    welcomeDescription: 'Conecta el banco donde te depositan y traemos tu nómina automáticamente cada mes.',
    connectBankTitle: 'Conectar banco',
    connectBankDescription: 'Elige la institución donde recibes tu nómina.',
    connectBankCta: 'Continuar',
    successTitle: 'Listo',
    successDescription: 'Cuando llegue tu nómina a la otra cuenta, la traemos automáticamente.',
  },
  bankNames: ['BBVA', 'Santander', 'Banamex', 'HSBC', 'Scotiabank', 'Otros'],
  hasExtraLegalStep: true,
};
