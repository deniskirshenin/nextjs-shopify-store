import { XMarkIcon } from '@heroicons/react/20/solid';

const Banner = () => {
  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-mountain-meadow px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-white">
            70% off storewide — Limited time 
        </p>
      </div>
      <div className="flex flex-1 justify-end">
        <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px] text-white">
          <span className="sr-only">Dismiss</span>
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default Banner;