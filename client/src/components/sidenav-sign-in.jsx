import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/auth-action";
import MyButton from "./button";
import FormField from "./form-field";
import { update, generateData, isFormValid } from "../utils/helper/form-action";
// import Loading from "../../components/loading/loading";

const SignIn = () => {
   const dispatch = useDispatch();
   const [formField, setFormField] = useState({
      formError: false,
      formSuccess: false,
      formData: {
         email: {
            element: "input",
            value: "",
            showlabel: true,
            config: {
               label: "Email:",
               name: "email_input",
               type: "email",
               placeholder: "Enter your email",
            },
            validation: {
               required: true,
               email: true,
            },
            valid: false,
            touched: false,
            validationMessage: "",
         },
         password: {
            element: "input",
            value: "",
            showlabel: true,
            config: {
               label: "Password:",
               name: "password_input",
               type: "password",
               placeholder: "Enter your password",
               autoComplete: "on",
            },
            validation: {
               required: true,
            },
            valid: false,
            touched: false,
            validationMessage: "",
         },
      },
   });

   const updateForm = (element) => {
      const newFormData = update(element, formField.formData, "login");
      setFormField({
         formError: false,
         formData: newFormData,
      });
   };
   const submitForm = (e) => {
      e.preventDefault();
      let dataToSubmit = generateData(formField.formData, "login");
      let formIsValid = isFormValid(formField.formData, "login");
      // setErrors(true)

      if (formIsValid) {
         dispatch(login(dataToSubmit));
      } else {
         setFormField({ ...formField, formError: true });
      }
   };

   return (
      <div className='authWrapper'>
         <h2>Sign in</h2>
         <span>Sign in with your email and password</span>
         <form onSubmit={(e) => submitForm(e)}>
            <FormField
               id={"email"}
               formData={formField.formData.email}
               change={(element) => updateForm(element)}
            />
            <FormField
               id={"password"}
               formData={formField.formData.password}
               change={(element) => updateForm(element)}
            />

            <MyButton
               runAction={(e) => submitForm(e)}
               type='submit'
               title='Sign In'
               value='Submit'
            />
         </form>

         {formField.formError ? (
            <div className='error_label'>Please check your data</div>
         ) : null}
      </div>
   );
};

export default SignIn;