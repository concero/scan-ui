import { Button, Checkbox } from '@concero/ui-kit'
import { VStack } from '../../Stack'
import { Filter } from '../Filter/Filter'
import { Separator } from '../../Separator/Separator'
import { useState } from 'react'
import cls from './StatusFilter.module.pcss'
type TStatus = 'all' | 'pending' | 'success' | 'failed'

export type TProps = {
	onApply?: (args: { status: TStatus }) => void
}

const STATUS_OPTIONS: { value: TStatus; label: string }[] = [
	{ value: 'all', label: 'All' },
	{ value: 'pending', label: 'Pending' },
	{ value: 'success', label: 'Success' },
	{ value: 'failed', label: 'Failed' },
]

export const StatusFilter = ({ onApply }: TProps) => {
	const [selected, setSelected] = useState<TStatus | null>(null)

	const handleSelect = (value: TStatus) => {
		setSelected(value)
	}

	const handleApply = () => {
		if (selected) {
			onApply?.({ status: selected })
		}
	}

	return (
		<VStack gap="space_0_75">
			<Filter title="Set Status">
				<VStack gap="space_0_25">
					{STATUS_OPTIONS.map(option => (
						<Button
							isFull
							className={cls.btn}
							key={option.value}
							variant={'tetrary'}
							size="s"
							onClick={() => handleSelect(option.value)}
							leftIcon={<Checkbox checked={selected === option.value} />}
						>
							{option.label}
						</Button>
					))}
				</VStack>
			</Filter>
			<Separator />
			<Button size="m" onClick={handleApply} isDisabled={!selected} isFull>
				Apply
			</Button>
		</VStack>
	)
}
