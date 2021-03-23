import React, { Component } from 'react';
import Header from "../elements/header";
import axios from 'axios';


export default class Dashboard extends Component {
    state = {
        userData: [],
    };
    componentDidMount() {
        this.setState({isLoading: true});
        const url = 'http://localhost:8000/userData';

        axios.get(url,)
            .then(result => {
                console.log(result)
                if (result.status) {
                    this.setState({userData : result.data});
                }
            })
            .catch(error => {
            });
    }
    editEmployee(id){
        this.props.history.push('/edit/'+id)
    }
    addEmployee(){
        this.props.history.push('/add')

    }
    render() {
        return (
            <div>
                <Header/>
                <div id="wrapper">
                    <div id="content-wrapper">
                        <div className="container-fluid">




                            <div className="card mb-3">

                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%"
                                               cellSpacing="0">
                                            <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Office</th>
                                                <th>Age</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            { this.state.userData && this.state.userData.map((user ,i)=> {
                                                return( <tr key={i}>
                                                    <td>{user.name}</td>
                                                    <td>{user.designation}</td>
                                                    <td>{user.country}</td>
                                                    <td>{user.age}</td>
                                                    <td><button className="btn btn-sm btn-primary" type="submit" onClick={()=>this.editEmployee(user.id)}>Edit Employee

                                                    </button></td>
                                                </tr>)
                                            })}

                                            </tbody>
                                        </table>
                                    </div>
                                    <button className="btn  btn-primary" type="submit" onClick={()=>this.addEmployee()}>Add Employee

                                    </button>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </div>

        );
    }
}
