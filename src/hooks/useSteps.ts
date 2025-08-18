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
		setStepIndex(idx => Math.min(idx + 1, stepCount - 1))
	}, [stepCount])

	const back = useCallback(() => {
		setStepIndex(idx => Math.max(idx - 1, 0))
	}, [])

	const jumpTo = useCallback(
		(idx: number) => {
			if (!Number.isInteger(idx)) return
			setStepIndex(idx < 0 ? 0 : idx >= stepCount ? stepCount - 1 : idx)
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
