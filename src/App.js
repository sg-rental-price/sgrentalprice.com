import React, { Component } from 'react';
import 'antd/dist/antd.css';
import ProjectSelector from './ProjectSelector'
import RentalData from './RentalData'
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      project: null,
      bedroom: [],
      range: [],
    };
  }

  onSelectProject = project => this.setState({ project })
  onSelectBedroom = bedroom => this.setState({ bedroom })
  onSelectRange = range => this.setState({ range })

  render() {
    return (
      <div className="app-container">
        <h1>Singapore Rental Price For Private Properties</h1>
        <b>Know what is the reasonable rental price based on past data</b>
        <br /><br />
        <ProjectSelector
          onProjectChange={this.onSelectProject}
          onBedroomChange={this.onSelectBedroom}
          onRangeChange={this.onSelectRange}
        />
        <br/>
        <RentalData
          project={this.state.project}
          bedroom={this.state.bedroom}
          range={this.state.range}
        />

        <div><i>Data from public data of www.ura.gov.sg, I do not own the data. Use it at your own risk - Phong Le</i></div>
      </div>
    );
  }
}

export default App;
