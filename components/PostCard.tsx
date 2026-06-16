import Link from 'next/link';

interface PostCardProps {
  id: number;
  title: string;
  body: string;
}

export default function PostCard({ id, title, body }: PostCardProps) {
  return (
    <div className="group relative bg-gradient-to-b from-white to-slate-50/50 rounded-2xl border border-slate-100 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_-8px_rgba(15,23,42,0.08)] hover:border-slate-200/80 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div>
        <span className="inline-block text-[11px] font-semibold tracking-wider text-blue-600 uppercase bg-blue-50/80 px-2.5 py-1 rounded-md mb-4">
          Article
        </span>

       <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 capitalize line-clamp-1 group-hover:text-indigo-600 transition-colors duration-200">
          {title}
        </h2>
        
        <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mb-6 line-clamp-3 font-normal">
          {body}
        </p>
      </div>
      
      <Link 
        href={`/posts/${id}`}
        className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2.5 px-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-sm mt-auto w-full sm:w-fit"
      >
        Read More
        <svg className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  );
}