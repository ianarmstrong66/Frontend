import React, { Component } from 'react';
import FeaturesService from '../service/GetFeaturesService';
import Switch from "react-switch";
// import ReactTable from "react-table";
// import JsonTable from "react-json-table";
// import "react-table/react-table.css";
// import Hamoni from "hamoni-sync";

const divStyle = {
    marginBottom: '7px'
};

class ManagementComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            retrievedData: [],
            featureName: "",
            enabledDisabled: "",
            appID: "",
            checked : false,
            rows:[]
        }
    };

    componentDidMount = async () => { //could use WillMount
         await FeaturesService.executeGetService(1)
            .then(res => {
                 return res.data;
            })
            .then(data => {
                // console.log("Before assigning tabledata " +  data);
                // console.log("1 " + featuresFromApi2 + "Data length: " + featuresFromApi2.length );
                // var id;                // var name;                // var enabled;                // var tname;                // var appID;
                var processData = [];

                for (let i = 0; i < Object.entries(data).length; i++){
                    processData.push(JSON.stringify(Object.values(data)[i]));
                }
                processData = Object.values(processData);
                // console.log("Pull " + processData);
                this.setState({ retrievedData: (processData) });
                // console.log("state: " + this.state.retrievedData + " length: "+ this.state.retrievedData.length);
            })
            .catch(function (error) {
                if (error.response) {
                    alert('Code: ' + error.response.data.error.code +
                        '\r\nMessage: ' + error.response.data.error.message);
                } else {
                    console.log('Error', error.message);
                }
            });
    };

    handleChange = event => {
        if (event.target.name === "featureName")
            this.setState({ featureName: event.target.value });
        if (event.target.name === "enabledDisabled")
                this.setState({ enabledDisabled: event.target.value });
    };

    // handleSubmit = event => {    this.listPrimitive.push({        firstName: this.state.firstName,        lastName: this.state.lastName    });
    // this.setState({ firstName: "", lastName: "" });
    // event.preventDefault();
    // };

    handleSubmit = event => {
        event.preventDefault();
    };

    handleToggleChange(checked){
        this.setState({checked});
    };

    columns () {
        return [
            {key: 'nameV', label: 'Feature Name'},
            {key: 'InUseZ', label: 'Enabled'},
            {key: 'color', label: 'Color', cell: (obj, key) => {
                    return <span>{ obj[key] }</span>;
                }}
        ];
    };


    renderEditable = cellInfo => {
        return (
            <div style={{ backgroundColor: "#eafafa" }} contentEditable suppressContentEditableWarning
                 onBlur={e => {
                    var data = [...this.state.retrievedData];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ data });
                 }}
                dangerouslySetInnerHTML={{ __html: this.state.retrievedData[cellInfo.index][cellInfo.column.id] }}      />
                );
    };

    renderToggle(checkData) {
        // console.log("Rendering Table toggle");
        return (
            <label htmlFor="normal-switch">
                <Switch
                onChange={this.handleToggleChange}
                checked={checkData}
                id="normal-switch"
                />
            </label>
            );
    }

    renderRow() {
        // console.log("Rendering Table Row");
        var rows = [];
        var derivedHTMLForRow = "";

        for (var i = 0; i < this.state.retrievedData.length; i++){

            var featureLine = JSON.parse(this.state.retrievedData[i]);
            const {feature, nameV, InUseZ} = featureLine;
            rows.push({"id":feature, "featureName":nameV, "enabled":InUseZ});
            derivedHTMLForRow += <tr key={ rows[i].id}>
                <td> feature</td>
                <td>{this.renderToggle(rows[i].enabled)} </td>
            </tr>;
        };
        return(
            derivedHTMLForRow
            );
    }

    renderTableBody() {
        // console.log("Rendering Table Body");
        return (
            <tbody>
            {this.renderRow()}
            </tbody>
        )
    }
    renderTableHeader() {
        // JSON.stringify(Object.values(data)[i]));
        // console.log("Before: " + Object.entries(this.state.retrievedData)[0]);
        // let header = {"row":Object.entries(this.state.retrievedData)[0]};
        // let header2 = JSON.parse((header));
        //
        // console.log("Header: " + header + " header2 " + header2);
        // return header.map((key, index) => {
        //     return <th key={index}>{key.toUpperCase()}</th>
        // })
        return (
            <tr>
                <th key="FeatureName">FEATURE NAME</th>
                <th key = "enabled" > Enabled </th>
            </tr>
        )
    }

    renderTable() {
        let featureRow = Object.values(this.state.retrievedData);
        return featureRow.map((featurex, index) => {
            const { feature, nameV, InUseZ } = JSON.parse(featurex); //destructuring
            // console.log("Extracts: "+ feature + " and " + nameV + " and " + InUseZ + " and " + featurex);
            return (
                <tr key={feature}>
                    <td>{nameV} </td>
                    <td>{this.renderToggle(InUseZ)}</td>
                </tr>
            )
        })
    };

    render() {
        return (
        // if (this.state.retrievedData !== null){  Put in to give option to add a feature
            <div>
                <br />
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Feature Management</h1>
                    </header>
                        <form onSubmit={this.handleSubmit}>
                            <h3>Add new record</h3><br />
                            <label>              Feature Name:
                                <input type="text" name="featureName"  value={this.state.featureName} onChange={this.handleChange}  />
                            </label>
                            {" "}
                            <label> Enabled:
                                <input type="toggle"  name="Enabled" value={this.state.enabledDisabled} onChange={this.handleChange} />
                            </label>
                            <br />
                            <input type="submit" value="Add" />
                            <br />
                        </form>
                    <div>
                        <table id={'featuresTable'}>
                            <tbody>
                                {this.renderTableHeader()}
                                {this.renderTable()}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button style={divStyle} className="btn btn-success" type="submit">Save</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ManagementComponent