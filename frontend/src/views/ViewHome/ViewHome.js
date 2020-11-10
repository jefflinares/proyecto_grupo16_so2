import React, { Fragment, useState } from "react";
import EstadisticasGenerales from "../../Components/EstadisticasGenerales/EstadisticasGenerales" ;

const Index = (props) => {
  const [key, setKey] = useState('procs');

  return (
    <Fragment>
      <br></br>
      <br></br>
      <EstadisticasGenerales/>
    </Fragment>
  );
};

export default Index;
