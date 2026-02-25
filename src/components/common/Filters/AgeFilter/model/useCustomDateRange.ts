import { useState, useCallback, useEffect } from 'react'
import { isValidDateInput, parseDateInput, timestampToDateInput } from './useDateValidation'

export const useCustomDateRange = (
	onChange: (arg: { range: { from: string; to: string } }) => void,
	onInputStart?: () => void,
	initialFrom?: string,
	initialTo?: string,
) => {
	const [customFrom, setCustomFrom] = useState(timestampToDateInput(initialFrom))
	const [customTo, setCustomTo] = useState(timestampToDateInput(initialTo))
	const [fromError, setFromError] = useState(false)
	const [toError, setToError] = useState(false)

	useEffect(() => {
		if (initialFrom || initialTo) {
			const tsFrom = initialFrom ? String(initialFrom) : ''
			const tsTo = initialTo ? String(initialTo) : ''
			onChange({ range: { from: tsFrom, to: tsTo } })
		}
	}, [initialFrom, initialTo, onChange])

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

			const parsed = parseDateInput(formatted)
			const tsFrom = parsed !== null ? String(parsed) : ''
			const tsTo = parseDateInput(customTo)?.toString() ?? ''

			onChange({ range: { from: tsFrom, to: tsTo } })
		},
		[customTo, formatInput, onChange, onInputStart],
	)
	const handleToChange = useCallback(
		(value: string) => {
			onInputStart?.()
			const formatted = formatInput(value)
			setCustomTo(formatted)

			const tsFrom = parseDateInput(customFrom)?.toString() ?? ''
			const parsed = parseDateInput(formatted)
			const tsTo = parsed !== null ? String(parsed) : ''

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
		onChange({ range: { from: '', to: '' } })
	}, [onChange])
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
