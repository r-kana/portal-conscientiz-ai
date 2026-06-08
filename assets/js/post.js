const starRating = document.querySelector('.star-rating');
const ratingValue = document.getElementById('rating-value');

document.addEventListener("DOMContentLoaded", () => {
  ratingValue.textContent = document.querySelector('.star-rating input:checked').value;

  starRating.addEventListener('change', (e) => { ratingValue.textContent = e.target.value; });
  document.querySelectorAll('.star-rating:not(.readonly) label')
  .forEach(star => {
    star.addEventListener('click', function() {
      this.style.transform = 'scale(1.2)';
      setTimeout(() => this.style.transform = 'scale(1)', 200);
    });
  });
});