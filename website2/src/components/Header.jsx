
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
            <MDBNavbar expand='lg' dark style={{ backgroundColor: '#3f3f3f' }}>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='./Home'>
                    <MDBIcon icon="search fa-1x me-3" style={{ color: '#FFFFFF' }}/>
                        Find My Professors
                    </MDBNavbarBrand>

                    <MDBCollapse navbar>
                        
                        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>

                            <MDBNavbarItem>
                                <MDBNavbarLink href='./Home' style={{ color: '#BBBBBB' }}>Home</MDBNavbarLink>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBNavbarLink href='./About' style={{ color: '#BBBBBB' }}>About</MDBNavbarLink>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBNavbarLink href='./ContactUs' style={{ color: '#BBBBBB' }}>Contact</MDBNavbarLink>
                            </MDBNavbarItem>

                        </MDBNavbarNav>
                        
                    </MDBCollapse>

                </MDBContainer>

            </MDBNavbar>
        </>
    );
}
export default Header;
  