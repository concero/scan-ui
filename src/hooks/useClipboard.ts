import { useState, useCallback } from 'react'

type UseClipboardOptions = {
	resetAfter?: number
}

type UseClipboardResult = {
	copied: boolean
	copy: (text: string) => Promise<boolean>
}

export const useClipboard = (options: number | UseClipboardOptions = 1000): UseClipboardResult => {
	const resetAfter = typeof options === 'number' ? options : (options.resetAfter ?? 1000)

	const [copied, setCopied] = useState<boolean>(false)

	const copy = useCallback(
		async (text: string): Promise<boolean> => {
			try {
				if (!navigator?.clipboard?.writeText) {
					console.error('[Concero Scan] Clipboard API not supported')
					return false
				}

				await navigator.clipboard.writeText(text)
				setCopied(true)

				if (resetAfter > 0) {
					setTimeout(() => setCopied(false), resetAfter)
				}

				return true
			} catch (_) {
				console.error('[Concero Scan] Failed to copy text:')
				return false
			}
		},
		[resetAfter],
	)

	return { copied, copy }
}
