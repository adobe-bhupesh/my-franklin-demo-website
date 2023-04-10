export default async function decorate(block) {
    const resp = await fetch(`/teaser.plain.html`);
    if (resp.ok) {
        const html = await resp.text();
        const $teaserEl = document.createElement('div');
        $teaserEl.classList.add('test-teaser');
        $teaserEl.innerHTML = html;
        block.append($teaserEl);
    }
}
