import { Button, Checkbox } from '@concero/ui-kit'
import { VStack } from '../../Stack'
import { Filter } from '../Filter/Filter'
import { Separator } from '../../Separator/Separator'
import { useState } from 'react'
import cls from './TypeFilter.module.pcss'
import { TxType } from '@/types'
type TxTypeValue = (typeof TxType)[keyof typeof TxType]

export type TProps = {
	value?: TxTypeValue
	onApply?: (args: { status: TxTypeValue }) => void
}

const STATUS_OPTIONS: { value: TxTypeValue; label: string }[] = [
	{ value: TxType.All, label: 'All' },
	{ value: TxType.LBF, label: 'LBF' },
	{ value: TxType.IOU, label: 'IOU' },
	{ value: TxType.Canonical, label: 'Canonical' },
	{ value: TxType.Message, label: 'Message' }, // Значение 'v2'
	{ value: TxType.CCIP, label: 'CCIP' },
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
