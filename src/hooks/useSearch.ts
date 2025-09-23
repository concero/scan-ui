import { useState, useCallback } from 'react'
import { SearchType } from '@/types'
import { isAddress, isHash } from 'viem'
import { useNavigation } from '@/hooks'
import { routes } from '@/configuration'

export const useSearch = () => {
	const [input, setInput] = useState<string>('')
	const [type, setType] = useState<SearchType>(SearchType.Unknown)
	const [focused, setFocused] = useState<boolean>(false)
	const { to } = useNavigation()
	const { address, transaction } = routes

	const onChange = useCallback((value: string) => {
		const trimmed = value.trim()
		setInput(trimmed)

		if (isAddress(trimmed)) {
			setType(SearchType.Address)
		} else if (isHash(trimmed)) {
			setType(SearchType.Hash)
		} else {
			setType(SearchType.Unknown)
		}
	}, [])

	const onSearch = useCallback(() => {
		switch (type) {
			case SearchType.Address:
				to(address(input))
				break
			case SearchType.Hash:
				to(transaction(input))
				break
			case SearchType.Unknown:
			default:
				break
		}
	}, [type, input, to, address, transaction])

	const onFocus = useCallback(() => setFocused(true), [])
	const onBlur = useCallback(() => setFocused(false), [])

	return {
		input,
		type,
		focused,
		onChange,
		onFocus,
		onBlur,
		onSearch,
	}
}
