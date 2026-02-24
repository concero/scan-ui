import { FilterDropdown } from '@/components/common/Filters/FilterDropdown/FilterDropdown'
import { TypeFilter } from '@/components/common/Filters/TypeFilter/TypeFilter'
import { useAddressStore } from '@/hooks'

export const TypeHeader = () => {
	const { setType, dataFilters } = useAddressStore()
	return (
		<FilterDropdown isApplied={Boolean(dataFilters.type)} title="Type">
			<TypeFilter
				value={dataFilters.type}
				onApply={arg => {
					setType(arg.status)
				}}
			/>
		</FilterDropdown>
	)
}
