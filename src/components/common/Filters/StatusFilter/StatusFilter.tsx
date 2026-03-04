import { Button, Checkbox } from '@concero/ui-kit'
import { HStack, VStack } from '../../Stack'
import { Filter } from '../Filter/Filter'
import { Separator } from '../../Separator/Separator'
import { useState } from 'react'
import cls from './StatusFilter.module.pcss'
import { Status } from '@/types'
type StatusValue = (typeof Status)[keyof typeof Status]

export type TProps = {
	value?: StatusValue
	onApply?: (args: { status: StatusValue | undefined }) => void
}

const STATUS_OPTIONS: { value: StatusValue; label: string }[] = [
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
	const handleClear = () => {
		setSelected(null)
		onApply?.({
			status: undefined,
		})
	}

	return (
		<VStack gap="space_0_75" className={cls.wrap}>
			<Filter title="Set Status" isFull>
				<VStack gap="space_0_25" max>
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
			<HStack gap="space_0_25" max>
				<Button variant="secondary" size="m" onClick={handleClear} isDisabled={!selected} isFull>
					Clear
				</Button>
				<Button
					variant={selected ? 'primary' : 'secondary'}
					size="m"
					onClick={handleApply}
					isDisabled={!selected}
					isFull
				>
					Apply
				</Button>
			</HStack>
		</VStack>
	)
}
