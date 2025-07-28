import LoginForm from '../LoginForm/LoginForm.jsx';
import s from './LoginModal.module.css';
// import icons CloseIcon

const LoginModal = ({ onClose }) => {
    return (
        <div className={s.logModal}>
            <button className={s.closeBtn} onClick={onClose}>
                {/* <img className={s.closeIcon} src={CloseIcon} alt="Close button" /> */}
            </button>
            <h2 className={s.title}>Log In</h2>
            <p className={s.text}>
                Welcome back! Please enter your credentials to access your account and continue your babysitter search.
            </p>
            <LoginForm onClose={onClose} />
        </div>
    );
};

export default LoginModal;