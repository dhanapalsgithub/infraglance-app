import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import React from 'react'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug

  const payload = await getPayload({ config })

  // Payload CMS-லிருந்து ஸ்லெட்டின் அடிப்படையில் பக்கத்தின் டேட்டாவை வாங்குதல்
  const data = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const page = data.docs[0]

  if (!page) {
    return notFound()
  }

  return (
    <main style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{page.title || 'Engineering Portal'}</h1>
      {/* பக்கத்திற்கான மற்ற কন্টென்ட்டுகள் அல்லது பிளாக்குகள் இங்கே வரும் */}
    </main>
  )
}

// டைனமிக் மெட்டாடேட்டா ஜெனரேஷன்
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug

  const payload = await getPayload({ config })
  const data = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const page = data.docs[0]

  return {
    title: page ? `${page.title} | Engineering Portal` : 'Engineering Portal',
    description: 'Client Portal and Engineering Services Management',
  }
}