// app/page.tsx
import Link from 'next/link';

export const revalidate = 120;
// Fetching posts with caching for 60 seconds
async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <ul className="space-y-4">
        {posts.slice(0, 10).map((post:{ id: string; title: string; body: string;}) => (
          <li key={post.id} className="border p-4 rounded-lg shadow-md bg-gray-50">
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline">{post.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
