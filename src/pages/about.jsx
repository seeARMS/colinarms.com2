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
import portraitImage from 'public/colin.jpeg'
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
      I recently began angel investing. I'm mainly interested in the creator economy, media, social, consumer, and web3 spaces.
    </p>
      <p>
        If you're founding an early stage company in this space, I'd love to chat!
      </p>

    </>

  )

}

function BackgroundText() {

  return (
    <>
    <p>
      I'm interested in technology - how it works, how it's made, how it can be improved, and ultimately how it can impact the lives of others. </p>

    <p>When confronted with things that don't make sense, I love asking, <em>Why?</em> It seems my entire life has been a series of posing questions & chasing answers.
    </p>
    <p>
      Ever since a young age I felt like this. When I got my first cellphone at age 15 - an old Android Samsung Galaxy - I asked, <em>Why is it slow?</em>, so I built my own custom ROM, optimized the heck out of it, and <a className="text-teal-500" href="https://forum.xda-developers.com/t/rom-seearms-customizable-ugjl2-v0-4-02-13-11-v0-4-major-release.906977/">released it online.</a>
    </p>
    <p>Shortly after that, I asked, <em>Why is it so hard to make a living online?</em> I built tons of projects to help answer this question, both for myself and for others - an online publication in 2011; a Bitcoin bank in 2012; a distributed kickstarter dApp in 2014; and a Bitcoin-based P2P marketplace in 2015.
    </p>
    <p>
      Working on crypto led to another question - <em className="">Why is it so hard to buy and sell Bitcoin?</em> In 2015 I joined Coinbase to help get this answered. I worked on the team that launched Coinbase in Canada, and made improvements to their Bitcoin private-key storage & anti-abuse infrastructure.
    </p>
    <p>
      This exposure to anti-abuse led me to ask <em>many</em> questions about spam including the motivation, prevalance, and techniques to mitigate. I joined Google and led their Communications Anti-Abuse team for 5 years, protecting billions of users from millions of abusive messages and phone calls every day.
    </p>
    <p>Now, I'm revisiting why it's so hard to make a living online. I'm founder & CEO at <a className="text-teal-500" href="https://paragraph.xyz">Paragraph</a>, where I'm aiming to get this question answered once and for all.</p>
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
          content="I’m Colin Armstrong. I live in New York City, where I design the future."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I’m Colin Armstrong. I was born in Canada, and now live in San Francisco.
            </h1>
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
                href="mailto:me@colinarms.com"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                me@colinarms.com
              </SocialLink>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm pt-3">
                I love chatting - please reach out!
              </p>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
