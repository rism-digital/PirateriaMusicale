import { Document } from 'flexsearch';

import records from '../../../dataset/fulltext.json';

const documents = records.map((record, id) => ({ id, ...record }));

const index = new Document({
    document: {
        id: 'id',
        index: [{ field: 'transcription', tokenize: 'full' }],
        store: ['ref', 'transcription']
    }
});

documents.forEach(document => index.add(document));

export const search = query => {
    const normalizedQuery = String(query || '').trim();

    if (!normalizedQuery) {
        return [];
    }

    const response = index.search(normalizedQuery, {
        index: 'transcription',
        enrich: true,
        limit: documents.length
    });

    return response.flatMap(group => group.result.map(result => result.doc));
};

export default { search };
