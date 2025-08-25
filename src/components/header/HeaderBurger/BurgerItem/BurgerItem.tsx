import type { ReactElement } from 'react'
import './styles.pcss'

type BurgerItemProps = {
	readonly icon: ReactElement
	readonly label: string
	readonly action?: ReactElement
	readonly onClick?: () => void
}

export const BurgerItem = ({ icon, label, action, onClick }: BurgerItemProps): ReactElement => {
	return (
		<div className="burger_item" onClick={onClick}>
			<div className="burger_item_description">
				<div className="burger_item_icon">{icon}</div>
				<span className="burger_item_label">{label}</span>
			</div>
			{action}
		</div>
	)
}
