type RouteFn<P extends string | undefined = undefined> = P extends string ? (param?: string) => string : () => string

type Routes = {
	home: RouteFn
	address: RouteFn<string>
	transaction: RouteFn<string>
	message: RouteFn<string>
}

export const routes: Routes = {
	home: () => '/',
	address: (address: string = ':address') => `/address/${address}`,
	transaction: (txHash: string = ':txHash') => `/txHash/${txHash}`,
	message: (message: string = ':message') => `/message/${message}`,
}
