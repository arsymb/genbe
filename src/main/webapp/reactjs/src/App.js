import React from 'react';
import './App.css';

import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Person from './components/Person';
import PersonTable from './components/PersonTable';
import Pendidikan from './components/Pendidikan';

function App() {
  const margin = {
    marginTop: "80px",
    marginBottom: "50px"
  }

  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12} style={margin}>
            <Switch>
              <Route path="/" exact component={Welcome}/>
              <Route path="/biodata" exact component={Person}/>
              <Route path="/data" exact component={PersonTable}/>
              <Route path="/pendidikan" exact component={Pendidikan}/>
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
