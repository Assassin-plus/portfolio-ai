import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Analytics from '../components/Analytics'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Works from '../components/Works'
import Footer from '../components/Footer'

export default function Index() {
  return (
    <>
      <Navbar />
      <Hero />
      <Experience />
      <Works />
      <Projects />
      <Analytics />
      <Footer />
    </>
  )
}
