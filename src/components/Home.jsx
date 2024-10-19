import { Container, Row, Col } from 'react-bootstrap';
import homeImage from '../assets/earth-globe-svgrepo-com.svg';

const Home = () => {
    return (
        <Container
            className="d-flex align-items-center justify-content-center pt-5"
            style={{ marginTop: '2rem' }}
        >
            <Row className="justify-content-center">

                <Col md={6} className="text-center">
                    <img src={homeImage} alt="globe" className="img-fluid mb-2" style={{ width: "40%" }} />
                    <h2>Countries App</h2>
                    <p>This website was made for React Advanced course taught by Marting Holland at the Business College Helsinki. It has loggin and registation functions using Firebase and APIs to fetch and showcase country and weather data.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Home
