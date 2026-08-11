'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<any>()

  const label = data?.title || data?.label || `Row ${(rowNumber ?? 0) + 1}`

  return (
    <div>
      {label}
    </div>
  )
}