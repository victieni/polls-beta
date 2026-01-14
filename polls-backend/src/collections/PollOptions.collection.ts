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
  // todo Add a Brand color field.
  // todo Add Allow Associated
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
      maxLength: 500,
    },
    {
      name: 'about',
      type: 'richText', // For  why to vote (only editable for associated user.)
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
      name: 'candidate',
      type: 'relationship',
      relationTo: 'users',
      // todo Allow candidates to edit their own if permitted
      // todo Candidates can edit Description & About & thumbnail.
    },
  ],

  versions: true,
}
