import { CollectionConfig } from 'payload';

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'service', 'createdAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone Number',
    },
    {
      name: 'service',
      type: 'select',
      required: true,
      options: [
        { label: 'Web Development', value: 'web' },
        { label: 'CAD & Engineering Design', value: 'cad' },
        { label: 'Billing System / Automation', value: 'billing' },
        { label: 'Other Services', value: 'other' },
      ],
      label: 'Service Required',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Project Description',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New Inquiry', value: 'new' },
        { label: 'Pending Follow-up', value: 'pending' },
        { label: 'Converted to Project', value: 'converted' },
        { label: 'Closed', value: 'closed' },
      ],
      label: 'Inquiry Status',
    },
  ],
};