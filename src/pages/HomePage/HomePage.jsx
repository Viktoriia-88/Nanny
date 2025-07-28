import Header from '../../components/Header/Header.jsx';
import Hero from '../../components/Hero/Hero.jsx';
import s from './HomePage.module.css'

const HomePage = () => {
    return (
        <div className={s.honePageBg}>
            <Header />
            <Hero />
        </div>
    );
};

export default HomePage;