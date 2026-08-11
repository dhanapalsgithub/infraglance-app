'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<any>()

  // தரவுகளில் உள்ள தலைப்பு அல்லது ஃபீல்டை காட்டும் வகையில் மாற்றுதல்
  const label = data?.title || data?.label || `Row ${(rowNumber ?? 0) + 1}`

  return (
    <div>
      {label}
    </div>
  )
}