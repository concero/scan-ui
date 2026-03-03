import { FilterDropdown } from '@/components/common/Filters/FilterDropdown/FilterDropdown'
import { StatusFilter } from '@/components/common/Filters/StatusFilter/StatusFilter'
import { useAddressStore } from '@/hooks'

export const StatusHeader = () => {
	const { setStatus, dataFilters } = useAddressStore()
	console.log('DEBUG | StatusHeader', { dataFilters })

	return (
		<FilterDropdown isApplied={Boolean(dataFilters.status)} title="Status" key={'Status'}>
			<StatusFilter
				value={dataFilters.status}
				onApply={arg => {
					setStatus(arg.status)
				}}
			/>
		</FilterDropdown>
	)
}
