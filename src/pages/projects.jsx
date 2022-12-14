import Image from 'next/future/image'
import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import logoOpenShuttle from '@/images/logos/open-shuttle.svg'

import logoBoltscale from "public/boltscale.png"
import logoShoutshare from "public/shoutshare.svg"
import logoYeplive from "public/yeplive.PNG"
import logoBoltfare from "public/boltfare.png"
import logoSwiftGift from "public/gift.png"
import logoBitIndy from "public/bitindy.png"
import logoAndroid from "public/android.png"

const projects = [
  {
    name: 'BoltFare',
    description:
      'Chatbot that helps find great flight deals. Saved millions of dollars from thousands of users. Micro-acquired in 2017.',
    link: { href: 'https://web.archive.org/web/20180308090449/https://boltfare-landing.herokuapp.com/', label: 'boltfare.com' },
    logo: logoBoltfare,
    year: 2017
  },
  {
    name: 'BoltScale',
    description:
      'Dead-simple uptime & performance monitoring. Micro-acquired in 2020.',
    link: { href: 'https://boltscale.io', label: 'boltscale.io' },
    logo: logoBoltscale,
    year: 2019
  },
  {
    name: 'ShoutShare',
    description:
      'JS widget that helps companies gather actionable feedback from their users.',
    link: { href: 'https://feedback-frontend.vercel.app/', label: 'shoutshare.io' },
    logo: logoShoutshare,
    year: 2020
  },
  {
    name: 'YepLive',
    description:
      'Mobile, location-based livestreaming. Persiscope before Persiscope existed.',
    link: { href: 'https://web.archive.org/web/20150910203659/http://www.yeplive.com/', label: 'yeplive.com' },
    logo: logoYeplive,
    year: 2015
  },
  {
    name: 'BitIndy',
    description:
      'Bitcoin-based peer-to-peer marketplace for buying & selling digital goods.',
    link: { href: '#', label: '' },
    logo: logoBitIndy,
    year: 2014
  },
  {
    name: 'SwiftGift',
    description:
      'A Tinder-like experience to give better gifts. Connect with Facebook and get personalized recommendations. ',
    link: { href: '#', label: '' },
    logo: logoSwiftGift,
    year: 2015
  },
  {
    name: 'Backito',
    description:
      'A distributed Kickstarter dApp on Ethereum.',
    link: { href: 'https://github.com/prathamalag1994/hackmit', label: 'github.com' },
    logo: logoOpenShuttle,
    year: 2014
  },
  {
    name: 'Custom Android ROM',
    description:
      'A custom Android ROM, open sourced & used by thousands. Released at age 15.',
    link: { href: 'https://forum.xda-developers.com/t/rom-seearms-customizable-ugjl2-v0-4-02-13-11-v0-4-major-release.906977/', label: 'xda-developers.com' },
    logo: logoAndroid,
    year: 2011
  },
]

function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects - Colin Armstrong</title>
        <meta
          name="description"
          content="Things I???ve made trying to put my dent in the universe."
        />
      </Head>
      <SimpleLayout
        title="Things I???ve built."
        intro="I???ve worked on tons of projects over the years, with varying success. These are the ones that I???m most proud of."
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <Card as="li" key={project.name}>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <Image
                  src={project.logo}
                  alt=""
                  className="h-8 w-8 rounded-3xl"
                  unoptimized
                />
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link href={project.link.href}>{project.name}</Card.Link>
              </h2>
              <Card.Description>{project.description}</Card.Description>
              <div className="flex justify-between w-full">
              <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                { project.link?.label && <><LinkIcon className="h-6 w-6 flex-none" />
                  <span className="ml-2">{project.link.label}</span> </>
                }
              </p>
                <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200 border border-gray-200 rounded-lg px-2">
                  {project.year}
                </p>
              </div>
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}
