import { BeatLoader } from "react-spinners";
import s from './Loader.module.css'

const Loader = () => {
    return (
        <div className={s.loaderWrapper}>
            <BeatLoader size={60} color={'#103931'} />
        </div>
    );
};

export default Loader;