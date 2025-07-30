import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import s from './NanniesItem.module.css';
import MoreInfo from "../MoreInfo/MoreInfo.jsx";

const NanniesItem = ({ nanny, user }) => {
    const {
        name,
        avatar_url,
        birthday,
        experience,
        reviews,
        education,
        kids_age,
        price_per_hour,
        location,
        about,
        characters,
        rating,
    } = nanny;
    const [isFavorite, setIsFavorite] = useState(false);
    const [isMore, setIsMore] = useState(false);

    useEffect(() => {
        if (!user) {
            setIsFavorite(false);
            return;
        }

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.includes(id));
    }, [user, id]);

    const toggleFavorite = () => {
        if (!user) {
            toast('Sign in to use this option', {
                icon: <img src={AttentionIcon} width={18} alt="Attention!" />,
            });
            return;
        }

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isAlreadyFavorite = favorites.includes(id);
        const updatedFavorites = isAlreadyFavorite
            ? favorites.filter((favId) => favId !== id)
            : [...favorites, id];

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(!isAlreadyFavorite);
    };

    return (
        <>
            <div className={s.avatarBox}>
                <img src={avatar_url} alt={name} className={s.avatar} />
                {isOnline && (
                    <img src={OnlineIcon} alt="Online" className={s.onlineIcon} />
                )}
            </div>
            <div className={s.textBox}>
                <div className={s.cardHeader}>
                    <div className={s.nameBox}>
                        <p className={s.position}>Nanny</p>
                        <h3 className={s.name}>{name}</h3>
                    </div>
                    <ul className={s.filterInfo}>
                        <li className={s.filterItem}>
                            <img src={LocationIcon} alt="Star" className={s.locationIcon} />
                            {location}
                        </li>
                        <li className={s.filterItem}>
                            <img src={StarIcon} alt="Star" className={s.starIcon} />
                            Rating: {rating}
                        </li>
                        <li className={s.filterItem}>
                            Price / 1 hour: {price_per_hour}$
                        </li>
                    </ul>
                    <button onClick={toggleFavorite} className={s.heartBtn}>
                        {isFavorite ? (
                            <img
                                src={HeartActiveIcon}
                                alt="Favorite"
                                className={s.heartIcon}
                            />
                        ) : (
                            <img
                                src={HeartIcon}
                                alt="Not a favorite"
                                className={s.heartIcon}
                            />
                        )}
                    </button>
                </div>
                <ul className={s.mainInfoList}>
                    <li className={s.mainInfoItem}>
                        <p className={s.mainInfoText}>
                            Age: <span className={s.mainInfoSpan}>{birthday}</span>
                        </p>
                    </li>
                    <li className={s.mainInfoItem}>
                        <p className={s.mainInfoText}>
                            Experience: <span className={s.mainInfoSpan}>{experience}</span>
                        </p>
                    </li>
                    <li className={s.mainInfoItem}>
                        <p className={s.mainInfoText}>
                            Kids Age: <span className={s.mainInfoSpan}>{kids_age}</span>
                        </p>
                    </li>
                    <li className={s.mainInfoItem}>
                        <p className={s.mainInfoText}>
                            Characters:{' '}
                            <span className={s.mainInfoSpan}>{characters}</span>
                        </p>
                    </li>
                    <li className={s.mainInfoItem}>
                        <p className={s.mainInfoText}>
                            Education:{' '}
                            <span className={s.mainInfoSpan}>{education}</span>
                        </p>
                    </li>
                </ul>
                <p className={s.about}>{about}</p>
                {isMore ? (
                    <MoreInfo nanny={nanny} />
                ) : (
                    <button onClick={() => setIsMore(true)} className={s.moreInfoBtn}>
                        Read more
                    </button>
                )}
            </div>
        </>
    );
};

export default NanniesItem;