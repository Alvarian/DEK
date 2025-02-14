import React from 'react';
import {Link} from 'react-router-dom';

const Header = (props) => {
    const style = {
      hideNav: {
        display: 'none'
      },
      showNav: {
        display: 'block'
      }
    }
    return (
      <div className="dek-header" style={ props.firstname == undefined ? style.hideNav : style.showNav}>
        
        <nav className="default" role="navigation">
          <div className="nav-wrapper">
            <Link to="/main"><h1 className="brand-logo left">Dek</h1></Link>
            <a href="#!" data-activates="mobile-demo" className="button-collapse show-on-large"><i className="material-icons">menu</i></a>
            <ul className="side-nav" id="mobile-demo">
              <li><a className='nav-link' href="/main">Home</a></li>
              <li><a className='nav-link' href="/userprofile">My Profile</a></li>
              <li><a className='nav-link' href="/createcard">Create Card</a></li>
              <li><a className='nav-link' href="/editcards">Edit Cards</a></li>
              <li><a className='nav-link' href="/pickquiztype">Pick Quiz</a></li>
              <li><a className='nav-link' href="/aboutapp">About DEK</a></li>
              <li><a className='nav-link' href="/">Log out</a></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }

export default Header;



