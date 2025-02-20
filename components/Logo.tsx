import { cn } from '@/lib/utils'
import { SquareDashedMousePointer } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Logo({
  fontSize = '2xl',
  iconSize = 20
}: {
  fontSize?: string
  iconSize?: number
}) {
  return (
    <Link
      href='/'
      className={cn(
        'text-2xl font-extra-light flex items-center gap-2',
        fontSize
      )}
    >
      <div className='p-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600'>
        <SquareDashedMousePointer size={iconSize} className='stroke-white' />
      </div>
      <div>
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600'>
          Flow
        </span>
        <span className='text-stone-700 dark:text-stone-300'>Scrape</span>
      </div>
    </Link>
  )
}

export default Logo
