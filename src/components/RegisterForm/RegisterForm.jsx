import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../firebase.js";
import * as yup from 'yup';
import s from './RegisterForm.module.css';
import { ref, set } from "firebase/database";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";


const schema = yup.object().shape({
    name: yup
        .string()
        .min(2, 'Min 2 characters')
        .max(32, 'Max 32 characters')
        .required('Name is required'),
    email: yup
        .string()
        .email('Invalid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Min 6 characters')
        .required('Password is required'),
});

const RegisterForm = ({ onClose }) => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async ({ name, email, password }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            await set(ref(db, 'users/' + user.uid), {
                username: name,
                email,
            });

            toast.success('Welcome!');
            onClose();
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.errorBox}>
                <input
                    type="text"
                    {...register('name')}
                    placeholder="Name"
                    className={s.input}
                />
                {errors.name && <p className={s.error}>{errors.name.message}</p>}
            </div>

            <div className={s.errorBox}>
                <input
                    type="email"
                    {...register('email')}
                    placeholder="Email"
                    className={s.input}
                />
                {errors.email && <p className={s.error}>{errors.email.message}</p>}
            </div>

            <div className={s.errorBox}>
                <div className={s.passwordWrapper}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('password')}
                        placeholder="Password"
                        className={s.pwdInput}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className={s.eyeBtn}
                        aria-label="Toggle password visibility"
                    >
                        <img src={showPassword ? EyeOpen : EyeClose} alt=" Toggle visibility" className={s.eyeIcon} />
                    </button>
                </div>
                {errors.password && (
                    <p className={s.error}>{errors.password.message}</p>
                )}
            </div>

            <button type="submit" className={s.btnSubmit}>
                Sign Up
            </button>
        </form>
    );
};

export default RegisterForm;