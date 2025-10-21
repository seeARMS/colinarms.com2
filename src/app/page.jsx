import { Github, Linkedin, Mail } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SocialIcon } from '@/components/social-icon'
import { getColinArticles } from '@/lib/getAllArticles'

export const revalidate = 3600

function XIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="currentColor"
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FarcasterIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="currentColor"
      {...props}
    >
      <path d="M18.24.24H5.76A5.76 5.76 0 0 0 0 6v12a5.76 5.76 0 0 0 5.76 5.76h12.48A5.76 5.76 0 0 0 24 18V6A5.76 5.76 0 0 0 18.24.24m.816 17.166v.504a.49.49 0 0 1 .543.48v.568h-5.143v-.569A.49.49 0 0 1 15 17.91v-.504c0-.22.153-.402.358-.458l-.01-4.364c-.158-1.737-1.64-3.098-3.443-3.098c-1.804 0-3.285 1.361-3.443 3.098l-.01 4.358c.228.042.532.208.54.464v.504a.49.49 0 0 1 .543.48v.568H4.392v-.569a.49.49 0 0 1 .543-.479v-.504c0-.253.201-.454.454-.472V9.039h-.49l-.61-2.031H6.93V5.042h9.95v1.966h2.822l-.61 2.03h-.49v7.896c.252.017.453.22.453.472" />
    </svg>
  )
}

function BlogPost({ post }) {
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
      className="group flex items-baseline gap-4 border-b border-zinc-100 py-3 transition-colors duration-200 hover:border-zinc-200 dark:border-zinc-800 dark:hover:border-zinc-700"
    >
      <time className="min-w-[100px] text-sm text-zinc-500 dark:text-zinc-500 tabular-nums">
        {date}
      </time>
      <span className="flex-1 text-zinc-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
        {post.title}
      </span>
    </a>
  )
}

function CustomLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer text-blue-600 no-underline transition-colors duration-200 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
    >
      {children}
    </a>
  )
}

export default async function HomePage() {
  const articles = (await getColinArticles()) ?? []

  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto flex-1 max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
        <div className="mb-16 sm:mb-20">
          <div className="mb-8 flex items-center gap-6">
            <Avatar className="h-10 w-10 ring-2 ring-zinc-100 dark:ring-zinc-800 sm:h-16 sm:w-16">
              <AvatarImage src="/colin_v1.png" alt="Colin Armstrong" />
              <AvatarFallback>CA</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                Colin Armstrong
              </h1>
            </div>
          </div>

          <div className="prose prose-zinc max-w-none dark:prose-invert">
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              I’m a software engineer and founder in the Bay Area, building{' '}
              <a
                href="https://paragraph.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 no-underline transition-colors duration-200 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Paragraph
              </a>{' '}
              - a new way for people to share & earn off their best ideas. <br />
              <br />
              Before founding Paragraph, I led engineering teams at Google
              focused on anti-abuse & privacy, and earlier helped build
              Coinbase’s payments infrastructure.
              <br />
              <br />
              Over the past 15 years, I&apos;ve built everything from{' '}
              <CustomLink href="https://web.archive.org/web/20180308090449/https:/boltfare-landing.herokuapp.com/">
                chatbots that found flight deals
              </CustomLink>{' '}
              to{' '}
              <CustomLink href="https://boltscale.io/home">
                uptime monitoring
              </CustomLink>{' '}
              SaaS to{' '}
              <CustomLink href="https://web.archive.org/web/20150910203659/http:/www.yeplive.com/">
                mobile livestreaming
              </CustomLink>{' '}
              apps. Before Ethereum launched, I built a{' '}
              <CustomLink href="https://github.com/prathamalag1994/hackmit">
                decentralized crowdfunding smart contract
              </CustomLink>{' '}
              that led me to working at Coinbase. I love building things that
              people genuinely enjoy using.
              <br />
              <br />
              In my free time I enjoy photography, wine, cooking new recipes &
              cycling.
              <br />
              <br />
              I also occasionally angel invest & advise early-stage consumer
              startups, including{' '}
              <CustomLink href="https://farcaster.xyz">Farcaster</CustomLink>,{' '}
              <CustomLink href="https://pay.daimo.com">Daimo</CustomLink>,{' '}
              <CustomLink href="https://stack.so/">Stack</CustomLink>, &{' '}
              <CustomLink href="https://layer3.xyz/">Layer3</CustomLink>.{' '}
              <br />
              <br />
              If you&apos;re building something interesting, feel free to{' '}
              <CustomLink href="mailto:colin@armstr.ng">
                reach out
              </CustomLink>
              .
            </p>
          </div>
        </div>

        {articles.length > 0 && (
          <section>
            <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Writing
            </h2>
            <div className="pb-4 text-zinc-600 dark:text-zinc-400">
              I ocasionally write about startups, product, engineering, and
              other topics on my{' '}
              <CustomLink href="https://writing.cma.xyz">Paragraph</CustomLink>.
            </div>
            <div className="space-y-0">
              {articles.slice(0, 10).map((post) => (
                <BlogPost key={post.link} post={post} />
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <a
                href="https://writing.cma.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors duration-200 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
              >
                View all writing
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-white/80 px-6 py-6 backdrop-blur-sm dark:bg-zinc-900/80 sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            colin@armstr.ng
          </p>
          <div className="flex items-center gap-6">
            <SocialIcon
              href="https://x.com/colinarms"
              label="Follow on X"
            >
              <XIcon />
            </SocialIcon>
            <SocialIcon
              href="https://farcaster.xyz/colin"
              label="Follow on Farcaster"
            >
              <FarcasterIcon />
            </SocialIcon>
            <SocialIcon
              href="https://github.com/seeARMS"
              label="Follow on GitHub"
            >
              <Github className="h-5 w-5" />
            </SocialIcon>
            <SocialIcon
              href="https://linkedin.com/in/colinarms"
              label="Follow on LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </SocialIcon>
            <SocialIcon
              href="mailto:colin@armstr.ng"
              label="Email me"
            >
              <Mail className="h-5 w-5" />
            </SocialIcon>
          </div>
        </div>
      </footer>
    </div>
  )
}
