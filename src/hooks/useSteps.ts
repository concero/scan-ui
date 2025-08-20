import { useState, useCallback } from 'react'
import type { ReactElement } from 'react'

export type Step<T = any> = {
	component: ReactElement
	data?: T
}

export function useSteps<T = any>(steps: Step<T>[]) {
	const [stepIndex, setStepIndex] = useState<number>(0)
	const stepCount = steps.length

	const next = useCallback(() => {
		setStepIndex(idx => {
			const nextIdx = Math.min(idx + 1, stepCount - 1)
			console.log('[useSteps] next: from', idx, 'to', nextIdx)
			return nextIdx
		})
	}, [stepCount])

	const back = useCallback(() => {
		setStepIndex(idx => {
			const prevIdx = Math.max(idx - 1, 0)
			console.log('[useSteps] back: from', idx, 'to', prevIdx)
			return prevIdx
		})
	}, [])

	const jumpTo = useCallback(
		(idx: number) => {
			if (!Number.isInteger(idx)) return
			const targetIdx = idx < 0 ? 0 : idx >= stepCount ? stepCount - 1 : idx
			console.log('[useSteps] jumpTo:', idx, 'resolved to', targetIdx)
			setStepIndex(targetIdx)
		},
		[stepCount],
	)

	const reset = useCallback(() => {
		console.log('[useSteps] reset to 0')
		setStepIndex(0)
	}, [])

	const currentStep = steps[stepIndex]
	console.log('[useSteps] render: stepIndex', stepIndex, 'stepCount', stepCount, 'isFirst', stepIndex === 0, 'isLast', stepIndex === stepCount - 1)

	return {
		stepIndex,
		stepCount,
		isFirst: stepIndex === 0,
		isLast: stepIndex === stepCount - 1,
		currentStep,
		next,
		back,
		jumpTo,
		reset,
	}
}
