import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

export async function Header() {
  // 'header' என்பதுடன் as any சேர்த்து டைப் பிழையைத் தவிர்க்கவும்
  const headerData = await getCachedGlobal('header' as any, 1)()

  return <HeaderClient data={headerData} />
}