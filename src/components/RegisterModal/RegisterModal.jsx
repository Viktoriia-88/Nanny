import RegisterForm from '../RegisterForm/RegisterForm.jsx';
import s from './RegisterModal.module.css'
// import icons CloseIcon

const RegisterModal = ({ onClose }) => {
    return (
        <div className={s.regModal}>
            <button className={s.closeBtn} onClick={onClose}>
                {/* <img className={s.closeIcon} src={CloseIcon} alt="Close button" /> */}
            </button>
            <h2 className={s.title}>Registration</h2>
            <p className={s.text}>
                Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.
            </p>
            <RegisterForm onClose={onClose} />
        </div>
    );
};

export default RegisterModal;