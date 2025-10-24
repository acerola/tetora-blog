import Link from "next/link";
import { getPaginatedPosts } from "../posts";

type HomePageProps = {
	searchParams: Promise<{ page?: string }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
	const resolvedSearchParams = await searchParams;
	const currentPage = parseInt(resolvedSearchParams.page || "1", 10);
	const { posts, pagination } = getPaginatedPosts(currentPage, 5);

	return (
		<main className="max-w-2xl mx-auto py-10 px-4">
			<h1 className="text-4xl font-bold mb-8">Tetora's Blog</h1>
			<ul className="space-y-6">
				{posts.map((post) => (
					<li key={post.slug} className="border-b pb-4">
						<Link
							href={`/posts/${post.slug}`}
							className="text-2xl font-semibold text-blue-600 hover:underline"
						>
							{post.meta.title}
						</Link>
						<p className="text-gray-500 text-sm">{post.meta.date}</p>
						<p className="mt-2 text-gray-700">{post.meta.description}</p>
					</li>
				))}
			</ul>

			{pagination.totalPages > 1 && (
				<div className="flex justify-center items-center space-x-4 mt-8">
					{pagination.hasPrevPage && (
						<Link
							href={`/?page=${pagination.currentPage - 1}`}
							className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
						>
							Previous
						</Link>
					)}

					<div className="flex space-x-2">
						{Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
							(pageNum) => (
								<Link
									key={pageNum}
									href={`/?page=${pageNum}`}
									className={`px-3 py-2 rounded ${
										pageNum === pagination.currentPage
											? "bg-blue-600 text-white"
											: "bg-gray-200 text-gray-700 hover:bg-gray-300"
									}`}
								>
									{pageNum}
								</Link>
							),
						)}
					</div>

					{pagination.hasNextPage && (
						<Link
							href={`/?page=${pagination.currentPage + 1}`}
							className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
						>
							Next
						</Link>
					)}
				</div>
			)}

			<div className="text-center text-gray-500 text-sm mt-4">
				Showing {posts.length} of {pagination.totalPosts} posts
			</div>
		</main>
	);
}
