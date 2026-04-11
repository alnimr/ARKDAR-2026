export type RegionCode = 'EG' | 'CH' | 'ES' | 'GLOBAL';

export interface RegionConfig {
  code: RegionCode;
  defaultLocale: string;
  supportedLocales: string[];
  currency: {
    code: string;
    symbol: string;
  };
  features: {
    enableBooking: boolean;
    enableIoTTracking: boolean;
  };
  contactDetails: {
    supportEmail: string;
    phone: string;
  };
}

export const REGION_CONFIGS: Record<RegionCode, RegionConfig> = {
  EG: {
    code: 'EG',
    defaultLocale: 'ar',
    supportedLocales: ['ar', 'en'],
    currency: { code: 'EGP', symbol: 'ج.م' },
    features: { enableBooking: true, enableIoTTracking: false },
    contactDetails: { supportEmail: 'eg-support@arkdar.com', phone: '+201000000000' },
  },
  CH: {
    code: 'CH',
    defaultLocale: 'de',
    supportedLocales: ['de', 'en', 'fr'],
    currency: { code: 'CHF', symbol: 'CHF' },
    features: { enableBooking: true, enableIoTTracking: true },
    contactDetails: { supportEmail: 'ch-support@arkdar.com', phone: '+41000000000' },
  },
  ES: {
    code: 'ES',
    defaultLocale: 'es',
    supportedLocales: ['es', 'en'],
    currency: { code: 'EUR', symbol: '€' },
    features: { enableBooking: true, enableIoTTracking: true },
    contactDetails: { supportEmail: 'es-support@arkdar.com', phone: '+34000000000' },
  },
  GLOBAL: {
    code: 'GLOBAL',
    defaultLocale: 'en',
    supportedLocales: ['en', 'ar', 'es', 'de', 'fr'],
    currency: { code: 'USD', symbol: '$' },
    features: { enableBooking: false, enableIoTTracking: false },
    contactDetails: { supportEmail: 'hello@arkdar.com', phone: '+1000000000' },
  }
};

export const getRegionConfig = (region: RegionCode = 'GLOBAL'): RegionConfig => {
  return REGION_CONFIGS[region];
};
