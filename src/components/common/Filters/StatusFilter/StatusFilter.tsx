import { Button, Checkbox } from '@concero/ui-kit'
import { VStack } from '../../Stack'
import { Filter } from '../Filter/Filter'
import { Separator } from '../../Separator/Separator'
import { useState } from 'react'
import cls from './StatusFilter.module.pcss'
import { Status } from '@/types'
type StatusValue = (typeof Status)[keyof typeof Status]

export type TProps = {
	value?: StatusValue
	onApply?: (args: { status: StatusValue }) => void
}

const STATUS_OPTIONS: { value: StatusValue; label: string }[] = [
	{ value: Status.All, label: 'All' },
	{ value: Status.Pending, label: 'Pending' },
	{ value: Status.Success, label: 'Success' },
	{ value: Status.Canceled, label: 'Failed' },
]

export const StatusFilter = ({ onApply, value }: TProps) => {
	const [selected, setSelected] = useState<StatusValue | null>(value ?? null)

	const handleSelect = (value: StatusValue) => {
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
