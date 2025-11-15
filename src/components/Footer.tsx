import Link from "next/link";

const footerNavItems: { label: string; href: string; external?: boolean }[] = [
	{ label: "Writing", href: "/#posts" },
	{ label: "About", href: "/#about" },
	{ label: "Contact", href: "mailto:hello@tetora.blog", external: true },
];

export function Footer() {
	return (
		<footer className="mt-16 border-t border-slate-200 pt-8 text-sm text-slate-500">
			<div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-center">
				<p className="mt-6 text-xs text-slate-400">
					&copy; {new Date().getFullYear()} Tetora Journal. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
