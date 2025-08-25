import type { ReactElement } from 'react'
import type { TInputSize } from '@concero/ui-kit/dist/common/Input/Input/Input'
import { Input } from '@concero/ui-kit'
import { SearchIcon } from '@/assets/search-icon'
import './styles.pcss'

type SearchBarProps = {
	placeholder?: string
	size?: TInputSize
}

export const SearchBar = ({
	size = 'xl',
	placeholder = 'Search by Contract Address, Message, Tx Hash',
}: SearchBarProps): ReactElement => {
	return (
		<div className="search_bar">
			<Input placeholder={placeholder} size={size} icon={<SearchIcon />} />
		</div>
	)
}
