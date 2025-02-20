import { TaskParamType, TaskType } from '@/types/task'
import { CodeIcon, LucideIcon } from 'lucide-react'

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: 'Get page to HTML',
  icon: (props: LucideIcon) => (
    <CodeIcon className='stroke-pink-400' {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: 'Webpage',
      type: TaskParamType.BROWSER_INSTANCE,
      required: true
    }
  ],
  outputs: [
    {
      name: 'html',
      type: TaskParamType.STRING
    },
    {
      name: 'Webpage',
      type: TaskParamType.BROWSER_INSTANCE
    }
  ]
}
