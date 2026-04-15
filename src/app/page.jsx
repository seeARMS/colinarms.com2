import Image from 'next/image'
import { getColinArticles } from '@/lib/getAllArticles'
import { Mail } from 'lucide-react'

// ISR: Revalidate every hour (3600 seconds)
export const revalidate = 3600

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5" fill="currentColor" {...props}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  )
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  )
}

function FarcasterIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5" fill="currentColor" {...props}>
      <path d="M18.24.24H5.76A5.76 5.76 0 0 0 0 6v12a5.76 5.76 0 0 0 5.76 5.76h12.48A5.76 5.76 0 0 0 24 18V6A5.76 5.76 0 0 0 18.24.24m.816 17.166v.504a.49.49 0 0 1 .543.48v.568h-5.143v-.569A.49.49 0 0 1 15 17.91v-.504c0-.22.153-.402.358-.458l-.01-4.364c-.158-1.737-1.64-3.098-3.443-3.098c-1.804 0-3.285 1.361-3.443 3.098l-.01 4.358c.228.042.532.208.54.464v.504a.49.49 0 0 1 .543.48v.568H4.392v-.569a.49.49 0 0 1 .543-.479v-.504c0-.253.201-.454.454-.472V9.039h-.49l-.61-2.031H6.93V5.042h9.95v1.966h2.822l-.61 2.03h-.49v7.896c.252.017.453.22.453.472"/>
    </svg>
  )
}

function BlogPost({ post, index }) {
  const date = new Date(post.isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-baseline gap-4 py-3  transition-colors duration-200"
    >
      <time className="text-sm text-zinc-500 dark:text-zinc-500 min-w-[100px] tabular-nums">
        {date}
      </time>
      <span className="text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 flex-1">
        {post.title}
      </span>
    </a>
  )
}

function SocialIcon({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-all duration-200 hover:scale-110 active:scale-95 inline-block"
    >
      <Icon className="w-5 h-5" />
    </a>
  )
}

function CustomLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 font-transition-colors duration-200 cursor-pointer no-underline"
    >
      {children}
    </a>
  )
}

export default async function Home() {
  const articles = await getColinArticles()

  return (
    <>
      {/* Main Content */}
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 max-w-3xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
          {/* Hero Section */}
          <div className="mb-16 sm:mb-20">
            <div className="flex items-center gap-6 mb-8 animate-fade-in">
              <div className="animate-scale-in animation-delay-200">
                <div className="relative h-10 w-10 sm:h-16 sm:w-16 ring-2 ring-zinc-100 dark:ring-zinc-800 rounded-full overflow-hidden">
                  <Image
                    src="/colin_v1.png"
                    alt="Colin Armstrong"
                    fill
                    sizes="(max-width: 640px) 40px, 64px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="animate-fade-in animation-delay-400">
                <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  Colin Armstrong
                </h1>
              </div>
            </div>

            <div className="prose prose-zinc dark:prose-invert max-w-none animate-fade-in animation-delay-500">
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
    I'm a software engineer and founder in the Bay Area, building{" "}
                <a
                  href="https://paragraph.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors duration-200 no-underline"
                >
                  Paragraph
                </a>{" "}
                - a new way for people to share & earn off their best ideas. <br /><br />Before founding Paragraph, I led engineering teams at Google focused on anti-abuse & privacy, and earlier helped build Coinbase's payments infrastructure.


    <br /><br />



    Over the past 15 years, I've built everything from {" "}
    <CustomLink href="https://web.archive.org/web/20180308090449/https:/boltfare-landing.herokuapp.com/">chatbots that found flight deals</CustomLink> to{" "}
    <CustomLink href="https://boltscale.io/home">uptime monitoring</CustomLink> SaaS to{" "}
    <CustomLink href="https://web.archive.org/web/20150910203659/http:/www.yeplive.com/">mobile livestreaming</CustomLink> apps.
    Before Ethereum launched, I built a <CustomLink href="https://github.com/prathamalag1994/hackmit">decentralized crowdfunding smart contract</CustomLink> that led me to working at Coinbase. I love building things that people genuinely enjoy using.

    <br /><br />

    In my free time I enjoy photography, wine, cooking new recipes & cycling.

    <br /><br />
    I also occasionally angel invest & advise early-stage consumer startups, including <CustomLink href="https://farcaster.xyz">Farcaster</CustomLink>, <CustomLink href="https://pay.daimo.com">Daimo</CustomLink>, <CustomLink href="https://stack.so/">Stack</CustomLink>, & <CustomLink href="https://layer3.xyz/">Layer3</CustomLink>. <br /><br />If you're building something interesting, feel free to
    {" "}<CustomLink href="mailto:colin@armstr.ng">reach out</CustomLink>.
              </p>
            </div>
          </div>

          {/* Blog Posts Section */}
          {articles && articles.length > 0 && (
            <section className="animate-fade-in-up animation-delay-700">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                Writing
              </h2>
            <div className="pb-4 dark:text-zinc-400 text-zinc-600">
            I occasionally write about startups, product, engineering, and other topics on my{" "}
            <CustomLink href="https://writing.cma.xyz">Paragraph</CustomLink>.


            </div>
              <div className="space-y-0 bg-gray-50 px-6 py-3 rounded-lg dark:bg-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-700">
                {articles.slice(0, 10).map((post, index) => (
                  <BlogPost key={post.link} post={post} index={index} />
                ))}
              </div>
              <div className="mt-8 flex justify-center animate-fade-in animation-delay-700">
                <a
                  href="https://writing.cma.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors duration-200"
                >
                  View all writing
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </section>
          )}
        </main>

        {/* Fixed Footer */}
        <footer className="border-t border-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/80 backdrop-blur-sm animate-fade-in animation-delay-1000">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
    colin@armstr.ng
              </p>
              <div className="flex items-center gap-6">
                <SocialIcon
                  href="https://x.com/colinarms"
                  icon={XIcon}
                  label="Follow on X"
                />
                <SocialIcon
                  href="https://farcaster.xyz/colin"
                  icon={FarcasterIcon}
                  label="Follow on Farcaster"
                />
                <SocialIcon
                  href="https://github.com/seeARMS"
                  icon={GithubIcon}
                  label="Follow on GitHub"
                />
                <SocialIcon
                  href="https://linkedin.com/in/colinarms"
                  icon={LinkedinIcon}
                  label="Follow on LinkedIn"
                />
                <SocialIcon
                  href="mailto:colin@armstr.ng"
                  icon={Mail}
                  label="Email me"
                />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
