document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("bookings-table-body");
  const modal = document.getElementById("bookings-modal");
  const form = document.getElementById("bookings-form");
  const closeBtn = document.getElementById("close-modal");

  axios.get("http://localhost/wamp64_projects/Cinema/controllers/get_bookings.php")
    .then(res => {
      const bookings = res.data.bookings;
      body.innerHTML = "";
      bookings.forEach(booking => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${booking.id}</td>
          <td>${booking.user_id}</td>
          <td>${booking.showtime_id}</td>
          <td>${booking.total_price}</td>
          <td>${booking.booking_time}</td>
          <td>${booking.status}</td>
          <td>
            <button class="edit-btn" data-id="${booking.id}">Edit</button>
            <button class="delete-btn" data-id="${booking.id}">Delete</button>
          </td>
        `;
        body.appendChild(row);
      });
      attachListeners();
    });

  function attachListeners() {
    document.querySelectorAll(".edit-btn").forEach(button => {
      button.addEventListener("click", () => {
        const tr = button.closest("tr").children;
        const booking = {
          id: tr[0].innerText,
          user_id: tr[1].innerText,
          showtime_id: tr[2].innerText,
          total_price: tr[3].innerText,
          booking_time: new Date(tr[4].innerText).toISOString().slice(0, 16),
          status: tr[5].innerText
        };
        openModal(booking);
      });
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        if (confirm("Delete this booking?")) {
          axios.post("http://localhost/wamp64_projects/Cinema/controllers/post_bookings.php", {
            action: "delete",
            id
          }).then(() => location.reload());
        }
      });
    });
  }

  window.openModal = function(booking = {}) {
    modal.classList.remove("hidden");
    form.id.value = booking.id || "";
    form.user_id.value = booking.user_id || "";
    form.showtime_id.value = booking.showtime_id || "";
    form.total_price.value = booking.total_price || "";
    form.booking_time.value = booking.booking_time || "";
    form.status.value = booking.status || "confirmed";
    form.setAttribute("data-mode", booking.id ? "edit" : "create");
  };

  closeBtn.onclick = () => modal.classList.add("hidden");

  form.onsubmit = (e) => {
    e.preventDefault();
    const mode = form.getAttribute("data-mode");

    const bookingData = {
      id: form.id.value,
      user_id: form.user_id.value,
      showtime_id: form.showtime_id.value,
      total_price: form.total_price.value,
      booking_time: form.booking_time.value,
      status: form.status.value,
      action: mode
    };

    axios.post("http://localhost/wamp64_projects/Cinema/controllers/post_bookings.php", bookingData)
      .then(() => {
        alert("Booking saved!");
        modal.classList.add("hidden");
        location.reload();
      });
  };
});
