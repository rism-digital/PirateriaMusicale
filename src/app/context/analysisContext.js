import { createContext } from 'react';

export default createContext({
    isContextBarVisible: true,
    toggleContextBar: () => {},
    activeChapter: 0,
    setActiveChapter: () => {}
});
