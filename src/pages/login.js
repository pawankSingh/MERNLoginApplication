import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';

export default class Login extends Component {

    state = {
        email: '',
        password: '',
        redirect: false,
        authError: false,
        isLoading: false,
        location: {},
    };

    handleEmailChange = event => {
        this.setState({email: event.target.value});
    };
    handlePwdChange = event => {
        this.setState({password: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const url = 'http://localhost:8000/login';
        const email = this.state.email;
        const password = this.state.password;

        axios.post(url, {email ,password})
            .then(result => {
                console.log(result)
                if (result.status) {
                    localStorage.setItem('token', result.data.token);
                    localStorage.setItem('user', result.data.name);
                    this.setState({redirect: true, isLoading: false});
                    localStorage.setItem('isLoggedIn', true);
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({authError: true, isLoading: false});
            });
    };

    componentDidMount() {

    }

    renderRedirect = () => {
        const name =localStorage.getItem('user');

        if (this.state.redirect || (localStorage.getItem('user') &&  localStorage.getItem('token'))) {
            return <Redirect to='/dashboard'/>
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Login</div>

                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input className={"form-control " + (this.state.authError ? 'is-invalid' : '')} id="inputEmail" placeholder="Email address" type="text" name="email" onChange={this.handleEmailChange} autoFocus required/>
                                    <label htmlFor="inputEmail">Email address</label>
                                    <div className="invalid-feedback">
                                        Please provide a valid Email.
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="password" className={"form-control " + (this.state.authError ? 'is-invalid' : '')} id="inputPassword" placeholder="******" name="password" onChange={this.handlePwdChange} required/>
                                    <label htmlFor="inputPassword">Password</label>
                                    <div className="invalid-feedback">
                                        Please provide a valid Password.
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Login &nbsp;&nbsp;&nbsp;
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <span></span>
                                    )}
                                </button>
                            </div>
                          {/*  <div className="form-group">
                                <div className="form-group">
                                    <b>email:</b> gowthaman.nkl1@gmail.com
                                </div>
                                <div className="form-group">
                                    <b>password :</b> password
                                </div>
                            </div>*/}
                        </form>
                        <div className="text-center">
                            <Link className="d-block small mt-3" to={'register'}>Register an Account</Link>
                        </div>
                    </div>
                </div>
                {this.renderRedirect()}
            </div>
        );
    }
}


