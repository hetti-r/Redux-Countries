import React from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { addFavourite, removeFavourite } from '../store/favouriteSlice'
import { useDispatch, useSelector } from 'react-redux'
import { IoLanguage } from "react-icons/io5";
import { GrCurrency } from "react-icons/gr";
import { MdPeopleAlt } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const CountryCard = ({ country }) => {
    const dispatch = useDispatch();
    const favouritesList = useSelector(state => state.favourites.favourites);
    const isFavourite = favouritesList.includes(country.name.common);

    return (
        <Col className="mt-5" key={country.name.official}>
            <Card className="h-100 d-flex flex-column">
                <LinkContainer to={`/countries/${country.name.common}`}
                    state={{ country: country }}>
                    <div className="card-img-wrapper">
                        <Card.Img
                            variant="top"
                            src={country.flags.svg}
                            alt={country.name.common}
                            className="rounded"
                        />
                    </div>
                </LinkContainer>
                <Card.Body className="d-flex flex-column justify-content-between" >
                    <Card.Title>{country.name.common}</Card.Title>
                    <Card.Subtitle className="mb-5 text-muted">{country.name.official}</Card.Subtitle>
                    <ListGroup variant="flush" className="flex-grow-1 justify-content-center">
                        <ListGroup.Item>
                            <i className="me-2 d-flex align-items-center"> <MdPeopleAlt className="me-2" /> {country.population.toLocaleString()}</i>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <i className="me-2 d-flex align-items-center"> <GrCurrency className="me-2" /> {Object.values(country.currencies || {})
                                .map((currency) => currency.name)
                                .join(', ') || "No currency"
                            }</i>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <i className="me-2 d-flex align-items-center">
                                <IoLanguage className="me-2" />
                                {Object.values(country.languages || {})
                                    .map((language) => language)
                                    .join(', ') || "No language"
                                }
                            </i>
                        </ListGroup.Item>
                    </ListGroup>
                    {isFavourite ? (
                        <Button variant="link" className='unfaveB' onClick={() => dispatch(removeFavourite(country.name.common))}>
                            <FaHeart />
                        </Button>
                    ) : (
                        <Button variant="link" className='faveB' onClick={() => dispatch(addFavourite(country.name.common))}>
                            <FaRegHeart />
                        </Button>
                    )}
                </Card.Body>
            </Card>
        </Col>
    )
}

export default CountryCard
