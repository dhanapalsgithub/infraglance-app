import type React from 'react'
import type { Config, Page, Post } from '@/payload-types'

import { getCachedDocument } from '@/utilities/getDocument'
import { getCachedRedirects } from '@/utilities/getRedirects'
import { notFound, redirect } from 'next/navigation'

interface Props {
  disableNotFound?: boolean
  url: string
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound, url }) => {
  const redirects = await getCachedRedirects()()

  const redirectItem = redirects.find((redirect) => redirect.from === url)

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(redirectItem.to.url)
    }

    let redirectUrl: string

    const relationTo = redirectItem.to?.reference?.relationTo as string

    if (typeof redirectItem.to?.reference?.value === 'string') {
      const collection = relationTo as keyof Config['collections']
      const id = redirectItem.to?.reference?.value

      const document = (await getCachedDocument(collection, id)()) as Page | Post
      redirectUrl = `${relationTo !== 'pages' ? `/${relationTo}` : ''}/${
        document?.slug
      }`
    } else {
      const targetValue = redirectItem.to?.reference?.value as any
      redirectUrl = `${relationTo !== 'pages' ? `/${relationTo}` : ''}/${
        typeof targetValue === 'object' && targetValue !== null
          ? targetValue?.slug || targetValue?.id || ''
          : ''
      }`
    }

    if (redirectUrl) redirect(redirectUrl)
  }

  if (disableNotFound) return null

  notFound()
}