import { getArticles } from '@/app/lib/shopify';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Blog = async () => {
    const articles = await getArticles();
    const shownArticles = articles.slice(0, 2);

    return (
        <section className="flex flex-col">
            <h2 className="sr-only">Blog</h2>
            <ul className="flex">
                {shownArticles.map((article) => (
                    <li key={article.id} className="flex flex-col flex-[1_1_50%] relative">
                        {article.image && (
                            <Image 
                                src={article.image.url}
                                alt={article.image.altText}
                                width={article.image.width}
                                height={article.image.height}
                                className='aspect-[1/1] object-cover'
                            />
                        )}
                        <div className="flex flex-col p-[55px] absolute bottom-0">
                            <h3 className="text-[28px] text-white leading-[28px] font-medium mb-[6px]">{article.title}</h3>
                            <Link href={`stories/${article.handle}`}
                                className="inline-flex gap-1 self-start text-[18px] text-white leading-[32px] border-b border-current font-medium text-black hover:text-green-300"
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