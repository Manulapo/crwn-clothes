import { Fragment, useState } from "react";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const logGoogleUser = async () => {
    await signInWithGooglePopup();
  };

  const handleChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("Incorrect password");
          break;

        case "auth/user-not-found":
          alert("No User Associated with this Email");
          break;

        case "auth/invalid-email":
          alert("Invalid Email");
          break;

        default:
          console.log(err);
          break;
      }
    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <Fragment>
      <div className="sign-up-container">
        <h2>I Already have an account?</h2>
        <span>Sign In with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Name"
            type="text"
            required
            name="email"
            onChange={handleChange}
            value={email}
          />

          <FormInput
            label="Password"
            type="password"
            required
            name="password"
            onChange={handleChange}
            value={password}
          />

          <div className="buttons-container">
            <Button type="submit">Sign In</Button>
            <Button type="button" buttonType={"google"} onClick={logGoogleUser}>
              Google Sign in
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default SignInForm;
