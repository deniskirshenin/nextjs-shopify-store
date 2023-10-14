import { getCollections } from '@/app/lib/shopify';
import Image from 'next/image';
import Link from 'next/link';

const CollectionGrid = async () => {
    const collections = await getCollections();
    const collectionList = collections.filter(collection => collection.handle.includes('men'));
    return (
        <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
  
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0">
              {collectionList.map((collection, i) => (
                <div key={`${collection.handle}${i}`} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <Image
                      src={collection.image.url}
                      alt={collection.image.altText}
                      width={collection.image.width}
                      height={collection.image.height}
                      className="h-full w-full object-content object-center"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="mt-6 text-md text-white-500">
                        <Link href={`/collection/${collection.handle}`}>
                        <span className="absolute inset-0" />
                        {collection.title}
                        </Link>
                    </h3>
                    <p className="text-sm font-semibold text-white-900">{collection.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
};

export default CollectionGrid;