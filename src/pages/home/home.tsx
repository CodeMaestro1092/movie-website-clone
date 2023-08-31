import React from 'react'
import HeroBanner from './heroBanner/heroBanner'
import Trending from './trending/trending'
import Popular from './popular/popular'
import './home.scss'
import TopRated from './topRated/topRated'

const Home = () => {
  return (
    <div className='homePage'>
        <HeroBanner/>
        <Trending/>
        <Popular/>
        <TopRated />
    </div>
  )
}

export default Home