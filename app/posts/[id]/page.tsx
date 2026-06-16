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
  <main className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-200/70 to-slate-300/50 py-12 px-4 sm:px-6 lg:px-8">
    
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-[0_10px_35px_-5px_rgba(15,23,42,0.08)] border border-slate-200 overflow-hidden">
      
      <article className="p-6 sm:p-10 border-b border-slate-200/60 bg-gradient-to-b from-white to-slate-50/50">
        <Link 
          href="/posts" 
          className="group text-sm font-bold text-indigo-600 hover:text-indigo-800 mb-6 inline-flex items-center gap-1.5 transition-colors duration-200"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span> 
          Back to all posts
        </Link>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 capitalize mb-6 leading-tight tracking-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-3.5 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-3.5 rounded-2xl w-fit border border-blue-200/70 shadow-sm">
          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
            {author.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-extrabold text-slate-800">{author.name}</p>
            <p className="text-xs text-slate-600 font-semibold mt-0.5">
              <span className="text-blue-600">@{author.username}</span> • {author.email}
            </p>
          </div>
        </div>

        <p className="text-slate-700 text-base sm:text-lg leading-relaxed whitespace-pre-line font-medium max-w-none">
          {post.body}
        </p>
      </article>
      
      <section className="p-6 sm:p-10 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-xl font-black text-slate-900">Comments</h2>
          <span className="text-xs font-black text-indigo-600 bg-indigo-50 border border-indigo-200/60 px-2.5 py-1 rounded-md shadow-sm">
            {comments.length}
          </span>
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div 
              key={comment.id} 
              className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-[0_4px_12px_-3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_25px_-5px_rgba(15,23,42,0.08)] hover:border-blue-400 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5 mb-3">
                <h3 className="text-sm font-black text-slate-800 capitalize line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
                  {comment.name}
                </h3>
                <span className="text-[11px] font-bold text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-md w-fit sm:ml-auto">
                  {comment.email}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {comment.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  </main>
);
}