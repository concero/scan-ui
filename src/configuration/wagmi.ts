import { http, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const wagmiConfig = createConfig({
	chains: [base],
	connectors: [injected()],
	transports: {
		[base.id]: http(),
	},
})
