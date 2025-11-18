import spbIcon from '@shared/assets/icons/spb.svg';
import cardIcon from '@shared/assets/icons/card.svg';
import tbankIcon from '@shared/assets/icons/tbank.svg';
import sberpayIcon from '@shared/assets/icons/sberpay.svg';

export const paymentMethods = [
  { id: 'sbp', label: 'Через СБП', icon: spbIcon },
  { id: 'bank_card', label: 'Картой онлайн', icon: cardIcon },
  { id: 'tinkoff_bank', label: 'T-Pay', icon: tbankIcon },
  { id: 'sberbank', label: 'SberPay', icon: sberpayIcon },
];
