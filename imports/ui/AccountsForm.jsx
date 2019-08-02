import React, { Component } from "react";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import "../api/users.js";

export default class AccountsForm extends Component {
  signUp = event => {
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
      name: event.target.name.value
    };

    Accounts.createUser(data, function(error) {
      if (Meteor.user()) {
        let userID = Meteor.userId();
        Meteor.call("users.updateName", userID, name);
        alert("User Added");
      } else {
        console.log("ERROR: " + error.reason);
      }
    });
  };

  signIn = event => {
    let email = event.target.email.value;
    let password = event.target.password.value;

    Meteor.loginWithPassword(email, password, function(error) {
      if (Meteor.user()) {
        console.log(JSON.stringify(Meteor.user(), null, 2));
        // alert(`Hey, Your User ID is: ${Meteor.userId()}`);
      } else {
        alert(error.reason);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <h1>Meteor User Accounts Example</h1>
        <h3>Sign Up Form</h3>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.signUp(event);
          }}
        >
          <label>
            Name
            <input
              type="text"
              name="name"
              style={{ marginLeft: 10, borderWidth: "1px" }}
            />
          </label>
          <br />
          <br />
          <label>
            Email
            <input
              type="text"
              name="email"
              style={{ marginLeft: 10, borderWidth: "1px" }}
            />
          </label>
          <br />
          <br />
          <label>
            Password
            <input
              type="text"
              name="password"
              style={{ marginLeft: 10, borderWidth: "1px" }}
            />
          </label>
          <br />
          <br />
          <input
            type="submit"
            value="Sign Up"
            style={{ marginLeft: 10, borderWidth: "1px" }}
          />
        </form>
        <br />
        <br />
        <h3>Sign In Form</h3>
        <form
          onSubmit={event => {
            // event.preventDefault();
            this.signIn(event);
          }}
        >
          <label>
            Email
            <input
              type="text"
              name="email"
              style={{ marginLeft: 10, borderWidth: "1px" }}
            />
          </label>
          <br />
          <br />
          <label>
            Password
            <input
              type="text"
              name="password"
              style={{ marginLeft: 10, borderWidth: "1px" }}
            />
          </label>
          <br />
          <br />
          <input
            type="submit"
            value="Sign In"
            style={{ marginLeft: 10, borderWidth: "1px" }}
          />
        </form>
        <h3>Current User Status</h3>
        {Meteor.userId() ? <h4>User Signed In</h4> : <h4>No User Signed In</h4>}
      </div>
    );
  }
}
