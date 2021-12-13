import { Formik, Form } from 'formik';
import { MySelect, MyTextInput } from '../components';
import formJson from '../data/custom-form.json';
import * as Yup from 'yup';

export const DynamicForm = () => {

    const initialValues: { [x: string]: any } = {};
    const requiredFields: { [x: string]: any } = {};

    for (const input of formJson) {
        initialValues[input.name] = input.value;

        if( !input.validations ) continue;

        let schema = Yup.string();

        for (const rule of input.validations) {
          if( rule.type === 'required' ) {
            schema = schema.required('Required');
          }

          if( rule.type === 'minLength' ) {
            schema = schema.min((rule as any).value || 2, `Minimum length is ${(rule as any).value || 2}`);
          }

          if ( rule.type === 'email' ) {
            schema = schema.email('Invalid email');
          }

          requiredFields[input.name] = schema;
        }
    }

    const validationSchema = Yup.object({ ...requiredFields });

    return (
        <div>
            <h1>Dynamic Form</h1>

            <Formik
                initialValues={ initialValues }
                validationSchema={ validationSchema }
                onSubmit={ (values) => {
                    console.log(values);
                }}
            >
                { (formik) => (
                    <Form>
                        { formJson.map( ({ type, name, placeholder, label, options }) => {
                          if( type === 'text' || type === 'email' || type === 'password' ) {
                            return <MyTextInput 
                                key={ name }
                                type={ type as any }
                                name={ name }
                                label={ label }
                                placeholder={ placeholder }
                            />
                          } else if ( type === 'select' ) {
                            return <MySelect 
                              key={ name }
                              label={ label }
                              name={ name }
                            >
                              <option value="">Select</option>
                              {
                                options?.map( ({ id, label }) => (
                                  <option key={ id } value={ id }>{ label }</option>
                                ))
                              }
                            </MySelect>
                          }

                          throw new Error(`El type: ${ type } no es soportado`)
                        })}

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
