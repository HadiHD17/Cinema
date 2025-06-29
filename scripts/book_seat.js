document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const showtimeId = params.get('showtime_id');
  const userId = params.get('user_id');
  const seatGrid = document.getElementById('seats-grid');

  if (!showtimeId || !userId) {
    seatGrid.innerHTML = '<p>Missing required parameters.</p>';
    return;
  }

  try {
    const res = await axios.get(`http://localhost/wamp64_projects/Cinema/controllers/get_seats.php?showtime_id=${showtimeId}`);
    const seats = res.data.seats;

    if (!seats.length) {
      seatGrid.innerHTML = '<p>No seats found.</p>';
      return;
    }

    const seatsByRow = {};

// Group seats by row (first char of seat_label)
seats.forEach(seat => {
  const row = seat.seat_label.charAt(0).toUpperCase();
  if (!seatsByRow[row]) seatsByRow[row] = [];
  seatsByRow[row].push(seat);
});

// Sort seats within each row by the numeric part of seat_label
for (const row in seatsByRow) {
  seatsByRow[row].sort((a, b) => {
    const aNum = parseInt(a.seat_label.slice(1)) || 0;
    const bNum = parseInt(b.seat_label.slice(1)) || 0;
    return aNum - bNum;
  });
}

// Build HTML for seating layout
let html = '<div class="screen">Screen</div>';
for (const row in seatsByRow) {
  html += `<div class="seat-row"><span class="row-label">${row}</span>`;
  seatsByRow[row].forEach(seat => {
    const statusClass = seat.status === 'booked' ? 'seat-booked' : 'seat-available';
    const disabled = seat.status === 'booked' ? 'disabled' : '';
    html += `
      <button class="seat ${statusClass}" ${disabled} onclick="confirmBooking('${seat.seat_label}', ${seat.id})">
        ${seat.seat_label}
      </button>
    `;
  });
  html += '</div>';
}

seatGrid.innerHTML = html;


    // Optional legend
    seatGrid.innerHTML += `
      <div class="seat-legend">
        <span class="seat seat-available"></span> Available
        <span class="seat seat-booked"></span> Booked
      </div>
    `;

  } catch (error) {
    console.error(error);
    seatGrid.innerHTML = '<p>Error loading seats.</p>';
  }

  window.confirmBooking = async function (seatLabel, seatId) {
  if (!confirm(`Book seat ${seatLabel}?`)) return;

  try {
    await axios.post('http://localhost/wamp64_projects/Cinema/controllers/post_bookings.php', {
      user_id: userId,
      showtime_id: showtimeId,
      seat_id: seatId
    });

    alert('Seat booked successfully!');

    // Update the booked seat button UI immediately
    const seatButtons = document.querySelectorAll('.seat');
    seatButtons.forEach(button => {
      if (button.textContent.trim() === seatLabel) {
        button.classList.remove('seat-available');
        button.classList.add('seat-booked');
        button.setAttribute('disabled', 'disabled');
        button.onclick = null;
      }
    });

    // Redirect to movies after 2 seconds
    setTimeout(() => {
      window.location.href = 'dashboard.html?user_id=' + userId; // Adjust path if needed
    }, 2000);

  } catch (err) {
    console.error(err);
    alert('Booking failed.');
  }
};
});
