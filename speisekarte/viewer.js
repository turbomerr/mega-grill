const viewer = document.getElementById('menu-viewer');
const pages = Array.from(viewer.querySelectorAll('figure'));
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const status = document.getElementById('page-status');
let current = 0;
let frame;
function syncPage() {
 current = Math.max(0, Math.min(pages.length - 1, Math.round(viewer.scrollLeft / viewer.clientWidth)));
 status.textContent = `Seite ${current + 1} / ${pages.length}`;
 previous.disabled = current === 0;
 next.disabled = current === pages.length - 1;
}
function goTo(index) {
 current = Math.max(0, Math.min(pages.length - 1, index));
 viewer.scrollTo({left: current * viewer.clientWidth, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
}
previous.addEventListener('click', () => goTo(current - 1));
next.addEventListener('click', () => goTo(current + 1));
viewer.addEventListener('scroll', () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(syncPage); }, {passive:true});
viewer.addEventListener('keydown', event => {
 if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
 event.preventDefault();
 goTo(event.key === 'Home' ? 0 : event.key === 'End' ? pages.length - 1 : current + (event.key === 'ArrowRight' ? 1 : -1));
});
window.addEventListener('resize', () => { viewer.scrollTo({left:current * viewer.clientWidth,behavior:'instant'}); });
syncPage();
