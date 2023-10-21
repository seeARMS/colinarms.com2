import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import portraitImage from 'public/colin_v1.png'
import {useState} from 'react'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

{/*function PersonalText() {

  return (
    <>
    <p>
      My free time is divided between the outdoors (I ran
    </p>

    </>

  )

} */}


function InvestingText() {

  return (
    <>
    <p>
      I occasionally angel invest. I'm interested in the creator economy, media, social, consumer, and web3 spaces.
    </p>
      <p>
        If you're founding an early stage company in this space, feel free to reach out.
      </p>

    </>

  )

}

function BackgroundText() {

  return (
    <>
      <p>
        I'm founder at <a className="text-teal-500 " href="https://paragraph.xyz">Paragraph</a>. We're making it easier for creators to earn a living online.
      </p>
      <p>
        Prior to Paragraph, I spent 5 years at Google leading the communications anti-abuse team. We were responsible for protecting over a billion users from spam, scams, & fraud.
     I was also a part of the privacy working group, pioneering new ways of mitigating abuse while maintaining user privacy. </p>

      <p>Before Google, I spent some time at Coinbase. I helped launch Coinbase in Canada, and improved their Bitcoin private-key signing infrastructure.</p>
      <p>During my undergrad and high school, I built <Link className="text-teal-500" href="/projects">many different projects</Link>, some of which were used by tens of thousands of users, and others that got micro-acquired.</p>

      <p>In my free time, I enjoy hiking, coffee, photography, wine, and tinkering with new technologies.</p>
    </>

  )

}

export default function About() {
  const [tab, setTab] = useState("background")


  return (
    <>
      <Head>
        <title>About - Colin Armstrong</title>
        <meta
          name="description"
          content="I’m Colin Armstrong"
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20 flex justify-center lg:block">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                quality={100}
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <div className="flex justify-center">
   <span className="isolate inline-flex rounded-md shadow-sm mt-8">
      <button
        type="button"
        onClick={() => setTab("background")}
        className={clsx("dark:bg-gray-800 dark:text-white relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 ",
          tab === "background" ? "bg-gray-50 dark:bg-gray-700" : "")}
      >
        Background
      </button>
      <button
        type="button"
        onClick={() => setTab("investing")}
        className={clsx("dark:bg-gray-800 dark:text-white relative rounded-r-md inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 ",
          tab === "investing" ? "bg-gray-50 dark:bg-gray-700" : "")}
      >
        Angel investing
      </button>
    </span>
            </div>

            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              { tab === "background" && <BackgroundText /> }
              { tab === "investing" && <InvestingText /> }
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink href="https://twitter.com/colinarms" icon={TwitterIcon}>
                Follow on Twitter
              </SocialLink>
              <SocialLink href="https://github.com/seeARMS" icon={GitHubIcon} className="mt-4">
                Follow on GitHub
              </SocialLink>
              <SocialLink href="https://linkedin.com/in/colinarms" icon={LinkedInIcon} className="mt-4">
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href="mailto:me@cma.xyz"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                me@cma.xyz
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
