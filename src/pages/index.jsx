import { Inter } from 'next/font/google'
import Footer from '~/views/layouts/Footer'
import Header from '~/views/layouts/Header'
import Section1 from '~/views/layouts/home/Section1Slider'
import Section10 from '~/views/layouts/home/Section10Grooming'
import Section11 from '~/views/layouts/home/Section11BeautyProducts'
import Section12 from '~/views/layouts/home/Section12News'
import Section2 from '~/views/layouts/home/Section2BanerProduct'
import Section3 from '~/views/layouts/home/Section3Deal'
import Section4 from '~/views/layouts/home/Section4BannerService'
import Section5 from '~/views/layouts/home/Section5CatFood'
import Section6 from '~/views/layouts/home/Section6DogFood'
import Section7 from '~/views/layouts/home/Section7BannerGrooming'
import Section8 from '~/views/layouts/home/Section8PateForDog'
import Section9 from '~/views/layouts/home/Section9PateForCat'

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
