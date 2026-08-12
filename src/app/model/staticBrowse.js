import data from '../../../dataset/index.json';

const getIndex = index => data.index.group.find(group => group.name === index);

export const browse = index => {
    const indexData = getIndex(index);

    if (!indexData) {
        return [];
    }

    return indexData.group.map(({ name, subtitle }) => ({
        name,
        ...(subtitle ? { subtitle } : {})
    }));
};

export const related = (index, name) => {
    const indexData = getIndex(index);
    const entry = indexData && indexData.group.find(group => group.name === name);

    if (!entry) {
        return [];
    }

    return entry.link || entry.group || [];
};

export default { browse, related };
