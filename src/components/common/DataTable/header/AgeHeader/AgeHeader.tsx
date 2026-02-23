import { AgeFilter } from '@/components/common/Filters/AgeFilter/ui/AgeFilter'
import { FilterDropdown } from '@/components/common/Filters/FilterDropdown/FilterDropdown'

export const AgeHeader = () => {
	return (
		<FilterDropdown isApplied={true} title="Age">
			<AgeFilter onApply={args => console.log(args)} />
		</FilterDropdown>
	)
}
