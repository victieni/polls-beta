import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users.collection'
import { Media } from './collections/Media.collection'
import { Votes } from './collections/Votes.collection'
import { Results } from './collections/Results.collection'
import { AuditLogs } from './collections/AuditLogs.collection'
import { PollOptions } from './collections/PollOptions.collection'
import { Polls } from './collections/Polls.Collection'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Polls, PollOptions, Votes, Results, AuditLogs],
  // cors: ['exp://172.20.10.2:8081'],
  cors: '*',
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, '../typescript/payload.d.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [],
})
