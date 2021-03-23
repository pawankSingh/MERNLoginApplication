import React, { Component } from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";

export default class EditPage extends Component {

    constructor(props) {
        super(props);
        this.url = 'http://localhost:8000/getEmployee';
        this.token = localStorage.getItem('token');
    }

    state = {
        id: '',
        redirect: false,
        isLoading: false
    };

    componentDidMount() {
        const {match={} }= this.props;
        const {params =''} =match;
        this.setState({id:params})
        axios.get(this.url + '/'  + params, { params: { token: this.token}})
            .then(response => {
                const emp = response.data.employee;
                this.setState({id: emp.id });
                document.getElementById('inputName').value = emp.name;
                document.getElementById('inputPhone').value = emp.designation;
                document.getElementById('inputEmail').value = emp.country;
                document.getElementById('inputComp').value = emp.age;
            })
            .catch(error => {
                this.setState({ toDashboard: true });
                console.log(error);
            });
        
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const token = localStorage.getItem('token');
        const {match={} }= this.props;
        const {params =''} =match;
        const url = 'http://localhost:8000/updateEmployee/'+ params.id;
        const name = document.getElementById('inputName').value;
        const phone = document.getElementById('inputPhone').value;
        const email = document.getElementById('inputEmail').value;
        const company = document.getElementById('inputComp').value;
        axios.post(url, { name: name, phone: phone, email:email,  company:company, token:token })
            .then(result => {
                if (result.data.status) {
                    this.setState({redirect: true, isLoading: false})
                }
            })
            .catch(error => {
                this.setState({ toDashboard: true });
                console.log(error);
            });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/dashboard' />
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        if (this.state.toDashboard === true) {
            return <Redirect to='/' />
        }
        console.log(this.token)
        return (
            <div>
                <Header/>
                <div id="wrapper">
                    <div id="content-wrapper">

                        <div className="container-fluid">
                            <div className="card mx-auto">
                                <div className="card-header">Employee Edit</div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputName" className="form-control" placeholder="Enter name" required="required" autoFocus="autofocus" />
                                                        <label htmlFor="inputName">Enter name</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputPhone" className="form-control" placeholder="Enter Phone" required="required" />
                                                        <label htmlFor="inputPhone">Enter Designation</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputEmail" className="form-control" placeholder="Email address" required="required" />
                                                        <label htmlFor="inputEmail">Country</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputComp" className="form-control" placeholder="Enter Company" required="required"/>
                                                        <label htmlFor="inputComp">Enter Company</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Update Employee &nbsp;&nbsp;&nbsp;
                                            {isLoading ? (
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            ) : (
                                                <span></span>
                                            )}
                                        </button>
                                    </form>
                                    {this.renderRedirect()}
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        );
    }
}


