import { memo } from 'react'
import { Helmet } from 'react-helmet-async'

const DEFAULTS = {
	TITLE: 'Concero | Scan',
	DESCRIPTION:
		'Track and verify Concero transactions effortlessly with Concero Scan. A fast, secure, and transparent tool designed exclusively for monitoring transactions routed through Concero’s cross-chain infrastructure',
	KEYWORDS:
		'concero, concero scan, cross-chain, blockchain testing, decentralized applications, dapps, blockchain integration, ethereum, arbitrum, optimism, sepolia, megaeth, monad, berachain, chainlink, ccip, bridging, messaging, transaction monitoring, cross-chain infrastructure, decentralized bridging, blockchain security, scalable blockchain, capital efficient, cross-chain transactions',
	IMAGE: 'https://scan.concero.io/OG/OG.png',
	DOMAIN: 'scan.concero.io',
	TWITTER: '@concero_io',
	CANONICAL: 'https://scan.concero.io/',
	FAVICONS: [
		{ rel: 'shortcut icon', href: '/Favicons/favicon.ico' },
		{ rel: 'apple-touch-icon', sizes: '180x180', href: '/Favicons/apple-touch-icon.png' },
		{ rel: 'icon', type: 'image/png', sizes: '32x32', href: '/Favicons/favicon-32x32.png' },
		{ rel: 'icon', type: 'image/png', sizes: '16x16', href: '/Favicons/favicon-16x16.png' },
	],
}

type MetaTagsProps = {
	title?: string
	description?: string
	prefetchUrl?: string
	canonicalUrl?: string
	additionalMeta?: React.ReactNode
}

export const MetaTags = memo(
	({
		title = DEFAULTS.TITLE,
		description = DEFAULTS.DESCRIPTION,
		prefetchUrl,
		canonicalUrl = DEFAULTS.CANONICAL,
		additionalMeta,
	}: MetaTagsProps) => (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={DEFAULTS.KEYWORDS} />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="apple-mobile-web-app-status-bar-style" content="default" />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content={DEFAULTS.TWITTER} />
			<meta name="twitter:creator" content={DEFAULTS.TWITTER} />
			<meta name="twitter:domain" content={DEFAULTS.DOMAIN} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={DEFAULTS.IMAGE} />
			<meta name="twitter:image:alt" content="Concero Open Graph Image" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={DEFAULTS.IMAGE} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={canonicalUrl} />
			<link rel="canonical" href={canonicalUrl} />
			{prefetchUrl && (
				<>
					<link rel="dns-prefetch" href={prefetchUrl} />
					<link rel="preconnect" href={prefetchUrl} crossOrigin="" />
				</>
			)}
			{DEFAULTS.FAVICONS.map((props, idx) => (
				<link key={idx} {...props} />
			))}
			{additionalMeta}
		</Helmet>
	),
)
