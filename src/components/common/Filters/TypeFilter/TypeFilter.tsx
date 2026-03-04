import { Button, Checkbox } from '@concero/ui-kit'
import { HStack, VStack } from '../../Stack'
import { Filter } from '../Filter/Filter'
import { Separator } from '../../Separator/Separator'
import { useState } from 'react'
import cls from './TypeFilter.module.pcss'
import { TxType } from '@/types'
type TxTypeValue = (typeof TxType)[keyof typeof TxType]

export type TProps = {
	value?: TxTypeValue
	onApply?: (args: { status: TxTypeValue | undefined }) => void
}

const STATUS_OPTIONS: { value: TxTypeValue; label: string }[] = [
	{ value: TxType.LBF, label: 'LBF' },
	{ value: TxType.Canonical, label: 'Canonical' },
	{ value: TxType.Message, label: 'Message' }, // 'v2'
]

export const TypeFilter = ({ onApply, value }: TProps) => {
	const [selected, setSelected] = useState<TxTypeValue | null>(value ?? null)

	const handleSelect = (value: TxTypeValue) => {
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
