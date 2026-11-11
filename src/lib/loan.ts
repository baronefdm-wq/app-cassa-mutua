/**
 * Calcolo rata con ammortamento alla francese (rata costante).
 * Con TAN 5% riproduce esattamente le rate pubblicate nella "Tabella prestiti" del sito.
 */
export const LOAN = {
  tan: 0.05,
  fee: 100,
  min: 2000,
  max: 5000,
  step: 500,
};

/** Durata massima ammessa: 12 mesi ogni 1.000 € (come nella tabella del sito: 2.000 € → 24 mesi, 5.000 € → 60 mesi). */
export function maxMonths(amount: number): number {
  return Math.max(12, Math.floor(amount / 1000) * 12);
}

export function durationsFor(amount: number): number[] {
  const out: number[] = [];
  for (let m = 12; m <= maxMonths(amount); m += 12) out.push(m);
  return out;
}

export function monthlyPayment(amount: number, months: number, tan = LOAN.tan): number {
  const r = tan / 12;
  const p = (amount * r) / (1 - Math.pow(1 + r, -months));
  return Math.round(p * 100) / 100;
}

export function simulate(amount: number, months: number) {
  const rate = monthlyPayment(amount, months);
  const totalRates = Math.round(rate * months * 100) / 100;
  const interest = Math.round((totalRates - amount) * 100) / 100;
  return { rate, totalRates, interest, fee: LOAN.fee, totalCost: Math.round((totalRates + LOAN.fee) * 100) / 100 };
}

export function formatEuro(n: number, decimals = 2): string {
  const [int, dec] = n.toFixed(decimals).split('.');
  const withDots = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `€ ${dec ? `${withDots},${dec}` : withDots}`;
}
