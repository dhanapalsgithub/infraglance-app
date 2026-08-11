import { CollectionConfig } from 'payload';

export const Quotations: CollectionConfig = {
  slug: 'quotations',
  admin: {
    useAsTitle: 'quotationNumber',
    defaultColumns: ['quotationNumber', 'client', 'amount', 'status'],
  },
  fields: [
    {
      name: 'quotationNumber',
      type: 'text',
      required: true,
      label: 'Quotation / Proposal No',
    },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'clients',
      required: true,
      label: 'Select Client',
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      label: 'Total Amount (₹)',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'sent',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Sent to Client', value: 'sent' },
        { label: 'Approved / Accepted', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      label: 'Proposal Status',
    },
    {
      name: 'documentFile',
      type: 'upload',
      relationTo: 'media',
      label: 'Upload Proposal PDF',
    },
  ],
};