import { Button, Input } from '@concero/ui-kit'
import { HStack, VStack } from '../../Stack'
import { Filter } from '../Filter/Filter'
import { useChainsStore } from '@/hooks/useChainsStore'
import { useMemo, useState } from 'react'
import { Separator } from '../../Separator/Separator'
import cls from './ChainFilter.module.pcss'
import { CheckIcon } from '@/assets/check-icon'

export type TProps = {
	onApply: (chains: string[]) => void
}

export const ChainFilter = ({ onApply }: TProps) => {
	const { chains } = useChainsStore()
	const [search, setSearch] = useState('')
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

	const filteredChains = useMemo(() => {
		console.count('DEBUG | ChainFilter: Recalculate chains')
		const chainList = Object.entries(chains)
			.map(([id, chain]) => ({
				id,
				name: chain.name,
				icon: chain.logo,
			}))
			.sort((a, b) => a.name.localeCompare(b.name))

		return chainList.filter(chain => chain.name.toLowerCase().includes(search.toLowerCase()))
	}, [chains, search])

	const toggleChain = (id: string) => {
		setSelectedIds(prev => {
			const newSet = new Set(prev)
			if (newSet.has(id)) {
				newSet.delete(id)
			} else {
				newSet.add(id)
			}
			return newSet
		})
	}

	const handleApply = () => {
		onApply(Array.from(selectedIds))
	}

	const handleClear = () => {
		setSelectedIds(new Set())
	}

	return (
		<VStack gap="space_0_75" className={cls.wrap_filter}>
			<Filter title="Select Chain" isFull>
				<Input placeholder="Search by chain Name" value={search} onChange={e => setSearch(e.target.value)} />
			</Filter>

			<VStack gap="space_0_25" max className={cls.list_chains}>
				{filteredChains.map(chain => (
					<Button
						key={chain.id}
						variant={'tetrary'}
						size="s"
						isFull
						className={cls.chain_item}
						onClick={() => toggleChain(chain.id)}
						leftIcon={<img src={chain.icon} className={cls.chain_icon} />}
						trailIcon={{
							show: selectedIds.has(chain.id),
							icon: <CheckIcon />,
						}}
					>
						{chain.name}
					</Button>
				))}
			</VStack>

			<Separator />

			<HStack gap="space_0_25" max>
				<Button variant="secondary" size="m" isFull onClick={handleClear}>
					Clear
				</Button>
				<Button variant="secondary" size="m" isFull onClick={handleApply} isDisabled={selectedIds.size === 0}>
					Apply
				</Button>
			</HStack>
		</VStack>
	)
}
