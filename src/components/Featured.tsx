import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Featured = () => {
  return (
    <div className="flex p-14 gap-20">
        <div className="flex gap-8 w-full">
            <Image src="/john-book.png" alt='' width={383} height={500} />
            <Image src="/psalms-book.png" alt='' width={383} height={500} />
        </div>
        <div className="flex flex-col py-32">
            <span className="text-base font-semibold mb-2">NEW</span>
            <h2 className="text-[54px] leading-[58px] font-medium mb-6">Plant books</h2>
            <p className="text-lg font-normal mb-6">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>
            <Link href="/"
                className="inline-flex gap-1 text-[18px] leading-[32px] font-medium text-black hover:text-green-300"
            >See collection<span aria-hidden="true">&rarr;</span></Link>
        </div>
    </div>
  )
};

export default Featured;