import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/posts");

export function getPostSlugs() {
	return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));
}

export function getPostBySlug(slug: string) {
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = path.join(postsDirectory, `${realSlug}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);
	return {
		slug: realSlug,
		meta: data,
		content,
	};
}

export function getAllPosts() {
	const slugs = getPostSlugs();
	const posts = slugs.map((slug) => getPostBySlug(slug));
	// Sort by date descending
	return posts.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}

export function getPaginatedPosts(page: number = 1, postsPerPage: number = 5) {
	const allPosts = getAllPosts();
	const totalPosts = allPosts.length;
	const totalPages = Math.ceil(totalPosts / postsPerPage);
	const startIndex = (page - 1) * postsPerPage;
	const endIndex = startIndex + postsPerPage;
	const posts = allPosts.slice(startIndex, endIndex);

	return {
		posts,
		pagination: {
			currentPage: page,
			totalPages,
			totalPosts,
			postsPerPage,
			hasNextPage: page < totalPages,
			hasPrevPage: page > 1,
		},
	};
}
