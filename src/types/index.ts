export type PageType = 'Under Construction' | 'Launching Soon' | 'Maintenance' | 'Timer'
export type TemplateId = 'MinimalCorporate' | 'CreativeIllustration' | 'DarkTech'
export type AnimationMode = 'without-animation' | 'with-animation'

export interface AppConfig {
  pageType: PageType
  template: TemplateId
  animationMode: AnimationMode
  pageTitle: string
  companyName: string
  contactEmail: string
  companyNameColor: string
  companyNameFontSize: string
  companyNameFontWeight: string
  companyNameLetterSpacing: string
  title: string
  subtitle: string
  ctaText: string
  countdownDate?: string // ISO string
  maintenanceMessage?: string
}

export const defaultConfig: AppConfig = {
  pageType: 'Under Construction',
  template: 'MinimalCorporate',
  animationMode: 'without-animation',
  pageTitle: 'Status Page',
  companyName: 'Company',
  contactEmail: 'contact@example.com',
  companyNameColor: '#2563eb',
  companyNameFontSize: '28px',
  companyNameFontWeight: '700',
  companyNameLetterSpacing: '0.02em',
  title: 'We are building something great',
  subtitle: 'Our new website is under construction. Check back soon!',
  ctaText: 'Notify Me',
  countdownDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  maintenanceMessage: 'We are currently undergoing scheduled maintenance.',
}
