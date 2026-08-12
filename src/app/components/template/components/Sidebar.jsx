import React from 'react';

import { useLocation } from 'react-router-dom';

import { SearchIcon, BrowseIcon, BookIcon } from './Icons.jsx';
import { ClearButton } from './Buttons.jsx';

import LinkWithTooltip from './LinkWithTooltip.jsx';

export const Sidebar = () => {

    const location = useLocation();
    const isActive = path => location.pathname.includes(path);

    return (
        <div className="sidebar-root">
            <LinkWithTooltip to="/book" content="Consulta il libro">
                <ClearButton isActive={isActive('book')}>
                    <BookIcon />
                </ClearButton>
            </LinkWithTooltip>

            <LinkWithTooltip to="/search" content="Cerca nel testo">
                <ClearButton isActive={isActive('search')}>
                    <SearchIcon />
                </ClearButton>
            </LinkWithTooltip>

            <LinkWithTooltip to="/browse" content="Sfoglia l'indice">
                <ClearButton isActive={isActive('browse')}>
                    <BrowseIcon />
                </ClearButton>
            </LinkWithTooltip>

            {/* <Link to="/pin">
                <ClearButton isActive={isActive('pin')}>
                    {pinnedDocuments.length > 0 && <span className="badge">{pinnedDocuments.length}</span>}
                    <PinIcon />
                </ClearButton>
            </Link> */}
        </div>
    );
};

export default Sidebar;
