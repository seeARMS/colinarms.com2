import Head from 'next/head'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function SpeakingSection({ children, ...props }) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({ title, description, event, cta, href }) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href} >
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{event}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

export default function Speaking() {
  return (
    <>
      <Head>
        <title>Press - Colin Armstrong</title>
        <meta
          name="description"
          content="Both my personal projects and my professional career have been covered in a handful of different media outlets."
        />
      </Head>
      <SimpleLayout
      >
        <div className="space-y-20">
          <SpeakingSection title="Paragraph">
            <Appearance
              href="https://www.theblock.co/post/179174/web3-publishing-platform-paragraph-raises"
              title="Paragraph raises $1.7m"
              description="Web3 publishing platform Paragraph has raised $1.7 million in a pre-seed funding round led by Lemniscap. Other investors in the round include FTX Ventures, Binance Labs, GCR and Seed Club Ventures, according to a company release."
              event="TheBlock"
              cta="Read article"
            /
            >
            <Appearance
              href="https://podcasters.spotify.com/pod/show/web3-academy/episodes/How-Blockchain-Can-Transform-the-Newsletter-Industry--Colin-Armstrong--Paragraph--189-e246lvf"
              title="Transforming the Newsletter Industry with Blockchain"
              description="In this episode, Colin Armstrong from Paragraph talks about the impact of blockchain on the newsletter industry, exploring monetization, engagement and content creation. "
              event="Web3Academy"
              cta="Listen"
            />

            <Appearance
              href="https://insidetheden.captivate.fm/episode/paragraph-and-its-three-pillars-with-colin-arnstrong"
              title="The 3 Pillars of Building Paragraph"
              description="Colin Armstrong the founder of Paragraph joins us to talk about how he’s building Paragraph on 3 important pillars."
              event="Inside the Den"
              cta="Listen to Podcast"
            />
          </SpeakingSection>

          <SpeakingSection title="Projects">
            <Appearance
              href="https://techcrunch.com/2015/06/24/yeplive"
              title="Yeplive brings landscape video and web comments to the live streaming fight"
              description="Yeplive is a Canadian startup that offers live broadcasts via mobile devices, with apps for iOS and Google Play, with a few differences including location-centric feeds, with maps and pins to show where broadcasts are originating, as well as a full-featured conversation interface available on the web so that anyone can join in the conversation. "
              event="TechCrunch"
              cta="Read article"
            />
            <Appearance
              href="https://whatsyourtech.ca/2015/06/24/canadian-app-yeplive-aims-to-take-chunk-of-livestreaming-pie/"
              title=" Canadian app Yeplive aims to take chunk of livestreaming pie"
              description="Periscope and Meerkat have popularized the concept of location-based livestreaming in a big way, and others appear to want to take a bite out of the same pie. Enter Toronto-based Yeplive, a new app aiming to be among the elite."
              event="WhatsYourTech"
              cta="Read article"
            />
            <Appearance
              href="https://thenextweb.com/news/boltfares-chatbot-finds-super-cheap-fares-minutes"
              title="BoltFare's chatbot finds you super-cheap fares in minutes"
              description="I love to travel, but I know how prohibitively expensive it can be. Thankfully, the internet has given us myriad ways to make it more affordable: Skyscanner, HotelTonight, Scott’s Cheap Flights… even Groupon. Now we can add BoltFare to that list."
              event="TheNextWeb"
              cta="Read article"
            />
            <Appearance
              href="https://techvibes.com/2016/11/08/boltfare-chatbot-based-travel-agent-finds-best-flight-deals"
              title="BoltFare is a chatbot-based travel agent that finds you the best flight deals"
              description="Finding flight deals can be a challenge, even at a time when there are dozens of online tools, websites and apps intended to help users find the best deals."
              event="TechVibes"
              cta="Read article"
            />
          </SpeakingSection>
          <SpeakingSection title="Google">
            <Appearance
              href="https://blog.google/products/messages/safer-conversations-messages-verified-sms-and-spam-protection/"
              title="Safer conversations in Messages with Verified SMS and Spam Protection"
              description="In addition to enhancing messaging on Android with Rich Communication Services (RCS)  and bringing you helpful features with Messages, we also want to provide a safer messaging experience. Today we have two new updates to share on that front. "
              event="Google Blog"
              cta="Read Article"
            />
            <Appearance
              href="https://cloud.google.com/blog/products/g-suite/gsuite-security-updates-for-gmail-meet-chat-and-admin"
              title="Safety first: Announcing 11 new G Suite security features"
              description="With so many people working remotely, it's more important than ever that the tools we use to stay in touch and productive are safe and secure."
              event="Google Cloud Blog"
              cta="Read article"
            />
          </SpeakingSection>
          <SpeakingSection title="Personal">
            <Appearance
              href="http://www.newspapers-online.com/auroran/chinese-trip-plants-seeds-for-the-future-in-aurora-app-developer/"
              title='Chinese trip plants "Seeds for the Future" in Aurora app developer'
              description="Next month, Colin Armstrong will walk through the doors of Google’s California Headquarters.
It is familiar terrain for the Aurora native, who recently graduated from the University of Waterloo, but this time will be different: He’s going into the Googleplex as a full-time employee."
              event="Local Newspaper"
              cta="Read Article"
            />
          </SpeakingSection>
        </div>
      </SimpleLayout>
    </>
  )
}
