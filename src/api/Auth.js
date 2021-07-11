import { config } from "./config";
import { createClient } from "@supabase/supabase-js";

const supabsekey = config.supabaseKey;
const supabaseUrl = config.supabaseURL
const supabase = createClient(
  supabaseUrl,
  supabsekey
);

class Auth {
  constructor() {
    this.sdk = supabase;
    this.authenticated = this.checkAuthenticated();
  }

  async signup(useremail, userpassword) {
    const { user, session, error } = await this.sdk.auth.signUp(
      {
        email: useremail,
        password: userpassword,
      }
    );
    return { user, session, error };
  }

  async login(email, password) {
    const { user, session, error } = await this.sdk.auth.signIn({
      email,
      password,
    });
    console.log(user, session, error);
    return { user, session, error };
  }

  async google() {
    //google OAuth
    const { user, session, error } = await this.sdk.auth.signIn(
      {
        provider: "google",
      },
    );
    console.log(user, session, error);
    return { user, session, error };
  }

  logout() {
    // logout from current session and redirect to signup page

    const { error } = this.sdk.auth.signOut();
    if (!error) localStorage.removeItem("auth_state");
    return { error };
  }

  async checkAuthenticated() {
    // check if a session is currently active in current browser
    const session = await this.sdk.auth.session();
    console.log(session);
    if (session) {
      console.log("set auth state");
      localStorage.setItem("auth_state", 1);
    } else {
      localStorage.removeItem("auth_state");
    }
    return session;
  }

  setAuthenticated(val) {
    this.authenticated = val;
  }
  getAuthenticated() {
    return this.checkAuthenticated();
  }

  getAccount() {
    const user = this.sdk.auth.user();
    return user;
  }

  isSessionActive() {
    const session = this.sdk.auth.session();
    if(session)
    return true;
    else
    return false;
  }
  onAuthStateChange() {
    return this.sdk.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      if (session) localStorage.setItem("auth_state", 1);
    });
  }

  // sendVerificationEmail(url) {
  //   let promise = this.sdk.account.createVerification(url);
  //   return promise.then(
  //     function (response) {
  //       return response;
  //     },
  //     function (error) {
  //       return null;
  //     }
  //   );
  // }

  // updateVerification(userId, secret) {
  //   let promise = this.sdk.account.updateVerification(userId, secret);

  //   promise.then(
  //     function (response) {
  //       console.log(response); // Success
  //       window.location = location + "/success";
  //     },
  //     function (error) {
  //       console.log(error); // Failure
  //       window.location = location + "/failure";
  //     }
  //   );
  // }

  createRecovery(email, url) {
    // create Recovery for forgot password
    const { data, error } = this.sdk.auth.api.resetPasswordForEmail(email);
  }

  updateRecovery(access_token, password) {
    // updating new password
    const { data, error } = this.sdk.auth.api.updateUser(
      access_token,
      password
    );
    console.log(data,error)
    return { data, error };
  }

  // updatePassword(newpassword, currentpassword) {
  //   let promise = this.sdk.account.updatePassword(newpassword, currentpassword);
  //   return promise.then(
  //     function (response) {
  //       return response;
  //     },
  //     function (error) {
  //       return null;
  //     }
  //   );
  // }
  // updatename(name) {
  //   let promise = this.sdk.account.updateName(name);

  //   return promise.then(
  //     function (response) {
  //       console.log(response); // Success
  //       return response
  //     },
  //     function (error) {
  //       console.log(error); // Failure
  //       return null
  //     }
  //   );
  // }
  // updateemail(email, password) {
  //   let promise = this.sdk.account.updateEmail(email, password);

  //   promise.then(
  //     function (response) {
  //       console.log(response); // Success
  //     },
  //     function (error) {
  //       console.log(error); // Failure
  //     }
  //   );
  // }
  // createJWT() {
  //   let promise = this.sdk.account.createJWT();
  //   return promise.then(
  //     function (response) {
  //       return response;
  //     },
  //     function (e) {
  //       return e;
  //     }
  //   );
  // }
}

export default Auth;
