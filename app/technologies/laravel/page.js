import React from 'react'
import LaravelBanner from '../../_components/Laravel/LaravelBanner/LaravelBanner'
import Framework from '../../_components/Laravel/Framework/Framework'
import LaravelCards from '../../_components/Laravel/LaravelCards/LaravelCards'
import Advantages from '../../_components/Laravel/Advantages/Advantages'
import Newsletter from '../../_components/Home/Newsletter/Newsletter'
import TechFAQS from '../../_components/Laravel/TechFAQS/TechFAQS'


const Laravel = () => {
  return (
    <div>
      <LaravelBanner/>
      <Framework/>
      <LaravelCards/>
      <Advantages/>
       <Newsletter />
       <TechFAQS/>

    </div>
  )
}

export default Laravel
