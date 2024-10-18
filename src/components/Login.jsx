import { useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, loginWithEmailAndPassword } from "../auth/firebase"
import { useNavigate } from "react-router-dom"
import { Button, Form, Container, Row, Col } from "react-bootstrap"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const [user, loading, error] = useAuthState(auth);

    const navigate = useNavigate();

    useEffect(() => {
        //check if user is logged in then redirect to countries page
        if (user) {
            navigate('/countries');
        }
    }, [user, navigate]);

    const handleLogin = (e) => {
        e.preventDefault()
        if (!email && !password) {
            alert("Email and password are required")
        } else {
            loginWithEmailAndPassword(email, password)
        }
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={4}>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button variant="light" type="submit" className="me-2">
                                Login
                            </Button>
                            <Button variant="secondary" onClick={() => navigate('/register')}>
                                Don't have an account?
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
