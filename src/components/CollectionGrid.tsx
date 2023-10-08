import { getCollections } from '@/app/lib/shopify';
import Image from 'next/image';
import Link from 'next/link';

const CollectionGrid = async () => {
    const collections = await getCollections();
    const collectionList = collections.filter(collection => collection.handle.includes('men'));
    console.log(collectionList);
    return (
        <section className="w-full p-14 flex flex-col">
            <ul className="flex gap-4 w-full">
                {collectionList.map((collection, i) => (
                    <li className="w-1/2" key={`${collection.handle}${i}`}>
                        <Link href={`/collection/${collection.handle}`}>
                            <article className="flex flex-col w-full relative">
                                <Link href={`/collection/${collection.handle}`}>
                                    <h1 className="text-4xl font-medium underline absolute bottom-4 left-4 hover:text-neutral-50">{collection.title}</h1>
                                </Link>
                                <Image className="w-full h-full object-cover" src={collection.image.url} alt={collection.title} width={300} height={300} />
                            </article>
                        </Link>
                        
                        
                    </li>
                ))}
            </ul>
        </section>
    )
};

export default CollectionGrid;