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
      <Card.Title as="h3" href={href}>
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
          content="I’ve spoken at events all around the world and been interviewed for many podcasts."
        />
      </Head>
      <SimpleLayout
        title="I’ve spoken at events all around the world and been interviewed for many podcasts."
        intro="One of my favorite ways to share my ideas is live on stage, where there’s so much more communication bandwidth than there is in writing, and I love podcast interviews because they give me the opportunity to answer questions instead of just present my opinions."
      >
        <div className="space-y-20">
          <SpeakingSection title="Projects">
            <Appearance
              href="#"
              title="Yeplive brings landscape video and web comments to the live streaming fight"
              description="A technical deep-dive into HelioStream, the real-time streaming library I wrote for transmitting live video back to Earth."
              event="TechCrunch"
              cta="Read article"
            />
            <Appearance
              href="#"
              title=" Canadian app Yeplive aims to take chunk of livestreaming pie"
              description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
              event="WhatsYourTech"
              cta="Read article"
            />
            <Appearance
              href="#"
              title="BoltFare's chatbot finds you super-cheap fares in minutes"
              description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
              event="TheNextWeb"
              cta="Read article"
            />
            <Appearance
              href="#"
              title="BoltFare is a chatbot-based travel agent that finds you the best flight deals"
              description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
              event="TechVibes"
              cta="Read article"
            />
          </SpeakingSection>
          <SpeakingSection title="Google">
            <Appearance
              href="#"
              title="Safer conversations in Messages with Verified SMS and Spam Protection"
              description="How we used world-class visual design to attract a great team, win over customers, and get more press for Planetaria."
              event="Google Blog"
              cta="Read Article"
            />
            <Appearance
              href="#"
              title="Safety first: Announcing 11 new G Suite security features"
              description="The story of how we built one of the most promising space startups in the world without taking any capital from investors."
              event="Google Cloud Blog"
              cta="Read article"
            />
          </SpeakingSection>
          <SpeakingSection title="Personal">
            <Appearance
              href="#"
              title='Chinese trip plants "Seeds for the Future" in Aurora app developer'
              description="How we used world-class visual design to attract a great team, win over customers, and get more press for Planetaria."
              event="Local Newspaper"
              cta="Read Article"
            />
            <Appearance
              href="#"
              title="Huawei program sends 20 engineering students to China"
              description="The story of how we built one of the most promising space startups in the world without taking any capital from investors."
              event="CanadaIt"
              cta="Read article"
            />
          </SpeakingSection>
        </div>
      </SimpleLayout>
    </>
  )
}
