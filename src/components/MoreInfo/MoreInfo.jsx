import { useState } from "react";
import ModalWrapper from "../ModalWrapper/ModalWrapper.jsx";
import AppointmentModal from "../AppointmentModal/AppointmentModal.jsx";
import s from './MoreInfo.module.css';
// import icon star

const MoreInfo = ({ nanny }) => {
    const {
        reviews,
        avatar_url,
        name
    } = nanny;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <ul className={s.reviewList}>
                {reviews.map((review, index) => (
                    <li key={index} className={s.reviewItem}>
                        <div className={s.reviewerBox}>
                            <p className={s.reviewerLogo}>{review.reviewer[0]}</p>
                            <div>
                                <p className={s.reviewerName}>{review.reviewer}</p>
                                <div className={s.ratingBox}>
                                    <img src={StarIcon} alt="Star" className={s.starIcon} />
                                    <p className={s.reviewerRating}>{review.rating}</p>
                                </div>
                            </div>
                        </div>
                        <p className={s.comment}>{review.comment}</p>
                    </li>
                ))}
            </ul>

            <button className={s.appointmentBtn} onClick={handleOpenModal}>
                Make an appointment
            </button>

            {isModalOpen && (
                <ModalWrapper
                    component={
                        <AppointmentModal
                            nanny={{ name, avatar_url }}
                            onClose={handleCloseModal}
                        />
                    }
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default MoreInfo;