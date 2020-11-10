import React, { Fragment, Component } from "react";
import { Navbar, Container } from "react-bootstrap";
import ViewHome from "../../views/ViewHome/ViewHome";

class homeLayout extends Component {
  render(){
    return (
      <Fragment>
        <Container>
          <Navbar bg="dark" variant="dark" fixed="top">
            <Container>
              <Navbar.Brand>SOPES1 - PROYECTO 2</Navbar.Brand>
            </Container>
          </Navbar>
        </Container>
        <ViewHome/>
      </Fragment>
    );
  }
};

export default homeLayout;
