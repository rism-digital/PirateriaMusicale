import React, { useState } from 'react';
import { useStateWithSession } from '../service/serviceStorage';

import CurstomContext from './customContext';

const SESSION_PREFIX = 'FlorianBassani-CustomState';

const CustomState = props => {

    const [browseResults, setBrowseResults] = useState([], 'browseResults', SESSION_PREFIX);
    const [searchResults, setSearchResults] = useStateWithSession([], 'searchResults', SESSION_PREFIX);

    const [searchTerm, setSearchTerm] = useStateWithSession('', 'searchTerm', SESSION_PREFIX);
    const [highlightTerm, setHighlightTerm] = useStateWithSession('', 'highlightTerm', SESSION_PREFIX);

    const [loadingBrowse, setLoadingBrowse] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [loadingRelated, setLoadingRelated] = useState(false);

    const [browseError, setBrowseError] = useState(false);

    const [related, setRelated] = useState({});

    const loadRelated = ({ index, params }) => {
        const relatedKey = `${index}_${params.name}`;

        if (!related[relatedKey]) {
            setLoadingRelated({ index, params });
            import('../model/staticBrowse').then(({ related: getRelated }) => {
                setRelated(current => ({ ...current, [relatedKey]: getRelated(index, params.name) }));
            }).catch(error => {
                console.error('Unable to load the local browse index.', error);
                setBrowseError(true);
            }).finally(() => setLoadingRelated(false));
        }
    };

    const performBrowse = async index => {
        setLoadingBrowse(true);
        setBrowseError(false);
        try {
            const { browse } = await import('../model/staticBrowse');
            setBrowseResults(browse(index));
        } catch (error) {
            console.error('Unable to load the local browse index.', error);
            setBrowseResults([]);
            setBrowseError(true);
        } finally {
            setLoadingBrowse(false);
        }
    };

    const performSearch = async key => {
        setLoadingSearch(true);
        try {
            const { search } = await import('../model/staticSearch');
            setSearchResults(search(key));
        } catch (error) {
            console.error('Unable to load the local search index.', error);
            setSearchResults([]);
        } finally {
            setLoadingSearch(false);
        }
    };

    const resetSearch = (e) => {
        e && e.preventDefault();
        setSearchResults([]);
        setSearchTerm('');
    };
    return (
        <CurstomContext.Provider
            value={{
                performBrowse,
                browseResults,
                loadingBrowse,
                performSearch,
                searchResults,
                loadingSearch,
                related,
                loadRelated,
                loadingRelated,
                browseError,
                searchTerm, setSearchTerm,
                highlightTerm, setHighlightTerm,
                resetSearch
            }}
        >
            {props.children}
        </CurstomContext.Provider>
    );
};

export default CustomState;
