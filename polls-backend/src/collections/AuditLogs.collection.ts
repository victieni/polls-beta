// src/collections/AuditLogs.ts
import type { CollectionConfig } from 'payload'

export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  admin: {
    useAsTitle: 'actionType', // Title by action
    // group: 'Admin',
    // hidden: ({ user }) => user?.role !== 'admin', // Only visible to admins
    // defaultColumns: ['actionType', 'entityId', 'user', 'createdAt'],
    // description: 'Traceable actions for security and credibility.',
  },
  access: {
    // Restricted to admins or poll creators
    create: () => false, // Created via hooks only
    // read: ({ req: { user } }) => user?.role === 'admin',
    // update: () => false,
    // delete: () => false,
  },
  fields: [
    {
      name: 'actionType',
      type: 'select',
      options: [
        { label: 'Create Poll', value: 'create_poll' },
        { label: 'Cast Vote', value: 'cast_vote' },
        { label: 'Edit Option', value: 'edit_option' },
        { label: 'Announce Results', value: 'announce_results' },
      ],
      required: true,
    },
    {
      name: 'entityId',
      type: 'text', // ID of related entity (poll/vote/etc.)
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'details',
      type: 'json', // Context like IP, changes
    },
  ],

  versions: false, // No need for versions on logs
  // indexes: [
  //   { fields: { actionType: 1, createdAt: -1 } }, // For querying recent actions
  // ],
}
