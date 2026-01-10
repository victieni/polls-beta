// src/collections/PollOptions.ts
import type { CollectionConfig } from 'payload'

export const PollOptions: CollectionConfig = {
  slug: 'poll-options',
  admin: {
    useAsTitle: 'name', // Use name as title
    // group: 'Polls', // Group with Polls
    // defaultColumns: ['name', 'poll', 'order'], // List columns
    // listSearchableFields: ['name', 'description'],
  },
  access: {
    // Tied to poll creator's control
    // create: ({ req: { user }, data }) => !!user,
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'poll',
      type: 'relationship',
      relationTo: 'polls',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'about',
      type: 'richText', // For  why to vote
    },
    {
      name: 'thumbnail',
      type: 'text',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'associatedUser',
      type: 'relationship',
      relationTo: 'users',
      // Allow candidates to edit their own if permitted
    },
  ],

  versions: true,
}
