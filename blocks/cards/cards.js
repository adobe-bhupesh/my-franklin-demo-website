import { createOptimizedPicture, fetchPlaceholders } from '../../scripts/lib-franklin.js';
import { convertStringToCamelCase } from '../../scripts/util.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    [...li.children].forEach(async (div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image'
      } else {
        const placeholders = await fetchPlaceholders('');
        let currentVal = div.children[0].firstChild.innerText;
        currentVal = convertStringToCamelCase(currentVal);
        div.children[0].firstChild.innerText = placeholders[currentVal];
        div.className = 'cards-card-body'
      };
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
