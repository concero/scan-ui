import type { ReactElement } from "react"
import { Input } from "@concero/ui-kit"
import { SearchIcon } from "@/assets/search-icon"

export const SearchBar = (): ReactElement => {
	return (
		<div>
			<Input placeholder="Search by Address, Message, Tx Hash" size="xl" icon={<SearchIcon />} />
		</div>
	)
}