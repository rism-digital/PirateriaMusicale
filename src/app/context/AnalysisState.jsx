import React, { useState } from 'react';

import { useStateWithSession } from '../service/serviceStorage';

import AnalysisContext from './analysisContext';

const SESSION_PREFIX = 'AnalysisState';

const AnalysisState = props => {

    const [isContextBarVisible, setContextBarVisibility] = useStateWithSession(false, 'isContextBarVisible', SESSION_PREFIX);

    const [activeChapter, setActiveChapter] = useState(0);

    const toggleContextBar = () => setContextBarVisibility(!isContextBarVisible);

    return (
        <AnalysisContext.Provider
            value={{
                isContextBarVisible,
                toggleContextBar,
                activeChapter, setActiveChapter
            }}
        >
            {props.children}
        </AnalysisContext.Provider>
    );
};

export default AnalysisState;
