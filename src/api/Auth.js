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
    return { user, session, error };
  }

  async google() {
    //google OAuth
    const { user, session, error } = await this.sdk.auth.signIn(
      {
        provider: "google",
      },
    );
    return { user, session, error };
  }

  async github() {
    const { user, session, error } = await this.sdk.auth.signIn(
      {
        provider: "github",
      },
    );

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

    if (session) {
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
      console.log(event);
      if (session) localStorage.setItem("auth_state", 1);
    });
  }

 

  createRecovery(email) {
    // create Recovery for forgot password
    const { data, error } = this.sdk.auth.api.resetPasswordForEmail(email, {redirectTo: "http://localhost:8000/#/updatepassword"});
  }

  // magicLinkSignIn (email){
  //   const 
  // }
  

  async updatePassword( password) {
    // updating new password
    const access_token = this.sdk.auth.session().access_token
    const { error,data } = await this.sdk.auth.api.updateUser(
      access_token,
   {   password}
    );
    return { data, error };
  }


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

 
}

export default Auth;
