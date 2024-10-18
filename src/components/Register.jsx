import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, registerWithEmailAndPassword } from "../auth/firebase"
import { useNavigate } from "react-router-dom"
import { Button, Form, Container, Row, Col } from "react-bootstrap"

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const [user, loading, error] = useAuthState(auth);

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault()
        if (!name) {
            alert("Name is required")
            return
        }
        registerWithEmailAndPassword(name, email, password)
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={4}>
                    <Form onSubmit={handleRegister}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your full name"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                            <Button variant="light" type="submit">
                                Register
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Register
