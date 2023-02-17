import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SectionContainer } from '../Layout';


const Header = ({headerChange , setHeaderChange , firstName }) => (

  // when user enter it shows welcome firstName
   // when we submit we change it to true
  <>
     <SectionContainer className="bg-dark position-relative">
      <div className="wl-header py-4">
    {   headerChange === false &&   <a href='facebook.com' target="_blank" rel="noreferrer">
          <img
            src="/assets/images/logo.png"
            className="img-fluid"
            alt="VETCOIN" // VetCoin image at left and dropdown on right
            style={{ maxWidth: 220  }}
          />
        </a>
  }

{
  //  headerChange == true ? Joinwaitlist : when == false we get Dropdown same as
  headerChange ? <div>

  <button
              className="btn btn-responsive"
              type="button"
              data-toggle="modal"

              data-target="#modal"  >
              Join waitlist
            </button>
          </div>   : <div className=" navbox  bg-dark "   >
          <h4 className='navbox__header'>Welcome {firstName}</h4>
          <ul   className='navbox__unorderList'>
  <li className='navbox__list'><Link  to= "/memberTable" style={{color : "green"}}  >members area</Link></li>
  <li className='navbox__list'> check your rank</li>
  <li className='navbox__list'>change password </li>
  <li    className='navbox__list'><button  className='navbox__button'  type='submit'    href="facebook.com"> Sign Out </button></li>
  </ul>
</div>

}

      </div>
    </SectionContainer>
    <div className="wl-header-hr" />
  </>

)

export default Header;






Header.propTypes = {

  headerChange : PropTypes.bool.isRequired,
  setHeaderChange : PropTypes.func.isRequired,
  firstName : PropTypes.string.isRequired

};
