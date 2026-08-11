import { CollectionConfig } from 'payload';

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'projectName',
  },
  fields: [
    {
      name: 'projectName',
      type: 'text',
      required: true,
    },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'inquiries', // வாடிக்கையாளர் விவரத்துடன் இணைக்க
      required: true,
    },
    {
      name: 'progress',
      type: 'number',
      label: 'Progress Percentage (%)',
    },
    {
      name: 'deadline',
      type: 'date',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'In Progress', value: 'progress' },
        { label: 'Completed', value: 'completed' },
      ],
    },
  ],
};