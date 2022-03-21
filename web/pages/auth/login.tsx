import React from "react";
import Logo from "../../components/Logo";
import { Field, Form, Formik } from "formik";
import FormikField from "../../components/FormikField";
import * as Yup from "yup";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <Logo />
      <Formik
        initialValues={{
          email: "",
          password: "",
          firstName: "",
        }}
        onSubmit={(values) => {
          alert(values.email);
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <Form>
            <div className="flex flex-col items-center gap-1">
              <FormikField name="firstName" type="text" required={true}>
                First Name
              </FormikField>
              <FormikField name="email" type="email" required={true}>
                Email
              </FormikField>
              <FormikField name="password" type="password" required={true}>
                Password
              </FormikField>
              <button className="mt-3 btn-primary">Create Account</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
