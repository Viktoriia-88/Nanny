import { useNavigate } from "react-router-dom";
import s from "./Hero.module.css";
// import icons ArrowIcon + CheckIcon

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className={s.hero}>
            <div className={s.textBox}>
                <h1 className={s.heroTitle}>Make Life Easier for the Family:</h1>
                <p className={s.heroText}>Find Babysitters Online for All Occasions</p>
                <button className={s.heroBtn} onClick={() => navigate('/nannies')}>
                    Get started
                    {/* <img src={ArrowIcon} alt="arrow" className={s.btnIcon} /> */}
                </button>
            </div>
            <div className={s.heroImg}>
                <div className={s.infoBox}>
                    {/* <img src={CheckIcon} alt="Check" className={s.checkIcon} /> */}
                    <p className={s.infoText}>
                        Experienced nannies
                        <span className={s.infoSpan}>15,000</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Hero;