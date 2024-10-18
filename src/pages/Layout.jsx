import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { auth, logout } from '../auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Footer from '../components/Footer';

const Layout = () => {
    const [user] = useAuthState(auth);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar bg="light" variant="light">
                <Container>
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        {user ? (
                            <>
                                <LinkContainer to="/countries">
                                    <Nav.Link>Countries</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/favourites">
                                    <Nav.Link>Favourites</Nav.Link>
                                </LinkContainer>
                            </>
                        ) : (
                            <>
                                <LinkContainer to="/register">
                                    <Nav.Link>Register</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/login">
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>
                            </>
                        )}
                    </Nav>
                    <Nav>
                        <Navbar.Text className='me-4'>{user && `Welcome ${user?.email}!`}</Navbar.Text>
                        {user && <Button className="faveButton" onClick={logout}>Logout</Button>}
                    </Nav>
                </Container>
            </Navbar>
            <Container fluid style={{ flex: 1 }}>
                <Outlet />
            </Container>
            <div className="mt-4">
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
