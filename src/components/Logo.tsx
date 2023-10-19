import clsx from 'clsx';
import LogoIcon from './icons/Logotype';

const Logo = ({ size }: { size?: 'sm' | undefined }) => {
  return (
    <div
      className='flex items-center justify-center'
    >
      <LogoIcon/>
    </div>
  );
}

export default Logo;