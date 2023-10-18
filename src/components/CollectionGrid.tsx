import { getCollections } from '@/app/lib/shopify';
import Image from 'next/image';
import Link from 'next/link';

const CollectionGrid = async () => {
    const collections = await getCollections();
    const collectionList = collections.filter(collection => collection.handle.includes('men'));
    return (

          <div className="w-full mx-auto bg-gray-100">
            <h2 className="sr-only">Collections</h2>
  
            <div className="flex">
              {collectionList.map((collection, i) => (
                <div key={`${collection.handle}${i}`} className="flex flex-[1_0_50%] w-full">
                  <div className="relative flex flex-1">
                    <Link className='text-xl text-white-500 aspect-[1/1]' href={`/collection/${collection.handle}`}>
                      <Image
                        src={collection.image.url}
                        alt={collection.image.altText}
                        width={collection.image.width}
                        height={collection.image.height}
                        className="h-full w-full object-cover object-center "
                      />
                     <div className='flex absolute w-full h-full absolute top-0 items-end p-[55px]'>
                      <div className="flex flex-col items-start text-white p-[55px] bottom-0 left-0 absolute">
                      
                        <h2 className="text-[54px] text-left leading-[58px] font-medium mb-6">{collection.title}</h2>
                        <Link href="/"
                          className="inline-flex text-left gap-1 text-[18px] leading-[32px] font-medium text-white hover:text-green-300"
                        >See collection<span aria-hidden="true">&rarr;</span></Link>
                      </div>
                     </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
    )
};

export default CollectionGrid;