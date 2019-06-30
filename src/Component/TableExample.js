import React, { Component } from 'react';
import FeaturesService from '../service/GetFeaturesService';
// Import React Table;
// import ReactTable from "react-table";
// import "react-table/react-table.css";
// Import Hamoni Syncimport Hamoni from "hamoni-sync";

const divStyle = {
    marginBottom: '7px'
};

class ManagementComponent extends Component {

    // this.onTableChange = this.onTableChange.bind(this);
    // this.onColumnChange = this.onColumnChange.bind(this);
    // this.renderTableHeaders = this.renderTableHeaders.bind(this);
    // this.renderTableBody = this.renderTableBody.bind(this);
    // this.getColumnList = this.getColumnList.bind(this);
    // this.getData = this.getData.bind(this);

    // state = {
    //     tableData: []
    // };

    componentDidMount = async () => { //could use WillMount
        // await FeaturesService.executeGetService()
        //     .then((response) => {
        //         return response.data;
        //     })
        //     .then(data => {
        //         let AppsFromApi = [];
        //         var id;
        //         var display;
        //         for (let i = 0; i < Object.entries(data).length; i++){
        //             [id,display] = Object.entries(data)[i];
        //             id = parseInt(id);
        //             AppsFromApi.push({id,display});
        //         }
        //         console.log(AppsFromApi );
        //
        //         this.setState({ appList: [{id:'', display: 'Select an application'}].concat(AppsFromApi) });
        //     })
        //     .catch(error => console.log(error.response));

        // Object.assign(axios.defaults, {headers: {authorization: this.state.auth}});
        // axios.get(`${this.props.baseUrl}`)
        await FeaturesService.executeGetService(1)
            .then(res => {
                return res.data;
            })
            .then(data => {
                console.log("Before assigning tabledata " + data);
                const tableData = data;
                console.log("After assigning tabledata " + tableData);
                this.setState({ tableData });
                console.log("Data returned " + this.state.tableData);
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

    // getColumnList(selectedTable) {
    //     if (!selectedTable) {
    //         selectedTable = this.state.selectedTable;
    //     }
    //     Object.assign(axios.defaults, {headers: {authorization: this.state.auth}});
    //     axios.get(`${this.props.baseUrl}/${selectedTable}/$metadata?@json`)
    //         .then(res => {
    //             let columns = res.data.items[0]["odata:cname"];
    //             this.setState({
    //                 columns,
    //                 selectedColumns: [],
    //             });
    //         })
    //         .catch(error => {
    //             if (error.response) {
    //                 alert('Code: ' + error.response.data.error.code +
    //                     '\r\nMessage: ' + error.response.data.error.message);
    //             } else {
    //                 console.log('Error', error.message);
    //             }
    //         });
    // }

    handleChange = event => {
        if (event.target.name === "featureName")
            this.setState({ featureName: event.target.value });
        if (event.target.name === "enabledDisabled")
            this.setState({ enabledDisabled: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();


    };

    renderEditable = cellInfo => {
        return (
            <div style={{ backgroundColor: "#fafafa" }} contentEditable suppressContentEditableWarning
                 onBlur={e => {
                     const data = [...this.state.tableData];
                     data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                     this.setState({ tableData });
                 }}
                 dangerouslySetInnerHTML={{ __html: this.state.tableData[cellInfo.index][cellInfo.column.id] }}      />
        );
    };

    renderTable() {
        return (
            <table>
                {/*<thead>*/}
                {/*{ this.renderTableHeaders() }*/}
                {/*</thead>*/}
                { this.renderTableBody() }
            </table>
        );
    }

    // renderTableHeaders() {
    //     let headers = [];
    //     for (let i = 0; i < this.state.selectedColumns.length; i++) {
    //         let col = this.state.selectedColumns[i];
    //         headers.push(<th key={col} style={{backgroundColor: '#177CB8',
    //             color: 'white',
    //             border: '1px solid grey',
    //             borderCollapse: 'collapse',
    //             padding: '5px'}}>{col}</th>)
    //     }
    //     return (<tr>{headers}</tr>);
    //     }
    //
    // renderTableBody(_row, rowIndex) =>  {
    //     const {rows} = this.props;
    //     this.state.tableData.forEach(function(row) {
    //         rows.push(
    //             <tr key={btoa('row' + rows.length)}>
    //                 {this.state.selectedColumns.map(col =>
    //                 <td key={col} style={{border: '1px solid grey',
    //                     borderCollapse: 'collapse',
    //                     padding: '5px'}}>{row}</td>
    //                 )}
    //             </tr>
    //         )
    // }.bind(this));
    //     return (<tbody>{rows}</tbody>)
    //     })

    render() {
        const { tableData } = this.state;
        return (<div>
            <h1>Feature Management</h1>
            <br/>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Add new record</h3>
                        <label>              FirstName:
                            <input type="text" name="firstName"  value={this.state.firstName} onChange={this.handleChange}  />
                        </label>
                        {" "}
                        <label> LastName:
                            <input type="text"  name="lastName" value={this.state.lastName} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Add" />
                    </form>
                </p>
                <div>
                    <ReactTable data={data}   columns={[
                        { Header: "Feature Name", accessor: "featureName",  Cell: this.renderEditable },
                        { Header: "Enabled",  accessor: "enabledDisabled",  Cell: this.renderEditable }]}  />
                    defaultPageSize={10}
                    className="-striped -highlight"  />
                </div>
            </div>    );  }}

            )
            }
            }

            // this.state = {
            //     tableData: [],
            //     featureName: "",
            //     enabledDisabled: "",
            //     appID: ""

            {/*    <form className="form-group" onSubmit={this.handleSubmit}>*/}
        {/*    /!* <div>*!/*/}

        {/*    /!*     <ul className = "list-group">*!/*/}
        {/*    /!*         {this.state.features.map(feature => <li className = "list-group-item" key={feature.id}>Todo: {feature.todoName} <button*!/*/}
        {/*    /!*             className="btn btn-danger float-right"onClick={() => {*!/*/}
        {/*    /!*            this.deleteTodo(feature.id)}}>x</button></li>)}*!/*/}
        {/*    /!*    </ul>*!/*/}
        {/*    /!*</div>*!/*/}
        {/*    /!*this.state.selectedTable }] Data</button> : null }*!/*/}
        {/*    <br/>*/}
        {/*    <div className="float-right">*/}
        {/*        {this.state.tableData.length > 0 ? this.renderTable() : null}*/}
        {/*    </div>*/}
        {/*    <br/>*/}
        {/*    <button style={divStyle} className="btn btn-success" type="submit">Add</button>*/}
        {/*</form>*/}
            // </div>

            export default ManagementComponent