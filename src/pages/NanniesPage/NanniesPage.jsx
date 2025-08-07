import { getAuth, onAuthStateChanged } from "firebase/auth";
import { get, ref } from "firebase/database";
import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header/Header.jsx";
import NanniesList from "../../components/NanniesList/NanniesList.jsx";
import { db } from "../../firebase.js";
import Select from "react-select/base";
import s from './NanniesPage.module.css';
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader.jsx";

const onPage = 3;
const sortOptions = [
    { value: 'name-asc', label: 'A to Z' },
    { value: 'name-desc', label: 'Z to A' },
    { value: 'price-asc', label: 'Low price' },
    { value: 'price-desc', label: 'High price' },
    { value: 'rating-desc', label: 'Popular' },
    { value: 'rating-asc', label: 'Not popular' },
    { value: 'id-asc', label: 'Show all' },
];

const sortEntries = (entries, sortOption) => {
    if (sortOption === 'id-asc') return entries;

    const [sortFieldRaw, sortDirection] = sortOption.split('-');
    const sortField = sortFieldRaw === 'price' ? 'price_per_hour' : sortFieldRaw;

    return entries.sort((a, b) => {
        if (sortField === 'name') {
            return sortDirection === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        }

        const aVal = Number(a[sortField]) || 0;
        const bVal = Number(b[sortField]) || 0;

        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });
};

const NanniesPage = () => {
    const [allData, setAllData] = useState([]);
    const [page, setPage] = useState(1);
    const [sortOption, setSortOption] = useState('id-asc');
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAllData = async () => {
        try {
            setError(null);
            const snapshot = await get(ref(db, 'nanny-finder'));
            const data = snapshot.val();

            if (data) {
                let entries = Object.entries(data).map(([id, value]) => ({
                    id,
                    ...value,
                }));

                return sortEntries(entries, sortOption);
            }

            return [];
        } catch (err) {
            toast.error('Failed to load data');
            setError('Failed to load data');
            return [];
        }
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });

        const load = async () => {
            setIsLoading(true);
            const data = await fetchAllData();
            setAllData(data);
            setPage(1);
            setIsLoading(false);
        };

        load();
        return () => unsubscribe();
    }, [sortOption]);

    const paginatedData = useMemo(() => {
        return allData.slice(0, page * onPage);
    }, [allData, page]);

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    return (
        <div>
            <Header />
            <div className={s.pageContent}>
                <div className={s.filtersBox}>
                    <label htmlFor="sort-select" className={s.filtersLabel}>
                        Filters
                    </label>
                    <Select
                        inputId="sort-select"
                        options={sortOptions}
                        value={sortOptions.find((option) => option.value === sortOption)}
                        onChange={(selected) => setSortOption(selected.value)}
                        // styles={customSelectStyles}
                    />
                </div>

                {isLoading ? (
                    <div className={s.loaderWrapper}>
                        <Loader />
                    </div>
                ) : (
                    <>
                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <NanniesList nannies={paginatedData} user={user} />

                        {paginatedData.length < allData.length && (
                            <button onClick={handleLoadMore} className={s.loadMoreBtn}>
                                Load more
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default NanniesPage;