import NanniesItem from "../NanniesItem/NanniesItem.jsx";
import s from './NanniesList.module.css';

const NanniesList = ({ nannies, user }) => {
    return (
        <ul className={s.list}>
            {nannies.map((nanny) => (
                <li key={nanny.id} className={s.item}>
                    <NanniesItem nanny={nanny} user={user} />
                </li>
            ))}
        </ul>
    );
};

export default NanniesList;