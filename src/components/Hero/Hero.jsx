import { NavLink } from "react-router-dom";
import s from "./Hero.module.css";
import CheckIcon from '../../assets/icons/check.svg';
import ArrowRight from "../../assets/icons/arrow-right.svg";
import ArrowUp from "../../assets/icons/arrow-up.svg";
import HeroImg from "../../assets/imgs/bg-img-2x.webp";
import { useState } from "react";

// import icons ArrowIcon

const Hero = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={s.hero}>
            <div className={s.textBox}>
                <h1 className={s.heroTitle}>Make Life Easier for the Family:</h1>
                <p className={s.heroText}>Find Babysitters Online for All Occasions</p>
                <NavLink
                    to="nannies"
                    className={s.link}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <p className={s.linkText}>Get started</p>
                    <img
                        src={isHovered ? ArrowRight : ArrowUp}
                        alt=""
                        width={isHovered ? "20" : "15"}
                    />
                </NavLink>
            </div>
            <img src={HeroImg} alt="img" className={s.heroImg} />
            <div className={s.infoBox}>
                <div className={s.box}>
                    <div className={s.iconBox}>
                        <img src={CheckIcon} alt="Check" className={s.checkIcon} />
                    </div>
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