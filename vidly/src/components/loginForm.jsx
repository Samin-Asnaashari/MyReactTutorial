import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";

class LoginForm extends Component {
  // Controlled Element
  state = {
    account: { username: "", password: "" },
    errors: {}
  };
  //   username = React.createRef();
  //   password = React.createRef();

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  componentDidMount() {
    // this.username.current.focus();
  }

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null;
    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;

    // const { account } = this.state;
    // if (account.username.trim() === "")
    //   errors.username = "Username is required!";
    // if (account.password.trim() === "")
    //   errors.password = "Password is required!";
    // return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = e => {
    e.preventDefault(); // this fix the issue of full page reload

    // Call server and redirect user
    // pure JavaScript: document.getElementById("").value();
    // this.username.current => gives the Dom element
    // const username = this.username.current.value;
    // const password = this.username.current.value;

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
  };

  validateProperty = ({ name, value }) => {
    // Computed property in ES6
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="Username"
            value={account.username}
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            label="Password"
            value={account.password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
