import React, { useEffect, useState } from "react";
import { FcApproval } from "react-icons/fc";

export const FormValidation = () => {
   const initialValues = { name: "", email: "", password: "" };
   const [formValues, setFormValues] = useState(initialValues);
   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validation(formValues));
      setIsSubmit(true);
   };

   useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
         console.log(formValues);
      }
   }, [formErrors]);

   const validation = (values) => {
      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.name) {
         errors.name = "Name is required";
      }
      if (!values.email) {
         errors.email = "mail is required";
      } else if (!regex.test(values.email)) {
         errors.email = "This is not a valid email format!";
      }
      if (!values.password) {
         errors.password = "password is required";
      } else if (values.password.length < 4) {
         errors.password = "Password must be more than 4 characters";
      } else if (values.password.length > 10) {
         errors.password = "Password cannot exceed more than 10 characters";
      }
      return errors;
   };

   return (
      <div className="app-container">
         {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div className="message-success">
               {" "}
               <FcApproval /> Signed in successfully
            </div>
         ) : (
            <p></p>
         )}
         <br />
         <div className="create-user">
            <header className="text-center">Register Form</header>
            <div className="d-flex  justify-content-center">
               <form onSubmit={handleSubmit}>
                  <div className=" input-field">
                     <label>Name</label>
                     <input
                        type="text"
                        name="name"
                        placeholder="Enter Your Name"
                        value={formValues.name}
                        onChange={handleChange}
                     />
                     <p className="err-field">{formErrors.name}</p>
                  </div>

                  <div className=" input-field">
                     <label>Email</label>
                     <input
                        type="text"
                        name="email"
                        placeholder="Enter Your Email"
                        value={formValues.email}
                        onChange={handleChange}
                     />
                     <p className="err-field">{formErrors.email}</p>
                  </div>

                  <div className=" input-field">
                     <label>Password</label>
                     <input
                        type="password"
                        name="password"
                        placeholder="Enter Your Password"
                        value={formValues.password}
                        onChange={handleChange}
                     />
                     <p className="err-field">{formErrors.password}</p>
                  </div>

                  <button className="btn btn-primary w-100">Submit</button>
               </form>
            </div>
         </div>
      </div>
   );
};
