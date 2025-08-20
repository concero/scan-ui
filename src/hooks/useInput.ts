import { useState, useCallback, ChangeEvent, useEffect } from 'react'

type InputValue = string | number

type Options<T extends InputValue> = {
	value?: T
	defaultValue?: T
	onChange?: (val: T, event?: ChangeEvent<HTMLInputElement>) => void
	parse?: (input: string) => T
	format?: (val: T) => string
	validate?: (val: T) => boolean
	debounceMs?: number
}

export const useInput = <T extends InputValue>({
	value,
	defaultValue,
	onChange,
	parse,
	format,
	validate,
	debounceMs = 300,
}: Options<T>) => {
	const [internalVal, setInternalVal] = useState<T | undefined>(defaultValue)
	const [debouncedVal, setDebouncedVal] = useState<T | undefined>(value ?? defaultValue)

	const currValue = value !== undefined ? value : internalVal

	const displayValue = currValue !== undefined ? (format ? format(currValue) : String(currValue)) : ''

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedVal(currValue)
		}, debounceMs)
		return () => clearTimeout(handler)
	}, [currValue, debounceMs])

	const onInputChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const raw = e.target.value
			const nextVal = parse ? parse(raw) : (raw as unknown as T)

			if (validate && !validate(nextVal)) return

			if (value === undefined) {
				setInternalVal(nextVal)
			}

			onChange?.(nextVal, e)
		},
		[onChange, parse, validate, value],
	)

	const setVal = useCallback(
		(newVal: T) => {
			if (value === undefined) setInternalVal(newVal)
			onChange?.(newVal)
		},
		[onChange, value],
	)

	return {
		value: displayValue,
		debouncedValue: debouncedVal,
		onChange: onInputChange,
		setValue: setVal,
	}
}
