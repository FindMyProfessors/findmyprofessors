
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';

function Header() 
{

    return(
        <>
            {/* Header/Navbar */}
            <MDBNavbar expand='lg' light bgColor='light'>
                <MDBContainer fluid>


                    <MDBNavbarBrand href='/'>
                    <MDBIcon icon="search fa-1x me-3" style={{ color: '#000000' }}/>
                        Find My Professors
                    </MDBNavbarBrand>

                    <MDBCollapse navbar>
                        
                        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>

                            <MDBNavbarItem>
                                <MDBNavbarLink href='./Home'>Home</MDBNavbarLink>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBNavbarLink href='./About'>About</MDBNavbarLink>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBNavbarLink href='./ContactUs'>Contact</MDBNavbarLink>
                            </MDBNavbarItem>

                        </MDBNavbarNav>
                        
                    </MDBCollapse>

                </MDBContainer>

            </MDBNavbar>
        </>
    );
}
export default Header;
  