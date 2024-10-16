import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Col } from 'react-bootstrap';
import { auth, logout } from '../auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Layout = () => {
    const [user] = useAuthState(auth);
    return (
        <Container fluid>
            <Row>
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
                            <Navbar.Text className='me-2'>{user && `Welcome ${user?.email}!`}</Navbar.Text>
                            {user && <Button onClick={logout}>Logout</Button>}
                        </Nav>
                    </Container>
                </Navbar>
            </Row>
            <Row>
                <Outlet />
            </Row>
        </Container>
    );
};

export default Layout;
