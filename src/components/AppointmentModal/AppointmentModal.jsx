import AppointmentForm from '../AppointmentForm/AppointmentForm.jsx';
import s from './AppointmentModal.module.css';
// import icon


const AppointmentModal = ({ onClose, nanny }) => {
    const { name, avatar_url } = nanny;

    return (
        <div>
            <button className={s.closeBtn} onClick={onClose}>
                {/* <img src={CloseIcon} alt="Close button" className={s.closeIcon} /> */}
            </button>
            <h2 className={s.title}>Make an appointment with a babysitter</h2>
            <p className={s.text}>Arranging a meeting with a caregiver for your child is the first step to creating a safe and comfortable environment. Fill out the form below so we can match you with the perfect care partner.
            </p>
            <div className={css.nannyBox}>
                {/* <img src={avatar_url} alt={name} className={css.avatar} /> */}
                <div className={css.nannyInfo}>
                    <p className={s.nanny}>Your nanny</p>
                    <p className={s.name}>{name}</p>
                </div>
            </div>
            <AppointmentForm />
        </div>
    );
};

export default AppointmentModal;