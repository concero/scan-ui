import type { ReactElement } from 'react'
import './styles.pcss'

type ChainParameters = {
	name: string
	id: number
}

export const Chain = ({ name, id }: ChainParameters): ReactElement => {
	return (
		<div className="chain">
			<img src={`https://dev.concero.io/static/chains/${id}.svg`} alt={name} className="chain_logo" />
			<span className="chain_name">{name}</span>
		</div>
	)
}

type TokenParameters = {
	name: string
	logo: string
}

export const Token = ({ name, logo }: TokenParameters): ReactElement => {
	return (
		<div className="token">
			<img src={logo} alt={name} className="token_logo" />
			<span className="token_name">{name}</span>
		</div>
	)
}

type AmountParameters = {
	name: string
	amount: number
}

export const Amount = ({ name, amount }: AmountParameters): ReactElement => {
	return (
		<div className="amount">
			{amount}
			<span className="amount_name">{name}</span>
		</div>
	)
}
