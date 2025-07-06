document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("bookings-table-body");
  const modal = document.getElementById("bookings-modal");
  const form = document.getElementById("bookings-form");
  const closeBtn = document.getElementById("close-modal");
  const addBtn = document.getElementById("add-booking-btn");
  const BASE_URL = "http://localhost/wamp64_projects/Cinema";
  const hamburger = document.getElementById('hamburger');
const sidebar = document.querySelector('.sidebar');

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('show');
  document.body.classList.toggle('sidebar-open');
});


  
  loadBookings();

  
  addBtn.addEventListener("click", () => {
    openModal(); 
  });

  
  closeBtn.onclick = () => modal.classList.add("hidden");

  
  form.onsubmit = async (e) => {
    e.preventDefault();

    const id = form.elements.id.value.trim();
    const BookingData = {
      user_id: form.elements.user_id.value.trim(),
      showtime_id: form.elements.showtime_id.value.trim(),
      total_price: form.elements.total_price.value.trim(),
      status: form.elements.status.value.trim(),
    };

    if (id) {
      BookingData.id = parseInt(id, 10);
    }

    const url = id
      ? `${BASE_URL}/Update_Booking`
      : `${BASE_URL}/Create_Booking`;

    try {
      const res = await axios.post(
        url,
        { data: BookingData },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status === 200) {
        alert("Booking saved successfully!");
        modal.classList.add("hidden");
        loadBookings();
      } else {
        throw new Error(res.data.message || "Save failed");
      }
    } catch (err) {
      alert("Error: " + err.message);
      console.error("Save error:", err);
    }
  };

  
  async function loadBookings() {
    try {
      const res = await axios.get(`${BASE_URL}/All_Bookings`);
      const data = res.data.payload || [];

      body.innerHTML = "";
      data.forEach((booking) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${booking.id}</td>
          <td>${booking.user_id}</td>
          <td>${booking.showtime_id}</td>
          <td>${booking.total_price}</td>
          <td>${booking.status}</td>
          <td>
            <button class="edit-btn" data-id="${booking.id}">Edit</button>
            <button class="delete-btn" data-id="${booking.id}">Delete</button>
          </td>
        `;
        body.appendChild(row);
      });

      attachListeners();
    } catch (err) {
      console.error("Failed to load bookings:", err);
    }
  }

  
  function attachListeners() {
    
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        try {
          const res = await axios.get(`${BASE_URL}/Booking?id=${id}`);
          if (res.data && res.data.payload) {
            openModal(res.data.payload);
          } else {
            alert("Failed to load booking data for editing");
          }
        } catch (err) {
          console.error("Edit error:", err);
          alert("Error loading booking data");
        }
      });
    });

    
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this booking?")) {
          try {
            const res = await axios.post(
              `${BASE_URL}/Delete_Booking`,
              { id: parseInt(id, 10) },
              { headers: { "Content-Type": "application/json" } }
            );
            if (res.data.status === 200) {
              alert("booking deleted successfully!");
              loadBookings();
            } else {
              throw new Error(res.data.message || "Delete failed");
            }
          } catch (err) {
            console.error("Delete error:", err);
            alert("Delete failed: " + err.message);
          }
        }
      });
    });
  }


  window.openModal = function (booking = {}) {
    modal.classList.remove("hidden");
    form.reset();

    form.elements.id.value = booking.id || "";
    form.elements.user_id.value = booking.user_id || "";
    form.elements.showtime_id.value = booking.showtime_id || "";
    form.elements.total_price.value = booking.total_price || "";
    form.elements.status.value = booking.status || "";
  };
});
