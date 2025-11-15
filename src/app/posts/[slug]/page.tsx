import Link from "next/link";
import { getPostBySlug, getPostSlugs } from "@/posts";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { Footer } from "@/components/Footer";

const navItems: { label: string; href: string; external?: boolean }[] = [
	{ label: "Writing", href: "/#posts" },
	{ label: "About", href: "/#about" },
	{ label: "Contact", href: "mailto:hello@tetora.blog", external: true },
];

export async function generateStaticParams() {
	const slugs = getPostSlugs();
	return slugs.map((slug) => ({ slug: slug.replace(/\.md$/, "") }));
}

export default async function PostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const resolvedParams = await params;
	const post = getPostBySlug(resolvedParams.slug);
	if (!post) return notFound();

	const wordCount = post.content.split(/\s+/).filter(Boolean).length;
	const readingTime = Math.max(1, Math.round(wordCount / 200));

	return (
		<main className="min-h-screen bg-white text-slate-900">
			<div className="mx-auto max-w-3xl px-6 py-10 lg:px-0">
				<header className="border-b border-slate-200 pb-6">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<Link href="/" className="flex items-center gap-3 text-slate-900">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
								TB
							</div>
							<div>
								<p className="text-xs uppercase tracking-[0.4em] text-slate-400">Tetora</p>
								<p className="text-sm font-semibold">Notes on calm building</p>
							</div>
						</Link>
						<nav className="flex flex-wrap gap-4 text-sm font-semibold">
							{navItems.map((item) =>
								item.external ? (
									<a
										key={item.label}
										href={item.href}
										className="text-slate-500 transition hover:text-[#fc4d50]"
									>
										{item.label}
									</a>
								) : (
									<Link
										key={item.label}
										href={item.href}
										className="text-slate-500 transition hover:text-[#fc4d50]"
									>
										{item.label}
									</Link>
								),
							)}
						</nav>
					</div>
				</header>

				<article className="mt-10">
					<p className="text-xs uppercase tracking-[0.5em] text-slate-400">Tetora's Blog</p>
					<h1 className="mt-3 text-4xl font-semibold leading-tight md:text-[2.75rem]">
						{post.meta.title}
					</h1>
					<div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-500">
						<time dateTime={post.meta.date}>{post.meta.date}</time>
						<span>&bull;</span>
						<span>{readingTime} min read</span>
					</div>
					{post.meta.description && (
						<p className="mt-4 text-base text-slate-600">{post.meta.description}</p>
					)}
					<div
						className="prose prose-lg prose-slate mt-8 max-w-none rounded-[32px] border border-slate-200 bg-white/90 px-8 py-10"
						dangerouslySetInnerHTML={{ __html: marked(post.content) }}
					/>
				</article>

				<section className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
					<Link
						href="/"
						className="inline-flex items-center gap-2 font-semibold text-[#fc4d50]"
					>
						<span aria-hidden="true">&larr;</span> Back to all posts
					</Link>
				</section>
				<Footer />
			</div>
		</main>
	);
}
