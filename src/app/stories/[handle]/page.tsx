import { getArticle } from '@/app/lib/shopify';
import { Article } from '@/app/lib/types';
import Image from 'next/image';
import React from 'react';


export async function generateMetadata({
    params
}:{
    params:{handle:string}
}) {
    console.log(params);
    console.log(params.handle);
    
}

const ArticlePage = async ({
  params
}:{
  params:{handle:string}
}) => {
  const article = await getArticle(params.handle);
  console.log(article);
  return (
    <section>
      <article className="w-full">
        <nav>Stories/{params.handle}</nav>
        <Image
          src={article.image?.url}
          alt={article.image?.altText}
          width={article.image?.width}
          height={article.image?.height}
          className='w-full aspect-[2/1]'
        />
        <h2 className='text-xl font-semibold p-4'>{article.title}</h2>
        <p className='text-md font-light p-4'>{article.publishedAt}</p>
        <p className='text-lg font-light p-4'>{article.content}</p>
      </article>
      
    </section>
  );
};

export default ArticlePage;