document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("seats-table-body");
  const modal = document.getElementById("seats-modal");
  const form = document.getElementById("seats-form");
  const closeBtn = document.getElementById("close-modal");
  const addBtn = document.getElementById("add-seat-btn"); 

 

  loadSeats();

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      
      openModal();
    });
  }

  closeBtn.onclick = () => modal.classList.add("hidden");

  form.onsubmit = async (e) => {
    e.preventDefault();
    const mode = form.getAttribute("data-mode");
    const seatData = {
  showtime_id: form.elements.showtime_id.value,
  seat_label: form.elements.seat_label.value,
  status: form.elements.status.value
};

if (mode === "update") {
  seatData.id = form.elements.id.value; 
}

    try {
      const response = await axios.post(
        "http://localhost/wamp64_projects/Cinema/controllers/post_seats.php",
        {
          action: mode,
          data: seatData
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      if (response.data.status === 200) {
        alert("Seat saved!");
        modal.classList.add("hidden");
        loadSeats();
      } else {
        console.error("❌ Server error:", response.data);
        alert("Failed to save seat: " + (response.data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("An error occurred while saving seat.");
    }
  };

  async function loadSeats() {
    try {
      const response = await axios.get("http://localhost/wamp64_projects/Cinema/controllers/get_seats.php");
      const data = response.data.seats || [];
      body.innerHTML = "";

      data.forEach(seat => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${seat.id}</td>
          <td>${seat.showtime_id}</td>
          <td>${seat.seat_label}</td>
          <td>${seat.status}</td>
          <td>
            <button class="edit-btn" data-id="${seat.id}">Edit</button>
            <button class="delete-btn" data-id="${seat.id}">Delete</button>
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
    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        try {
          const res = await axios.get(`http://localhost/wamp64_projects/Cinema/controllers/get_seats.php?id=${id}`);
          if (res.data && res.data.seats) {
            openModal(res.data.seats);
          } else {
            alert("Seat data not found.");
          }
        } catch (err) {
          console.error("Edit error:", err);
          alert("Failed to load seat data.");
        }
      });
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Delete this seat?")) {
          try {
            const res = await axios.post(
              "http://localhost/wamp64_projects/Cinema/controllers/post_seats.php",
              { action: "delete",  data:{id}  },
              { headers: { "Content-Type": "application/json" } }
            );
            if (res.data.status === 200) {
              loadSeats();
            } else {
              alert("Failed to delete seat: " + (res.data.message || "Unknown error"));
            }
          } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete seat.");
          }
        }
      });
    });
  }

  window.openModal = function(seat = {}) {
    modal.classList.remove("hidden");
    form.elements.id.value = seat.id || "";
    form.elements.showtime_id.value = seat.showtime_id || "";
    form.elements.seat_label.value = seat.seat_label || "";
    form.elements.status.value = seat.status || "available";
    form.setAttribute("data-mode", seat.id ? "update" : "create");
  };
});
