import { AgeFilter } from '@/components/common/Filters/AgeFilter/ui/AgeFilter'
import { FilterDropdown } from '@/components/common/Filters/FilterDropdown/FilterDropdown'
import { useAddressStore } from '@/hooks'

export const AgeHeader = () => {
	const { setFromTimestamp, setToTimestamp, dataFilters } = useAddressStore()
	return (
		<FilterDropdown isApplied={Boolean(dataFilters.fromTimestamp || dataFilters.toTimestamp)} title="Age">
			<AgeFilter
				onApply={args => {
					setFromTimestamp(args.range.from)
					setToTimestamp(args.range.to)
				}}
			/>
		</FilterDropdown>
	)
}
