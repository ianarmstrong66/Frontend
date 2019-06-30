import React, { Component } from 'react';
import './App.css';
import FeatureContainer from './Component/FeatureContainer';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            featureName: "",
            enabledDisabled: "",
            appID: ""
        }
    };

    render() {
        return (
            <div className="App">
                <FeatureContainer />
            </div>
        );
    }
}

export default App;
