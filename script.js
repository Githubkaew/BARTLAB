document.querySelectorAll('.announcement-card').forEach(card => {
    card.addEventListener('click', () => {
      const posterId = card.dataset.posterId;
      window.location.href = `page2.html?poster=${posterId}`;
    });
  });
