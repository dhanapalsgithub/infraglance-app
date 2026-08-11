'use client'

import React from 'react'

type HeaderType = any

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  // const அல்லது let சேர்த்து navItems-ஐ வரையறுக்கவும்
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-3 items-center">
      {navItems &&
        navItems.map(({ link }: { link: any }, i: number) => {
          return <CMSLink key={i} {...link} appearance="link" />
        })}
    </nav>
  )
}
