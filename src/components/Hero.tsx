import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

const Hero = () => {
  return (
    <div className="bg-white">
      <div className="relative isolate">
        <div className="mx-auto">
        <div className="flex flex-1 w-full aspect-[2/1]">
            <Image className="object-cover" src='/modern-tokyo-street-background.jpg' alt='' width={1440} height={800} sizes='100vw' />
          </div>
          <div className="hidden sm:mb-8 sm:flex sm:justify-center gap-x-35 absolute bottom-0 text-white px-14 py-20">
            <h2 className="text-7xl font-medium">Tokyo Fusion: Unleash Your Urban Style.</h2>
            <div className="flex flex-col gap-4 pt-8 justify-end align-end">
                <p className="font-normal text-lg text-right">Elevate your style with our Tokyo-inspired streetwear, where tradition meets urban innovation.</p>
                <Link href="#" className="flex font-medium text-white py-2 px-6 bg-black gap-1 rounded-md ml-auto w-48">
                    See Collection <span aria-hidden="true">&rarr;</span>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Hero;