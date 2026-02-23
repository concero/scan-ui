import { FilterDropdown } from '@/components/common/Filters/FilterDropdown/FilterDropdown'
import { StatusFilter } from '@/components/common/Filters/StatusFilter/StatusFilter'

export const StatusHeader = () => {
	return (
		<FilterDropdown isApplied={true} title="Status">
			<StatusFilter
				onApply={arg => {
					console.log(arg)
				}}
			/>
		</FilterDropdown>
	)
}
