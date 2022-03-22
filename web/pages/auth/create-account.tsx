import React from "react";
import Logo from "../../components/Logo";
import { Field, Form, Formik } from "formik";
import FormikField from "../../components/FormikField";
import * as Yup from "yup";
import FieldError from "../../components/FieldError";
import { useCreateAccountMutation } from "./../../src/generated/graphql";

const CreateAccountPage = () => {
  const [response, createAccount] = useCreateAccountMutation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <Logo />
      <Formik
        initialValues={{
          firstName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          const res = await createAccount({
            firstName: values.firstName,
            email: values.email.toLowerCase(),
            password: values.password,
          });

          alert(`${res.data?.CreateUser?.User?.firstName} has been created.`);
          resetForm();
        }}
        validationSchema={Yup.object({
          email: Yup.string().max(100).required("Email is required"),
          password: Yup.string()
            .required("Password is required")
            .min(8, "Password should be at least 8 characters long"),
          confirmPassword: Yup.string()
            .equals([Yup.ref("password")], "Password must match")
            .required("This field is required"),
          firstName: Yup.string().required("First name is required"),
        })}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <Form>
            <div className="flex flex-col items-center gap-1 w-60 ">
              <FormikField name="firstName" type="text">
                First Name
              </FormikField>
              {touched.firstName && errors.firstName ? (
                <FieldError>{errors.firstName}</FieldError>
              ) : null}
              <FormikField name="email" type="email">
                Email
              </FormikField>
              {touched.email && errors.email ? (
                <FieldError>{errors.email}</FieldError>
              ) : null}
              <FormikField name="password" type="password">
                Password
              </FormikField>
              {touched.password && errors.password ? (
                <FieldError>{errors.password}</FieldError>
              ) : null}
              <FormikField name="confirmPassword" type="password">
                Confirm Password
              </FormikField>
              {touched.confirmPassword && errors.confirmPassword ? (
                <FieldError>{errors.confirmPassword}</FieldError>
              ) : null}
              <button className="mt-3 btn-primary">Create Account</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateAccountPage;
