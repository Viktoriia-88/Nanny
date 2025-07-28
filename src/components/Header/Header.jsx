import { Link } from "react-router-dom";
import s from './Header.module.css'
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { get, ref } from "firebase/database";
import clsx from "clsx";
import ModalWrapper from "../ModalWrapper/ModalWrapper.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
// import icon UserIcon

const Header = () => {
    const [user, setUser] = useState(null);
    const [modal, setModal] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                try {
                    const snapshot = await get(ref(db, 'users/' + authUser.uid));
                    const userData = snapshot.val();

                    setUser({
                        uid: authUser.uid,
                        email: authUser.email,
                        name: userData?.username || 'User',
                    });
                } catch (error) {
                    console.error('Failed to load user data:', error);
                    setUser({
                        uid: authUser.uid,
                        email: authUser.email,
                        name: 'User',
                    });
                }
            } else {
                setUser(null);
            }
        });

        return unsubscribe;
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            toast.success('Successful logout');
        } catch (error) {
            toast.error('Something went wrong!');
        }
    };

    const renderModal = () => {
        if (modal === 'registration') {
            return (
                <ModalWrapper
                    component={<RegisterModal onClose={() => setModal(null)} />}
                    onClose={() => setModal(null)}
                />
            );
        }

        if (modal === 'login') {
            return (
                <ModalWrapper
                    component={<LoginModal onClose={() => setModal(null)} />}
                    onClose={() => setModal(null)}
                />
            );
        }

        return null;
    };

    return (
        <>
            <header className={s.header}>
                <Link to="/" className={clsx(s.logo)}>
                    Nanny.Services
                </Link>

                <Navigation user={user} />

                {user ? (
                    <div className={s.isUser}>
                        <div className={s.user}>
                            {/* <img src={UserIcon} alt="User" className={s.userIcon} /> */}
                            <p className={s.userName}>{user.name}</p>
                        </div>
                        <button className={s.logOutBtn} onClick={logout}>
                            Log out
                        </button>
                    </div>
                ) : (
                    <div className={s.notUser}>
                        <button className={s.logInBtn} onClick={() => setModal('login')}>
                            Log In
                        </button>
                        <button className={s.registerBtn} onClick={() => setModal('registration')}>
                            Registration
                        </button>
                    </div>
                )}
            </header>

            {renderModal()}
        </>
    );
};

export default Header;