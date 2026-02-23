import { FilterDropdown } from '@/components/common/Filters/FilterDropdown/FilterDropdown'
import { TypeFilter } from '@/components/common/Filters/TypeFilter/TypeFilter'

export const TypeHeader = () => {
	return (
		<FilterDropdown isApplied={true} title="Type">
			<TypeFilter
				onApply={arg => {
					console.log(arg)
				}}
			/>
		</FilterDropdown>
	)
}
