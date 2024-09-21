import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, loginWithEmailAndPassword } from "../auth/firebase"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const [user, loading, error] = useAuthState(auth);

    const navigate = useNavigate();

    const handleLogin = () => {
        if (!email && !password) {
            alert("Name and password is required")
        }

        loginWithEmailAndPassword(email, password)
    }

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={() => navigate('/register')}>Don't have an account?</Button>
        </div>
    )
}

export default Login