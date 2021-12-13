import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { MyTextInput } from '../components';

import '../styles/styles.css';

export const RegisterFormikPage = () => {

    return (
      <div>
        <h1>Register Formik Page</h1>

        <Formik
          initialValues={{
            name: '',
            email: '',
            password1: '',
            password2: '',
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
          validationSchema={
            Yup.object({
              name: Yup.string()
                .required('Required')
                .min(2, 'The name must be at least 2 characters long')
                .max(15, 'The name must be 15 characters or less'),
              email: Yup.string()
                .required('Required')
                .email('Invalid email address'),
              password1: Yup.string()
                .required('Required')
                .min(6, 'Password is too short - should be 6 chars minimum.'),
              password2: Yup.string()
                .required('Required')
                .oneOf([Yup.ref('password1'), null], 'Passwords must match.')
            })
          }
        >
          {
            ({ handleReset }) => (
              <Form>
                <MyTextInput
                  label="Name"
                  name="name"
                  placeholder="Pablo"
                />

                <MyTextInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="john@google.com"
                />

                <MyTextInput
                  label="Password"
                  name="password1"
                  type="password"
                  placeholder="******"
                />

                <MyTextInput
                  label="Repeat Password"
                  name="password2"
                  type="password"
                  placeholder="******"
                />

                <button type="submit">Create</button>
                <button type="button" onClick={ handleReset }>Reset</button>
              </Form>
            )
          }
        </Formik>
      </div>
    )
}
