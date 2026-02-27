import { ChainFilter } from '@/components/common/Filters/ChainFilter/ChainFilter'
import { FilterDropdown } from '@/components/common/Filters/FilterDropdown/FilterDropdown'
import { useAddressStore } from '@/hooks'

export const ChainFromHeader = () => {
	const { setFromChainIds, dataFilters } = useAddressStore()
	return (
		<FilterDropdown isApplied={Boolean(dataFilters.fromChainIds?.length)} title="From" key={'ChainFrom'}>
			<ChainFilter
				value={dataFilters.fromChainIds}
				onApply={arg => {
					setFromChainIds(arg)
				}}
			/>
		</FilterDropdown>
	)
}
