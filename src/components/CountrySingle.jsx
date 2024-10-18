import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const CountrySingle = (props) => {
    const location = useLocation();
    const country = props.country || location.state.country;
    const [weather, setWeather] = useState("");
    const [isWeatherLoading, setIsWeatherLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setIsWeatherLoading(true);
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
            )
            .then((response) => {
                setWeather(response.data);
                setIsWeatherLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                setIsWeatherLoading(false);
                setWeather(null); // Set weather to null to indicate an error
            });
    }, [country.capital]);

    console.log("Weather: ", weather);

    if (isWeatherLoading) {
        return (
            <Col className="text-center m-5">
                <Spinner
                    animation="border"
                    role="status"
                    className="center"
                    variant="info"
                >
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Col>
        );
    }

    if (!weather) {
        return (
            <Container fluid>
                <Row>
                    <Col className="mt-5 text-center">
                        <h2>Error loading weather data</h2>
                        <p>Unable to fetch weather information for {country.capital}</p>
                        <Button variant="light" onClick={() => navigate("/countries")}>
                            Back to Countries
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container fluid>
            <Row>
                <Col className="mt-5 d-flex justify-content-center">
                    <Image className="rounded" style={{
                        width: '70%',
                    }} src={country.flags.svg} />
                </Col>
                <Col className="mt-5 d-flex justify-content-center flex-column">
                    <h2>{country.name.common}</h2>
                    <h3>{country.capital}</h3>

                    <div>
                        <p>
                            Right now it is <strong>{parseInt(weather.main.temp)} </strong>
                            degrees in {country.capital} and {weather.weather[0].description}
                        </p>
                        <Image
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        />
                    </div>
                    <Button variant="light" style={{
                        width: '40%',
                        maxWidth: 'fit content'
                    }} onClick={() => navigate("/countries")}>
                        Back to Countries
                    </Button>
                </Col>
            </Row>
        </Container >
    );

    // Cases we will cover together are: Country capital image
};

export default CountrySingle;
