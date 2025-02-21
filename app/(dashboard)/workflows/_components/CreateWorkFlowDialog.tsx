'use client'

import CustomDialogHeader from '@/components/CustomDialogHeader'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  createWorkFlowSchema,
  createWorkFlowSchemaType
} from '@/schema/workflows'
import { Layers2Icon, Loader2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { CreateWorkFlow } from '@/actions/workflows/createWorkFlow'
import { toast } from 'sonner'

function CreateWorkFlowDialog({ triggerText }: { triggerText?: string }) {
  const [open, setOpen] = useState(false)

  const form = useForm<createWorkFlowSchemaType>({
    resolver: zodResolver(createWorkFlowSchema),
    defaultValues: {}
  })

  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkFlow,
    onSuccess: () => {
      toast.success('Workflow has been created', { id: 'create-workflow' })
    },
    onError: () => {
      toast.error('Failed to create workflow', {
        id: 'create-workflow'
      })
    }
  })

  const onSubmit = useCallback(
    (values: createWorkFlowSchemaType) => {
      mutate(values)
      toast.loading('Creating workflow...', { id: 'create-workflow' })
    },
    [mutate]
  )

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset()
        setOpen(open)
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ?? 'Create Workflow'}</Button>
      </DialogTrigger>
      <DialogContent className='px-0'>
        <CustomDialogHeader
          icon={Layers2Icon}
          title='Create Workflow'
          subtitle='Start building your workflow by creating a new one'
        />
        <div className='p-6'>
          <Form {...form}>
            <form
              className='w-full space-y-8'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-1'>
                      Name
                      <p className='text-xs text-primary'>(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a description and unique name
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-1'>
                      Description
                      <p className='text-xs text-muted-foreground'>
                        (optional)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className='resize-none' {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of what your workflow does.
                      <br />
                      This is optional but can help you remember the
                      workflow&apos;s purpose
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full' disabled={isPending}>
                {!isPending && 'Proceed'}
                {isPending && <Loader2 className='animate-spin' />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default CreateWorkFlowDialog
