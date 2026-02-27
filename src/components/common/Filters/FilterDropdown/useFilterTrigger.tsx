import { useState, useEffect, useCallback } from 'react'
import { FilterUnselectedDeactiveIcon } from '@/assets/filter-unselected-deactive-icon'
import { FilterSelectedActiveIcon } from '@/assets/filter-selected-active-icon'
import { FilterUnselectedActiveIcon } from '@/assets/filter-unselected-active-icon'
import { FilterSelectedDeactiveIcon } from '@/assets/filter-selected-deactive-icon'

type FilterState = 'idle' | 'opened' | 'applied'

export const useFilterTrigger = (title: string, isApplied: boolean) => {
	const [state, setState] = useState<FilterState>(isApplied ? 'applied' : 'idle')
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		if (isApplied) {
			setState(prev => (prev === 'opened' ? 'applied' : 'opened'))
		} else {
			setState(prev => (prev === 'opened' ? 'opened' : 'idle'))
		}
	}, [isApplied])

	const open = useCallback(() => {
		setIsOpen(true)

		setState(prev => (prev === 'idle' ? 'opened' : prev))
	}, [])

	const close = useCallback(() => {
		setIsOpen(false)
	}, [])

	const apply = useCallback(() => {
		setState('applied')
		setIsOpen(false)
	}, [])

	const clear = useCallback(() => {
		setState('idle')
	}, [])

	const getIcon = useCallback(() => {
		if (isOpen) {
			return state === 'applied' ? <FilterSelectedActiveIcon /> : <FilterUnselectedActiveIcon />
		}
		return state === 'applied' ? <FilterSelectedDeactiveIcon /> : <FilterUnselectedDeactiveIcon />
	}, [isOpen, state])

	return {
		isOpen,
		open,
		close,
		apply,
		clear,
		triggerText: title,
		icon: getIcon(),
	}
}
