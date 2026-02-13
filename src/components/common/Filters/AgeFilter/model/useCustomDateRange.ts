import { useState, useCallback } from 'react'
import { isValidDateInput, parseDateInput } from './useDateValidation'

export const useCustomDateRange = (
	onChange: (arg: { range: { from: string; to: string } }) => void,
	onInputStart?: () => void,
) => {
	const [customFrom, setCustomFrom] = useState('')
	const [customTo, setCustomTo] = useState('')
	const [fromError, setFromError] = useState(false)
	const [toError, setToError] = useState(false)
	const formatInput = useCallback((value: string) => {
		const digitsOnly = value.replace(/\D/g, '')
		const validDigits = digitsOnly.slice(0, 8)

		let formatted = ''
		for (let i = 0; i < validDigits.length; i++) {
			if (i === 2 || i === 4) formatted += ' / '
			formatted += validDigits[i]
		}

		return formatted
	}, [])
	const handleFromChange = useCallback(
		(value: string) => {
			onInputStart?.()
			const formatted = formatInput(value)
			setCustomFrom(formatted)

			const newFrom = formatted
			const newTo = customTo
			const tsFrom = parseDateInput(newFrom)?.toString() ?? ''
			const tsTo = parseDateInput(newTo)?.toString() ?? ''

			onChange({ range: { from: tsFrom, to: tsTo } })
		},
		[customTo, formatInput, onChange, onInputStart],
	)
	const handleToChange = useCallback(
		(value: string) => {
			onInputStart?.()
			const formatted = formatInput(value)

			setCustomTo(formatted)
			const newFrom = customFrom
			const newTo = formatted
			const tsFrom = parseDateInput(newFrom)?.toString() ?? ''
			const tsTo = parseDateInput(newTo)?.toString() ?? ''

			onChange({ range: { from: tsFrom, to: tsTo } })
		},
		[customFrom, formatInput, onChange, onInputStart],
	)

	const validateAndSetErrors = useCallback((): boolean => {
		const fromValid = !customFrom || (customFrom.length === 14 && isValidDateInput(customFrom))
		const toValid = !customTo || (customTo.length === 14 && isValidDateInput(customTo))

		setFromError(!fromValid)
		setToError(!toValid)
		return fromValid && toValid
	}, [customFrom, customTo])

	const clear = useCallback(() => {
		setCustomFrom('')
		setCustomTo('')
		setFromError(false)
		setToError(false)
	}, [])
	const clearFromError = useCallback(() => setFromError(false), [])
	const clearToError = useCallback(() => setToError(false), [])
	return {
		customFrom,
		customTo,
		fromError,
		toError,
		clearFromError,
		clearToError,
		handleFromChange,
		handleToChange,
		validateAndSetErrors,
		clear,
	}
}
