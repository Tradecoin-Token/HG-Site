import React, {useContext, useRef} from 'react'

import "owl.carousel/dist/assets/owl.carousel.css"
import "owl.carousel/dist/assets/owl.theme.green.css"
import OwlCarousel from 'react-owl-carousel'
import styles from './FileCertification.module.scss'
import {ThemeContext} from 'context/ThemeContext'
import WavesConfig from 'config/waves'
import Prev from 'assets/images/left.png'
import Next from 'assets/images/right.png'
import FileCertificationCell from './FileCertificationCell/FileCertificationCell'

function FileCertification({certifications, owner}){
  const carousel = useRef(null)
  const {theme} = useContext(ThemeContext)
  const viewMore = useRef(null);


  return (
    (certifications && certifications.length>0) ?
    (
      <div className={styles.fileCertification} style={{backgroundColor: theme.stepBackground, boxShadow: theme.historyglow}}>
        <div className={styles.CarouselArea}>
          <div className={styles.header}>
          <div className={styles.titleBar}>
            <div className={styles.title} style={{color: theme.primaryText}}>
              Latest Certified files
            </div>
            <a ref={viewMore} className={styles.view} href='/' target="_blank" rel="noreferrer">View more</a>
          </div>
            <hr className = {styles.line}/>
          </div>
          <div className={styles.mainCarousel}>
            <img src = {Prev} className = {styles.leftIcon} style={{color: theme.primaryText}} onClick={()=>{carousel.current.prev()}} alt = ""/>
            <OwlCarousel 
              onChanged  = {(e) => {
                if(e.item.index !== null) {
                  viewMore.current.href = `${WavesConfig.EXPLORER_URL}/tx/${certifications[e.item.index].key.replace('data_fc_', '').replace('_' + owner, '')}`
                }
              }}
              style={{width: 'calc(100% - 80px)'}} className="owl-theme" items={1} responsiveClass={true} margin={0} dots={false} ref={carousel} mouseDrag={false} touchDrag={false}>
                {
                    certifications && certifications.map((cert) =>
                        <FileCertificationCell key={cert.key} detail={cert} owner={owner} />
                    )
                }
            </OwlCarousel>
            <img src = {Next} className = {styles.rightIcon} onClick={()=>{carousel.current.next()}} alt = ""/>
          </div>
        </div>
      </div>
    )
    : null
  )
}

export default FileCertification