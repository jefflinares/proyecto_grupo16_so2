import React, { Fragment } from "react";
import { Container } from "react-bootstrap";

function Layout(props) {
  return (
    <Fragment>
      <Container fluid>{props.children}</Container>
    </Fragment>
  );
}

export default Layout;
