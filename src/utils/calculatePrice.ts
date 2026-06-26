import { CURRENCY_SYMBOLS } from '../data/pricing';

export type CurrencyCode = 'USD' | 'EUR' | 'INR';

export interface PriceResult {
  formattedPrice: string;
  formattedPeriod: string;
  savingsText?: string;
}

/**
 * Calculates the display price and period label based on billing cycle and currency.
 * Applies a 20% discount on annual subscriptions: monthly * 12 * 0.8.
 */
export function calculatePrice(
  monthlyPrice: number,
  billingPeriod: 'monthly' | 'annual',
  currency: CurrencyCode
): PriceResult {
  let price = monthlyPrice;

  if (billingPeriod === 'annual') {
    // Annual calculation: monthly * 12 * 0.8
    price = monthlyPrice * 12 * 0.8;
  }

  const symbol = CURRENCY_SYMBOLS[currency];
  const roundedPrice = Math.round(price);
  
  // Format based on currency standards
  const formattedNumber = new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
    maximumFractionDigits: 0,
  }).format(roundedPrice);

  const formattedPeriod = billingPeriod === 'annual' ? '/yr' : '/mo';

  let savingsText;
  if (billingPeriod === 'annual') {
    const regularCost = monthlyPrice * 12;
    const savings = Math.round(regularCost - price);
    const formattedSavings = new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
      maximumFractionDigits: 0,
    }).format(savings);
    savingsText = `Save ${symbol}${formattedSavings}/yr`;
  }

  return {
    formattedPrice: `${symbol}${formattedNumber}`,
    formattedPeriod,
    savingsText,
  };
}
