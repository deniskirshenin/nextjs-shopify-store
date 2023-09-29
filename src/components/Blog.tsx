import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Blog = () => {
    const posts = [
        { id: 3856, image: '/blog/blog-image-1.png', date: 'October 12, 2024', title: '3 ways to keep your plants fresh', width: 424, height: 316},
        { id: 49384, image: '/blog/blog-image-2.png', date: 'October 12, 2024', title: 'Side table plans and their benefits', width: 424, height: 316},
        { id: 487548, image: '/blog/blog-image-3.png', date: 'October 12, 2024', title: 'Floral scent is the next big thing', width: 424, height: 316},
    ];
    return (
        <section className="p-14 flex flex-col">
            <h2 className="text-[40px] leading-[44px] font-medium mb-8">Plant blog</h2>
            <ul className="flex gap-8">
                {posts.map((post) => (
                    <li key={post.id} className="flex flex-col gap-[10px]">
                        <Image 
                            src={post.image}
                            alt={post.title}
                            width={post.width}
                            height={post.height}
                        />
                        <div className="flex flex-col items-start">
                            <span className="text-[14px] leading-[22px] font-normal text-slate-500 mb-1">{post.date}</span>
                            <h3 className="font-[20px] leading-[28px] font-medium mb-[6px]">{post.title}</h3>
                            <Link href="/"
                                className="inline-flex gap-1 text-[18px] leading-[32px] border-b border-current font-medium text-black hover:text-green-300"
                                >Read more
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
};

export default Blog;