import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// import { MyTextInput } from '../components/MyTextInput';
// import { MySelect } from '../components/MySelect';
// import { MyCheckbox } from '../components/MyCheckbox';
import { MyCheckbox, MyTextInput, MySelect } from '../components';

export const FormikAbstractation = () => {

    return (
        <div>
            <h1>Formik Abstractation</h1>

            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    terms: false,
                    jobType: '',
                }}
                onSubmit={(values) => {
                    console.log(values);
                }}
                validationSchema={ Yup.object({
                    firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
                    lastName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
                    email: Yup.string().email('Invalid email address').required('Required'),
                    terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
                    jobType: Yup.string().notOneOf(['it-jr'], 'This option is not allowed').required('Required'),
                })}
            >
                {
                    formik => (
                        <Form noValidate>
                            <MyTextInput 
                                name="firstName"
                                label="First Name"
                                placeholder="Pablo"
                            />

                            <MyTextInput 
                                name="lastName"
                                label="Last Name"
                                placeholder="Ibarra"
                            />
                            
                            <MyTextInput 
                                type="email"
                                name="email"
                                label="Email Address"
                                placeholder="pablo@hotmail.com"
                            />
                            
                            <MySelect label="Job Type" name="jobType">
                                <option value="" selected disabled>--Select a job type--</option>
                                <option value="developer">Developer</option>
                                <option value="designer">Designer</option>
                                <option value="it-senior">IT Senior</option>
                                <option value="it-jr">IT Jr</option>
                            </MySelect>

                            <MyCheckbox label="Terms & Conditions" name="terms" />

                            <input type="submit" value="Submit" />
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}
