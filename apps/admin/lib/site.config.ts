const SITE_NAME = 'OpenD2C'

export const siteConfig = {
  name: SITE_NAME,
  fullAdminTitle: `${SITE_NAME} Admin`,
  adminDescription: 'Waitlist Admin Panel',
  teamName: 'OpenD2C Team',
  backupPrefix: 'opend2c-backup',
} as const

export type SiteConfig = typeof siteConfig
