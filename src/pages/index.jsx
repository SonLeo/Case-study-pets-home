import { Inter } from 'next/font/google'
import Footer from '~/views/layouts/footer/Footer'
import Header from '~/views/layouts/header/Header'
import Section1 from '~/views/layouts/home/1Slider/Section1Slider'
import Section10 from '~/views/layouts/home/10Grooming/Section10Grooming'
import Section11 from '~/views/layouts/home/11BeautyProducts/Section11BeautyProducts'
import Section12 from '~/views/layouts/home/12News/Section12News'
import Section2 from '~/views/layouts/home/2BannerProduct/Section2BanerProduct'
import Section3 from '~/views/layouts/home/3Deal/Section3Deal'
import Section4 from '~/views/layouts/home/4BannerService/Section4BannerService'
import Section5 from '~/views/layouts/home/5CatFood/Section5CatFood'
import Section6 from '~/views/layouts/home/6DogFood/Section6DogFood'
import Section7 from '~/views/layouts/home/7BannerGrooming/Section7BannerGrooming'
import Section8 from '~/views/layouts/home/8PateForDog/Section8PateForDog'
import Section9 from '~/views/layouts/home/9PateForCat/Section9PateForCat'

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
