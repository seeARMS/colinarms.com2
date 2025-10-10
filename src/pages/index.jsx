import Head from 'next/head'
import Image from 'next/future/image'
import { motion } from 'framer-motion'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { getColinArticles } from '@/lib/getAllArticles'
import { Github, Linkedin, Mail } from 'lucide-react'

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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

function SocialIcon({ href, icon: Icon, label }) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors duration-200"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  )
}

function BlogPost({ post, index }) {
  const date = new Date(post.isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <motion.a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-baseline gap-4 py-3 border-b border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-blue-400 transition-colors duration-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <time className="text-sm text-zinc-500 dark:text-zinc-500 min-w-[100px] tabular-nums">
        {date}
      </time>
      <span className="text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 flex-1">
        {post.title}
      </span>
    </motion.a>
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

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>Colin Armstrong</title>
        <meta
          name="description"
          content="Colin Armstrong - Software engineer & founder building Paragraph"
        />
      </Head>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 max-w-3xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
          {/* Hero Section */}
          <motion.div
            className="mb-16 sm:mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-6 mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Avatar className="h-10 w-10 sm:h-16 sm:w-16 ring-2 ring-zinc-100 dark:ring-zinc-800">
                  <AvatarImage src="/colin_v1.png" alt="Colin Armstrong" />
                  <AvatarFallback>CA</AvatarFallback>
                </Avatar>
              </motion.div>
              <div>
                <motion.h1
                  className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Colin Armstrong
                </motion.h1>
              </div>
            </div>

            <motion.div
              className="prose prose-zinc dark:prose-invert max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                I'm a software engineer & founder based in the San Francisco Bay Area. I'm building{' '}
                <a
                  href="https://paragraph.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors duration-200 no-underline"
                >
                  Paragraph
                </a>
                , a new way for people to share & earn off their best ideas. <br /><br />Previously, I was an engineering manager at Google working on anti-abuse, and before that I worked on payments at Coinbase.

    <br /><br />

    In my free time I've built a{" "}
    <CustomLink href="https://web.archive.org/web/20180308090449/https:/boltfare-landing.herokuapp.com/">Chatbot that found flight deals</CustomLink>, an{" "}
    <CustomLink href="https://boltscale.io/home">uptime monitoring</CustomLink> SaaS,
    a <CustomLink href="https://feedback-frontend.vercel.app">customer feedback</CustomLink> library,
    a <CustomLink hreef="https://web.archive.org/web/20150910203659/http:/www.yeplive.com/">mobile livestreaming</CustomLink> app,
    a Bitcoin marketplace for buying digital goods,
    and a <CustomLink href="https://github.com/prathamalag1994/hackmit">Kickstarter dapp</CustomLink> on Ethereum, before Ethereum ICO'd.

    <br /><br />

    I enjoy photography, wine, angel investing & supporting great founders.
              </p>
            </motion.div>
          </motion.div>

          {/* Blog Posts Section */}
          {articles && articles.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                Writing
              </h2>
              <div className="space-y-0">
                {articles.slice(0, 10).map((post, index) => (
                  <BlogPost key={post.link} post={post} index={index} />
                ))}
              </div>
              <motion.div
                className="mt-8 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
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
              </motion.div>
            </motion.section>
          )}
        </main>

        {/* Fixed Footer */}
        <motion.footer
          className="border-t border-zinc-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="max-w-3xl mx-auto px-6 sm:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                © {new Date().getFullYear()} Colin Armstrong
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
                  icon={Github}
                  label="Follow on GitHub"
                />
                <SocialIcon
                  href="https://linkedin.com/in/colinarms"
                  icon={Linkedin}
                  label="Follow on LinkedIn"
                />
                <SocialIcon
                  href="mailto:me@cma.xyz"
                  icon={Mail}
                  label="Email me"
                />
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const articles = await getColinArticles()

  return {
    props: {
      articles: articles || [],
    },
    revalidate: 3600, // Revalidate every hour (3600 seconds)
  }
}
