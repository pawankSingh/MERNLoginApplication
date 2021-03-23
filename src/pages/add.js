import React, {Component} from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';

export default class AddPage extends Component {

    state = {
        redirect: false,
        toDashboard: false,
        isLoading: false
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const token = localStorage.getItem('token');
        const url = 'http://localhost:8000/addEmp';
        const name = document.getElementById('inputName').value;
        const phone = document.getElementById('inputPhone').value;
        const email = document.getElementById('inputEmail').value;
        const company = document.getElementById('inputComp').value;


        axios.post(url, {name :name ,designation:phone ,country:email ,age:company})
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
        return (
            <div>
                <Header/>
                <div id="wrapper">
                    <div id="content-wrapper">

                        <div className="container-fluid">
                            <div className="card mx-auto">
                                <div className="card-header">Employee Add</div>
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
                                                        <input type="text" id="inputPhone" className="form-control" placeholder="Enter designation" required="required" />
                                                        <label htmlFor="inputPhone">Enter designation</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputEmail" className="form-control" placeholder="Email Country" required="required" />
                                                        <label htmlFor="inputEmail">Email Country</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="number" id="inputComp" className="form-control" placeholder="Enter Age" required="required"/>
                                                        <label htmlFor="inputComp">Enter Age</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Add Employee &nbsp;&nbsp;&nbsp;
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
