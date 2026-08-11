import { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Settings',
  admin: {
    group: 'Configuration',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      label: 'Site / Company Name',
    },
    {
      name: 'supportEmail',
      type: 'email',
      label: 'Support Email',
    },
    {
      name: 'contactPhone',
      type: 'text',
      label: 'Contact Phone Number',
    },
    {
      name: 'companyAddress',
      type: 'textarea',
      label: 'Company Address',
    },
  ],
}