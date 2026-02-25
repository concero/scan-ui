import { ChainFilter } from '@/components/common/Filters/ChainFilter/ChainFilter'
import { FilterDropdown } from '@/components/common/Filters/FilterDropdown/FilterDropdown'
import { useAddressStore } from '@/hooks'

export const ChainToHeader = () => {
	const { setToChainIds, dataFilters } = useAddressStore()
	return (
		<FilterDropdown isApplied={Boolean(dataFilters.toChainIds)} title="To" key={'ChainTo'}>
			<ChainFilter
				value={dataFilters.toChainIds}
				onApply={arg => {
					setToChainIds(arg)
				}}
			/>
		</FilterDropdown>
	)
}
