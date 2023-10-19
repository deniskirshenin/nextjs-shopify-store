import clsx from 'clsx';
import Image from 'next/image';


export default function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <Image 
      src='/logo.png'
      alt='Brand logo'
      width={90}
      height={25}
      className='h-[25px] w-[90px] inline cursor-pointer'
    />
  );
}