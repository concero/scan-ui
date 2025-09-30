import { useState, useCallback, useEffect } from 'react'
import { useNotificationsStore } from '@/hooks'
import { NotificationType } from '@/stores'

type UseClipboardOptions = {
  resetAfter?: number
}

type UseClipboardResult = {
  copied: boolean
  copy: (text: string, message?: string) => Promise<boolean>
}

export const useClipboard = (options: number | UseClipboardOptions = 1000): UseClipboardResult => {
  const resetAfter = typeof options === 'number' ? options : (options.resetAfter ?? 5000)
  const [copied, setCopied] = useState<boolean>(false)
  const { add } = useNotificationsStore()

  const copy = useCallback(
    async (text: string, message?: string): Promise<boolean> => {
      try {
        if (!navigator?.clipboard?.writeText) {
          console.error('[Concero Scan] Clipboard API not supported')
          add({ message: 'Clipboard API not supported', type: NotificationType.ERROR, duration: 4000 })
          return false
        }

        await navigator.clipboard.writeText(text)
        setCopied(true)
        add({ message: message ?? 'Copied to clipboard!', type: NotificationType.SUCCESS, duration: 3000 })
        return true
      } catch (error) {
        console.error('[Concero Scan] Failed to copy text:', error)
        add({ message: 'Failed to copy text', type: NotificationType.ERROR, duration: 4000 })
        return false
      }
    },
    [add]
  )

  useEffect(() => {
    if (!copied) return

    const timer = setTimeout(() => {
      setCopied(false)
    }, resetAfter)

    return () => clearTimeout(timer)
  }, [copied, resetAfter])

  return { copied, copy }
}
