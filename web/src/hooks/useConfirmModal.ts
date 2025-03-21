import { ReactNode } from 'react'

import { modals } from '@mantine/modals'

interface UseConfirmModalProps {
  title: string
  message: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel?: () => void
}

export const useConfirmModal = () => {
  const openConfirmModal = ({
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
  }: UseConfirmModalProps) => {
    modals.openConfirmModal({
      title,
      children: message,
      labels: { confirm: confirmLabel, cancel: cancelLabel },
      onCancel: () => {
        if (onCancel) {
          onCancel()
        }
      },
      onConfirm: () => {
        onConfirm()
      },
    })
  }

  return { openConfirmModal }
}
