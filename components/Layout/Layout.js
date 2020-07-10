import React from 'react'
import {CircularProgress} from '@material-ui/core'

import Header from './Header'
import Footer from './Footer'


const Layout = ({children}) => {
  return (
    <>
      <Header />
      <div style={{minHeight: '5em'}}/>
      <div style={{margin: '5em 5em'}}>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout