import TooltipWrapper from '@/components/TooltipWrapper'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import SaveBtn from './SaveBtn'

interface Props {
  title: string
  subtitle?: string
  workflowId: string
}
function TopBar({ title, subtitle, workflowId }: Props) {
  const router = useRouter()
  return (
    <header className='flex p-2 border-p-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10	'>
      <div className='flex flex-1 gap-1'>
        <TooltipWrapper content='Back'>
          <Button variant={'ghost'} size={'icon'} onClick={() => router.back()}>
            <ChevronLeftIcon size={20} />
          </Button>
        </TooltipWrapper>
        <div>
          <p className='font-bold truncate'>{title}</p>
          {subtitle && (
            <p className='text-xs truncate text-muted-foreground'>{subtitle}</p>
          )}
        </div>
      </div>

      <div className='flex justify-end flex-1 gap-1'>
        <SaveBtn workflowId={workflowId} />
      </div>
    </header>
  )
}

export default TopBar
