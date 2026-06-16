import axios from 'axios';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

// Fetch Detail Data using Promise.all for optimization
async function getPostDetail(id: string) {
  try {
    // 1. Fetch Main Post
    const postRes = await axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post = postRes.data;

    // 2. Fetch Author and Comments concurrently
    const [userRes, commentsRes] = await Promise.all([
      axios.get<User>(`https://jsonplaceholder.typicode.com/users/${post.userId}`),
      axios.get<Comment[]>(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    ]);

    return {
      post,
      author: userRes.data,
      comments: commentsRes.data
    };
  } catch (error) {
    return null;
  }
}// 1. ปรับปรุง Type ของ params ให้เป็น Promise
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: PageProps) {
  // 2. ทำการ unwrap หรือคลาย Promise ออกมาด้วย await ก่อนใช้งาน
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // 3. ส่ง id ที่คลายออกมาแล้วไปใช้งานตามปกติ
  const data = await getPostDetail(id);

  // If post not found, trigger Next.js 404 page
  if (!data) {
    notFound();
  }

  const { post, author, comments } = data;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* ... โค้ดส่วน UI ที่เหลือด้านล่าง เหมือนเดิมทุกประการ ... */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <article className="p-6 sm:p-10 border-b border-gray-100">
          <Link href="/posts" className="text-sm font-medium text-blue-600 hover:text-blue-800 mb-6 inline-flex items-center gap-1">
            ← Back to all posts
          </Link>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 capitalize mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-3 mb-8 bg-blue-50/50 p-3 rounded-xl w-fit">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">{author.name.charAt(0)}</div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{author.name}</p>
              <p className="text-xs text-gray-500">@{author.username} • {author.email}</p>
            </div>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">{post.body}</p>
        </article>
        
        <section className="p-6 sm:p-10 bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Comments ({comments.length})</h2>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-bold text-gray-800 capitalize line-clamp-1">{comment.name}</h3>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{comment.email}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{comment.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}