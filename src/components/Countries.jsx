import { useEffect } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries, search, clearSearch } from "../services/countriesServices";
import CountryCard from "./CountryCard";

const Countries = () => {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries.countries);
    const isLoading = useSelector((state) => state.countries.isLoading);
    const searchInput = useSelector((state) => state.countries.search);

    useEffect(() => {
        dispatch(initializeCountries());
    }, [dispatch]);

    const handleClearSearch = () => {
        dispatch(clearSearch());
    };

    // Handle the loading case here first (use Col, and Spinner)
    if (isLoading) {
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

    // Handle the received data case here.

    return (
        <Container fluid>
            <Row>
                <Col className="mt-5 d-flex justify-content-center">
                    <Form className="d-flex">
                        <Form.Control
                            style={{ width: '18rem' }}
                            type="search"
                            className="me-2"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchInput}
                            onChange={(e) => dispatch(search(e.target.value))}
                        />
                        <Button
                            variant="light"
                            onClick={handleClearSearch}
                            disabled={!searchInput}
                        >
                            Clear
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row xs={2} md={3} lg={4} className="g-3">
                {countries
                    .filter((country) => {
                        return country.name.common
                            .toLowerCase()
                            .includes(searchInput.toLowerCase())
                    })
                    .map((country) => (
                        <CountryCard key={country.name.common} country={country} />
                    ))}
            </Row>
        </Container>
    )
};

export default Countries;
