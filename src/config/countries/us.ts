import type { CountryConfig } from '../types';

export const us: CountryConfig = {
  code: 'us',
  displayName: 'United States',
  copy: {
    welcomeTitle: 'Bring your paycheck',
    welcomeDescription: 'Connect the bank where you get paid and we’ll automatically bring your paycheck every month.',
    connectBankTitle: 'Connect bank',
    connectBankDescription: 'Choose the institution where you receive your paycheck.',
    connectBankCta: 'Continue',
    successTitle: 'You’re all set',
    successDescription: 'When your paycheck hits the other account, we’ll bring it automatically.',
  },
  bankNames: ['Chase', 'Bank of America', 'Wells Fargo', 'Citi', 'Capital One', 'Other'],
  hasExtraLegalStep: false,
};
