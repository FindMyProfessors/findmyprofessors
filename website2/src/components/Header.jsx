
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

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
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

function Header() 
{

    const [staticModal, setStaticModal] = useState(false);
    const toggleOpen = () => setStaticModal(!staticModal);

    const navigate = useNavigate();

    const handleLogout = () => {
        toggleOpen();
        navigate('/Login');
    };

    return(
        <>
            {/* Header/Navbar */}
            <MDBNavbar
            expand='lg'
            dark
            style={{ backgroundColor: '#3f3f3f' }}>

                <MDBContainer
                fluid>

                    <MDBNavbarBrand
                    href='./Home'>

                    <MDBIcon
                    icon="search fa-1x me-3"
                    style={{ color: '#FFFFFF' }}/>
                        Find My Professors
                    </MDBNavbarBrand>

                    <MDBCollapse
                    navbar>
                        
                        <MDBNavbarNav
                        className='mr-auto mb-2 mb-lg-0'>

                            <MDBNavbarItem>
                                <MDBNavbarLink
                                href='./Home'
                                style={{ color: '#BBBBBB' }}>
                                    Home
                                </MDBNavbarLink>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBNavbarLink
                                href='./About'
                                style={{ color: '#BBBBBB' }}>
                                    About
                                </MDBNavbarLink>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBNavbarLink
                                href='./ContactUs'
                                style={{ color: '#BBBBBB' }}>
                                    Contact
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>

                    {/* Right Side */}
                    <div
                    className="d-flex justify-content-end"
                    style={{ marginRight: '225px' }}>
                        <MDBCollapse
                        navbar>
                            <MDBNavbarNav>

                                <MDBNavbarItem>
                                    <MDBNavbarLink
                                    href='./Cart'>
                                        Cart
                                    </MDBNavbarLink>
                                </MDBNavbarItem>

                                <MDBDropdown>
                                    <MDBDropdownToggle
                                    style={{ backgroundColor: '#3f3f3f', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0)'}}>

                                        <MDBIcon
                                        className=''
                                        fas
                                        icon="user"
                                        size="2x"
                                        style={{ color: '#FFFFFF' }}/>
                                        
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem link>Profile</MDBDropdownItem>
                                        <MDBDropdownItem link>Settings</MDBDropdownItem>

                                        <MDBDropdownItem
                                        link
                                        onClick={toggleOpen}>
                                            Logout
                                        </MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>

                                <MDBModal staticBackdrop tabIndex='-1' open={staticModal} onClose={() => setStaticModal(false)}>
                                    <MDBModalDialog >
                                        <MDBModalContent style={{ backgroundColor: '#3f3f3f', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0)'}}>
                                            
                                            <MDBModalHeader >
                                                <MDBModalTitle style={{ color: '#FFFFFF' }}>Are you sure you want to logout?</MDBModalTitle>
                                                <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                                            </MDBModalHeader>

                                            <MDBModalFooter style={{margin: '0 auto'}}>
                                                <MDBBtn
                                                size="lg"
                                                className="me-5"
                                                color='secondary'
                                                onClick={toggleOpen}>
                                                    Close
                                                </MDBBtn>

                                                <MDBBtn
                                                size="lg"
                                                className="me-5"
                                                color='danger'
                                                onClick={handleLogout}>
                                                    Logout
                                                </MDBBtn>

                                            </MDBModalFooter>

                                        </MDBModalContent>
                                    </MDBModalDialog>
                                </MDBModal>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </div>

                </MDBContainer>
            </MDBNavbar>
        </>
    );
}
export default Header;
  