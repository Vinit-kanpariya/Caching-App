// app/posts/[id]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 120;

interface PageProps {
  params: Promise<{
    id: string; // Ensure this is correctly defined as a promise
  }>;
}

// Fetch post data with caching
async function getPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 120 }, // Full route caching for 120 seconds
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

export default async function PostPage({ params }: PageProps) {
  // Ensure params.id is a string
  const resolvedParams = await params; // Await the params to resolve the promise
  if (!resolvedParams?.id) {
    return notFound();
  }

  const post = await getPost(resolvedParams.id);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700">{post.body}</p>

      <div className="mt-6">
        <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
          ← Back to Posts
        </Link>
      </div>
    </main>
  );
}
