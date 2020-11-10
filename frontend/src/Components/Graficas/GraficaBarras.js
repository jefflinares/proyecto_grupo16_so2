import React, { Fragment } from "react";

import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  DataLabel,
  ColumnSeries,
  Selection,
} from "@syncfusion/ej2-react-charts";

class GraficaBarras extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      estadosCasos : ['Activo','Recuperado','Fallecido'],
      formData: [
        { departamento: "Petén", activo: 50, recuperado: 70, fallecido: 45 },
        { departamento: "Alta Verapaz", activo: 40, recuperado: 60, fallecido: 55 },
        { departamento: "Totonicapán", activo: 70, recuperado: 60, fallecido: 50 },
        { departamento: "El Progreso", activo: 60, recuperado: 56, fallecido: 40 },
        { departamento: "Jalapa", activo: 50, recuperado: 45, fallecido: 35 },
        { departamento: "Jutiapa", activo: 40, recuperado: 30, fallecido: 22 },
        { departamento: "Santa Rosa", activo: 40, recuperado: 35, fallecido: 37 },
        { departamento: "Quiché", activo: 30, recuperado: 25, fallecido: 27 },
      ],
    };

    this.primaryxAxis = {
      valueType: "Category",
      interval: 1,
      majorGridLines: { width: 0 },
    };
    this.primaryyAxis = {
      majorGridLines: { width: 0 },
      majorTickLines: { width: 0 },
      lineStyle: { width: 0 },
      labelStyle: { color: "transparent" },
    };
    this.marker = {
      dataLabel: {
        visible: true,
        position: "Top",
        font: { fontWeight: "600", color: "#ffffff" },
      },
    };
    this.tooltip = { enable: true };
    this.legendSettings = { position: "Top", alignment: "Near" };
  }

  componentDidMount(){
  }

  componentWillMount(){
    this.renderFormData();
  }

  renderFormData(){
      //map clave-departamento valor-conteo
      const data = this.props.data;
      const mapSort = new Map()
      const arrayEstados = []
      for (const caso of data){
        mapSort.set(caso.edad,new Map())
      }
      for(const caso of data){
        if(mapSort.get(caso.edad).has(caso.departamento)){
          mapSort.get(caso.edad).set(caso.departamento,mapSort.get(caso.edad).get(caso.departamento)+1)
        }else{
          mapSort.get(caso.edad).set(caso.departamento,1)
        }
        if(!arrayEstados.includes(caso.departamento)){
          arrayEstados.push(caso.departamento)
        }
      }
      //lista para cargar en la data
      let temp = []
      mapSort.forEach((value,key)=>{
          let est = Object.fromEntries(value)
          temp.push({edad:key,...est})
      })
      temp.sort((a, b) => (a.edad > b.edad) ? 1 : -1)
      this.setState({...this.state,formData:temp,estadosCasos:arrayEstados})
  }

  render() {
    return (
      <Fragment>
        <ChartComponent
          id="charts"
          primaryXAxis={this.primaryxAxis}
          primaryYAxis={this.primaryyAxis}
          legendSettings={this.legendSettings}
          enableAnimation={true}
          tooltip={this.tooltip}
        >
          <Inject
            services={[
              ColumnSeries,
              Legend,
              Tooltip,
              DataLabel,
              Category,
              Selection,
            ]}
          />
          <SeriesCollectionDirective>
            {
              this.state.estadosCasos.map((value, index) => (
                <SeriesDirective
                  key={index}
                  dataSource={this.state.formData}
                  xName="edad"
                  yName={value}
                  name={value}
                  type="Column"
                ></SeriesDirective>
              ))
            }
          </SeriesCollectionDirective>
        </ChartComponent>
      </Fragment>
    );
  }
}

export default GraficaBarras;
