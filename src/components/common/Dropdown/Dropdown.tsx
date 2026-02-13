import * as React from 'react'
import cls from './Dropdown.module.pcss'
import clsx from 'clsx'
import { CSSProperties, ReactElement, ReactNode, useEffect, useRef, useState } from 'react'

type Placement = 'bottom' | 'bottomLeft' | 'bottomRight' | 'top' | 'topLeft' | 'topRight'

export interface DropdownProps {
	trigger: ReactElement
	children: ReactNode
	open?: boolean
	onOpenChange?: (open: boolean) => void
	placement?: Placement
	headless?: boolean
	disabled?: boolean
	className?: string
	triggerProps?: React.HTMLAttributes<HTMLElement>
}

export const Dropdown = ({
	trigger,
	triggerProps,
	children,
	open,
	onOpenChange,
	placement = 'bottomLeft',
	headless = false,
	disabled = false,
	className,
}: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(open ?? false)
	const popupRef = useRef<HTMLDivElement>(null)
	const triggerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (open !== undefined) setIsOpen(open)
	}, [open])

	const toggle = () => {
		if (disabled) return
		const newOpen = !isOpen
		setIsOpen(newOpen)
		onOpenChange?.(newOpen)
	}

	useEffect(() => {
		if (!isOpen) return
		const handleClickOutside = (e: MouseEvent) => {
			if (
				popupRef.current &&
				!popupRef.current.contains(e.target as Node) &&
				triggerRef.current &&
				!triggerRef.current.contains(e.target as Node)
			) {
				setIsOpen(false)
				onOpenChange?.(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [isOpen, onOpenChange])

	useEffect(() => {
		if (!headless) {
			setTimeout(() => {
				popupRef.current?.classList.toggle(cls.popup_visible)
			}, 0)
		}
	}, [headless, isOpen])

	const getPopupStyles = (): CSSProperties => {
		const base = { top: '100%', left: 0, transform: 'translateY(4px)' }
		switch (placement) {
			case 'top':
			case 'topLeft':
				return { ...base, top: 'auto', bottom: '100%', transform: 'translateY(-4px)' }
			case 'topRight':
				return { ...base, top: 'auto', bottom: '100%', left: 'auto', right: 0, transform: 'translateY(-4px)' }
			case 'bottomRight':
				return { ...base, left: 'auto', right: 0 }
			default:
				return base // bottom/bottomLeft
		}
	}

	return (
		<div className={cls.dropdown}>
			<div ref={triggerRef} onClick={toggle} className={cls.trigger} {...triggerProps}>
				{trigger}
			</div>
			<div
				ref={popupRef}
				className={clsx(headless ? cls.popup_headless : cls.popup, className)}
				style={getPopupStyles()}
				aria-hidden={!isOpen}
			>
				{children}
			</div>
		</div>
	)
}
