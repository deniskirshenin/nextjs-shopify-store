"use client"
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-[#222222] px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm leading-6 text-white">
            70% off storewide — Limited time
          </p>
        </div>
          <div className="flex flex-1 justify-end">
          <button
            type="button"
            onClick={handleDismiss}
            className="-m-3 p-3 focus-visible:outline-offset-[-4px] text-white"
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          </div>
      </div>
    )
  );
};

export default Banner;
