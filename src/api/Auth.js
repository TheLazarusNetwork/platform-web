/* eslint-disable require-jsdoc */

import { config } from "./config";

import { Appwrite } from "appwrite";
const appwrite = new Appwrite();
const location = process.env.REACT_APP_HOST_URL;

appwrite.setEndpoint(config.endpoint).setProject(config.projectId);

class Auth {
  constructor() {
    this.sdk = appwrite;
    this.authenticated = this.checkAuthenticated();
  }

  async signup(email, password, name) {
    let promise = this.sdk.account.create(email, password, name);
    return promise.then(
      function (response) {
        return response;
      },
      function (error) {
        console.log(error); // Failure
        return null;
      }
    );

  }

  login(email, password) {
    let promise = this.sdk.account.createSession(email, password);
    return promise.then(
      function (response) {
        return response;
      },
      function (error) {
        return null;
      }
    );
  }

  google() {
    let promise = this.sdk.account.createOAuth2Session(
      "google",
      location +"/success",
      location +"/failure"
    );

    // promise.then(
    //   function (response) {
    //     console.log(response); // Success
    //   },
    //   function (error) {
    //     console.log(error); // Failure
    //   }
    // );
  }

  logout() {
    let promise = this.sdk.account.deleteSession("current");

    promise.then(
      function (response) {
        localStorage.removeItem("auth_state");
        window.location = location + "/signup"; //redirect to signup page after user logs out
        console.log(response); // Success
      },
      function (error) {
        console.log("AUTH", error);
        console.log(error); // Failure
      }
    );
  }

  checkAuthenticated() {
    const promise = this.sdk.account.getSessions();
    return promise.then(
      function (response) {
        localStorage.setItem("auth_state", 1);
        console.log(response);
        return response;
      },
      function (error) {
        localStorage.removeItem("auth_state");
        return null;
      }
    );
  }

  setAuthenticated(val) {
    this.authenticated = val;
  }
  getAuthenticated() {
    return this.checkAuthenticated();
  }
  checkLogin() {
    this.sdk.account.get().then(
      function (response) {
        console.log(response);
        window.location = location + "/dash/";
      },
      function (error) {
        console.log(error);
      }
    );
  }

  sendVerificationEmail(url) {
    let promise = this.sdk.account.createVerification(url);
    return promise.then(
      function (response) {
        return response;
      },
      function (error) {
        return null;
      }
    );
  }

  updateVerification(userId, secret) {
    let promise = this.sdk.account.updateVerification(userId, secret);

    promise.then(
      function (response) {
        console.log(response); // Success
        window.location = location + "/success";
      },
      function (error) {
        console.log(error); // Failure
        window.location = location + "/failure";
      }
    );
  }

  createRecovery(email, url)
  {
    let promise = this.sdk.account.createRecovery(email, url);
    promise.then(
      function (response){
        console.log(response);
      },
      function (error){
        console.log(error)
      }
    )
  }

  updateRecovery(userId, secret, password)
  {
     let promise = this.sdk.account.updateRecovery(userId,secret,password,password);
     promise.then(
      function (response) {
        console.log(response); // Success
        window.location = location + "/success";
      },
      function (error) {
        console.log(error); // Failure
        window.location = location + "/failure";
      }
    );
  }


  createJWT() {
    let promise = this.sdk.account.createJWT();
    return promise.then(
      function (response) {
        return response;
      },
      function (e) {
        return e;
      }
    );
  }
}

export default Auth;
