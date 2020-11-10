import React, { Fragment } from "react";

import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationDataLabel,
  AccumulationTooltip,
  PieSeries,
} from "@syncfusion/ej2-react-charts";

class GraficaPie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: [
        { x: "Chrome", y: 37 },
        { x: "UC Browser", y: 17 },
        { x: "iPhone", y: 19 },
        { x: "Others", y: 4 },
        { x: "Opera", y: 11 },
      ],
    };
    
    this.datalabel = { visible: true, position: 'Inside', name: 'text' };
    this.tooltip = { enable: true };
    this.tooltipRender = (args) => {
      let value = args.point.y / args.series.sumOfPoints * 100;
      args.text = args.point.x + '' + Math.ceil(value) + '' + '%';
    };
  }

  componentDidMount(){
  }

  componentWillMount(){
    this.renderFormData();
  }

  renderFormData(){
      const data = this.props.data;
      let temp = []
      for(const array of data){
        temp.push({x:array[0],y:array[1]})
      }
      this.setState({...this.state,formData:temp})
  }

  render() {
    return (
      <Fragment>
        <AccumulationChartComponent
          id="charts"
          tooltip={this.tooltip}
          tooltipRender={this.tooltipRender}
        >
          <Inject
            services={[AccumulationTooltip, PieSeries, AccumulationDataLabel]}
          />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={this.state.formData}
              xName="x"
              yName="y"
              radius="100%"
              dataLabel={this.datalabel}
            ></AccumulationSeriesDirective>
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </Fragment>
    );
  }
}

export default GraficaPie;
