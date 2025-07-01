document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const showtimeId = params.get('showtime_id');
  const userId = params.get('user_id');
  const seatGrid = document.getElementById('seats-grid');

  if (!showtimeId || !userId) {
    seatGrid.innerHTML = '<p>Missing required parameters.</p>';
    return;
  }

  let selectedSeats = [];

  try {
    const res = await axios.get(`http://localhost/wamp64_projects/Cinema/controllers/get_seats.php?showtime_id=${showtimeId}`);
    const allseats = res.data.seats;
    const seats=allseats.filter(seat=>seat.showtime_id==showtimeId);

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
          <button class="seat ${statusClass}" ${disabled} onclick="toggleSeatSelection('${seat.seat_label}', ${seat.id}, this)">
            ${seat.seat_label}
          </button>
        `;
      });
      html += '</div>';
    }

    // Add Confirm Booking button
    html += `
      <button id="confirm-booking-btn" style="margin-top: 20px; padding: 12px 20px; font-size: 16px; cursor: pointer;">
        Confirm Booking
      </button>
    `;

    // Add seat legend
    html += `
      <div class="seat-legend" style="margin-top: 15px; justify-content: center;">
        <span class="seat seat-available"></span> Available
        <span class="seat seat-booked"></span> Booked
        <span class="seat seat-selected" style="background-color:#d32f2f;"></span> Selected
      </div>
    `;

    seatGrid.innerHTML = html;

  } catch (error) {
    console.error(error);
    seatGrid.innerHTML = '<p>Error loading seats.</p>';
  }

  // Toggle seat selection function
  window.toggleSeatSelection = function(seatLabel, seatId, button) {
    if (button.classList.contains('seat-booked')) return; // Ignore booked seats

    const index = selectedSeats.findIndex(s => s.id === seatId);
    if (index > -1) {
      // Deselect seat
      selectedSeats.splice(index, 1);
      button.classList.remove('seat-selected');
      button.classList.add('seat-available');
    } else {
      // Select seat
      selectedSeats.push({ id: seatId, label: seatLabel });
      button.classList.remove('seat-available');
      button.classList.add('seat-selected');
    }
  };

  // Confirm booking button click handler
  seatGrid.addEventListener('click', async (e) => {
    if (e.target && e.target.id === 'confirm-booking-btn') {
      if (selectedSeats.length === 0) {
        alert('Please select at least one seat.');
        return;
      }

      if (!confirm(`Confirm booking seats: ${selectedSeats.map(s => s.label).join(', ')}?`)) {
        return;
      }

      try {
        // 1. Create booking (adjust total_price as needed)
        const bookingRes = await axios.post('http://localhost/wamp64_projects/Cinema/controllers/post_bookings.php', {
          action: "create",
          data: {
            user_id: userId,
            showtime_id: showtimeId,
            total_price: selectedSeats.length * 10, // Example price per seat
            status: "confirmed"
          }
        });

        const bookingId = bookingRes.data?.data?.id;
        if (!bookingId) throw new Error("Booking ID not returned");

        // 2. Book each seat
        for (const seat of selectedSeats) {
          await axios.post('http://localhost/wamp64_projects/Cinema/controllers/post_booking_seats.php', {
            booking_id: bookingId,
            seat_id: seat.id
          });
        }

        alert('Seats booked successfully!');

        // Update UI: mark seats booked & disable
        selectedSeats.forEach(seat => {
          const btns = document.querySelectorAll('.seat');
          btns.forEach(btn => {
            if (btn.textContent.trim() === seat.label) {
              btn.classList.remove('seat-available', 'seat-selected');
              btn.classList.add('seat-booked');
              btn.disabled = true;
              btn.onclick = null;
            }
          });
        });

        selectedSeats = [];

        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = `dashboard.html?id=${userId}`;
        }, 2000);

      } catch (err) {
        console.error(err);
        alert('Booking failed.');
      }
    }
  });
});
