import Image from 'next/image'
import config from '@/payload.config'
import './styles.css'
import { SignedIn, SignedOut, SignIn, SignInButton } from '@clerk/nextjs'

export default async function HomePage() {
  const payloadConfig = await config

  return (
    <div className="home">
      <div className="content space-y-4">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        <p className="text-lg text-green-600 text-center">Polls App</p>
        <div className="links">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="py-2 px-4 font-medium text-center rounded-lg text-green-600">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <a
              className="admin"
              href={payloadConfig.routes.admin}
              rel="noopener noreferrer"
              target="_blank"
            >
              Go to admin panel
            </a>
          </SignedIn>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
    </div>
  )
}
