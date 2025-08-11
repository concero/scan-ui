

import type { ReactElement, ImgHTMLAttributes } from 'react';
import { SearchBar } from '@/components/common';
import './styles.pcss';

type Illustration = {
	src: string;
	alt: string;
	className: string;
	props?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'className'>;
};

const illustrations: Illustration[] = [
	{ src: '/Home/Flower.svg', alt: 'Flower', className: 'illustration_one' },
	{ src: '/Home/Code.svg', alt: 'Code', className: 'illustration_two' },
	{ src: '/Home/Math.svg', alt: 'Math', className: 'illustration_three' },
	{ src: '/Home/File.svg', alt: 'File', className: 'illustration_four' },
	{ src: '/Home/Disc.svg', alt: 'Disc', className: 'illustration_five' },
];


export const Home = (): ReactElement => (
	<section className="home">
		<div className="home_content">
			<div className="home_description">
				<span className="home_subtitle">Welcome to</span>
				<span className="home_title">Concero Scan</span>
			</div>
			<div className="home_search">
				<SearchBar />
			</div>
		</div>
		<div className="home_illustrations">
			{illustrations.map(({ src, alt, className, props }) => (
				<img
					key={className}
					src={src}
					alt={alt}
					className={`home_illustration ${className}`}
					draggable={false}
					loading="lazy"
					{...props}
				/>
			))}
		</div>
		<div className="home_blur" />
	</section>
);
