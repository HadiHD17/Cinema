document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("seats-table-body");
  const modal = document.getElementById("seats-modal");
  const form = document.getElementById("seats-form");
  const closeBtn = document.getElementById("close-modal");
  const addBtn = document.getElementById("add-seat-btn"); 
  const BASE_URL = "http://localhost/wamp64_projects/Cinema";
  const hamburger = document.getElementById('hamburger');
const sidebar = document.querySelector('.sidebar');

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('show');
  document.body.classList.toggle('sidebar-open');
});


  
  loadSeats();

  
  addBtn.addEventListener("click", () => {
    openModal(); 
  });

  
  closeBtn.onclick = () => modal.classList.add("hidden");

  
  form.onsubmit = async (e) => {
    e.preventDefault();

    const id = form.elements.id.value.trim();
    const SeatData = {
      showtime_id: form.elements.showtime_id.value.trim(),
      seat_label: form.elements.seat_label.value.trim(),
      status: form.elements.status.value.trim(),
    };

    if (id) {
      SeatData.id = parseInt(id, 10);
    }

    const url = id
      ? `${BASE_URL}/Update_Seat`
      : `${BASE_URL}/Create_Seat`;

    try {
      const res = await axios.post(
        url,
        { data: SeatData },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status === 200) {
        alert("Seat saved successfully!");
        modal.classList.add("hidden");
        loadSeats();
      } else {
        throw new Error(res.data.message || "Save failed");
      }
    } catch (err) {
      alert("Error: " + err.message);
      console.error("Save error:", err);
    }
  };

  
  async function loadSeats() {
    try {
      const res = await axios.get(`${BASE_URL}/All_Seats`);
      const data = res.data.payload || [];

      body.innerHTML = "";
      data.forEach((Seat) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${Seat.id}</td>
          <td>${Seat.showtime_id}</td>
          <td>${Seat.seat_label}</td>
          <td>${Seat.status}</td>
          <td>
            <button class="edit-btn" data-id="${Seat.id}">Edit</button>
            <button class="delete-btn" data-id="${Seat.id}">Delete</button>
          </td>
        `;
        body.appendChild(row);
      });

      attachListeners();
    } catch (err) {
      console.error("Failed to load seats:", err);
    }
  }

  
  function attachListeners() {
    
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        try {
          const res = await axios.get(`${BASE_URL}/Seat?id=${id}`);
          if (res.data && res.data.payload) {
            openModal(res.data.payload);
          } else {
            alert("Failed to load seat data for editing");
          }
        } catch (err) {
          console.error("Edit error:", err);
          alert("Error loading seat data");
        }
      });
    });

    
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this seat?")) {
          try {
            const res = await axios.post(
              `${BASE_URL}/Delete_Seat`,
              { id: parseInt(id, 10) },
              { headers: { "Content-Type": "application/json" } }
            );
            if (res.data.status === 200) {
              alert("seat deleted successfully!");
              loadSeats();
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


  window.openModal = function (seat = {}) {
    modal.classList.remove("hidden");
    form.reset();

    form.elements.id.value = seat.id || "";
    form.elements.showtime_id.value = seat.showtime_id || "";
    form.elements.seat_label.value = seat.seat_label || "";
    form.elements.status.value = seat.status || "";
  };
});
