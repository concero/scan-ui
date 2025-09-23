import type { ReactElement, KeyboardEvent } from 'react'
import type { TInputSize } from '@concero/ui-kit/dist/common/Input/Input/Input'
import { Input } from '@concero/ui-kit'
import { SearchIcon } from '@/assets/search-icon'
import { useSearch } from '@/hooks'
import { SearchType } from '@/types'
import { useCallback } from 'react'
import './styles.pcss'

type SearchBarProps = {
	placeholder?: string
	size?: TInputSize
}

export const SearchBar = ({
	size = 'xl',
	placeholder = 'Search by Contract Address, Message ID, Tx Hash',
}: SearchBarProps): ReactElement => {
	const { input, type, onChange, onFocus, onBlur, onSearch } = useSearch()

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				onSearch()
			}
		},
		[onSearch],
	)

	return (
		<div className="search_bar">
			<Input
				placeholder={placeholder}
				size={size}
				icon={<SearchIcon />}
				value={input}
				isSuccess={type !== SearchType.Unknown}
				onChange={e => onChange(e.target.value)}
				inputProps={{
					onFocus,
					onBlur,
					onKeyDown: handleKeyDown,
					autoComplete: 'off',
				}}
			/>
		</div>
	)
}
