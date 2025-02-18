'use client'

import { DeleteWorkFlow } from '@/actions/workflows/deleteWorkFlows'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  workflowName: string
  workflowId: string
}

function DeleteWorkFlowDialog({
  open,
  setOpen,
  workflowName,
  workflowId
}: Props) {
  const [confirmText, setConfirmText] = useState('')
  const deleteMutation = useMutation({
    mutationFn: DeleteWorkFlow,
    onSuccess: () => {
      toast.success('Workflow has been deleted', { id: workflowId })
      setConfirmText('')
    },
    onError: () => {
      toast.error('Failed to delete workflow', { id: workflowId })
    }
  })

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this workflow?
          </AlertDialogTitle>
          <AlertDialogDescription>
            If you delete this workflow, it will be permanently removed from
            your account.
            <div className='flex flex-col py-4 gap-2'>
              <p>
                If you sure, enter <b>{workflowName}</b> to confirm:
              </p>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText('')}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== workflowName || deleteMutation.isPending}
            onClick={() => {
              toast.loading('Deleting workflow...', { id: workflowId })
              deleteMutation.mutate(workflowId)
            }}
            className='text-destructive-foreground bg-destructive hover:bg-destructive/90'
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteWorkFlowDialog
