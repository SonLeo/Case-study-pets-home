import { Inter } from 'next/font/google'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import Section1 from '~/components/home/Section1'
import Section10 from '~/components/home/Section10'
import Section11 from '~/components/home/Section11'
import Section12 from '~/components/home/Section12'
import Section2 from '~/components/home/Section2'
import Section3 from '~/components/home/Section3'
import Section4 from '~/components/home/Section4'
import Section5 from '~/components/home/Section5'
import Section6 from '~/components/home/Section6'
import Section7 from '~/components/home/Section7'
import Section8 from '~/components/home/Section8'
import Section9 from '~/components/home/Section9'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      <Section8 />
      <Section9 />
      <Section10 />
      <Section11 />
      <Section12 />
      <Footer />
    </>
  )
}
