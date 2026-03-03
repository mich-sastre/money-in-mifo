import type { CountryConfig } from '../types';

export const br: CountryConfig = {
  code: 'br',
  displayName: 'Brasil',
  copy: {
    welcomeTitle: 'Traga seu salário',
    welcomeDescription: 'Conecte o banco onde você recebe e traga o salário automaticamente todo mês.',
    connectBankTitle: 'Conectar banco',
    connectBankDescription: 'Escolha a instituição onde você recebe seu salário.',
    connectBankCta: 'Continuar',
    successTitle: 'Tudo certo!',
    successDescription: 'Quando seu salário cair na outra conta, trazemos automaticamente.',
  },
  bankNames: ['Banco do Brasil', 'Itaú', 'Bradesco', 'Santander', 'Caixa', 'Outros'],
  hasExtraLegalStep: false,
};
