import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase.js";
import toast from "react-hot-toast";
import s from "./LoginForm.module.css";
import * as yup from "yup";
// import icons showPassword

const schema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Min 6 characters')
        .required('Password is required'),
});

const LoginForm = ({ onClose }) => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async ({ email, password }) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Welcome back!');
            onClose();
        } catch (error) {
            toast.error('Invalid email or password');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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
                        {/* <img src={showPassword ? EyeOpen : EyeClose} alt=" Toggle visibility" className={s.eyeIcon} /> */}
                    </button>
                </div>
                {errors.password && (
                    <p className={s.error}>{errors.password.message}</p>
                )}
            </div>

            <button type="submit" className={s.btnSubmit}>
                Log In
            </button>
        </form>
    );
};

export default LoginForm;