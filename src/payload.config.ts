import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

// உங்களது புதிய மற்றும் பழைய கலெக்ஷன்கள் அனைத்தும் இங்கே இம்போர்ட் செய்யப்பட்டுள்ளன
import { Inquiries } from './collections/Inquiries'
import { Projects } from './collections/Projects'
import { Categories } from './collections/Categories'
import { Clients } from './collections/Clients'
import { Quotations } from './collections/Quotations'
import { Settings } from './Globals/Settings'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgres://postgres:dhana%40123@localhost:5432/InfraGlanceNew',
    },
  }),
  // பிளக்கின்களுக்குத் தேவையான Pages, Posts கலெக்ஷன்களுடன் உங்கள் புதிய Inquiries மற்றும் Projects சேர்க்கப்பட்டுள்ளன
  collections: [Inquiries, Projects, Pages, Posts, Media, Categories, Users,Clients,       // புதியது
    Quotations],
    globals: [
    Settings, // புதிய Settings குளோபல் இங்கே சேர்க்கப்பட்டுள்ளது
  ],
  cors: [getServerSideURL()].filter(Boolean),
  
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})