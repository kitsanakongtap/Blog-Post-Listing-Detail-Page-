// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function RootPage() {
  // เมื่อมีคนเข้าหน้าแรกสุด จะถูกส่งไปหน้า /posts ทันที
  redirect('/posts');
}