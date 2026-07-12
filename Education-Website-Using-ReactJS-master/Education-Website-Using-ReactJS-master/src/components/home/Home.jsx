import React from "react"
import AboutCard from "../about/AboutCard"
import Hblog from "./Hblog"
import HAbout from "./HAbout"
import Hero from "./hero/Hero"
import Hprice from "./Hprice"
import Testimonal from "./testimonal/Testimonal"
import CoursesCard from "../allcourses/CoursesCard"

const Home = () => {
  return (
    <>
      <Hero />
      <AboutCard />
      <HAbout />
      <CoursesCard />
      <Testimonal />
      <Hblog />
      <Hprice />
    </>
  )
}

export default Home
