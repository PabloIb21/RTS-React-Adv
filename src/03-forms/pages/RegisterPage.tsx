import { FormEvent } from 'react';
import { useForm } from '../hooks/useForm';

import '../styles/styles.css';

export const RegisterPage = () => {

    const { 
        formData,
        name,
        email,
        password1,
        password2,
        onChange,
        resetForm,
        isValidEmail
    } = useForm({
        name: '',
        email: '',
        password1: '',
        password2: ''
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(formData);
    }

    return (
        <div>
            <h1>Register Page</h1>

            <form noValidate onSubmit={onSubmit}>
                <input 
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name} 
                    onChange={onChange}
                    className={ `${name.trim().length <= 0 && 'has-error'}` }
                />
                { name.trim().length <= 0 && <span>El nombre es obligatorio</span> }
                <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={onChange}
                    className={ `${!isValidEmail(email) && 'has-error'}` }
                />
                { !isValidEmail(email) && <span>Email no válido</span> }
                <input 
                    type="password"
                    name="password1"
                    placeholder="Password"
                    value={password1}
                    onChange={onChange}
                    className={ `${password1.trim().length <= 0 && 'has-error'}` }
                />
                { password1.trim().length <= 0 && <span>La contraseña es obligatoria</span> }
                { password1.trim().length < 6 && password1.trim().length > 0 && <span>La contraseña debe tener al menos 6 caracteres</span> }
                <input 
                    type="password"
                    name="password2"
                    placeholder="Repeat Password"
                    value={password2}
                    onChange={onChange}
                    className={ `${password1.trim().length <= 0 && 'has-error'}` }
                />
                { password2.trim().length <= 0 && <span>Repita la contraseña</span> }
                { password1 !== password2 && <span>Las contraseñas deben ser iguales</span> }
                <button type="submit">Create</button>
                <button type="button" onClick={ resetForm }>Reset</button>
            </form>
        </div>
    )
}
