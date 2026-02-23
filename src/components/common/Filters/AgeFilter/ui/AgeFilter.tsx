import { useState, useCallback, useRef } from 'react'
import { Button, Input } from '@concero/ui-kit'
import { usePresetRanges } from '../model/usePresetRanges'
import { useCustomDateRange } from '../model/useCustomDateRange'
import { HStack, VStack } from '@/components/common/Stack'
import { Filter } from '../../Filter/Filter'
import { Separator } from '@/components/common/Separator/Separator'
import { Text } from '@/components/common/Text/Text'
import cls from './AgeFilter.module.pcss'

const PRESETS = [
	{ label: '1 Day', value: '1d' },
	{ label: '1 Week', value: '1w' },
	{ label: '1 Month', value: '1m' },
	{ label: '3 Month', value: '3m' },
	{ label: '6 Month', value: '6m' },
	{ label: '1 Year', value: '1y' },
] as const

export type TAgeFilterOutput = {
	range: {
		from: string
		to: string
	}
}

export type TProps = {
	onApply: (args: TAgeFilterOutput) => void
}

export const AgeFilter = ({ onApply }: TProps) => {
	const [activePreset, setActivePreset] = useState<string | null>(null)
	const presetRanges = usePresetRanges()
	const rangeRef = useRef<TAgeFilterOutput | null>(null)
	const onChange = useCallback((args: { range: { from: string; to: string } }) => {
		rangeRef.current = args
	}, [])

	const {
		customFrom,
		customTo,
		fromError,
		toError,
		handleFromChange,
		handleToChange,
		validateAndSetErrors,
		clearFromError,
		clearToError,
		clear: clearCustom,
	} = useCustomDateRange(onChange, () => {
		if (activePreset !== null) {
			setActivePreset(null)
			clearFromError()
			clearToError()
		}
	})

	const onApplyLocal = useCallback(() => {
		const isValid = validateAndSetErrors()
		if (rangeRef.current?.range.from && rangeRef.current?.range.to && isValid) {
			onApply(rangeRef.current)
		}
	}, [onApply, validateAndSetErrors])

	const handlePresetClick = useCallback(
		(value: string) => {
			if (Object.keys(presetRanges).includes(value)) {
				setActivePreset(value)
				clearCustom()
				clearFromError()
				clearToError()
				onChange({ range: presetRanges[value as keyof typeof presetRanges] })
			} else {
				console.log('DEVELOPER!!! Error | Check again value presets ')
			}
		},
		[presetRanges, clearCustom, clearFromError, clearToError, onChange],
	)

	const clearAll = useCallback(() => {
		setActivePreset(null)
		clearCustom()
		onChange({ range: { from: '', to: '' } })
	}, [clearCustom, onChange])

	return (
		<VStack gap="space_0_75" max>
			<Filter title="Select Range">
				<VStack gap="space_0_25">
					<HStack gap="space_0_25">
						{PRESETS.slice(0, 3).map(item => (
							<Button
								key={item.value}
								variant={activePreset === item.value ? 'secondary_color' : 'tetrary'}
								size="s"
								onClick={() => handlePresetClick(item.value)}
								className={activePreset !== item.value ? cls.unselected_button : undefined}
							>
								{item.label}
							</Button>
						))}
					</HStack>
					<HStack gap="space_0_25">
						{PRESETS.slice(3).map(item => (
							<Button
								key={item.value}
								variant={activePreset === item.value ? 'primary' : 'tetrary_color'}
								size="s"
								onClick={() => handlePresetClick(item.value)}
								className={activePreset !== item.value ? cls.unselected_button : undefined}
							>
								{item.label}
							</Button>
						))}
					</HStack>
				</VStack>
			</Filter>
			<Separator />
			<Filter title="Custom Range">
				<VStack gap="space_0_75">
					<VStack gap="space_0_5">
						<Text variant="heading_small" className={cls.custom_range_subtitle}>
							From
						</Text>
						<Input
							inputProps={{
								onFocus: clearFromError,
								onKeyDown: e => {
									if (e.key === 'Enter') {
										validateAndSetErrors()
									}
								},
							}}
							value={customFrom}
							placeholder="dd / mm / yyyy"
							isError={fromError}
							hintText={fromError ? 'Invalid date' : ''}
							onChange={e => handleFromChange(e.target.value)}
						/>
					</VStack>
					<VStack gap="space_0_5">
						<Text variant="heading_small" className={cls.custom_range_subtitle}>
							To
						</Text>
						<Input
							inputProps={{
								onFocus: clearToError,
								onKeyDown: e => {
									if (e.key === 'Enter') {
										validateAndSetErrors()
									}
								},
							}}
							value={customTo}
							placeholder="dd / mm / yyyy"
							isError={toError}
							hintText={toError ? 'Invalid date' : ''}
							onChange={e => handleToChange(e.target.value)}
						/>
					</VStack>
				</VStack>
			</Filter>
			<Separator />
			<HStack gap="space_0_25">
				<Button
					variant="secondary"
					size="m"
					isDisabled={!customFrom && !customTo && activePreset === null}
					onClick={clearAll}
				>
					Clear
				</Button>
				<Button
					variant={customFrom && customTo ? 'primary' : 'secondary'}
					size="m"
					isDisabled={(fromError || toError || !customFrom || !customTo) && !activePreset}
					onClick={onApplyLocal}
				>
					Apply
				</Button>
			</HStack>
		</VStack>
	)
}
