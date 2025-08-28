import { useState, useCallback, useEffect } from 'react'
import { useNotificationsStore } from './useNotifications'

type UseClipboardOptions = {
  resetAfter?: number
}

type UseClipboardResult = {
  copied: boolean
  copy: (text: string, message: string) => Promise<boolean>
}

export const useClipboard = (options: number | UseClipboardOptions = 1000): UseClipboardResult => {
  const resetAfter = typeof options === 'number' ? options : (options.resetAfter ?? 5000)
  const { show, hide, clear } = useNotificationsStore()
  const [copied, setCopied] = useState<boolean>(false)

  const copy = useCallback(
    async (text: string, message: string): Promise<boolean> => {
      try {
        if (!navigator?.clipboard?.writeText) {
          console.error('[Concero Scan] Clipboard API not supported')
          return false
        }

        await navigator.clipboard.writeText(text)
        setCopied(true)
        show(message)

        return true
      } catch (_) {
        console.error('[Concero Scan] Failed to copy text:')
        return false
      }
    },
    [show],
  )

  useEffect(() => {
    if (!copied) return

    const timer = setTimeout(() => {
      hide()
      clear()
      setCopied(false)
    }, resetAfter)

    return () => clearTimeout(timer)
  }, [copied, resetAfter, hide, clear])

  return { copied, copy }
}
