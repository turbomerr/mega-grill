(() => {
  const dialog = document.querySelector('#order-dialog');
  const close = () => dialog.close();
  document.querySelectorAll('.order-link').forEach(button => {
    button.addEventListener('click', () => {
      if (!dialog.open) dialog.showModal();
    });
  });
  document.querySelector('#close-order').addEventListener('click', close);
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right ||
        event.clientY < box.top || event.clientY > box.bottom) close();
  });
})();
