import { TaskParamType, TaskType } from '@/types/task'
import { WorkFlowTask } from '@/types/workflows'
import { CodeIcon, LucideProps } from 'lucide-react'

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: 'Get page to HTML',
  icon: (props: LucideProps) => (
    <CodeIcon className='stroke-pink-400' {...props} />
  ),
  isEntryPoint: false,
  credits: 2,
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
} satisfies WorkFlowTask
