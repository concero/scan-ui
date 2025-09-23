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
			return nextIdx
		})
	}, [stepCount])

	const back = useCallback(() => {
		setStepIndex(idx => {
			const prevIdx = Math.max(idx - 1, 0)
			return prevIdx
		})
	}, [])

	const jumpTo = useCallback(
		(idx: number) => {
			if (!Number.isInteger(idx)) return
			const targetIdx = idx < 0 ? 0 : idx >= stepCount ? stepCount - 1 : idx
			setStepIndex(targetIdx)
		},
		[stepCount],
	)

	const reset = useCallback(() => {
		setStepIndex(0)
	}, [])

	const currentStep = steps[stepIndex]

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
