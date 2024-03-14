import Image from 'next/future/image'
import Head from 'next/head'
import { Fragment, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'

import { SimpleLayout } from '@/components/SimpleLayout'

const files = [
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: await import('public/photography/blue_bird.jpg'),
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: await import('public/photography/patagonia.jpg'),
  },

  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: await import('public/photography/big_bird.jpg'),
  },

  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: await import('public/photography/big_eagle.jpg'),
  },

  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: await import('public/photography/colored_bird.jpg'),
  },

  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: await import('public/photography/eagle.jpg'),
  },

  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: await import('public/photography/fasciated.jpg'),
  },

  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: await import('public/photography/monkey_family.jpg'),
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: await import('public/photography/monkey.jpg'),
  },

  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: await import('public/photography/sloth.jpg'),
  },

  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: await import('public/photography/tamandua.jpg'),
  },

  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: await import('public/photography/yellow_bird-2.jpg'),
  },

  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: await import('public/photography/yellow_bird.jpg'),
  },

  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: await import('public/photography/ducks.jpg'),
  },

  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: await import('public/photography/yosemite.jpg'),
  },

  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: await import('public/photography/astro_3.jpg'),
  },

  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: await import('public/photography/green_bird.jpg'),
  },

  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: await import('public/photography/fox.jpg'),
  },

  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: await import('public/photography/astro.jpg'),
  },

  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: await import('public/photography/coati.jpg'),
  },

  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: await import('public/photography/bobcat.jpg'),
  },


]

function Modal({ src, open, setOpen}) {
  return (
    <Transition.Root show={open} as={Fragment}

    >
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"

        >

          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white  text-left shadow-xl transition-all  sm:w-full sm:m-32 ">
                <div>
                  <div className="text-center ">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    </Dialog.Title>
                    <div className=" h-full w-full">
                    <Image src={src} alt="" className="rounded-lg"
                      quality={100}
                      placeholder="blur"
                      />
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}


export default function Photography() {
 // Initialize state to track open status of each modal
  const [modalOpenState, setModalOpenState] = useState(files.map(() => false));

  // Function to handle opening a modal
  const handleOpenModal = (index) => {
    setModalOpenState(modalOpenState.map((open, i) => i === index ? true : open));
  };

  // Function to handle closing a modal
  const handleCloseModal = (index) => {
    setModalOpenState(modalOpenState.map((open, i) => i === index ? false : open));
  };

  return (
    <>
      <Head>
        <title>Photography - Colin Armstrong</title>
        <meta
          name="description"
          content="Some pictures I've taken."
        />
      </Head>
      <SimpleLayout
        title="Photography."
        intro="I love taking photos. Here are some of my favorites."
      >


    <ul role="list" className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
      {files.map((file, index) => (
        <li key={index} className="relative" onClick={() => handleOpenModal(index)}>

        <Modal src={file.source} open={modalOpenState[index]} setOpen={() => handleCloseModal(index)} />

          <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 transition-all"

        >

            <Image
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={50}
          priority
         src={file.source} alt="" className="pointer-events-none object-cover group-hover:opacity-75 transition-all" fill
        />
        {/*<button type="button" className="absolute inset-0 focus:outline-none">
              <span className="sr-only">View details for {file.title}</span>
            </button>*/}

        {/*<p className="absolute px-4 left-0 right-0 top-0 bottom-0 group-hover:block hidden pointer-events-none mt-2 block truncate text-sm font-medium text-gray-100">{file.title}</p>*/}
          </div>
        </li>
      ))}
    </ul>

      </SimpleLayout>
    </>
  )
}
