import React from 'react'
import { connect } from 'react-redux'
import Image001 from './assets/bell-and-ross-logo.png'
import Image002 from './assets/urwerk-logo.png'
import './Header.scss'

const Header = ({ location }) => {
  const { query } = location
  const id = query.id

  return (
    <div>
      {(id === '1') && (
        <img
          alt='image1'
          className='header-logo'
          src={Image001}
        />
      )}
      {(id === '2') && (
        <img
          alt='image2'
          className='header-logo'
          src={Image002}
        />
      )}
    </div>
  )
}

Header.propTypes = {
  location: React.PropTypes.any
}

function mapStateToProps (state) {
  return {
    location: state.location
  }
}

export default connect(mapStateToProps)(Header)
