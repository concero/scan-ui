import { FilterDropdown } from '@/components/common/Filters/FilterDropdown/FilterDropdown'
import { StatusFilter } from '@/components/common/Filters/StatusFilter/StatusFilter'
import { useAddressStore } from '@/hooks'

export const StatusHeader = () => {
	const { setStatus, dataFilters } = useAddressStore()
	return (
		<FilterDropdown isApplied={Boolean(dataFilters.status)} title="Status">
			<StatusFilter
				value={dataFilters.status}
				onApply={arg => {
					setStatus(arg.status)
				}}
			/>
		</FilterDropdown>
	)
}
