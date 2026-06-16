import axios from 'axios';
import PostCard from '@/components/PostCard';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function getPosts(): Promise<Post[]> {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
}

export default async function PostListPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Blog Posts
          </h1>
        </header>
        {/* Responsive Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              id={post.id} 
              title={post.title} 
              body={post.body} 
            />
          ))}
        </div>
      </div>
    </main>
  );
}