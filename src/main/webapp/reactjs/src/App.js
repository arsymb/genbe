import React from 'react';
import './App.css';

import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavigationBar from './components/fragment/NavigationBar';
import Welcome from './components/home/Welcome';
import Footer from './components/fragment/Footer';
import PersonRoute from './components/form/PersonRoute';
// import PersonTable from './components/table/PersonTable';
import PersonTable2 from './components/table/PersonTable2';
import PersonTable3 from './components/table/PersonTable3';
import Pendidikan from './components/form/Pendidikan';

function App() {
  const margin = {
    marginTop: "30px",
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
              <Route path="/biodata" exact component={PersonRoute}/>
              <Route path="/data" exact component={PersonTable3}/>
              <Route path="/edit/:idPerson" exact component={PersonRoute}/>
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
