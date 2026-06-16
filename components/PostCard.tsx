import Link from 'next/link';

interface PostCardProps {
  id: number;
  title: string;
  body: string;
}

export default function PostCard({ id, title, body }: PostCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between p-6">
      <div>
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-3 capitalize line-clamp-1">
          {title}
        </h2>
        {/* Body (Excerpt 2-3 lines) */}
        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {body}
        </p>
      </div>
      
      {/* Link to Detail Page */}
      <Link 
        href={`/posts/${id}`}
        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm mt-auto w-full sm:w-fit"
      >
        Read More
      </Link>
    </div>
  );
}