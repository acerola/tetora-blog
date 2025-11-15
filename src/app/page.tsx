import Link from "next/link";
import { getPaginatedPosts } from "../posts";
import { Footer } from "@/components/Footer";

type HomePageProps = {
	searchParams: Promise<{ page?: string }>;
};

const navItems: { label: string; href: string; external?: boolean }[] = [
	{ label: "Writing", href: "/#posts" },
	{ label: "About", href: "/#about" },
	{ label: "Contact", href: "mailto:hello@tetora.blog", external: true },
];

export default async function HomePage({ searchParams }: HomePageProps) {
	const resolvedSearchParams = await searchParams;
	const currentPage = parseInt(resolvedSearchParams.page || "1", 10);
	const { posts, pagination } = getPaginatedPosts(currentPage, 5);
	const featuredPost = posts[0];

	return (
		<main className="min-h-screen bg-white text-slate-900">
			<div className="mx-auto max-w-5xl px-6 py-10 lg:px-0">
				<header className="border-b border-slate-200 pb-6">
					<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
						<Link href="/" className="flex items-center gap-4 text-slate-900">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
								TB
							</div>
							<div>
								<p className="text-xs uppercase tracking-[0.4em] text-slate-400">Tetora</p>
								<p className="text-lg font-semibold leading-snug">
									Journal on tools, systems, and calm shipping
								</p>
							</div>
						</Link>
						<nav className="flex flex-wrap gap-5 text-sm font-semibold">
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

				<div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
					<section id="posts">
						<div className="mb-10">
							<p className="text-xs uppercase tracking-[0.5em] text-slate-400">Latest posts</p>
							<h1 className="mt-2 text-4xl font-semibold md:text-[2.8rem]">
								Letters from Tetora&apos;s engineering desk
							</h1>
							<p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
								Learnings from building infrastructure, release retros, and notes on calm product
								practice.
							</p>
						</div>

						{posts.length === 0 ? (
							<div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/80 p-10 text-center text-slate-500">
								No entries yet &mdash; the journal opens soon.
							</div>
						) : (
							<ul className="space-y-10">
								{posts.map((post, index) => (
									<li key={post.slug} className="border-b border-slate-200 pb-10 last:border-b-0">
										<div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.4em] text-slate-400">
											<span>Tetora Journal</span>
											<span className="h-3 w-px bg-slate-200" aria-hidden="true" />
											<time dateTime={post.meta.date}>{post.meta.date}</time>
										</div>
										<h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-900">
											<Link
												href={`/posts/${post.slug}`}
												className="transition hover:text-[#fc4d50]"
											>
												{post.meta.title}
											</Link>
										</h2>
										<p className="mt-3 text-base text-slate-600">{post.meta.description}</p>
										<div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
											<Link
												href={`/posts/${post.slug}`}
												className="inline-flex items-center gap-2 font-semibold text-[#fc4d50]"
											>
												Read article <span aria-hidden="true">&rarr;</span>
											</Link>
										</div>
									</li>
								))}
							</ul>
						)}

						{pagination.totalPages > 1 && (
							<nav
								className="mt-12 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500"
								aria-label="Pagination"
							>
								{pagination.hasPrevPage && (
									<Link
										href={`/?page=${pagination.currentPage - 1}`}
										className="rounded-full border border-slate-200 px-4 py-2 text-slate-700 transition hover:border-[#fc4d50] hover:text-[#fc4d50]"
									>
										Previous
									</Link>
								)}
								<div className="flex flex-wrap gap-2">
									{Array.from({ length: pagination.totalPages }, (_, index) => index + 1).map(
										(pageNumber) => (
											<Link
												key={pageNumber}
												href={`/?page=${pageNumber}`}
												className={`rounded-full px-3 py-1 text-xs ${
													pageNumber === pagination.currentPage
														? "bg-[#fc4d50] text-white"
														: "border border-transparent text-slate-500 hover:border-slate-200 hover:text-[#fc4d50]"
												}`}
											>
												{pageNumber}
											</Link>
										),
									)}
								</div>
								{pagination.hasNextPage && (
									<Link
										href={`/?page=${pagination.currentPage + 1}`}
										className="rounded-full border border-slate-200 px-4 py-2 text-slate-700 transition hover:border-[#fc4d50] hover:text-[#fc4d50]"
									>
										Next
									</Link>
								)}
								<p className="w-full text-xs font-normal text-slate-400 md:w-auto">
									Showing {posts.length} of {pagination.totalPosts} notes
								</p>
							</nav>
						)}
					</section>
				</div>
				<Footer />
			</div>
		</main>
	);
}
