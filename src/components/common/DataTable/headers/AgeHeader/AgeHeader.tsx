import { AgeFilter } from '@/components/common/Filters/AgeFilter/ui/AgeFilter'
import { FilterDropdown } from '@/components/common/Filters/FilterDropdown/FilterDropdown'
import { useAddressStore } from '@/hooks'

export const AgeHeader = () => {
	const { setFromTimestamp, setToTimestamp, dataFilters } = useAddressStore()
	return (
		<FilterDropdown
			isApplied={Boolean(dataFilters.fromTimestamp || dataFilters.toTimestamp)}
			title="Age"
			key={'age'}
		>
			<AgeFilter
				value={{
					from: dataFilters.fromTimestamp,
					to: dataFilters.toTimestamp,
				}}
				onApply={args => {
					setFromTimestamp(args.range.from)
					setToTimestamp(args.range.to)
				}}
			/>
		</FilterDropdown>
	)
}
