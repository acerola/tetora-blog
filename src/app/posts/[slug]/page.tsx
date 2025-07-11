import { getPostBySlug, getPostSlugs } from '../../../posts';
import { notFound } from 'next/navigation';
import { marked } from 'marked';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug: slug.replace(/\.md$/, '') }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();
  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">{post.meta.title}</h1>
      <p className="text-gray-500 text-sm mb-6">{post.meta.date}</p>
      <article className="prose prose-lg" dangerouslySetInnerHTML={{ __html: marked(post.content) }} />
      <a href="/" className="block mt-8 text-blue-600 hover:underline">← Back to home</a>
    </main>
  );
} 