import React, { useState } from 'react';
import { Col, Container, FloatingLabel, Form, Row, Card, ListGroup } from 'react-bootstrap';

type Data = {
  Country: string;
  Version: string;
  Text: string;
};

const dataArray: Data[] = [
  { Country: 'Spain', Version: '1.0', Text: 'Lorem ipsum dolor sit amet' },
  { Country: 'Germany', Version: '2.0', Text: 'Consectetur adipiscing elit' },
  { Country: 'France', Version: '1.0', Text: 'Sed do eiusmod tempor incididunt' },
  { Country: 'Italy', Version: '3.0', Text: 'Ut labore et dolore magna aliqua' },
  { Country: 'Japan', Version: '2.0', Text: 'Ut enim ad minim veniam' },
  { Country: 'Portugal', Version: '5.0', Text: 'Ut enim ad minim veniam' },
];

const Buscador: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [versionFilter, setVersionFilter] = useState('');

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleCountryFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryFilter(e.target.value);
  };

  const handleVersionFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVersionFilter(e.target.value);
  };

  const filteredData = dataArray.filter(data => {
    const countryMatch = countryFilter === '' || data.Country === countryFilter;
    const versionMatch = versionFilter === '' || data.Version === versionFilter;
    const textMatch = data.Text.toLowerCase().includes(searchText.toLowerCase());
    return countryMatch && versionMatch && textMatch;
  });

  function filterVersions(): string[] {
    const versions: { [key: string]: Data } = {};

    for (const data of dataArray) {
      if (!(data.Version in versions)) {
        versions[data.Version] = data;
      }
    }
    return Object.keys(versions);
  }
  const filteredVersion = filterVersions()

  function filterCountry(): string[] {
    const versions: { [key: string]: Data } = {};

    for (const data of dataArray) {
      if (!(data.Version in versions)) {
        versions[data.Country] = data;
      }
    }
    return Object.keys(versions);
  }
  const filteredCountry = filterCountry()
  

  return (
    <Container >
      <Row className="m-5">
          
          <Col sm={4}>
          <FloatingLabel controlId="floatingSelect" label="Paises">
            <Form.Select aria-label="Paises" value={countryFilter} onChange={handleCountryFilterChange}>
              <option value="">All Countries</option>
              {filteredCountry.map( (country: string) => {
                return <option value={country}>{country}</option>
              })}
            </Form.Select>
          </FloatingLabel>
          </Col>
      
        <Col sm={4}>
          <FloatingLabel controlId="floatingSelect" label="Versiones">
            <Form.Select aria-label="Versiones" value={versionFilter} onChange={handleVersionFilterChange}>
              <option value="">All Versions</option>
              {filteredVersion.map( (version: string) => {
                return <option value={version}>{version}</option>
              })}
            </Form.Select>
          </FloatingLabel>
          </Col >
      </Row>
      
      <Row className="m-5">
        <Form>
          <Col>
            <Form.Control type="text" value={searchText} onChange={handleSearchTextChange} placeholder="Busqueda" />
          </Col>
        </Form>
      </Row>

       <ListGroup className='ms-2 me-auto'  variant="flush" data-toggle="collapse">
           {filteredData.map((data, index) => (
            <ListGroup.Item >
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title> Documento {index}</Card.Title>
                  <Card.Text>
                    {data.Text} <br/> {data.Country} - {data.Version}
                  </Card.Text>
                </Card.Body>
              </Card>
            </ListGroup.Item>
        ))}
          </ListGroup>

      
    </Container>
  );
};

export default Buscador;