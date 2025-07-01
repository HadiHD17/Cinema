document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("bookings-table-body");
  const modal = document.getElementById("bookings-modal");
  const form = document.getElementById("bookings-form");
  const closeBtn = document.getElementById("close-modal");
  document.getElementById("add-booking-btn").addEventListener("click", () => {
  openModal(); 
});

  loadBookings();

  async function loadBookings() {
    try {
      body.innerHTML = "<tr><td colspan='7'>Loading bookings...</td></tr>";

      const response = await axios.get(
        "http://localhost/wamp64_projects/Cinema/controllers/get_bookings.php",
        {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          }
        }
      );

      if (!response.data || !response.data.bookings) {
        throw new Error("Invalid data format from server");
      }

      displayBookings(response.data.bookings);
    } catch (error) {
      console.error("Error loading bookings:", error);
      body.innerHTML = `
        <tr>
          <td colspan="7" class="error">
            Error loading data: ${error.message}
          </td>
        </tr>
      `;
    }
  }

  function displayBookings(bookings) {
    body.innerHTML = "";

    if (bookings.length === 0) {
      body.innerHTML = `
        <tr>
          <td colspan="7">No bookings found</td>
        </tr>
      `;
      return;
    }

    bookings.forEach(booking => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${booking.id || 'N/A'}</td>
        <td>${booking.user_id || 'N/A'}</td>
        <td>${booking.showtime_id || 'N/A'}</td>
        <td>${booking.total_price ? parseFloat(booking.total_price).toFixed(2) : '0.00'}</td>
        <td>${booking.booking_time ? formatDate(booking.booking_time) : 'N/A'}</td>
        <td>${booking.status || 'N/A'}</td>
        <td>
          <button class="edit-btn" data-id="${booking.id}">Edit</button>
          <button class="delete-btn" data-id="${booking.id}">Delete</button>
        </td>
      `;
      body.appendChild(row);
    });

    attachEventListeners();
  }

  function formatDate(dateString) {
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch {
      return dateString;
    }
  }

  function attachEventListeners() {
    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", handleEdit);
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", handleDelete);
    });
  }

  async function handleEdit(e) {
    const bookingId = e.target.getAttribute("data-id");
    try {
      const response = await axios.get(
        `http://localhost/wamp64_projects/Cinema/controllers/get_bookings.php?id=${bookingId}`
      );

      if (response.data && response.data.bookings ) {
        const booking = response.data.bookings;
        openModal(booking);
      }
    } catch (error) {
      console.error("Error fetching booking:", error);
      alert("Failed to load booking details");
    }
  }

  async function handleDelete(e) {
    const bookingId = e.target.getAttribute("data-id");
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      const response = await axios.post(
        "http://localhost/wamp64_projects/Cinema/controllers/post_bookings.php",
        {
          action: "delete",
          data: { id: bookingId }
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (response.data.status === 200) {
        alert("Booking deleted successfully");
        loadBookings();
      } else {
        throw new Error(response.data.message || "Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message);
    }
  }

  window.openModal = function (booking = {}) {
    modal.classList.remove("hidden");

    const bookingTime = booking.booking_time
      ? new Date(booking.booking_time).toISOString().slice(0, 16)
      : "";

    form.elements["id"].value = booking.id || "";
    form.elements["user_id"].value = booking.user_id || "";
    form.elements["showtime_id"].value = booking.showtime_id || "";
    form.elements["total_price"].value = booking.total_price || "";
    form.elements["booking_time"].value = bookingTime;
    form.elements["status"].value = booking.status || "confirmed";

    form.setAttribute("data-mode", booking.id ? "update" : "create");
  };

  closeBtn.onclick = () => modal.classList.add("hidden");

  form.onsubmit = async (e) => {
    e.preventDefault();

    const formData = {
  user_id: form.elements["user_id"].value,
  showtime_id: form.elements["showtime_id"].value,
  total_price: form.elements["total_price"].value,
  booking_time: form.elements["booking_time"].value,
  status: form.elements["status"].value
};

if (form.elements["id"].value) {
  formData.id = form.elements["id"].value;
}

    const mode = form.getAttribute("data-mode");
    const action = mode === "update" ? "update" : "create";

    try {
      const response = await axios.post(
        "http://localhost/wamp64_projects/Cinema/controllers/post_bookings.php",
        {
          action:mode,
          data: formData
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (response.data.status === 200) {
        alert(`Booking ${mode === "update" ? "updated" : "created"} successfully`);
        modal.classList.add("hidden");
        loadBookings();
      } else {
        throw new Error(response.data.message || "Operation failed");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert(`Error: ${error.message}`);
    }
  };
});