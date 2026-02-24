import { ChainFilter } from '@/components/common/Filters/ChainFilter/ChainFilter'
import { FilterDropdown } from '@/components/common/Filters/FilterDropdown/FilterDropdown'
import { useAddressStore } from '@/hooks'

export const ChainToHeader = () => {
	const { setToChainIds, dataFilters } = useAddressStore()
	return (
		<FilterDropdown isApplied={Boolean(dataFilters.toChainIds)} title="To">
			<ChainFilter
				onApply={arg => {
					setToChainIds(arg)
				}}
			/>
		</FilterDropdown>
	)
}
