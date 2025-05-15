interface IconProps extends React.SVGProps<SVGSVGElement> {
	d: string;
	viewBox?: string;
	title?: string;
}

export default function Icon({
	d,
	viewBox = "0 0 24 24",
	title = "Icon",
	...props
}: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={viewBox}
			fill="currentColor"
			{...props}
		>
			<title>{title}</title>
			<path d={d} />
		</svg>
	);
}
