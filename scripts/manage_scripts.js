document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("seats-table-body");
  const modal = document.getElementById("seats-modal");
  const form = document.getElementById("seats-form");
  const closeBtn = document.getElementById("close-modal");

  axios.get("http://localhost/wamp64_projects/Cinema/controllers/get_seats.php")
    .then(res => {
      const data = res.data.seats;
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
    });

  function attachListeners() {
    document.querySelectorAll(".edit-btn").forEach(button => {
      button.addEventListener("click", () => {
        const tr = button.closest("tr").children;
        const seat = {
          id: tr[0].innerText,
          showtime_id: tr[1].innerText,
          seat_label: tr[2].innerText,
          status: tr[3].innerText
        };
        openModal(seat);
      });
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        if (confirm("Delete this seat?")) {
          axios.post("http://localhost/wamp64_projects/Cinema/controllers/post_seats.php", {
            action: "delete",
            id
          }).then(() => location.reload());
        }
      });
    });
  }

  window.openModal = function(seat = {}) {
    modal.classList.remove("hidden");
    form.id.value = seat.id || "";
    form.showtime_id.value = seat.showtime_id || "";
    form.seat_label.value = seat.seat_label || "";
    form.status.value = seat.status || "available";
    form.setAttribute("data-mode", seat.id ? "edit" : "create");
  };

  closeBtn.onclick = () => modal.classList.add("hidden");

  form.onsubmit = (e) => {
    e.preventDefault();
    const mode = form.getAttribute("data-mode");
    const seatData = {
      id: form.id.value,
      showtime_id: form.showtime_id.value,
      seat_label: form.seat_label.value,
      status: form.status.value,
      action: mode
    };

    axios.post("http://localhost/wamp64_projects/Cinema/controllers/post_seats.php", seatData)
      .then(() => {
        alert("Seat saved!");
        modal.classList.add("hidden");
        location.reload();
      });
  };
});
