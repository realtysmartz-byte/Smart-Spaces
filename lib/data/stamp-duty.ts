/**
 * Stamp duty assumptions used by the estimate calculator.
 * These MUST be re-verified against the latest state notifications before launch
 * and periodically thereafter. They are estimates only.
 */
export const stampDutyRules = {
  lastReviewed: null as string | null, // TODO: set date once verified
  regions: [
    {
      key: 'haryana-urban',
      label: 'Haryana — Gurugram (urban limits)',
      rates: { male: 7, female: 5, joint: 6 },
      registrationNote: 'Registration fee is charged per Haryana slab rates (capped). Verify the current slab.',
      registrationPercent: null as number | null,
    },
    {
      key: 'delhi',
      label: 'Delhi',
      rates: { male: 6, female: 4, joint: 5 },
      registrationNote: 'Registration fee is commonly about 1% of the property value plus a fixed pasting fee. Verify.',
      registrationPercent: 1,
    },
  ],
} as const

export const stampDutyRates = {
  haryana: 7,
  delhi: 6,
} as const

export type StampRegionKey = (typeof stampDutyRules.regions)[number]['key']
