import { buildBlock } from './lib-franklin.js';

export function convertStringToCamelCase(sentence) {
    return sentence.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,
        function (camelCaseMatch, i) {
            if (+camelCaseMatch === 0)
                return "";
            return i === 0 ? camelCaseMatch.toLowerCase() :
                camelCaseMatch.toUpperCase();
        });
}

// export function loadHeader(header) {
//     const headerBlock = buildBlock('header', '');
//     header.append(headerBlock);
//     decorateBlock(headerBlock);
//     return loadBlock(headerBlock);
//   }

export function loadTeaser() {
    const teaserBlock = buildBlock('teaser', '');
}
