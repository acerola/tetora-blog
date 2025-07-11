import Link from 'next/link';
import { getAllPosts } from '../posts';

export default function HomePage() {
  const posts = getAllPosts();
  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">My Blog</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <Link href={`/posts/${post.slug}`}
              className="text-2xl font-semibold text-blue-600 hover:underline">
              {post.meta.title}
            </Link>
            <p className="text-gray-500 text-sm">{post.meta.date}</p>
            <p className="mt-2 text-gray-700">{post.meta.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
