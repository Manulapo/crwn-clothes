import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
// import { UserContext } from "../contexts/user.context";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    // take all the formfield props and then i just update what i need with the handlechange
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password.length < 6) {
      alert("password must be of 6 caracthers long");
    }

    if (password !== confirmPassword) {
      alert("passwords are not matching");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      // DA RIVEDERE
      if (
        !user.displayName ? (user.displayName = displayName) : user.displayName
      )
        createUserDocumentFromAuth(user, displayName);

      resetFormFields();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Email already in use");
      }
      console.log("user creation encountered an error:", err.code);
    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="text"
          required
          name="displayName"
          onChange={handleChange}
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
        />

        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
}

export default SignUpForm;
