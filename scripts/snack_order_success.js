document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const back = document.getElementById('back-btn');
  const userId = params.get('id');
  const bookingId = params.get('booking_id');

  back.addEventListener('click', () => {

    window.location.href = `../pages/dashboard.html?id=${userId}&booking_id=${bookingId}`;
  });
});
