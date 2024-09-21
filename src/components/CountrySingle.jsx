import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { Button, Col, Container, Image, Row, Spinner } from 'react-bootstrap';

const CountrySingle = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [weather, setWeather] = useState("");
    const [isWeatherLoading, setIsWeatherLoading] = useState(true);
    const dispatch = useDispatch();

    const country = location.state.country;

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=
${country.capital}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)

            .catch((error) => {
                console.log(error);
            })

            .then((response) => {
                setWeather(response.data);
                setIsWeatherLoading(false);
            })
    }, [country.capital]);

    if (isWeatherLoading) {
        return (<Spinner animation="border" role="status">
            <span className="visually-hidden">Loading Weather...</span>
        </Spinner>)
    }

    return (
        <Container fluid>
            <Row>
                <Col className="mt-5 d-flex justify-content-center">
                    <Image
                        variant="top"
                        src={country.flags.svg}
                        alt={country.name.common}
                        className="rounded h-50"
                        style={{
                            objectFit: "cover",
                            minHeight: "200px",
                            maxHeight: "200px"
                        }} />
                </Col>
                <Col>
                    <h2>{country.name.capital}</h2>
                    <h3>{country.capital}</h3>
                    <div>
                        <p>Right now it is<strong> {parseInt(weather.main.temp)} </strong>
                            degrees in {country.capital} and {weather.weather[0].description}
                        </p>
                        <Image src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                    </div>
                    <Button variant='light' onClick={() => navigate("/countries")}>Back to Countries</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default CountrySingle