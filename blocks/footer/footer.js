import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch footer content
  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const html = await resp.text();

    // decorate footer DOM
    const footer = document.createElement('div');
    footer.innerHTML = html;

    const tncResp = await fetch(`/tnc.plain.html`);
    if (tncResp.ok) {
      const tncHtml = await tncResp.text();
      const $tncEl = document.createElement('div');
      $tncEl.classList.add('tnc');
      $tncEl.innerHTML = tncHtml;
      footer.append($tncEl);
    }

    decorateIcons(footer);
    block.append(footer);
  }
}
