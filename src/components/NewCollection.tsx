import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NewCollection = () => {
  return (
    <div className="flex">
        <div className="flex gap-8 w-full relative aspect-[2/1]">
            <Image src="/palms.jpg" alt='' width={2000} height={1335} />
            <div className="flex flex-col items-start text-white p-[55px] bottom-0 left-0 absolute">
            <span className="text-base text-left font-semibold mb-2">NEW</span>
            <h2 className="text-[54px] text-left leading-[58px] font-medium mb-6">Summer collection</h2>
            <p className="text-lg text-left font-normal mb-6">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>
            <Link href="/"
                className="inline-flex text-left gap-1 text-[18px] leading-[32px] font-medium text-white hover:text-green-300"
            >See collection<span aria-hidden="true">&rarr;</span></Link>
        </div>
        </div>
        
    </div>
  )
};

export default NewCollection;