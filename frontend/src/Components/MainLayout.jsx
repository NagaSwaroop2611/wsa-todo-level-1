import React from 'react'
import Header from './Header'
import CopyRightNotice from './CopyRightNotice'

const MainLayout = ({children}) => {
  return (
    <div className="layout-container-div">
      <Header/>
      {children}
      <CopyRightNotice/>
    </div>
  )
}

export default MainLayout
