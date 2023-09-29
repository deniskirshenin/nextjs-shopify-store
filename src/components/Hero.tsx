import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

const Hero = () => {
  return (
    <div className="bg-white">
      <div className="relative isolate px-14 py-20">
       
        <div className="mx-auto">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center gap-x-35">
            <h2 className="text-7xl font-medium">Plant your house with handmade love.</h2>
            <div className="flex flex-col gap-4 pt-8 justify-end align-end">
                <p className="font-normal text-lg text-right">All good things starts with a homepage. Get inspired without breaking your wallet.</p>
                <a href="#" className="flex font-medium text-white py-2 px-6 bg-black gap-1 rounded-md ml-auto w-48">
                    See Collection <span aria-hidden="true">&rarr;</span>
                </a>
            </div>
          </div>
          <div className="flex flex-1">
            <Image src='/hero-image.png' alt='' width={1336} height={640} />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Hero;