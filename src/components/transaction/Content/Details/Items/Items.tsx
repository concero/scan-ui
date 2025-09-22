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
}

export const Token = ({ name }: TokenParameters): ReactElement => {
	return (
		<div className="token">
			<span className="token_name">{name}</span>
		</div>
	)
}

type AmountParameters = {
    symbol: string
    amount: number
    priceUSD?: number | null
}

export const Amount = ({ symbol, amount, priceUSD }: AmountParameters): ReactElement => {
	const formattedAmount = amount.toLocaleString('fullwide', {useGrouping:false, maximumFractionDigits: 18})

    const value = priceUSD && formattedAmount
        ? (Number(formattedAmount) * priceUSD).toFixed(2)
        : null

    return (
        <div className="amount">
            <span className="amount_value">{`${formattedAmount} ${symbol}`}</span>
            {value && <span className="amount_usd">${value}</span>}
        </div>
    )
}