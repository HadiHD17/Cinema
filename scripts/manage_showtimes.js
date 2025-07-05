document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("showtimes-table-body");
  const modal = document.getElementById("showtimes-modal");
  const form = document.getElementById("showtimes-form");
  const closeBtn = document.getElementById("close-modal");
  const addBtn = document.getElementById("add-showtime-btn");
  const BASE_URL = "http://localhost/wamp64_projects/Cinema";

  
  loadShowtimes();

  
  addBtn.addEventListener("click", () => {
    openModal(); 
  });

  
  closeBtn.onclick = () => modal.classList.add("hidden");

  
  form.onsubmit = async (e) => {
    e.preventDefault();

    const id = form.elements.id.value.trim();
    const ShowtimeData = {
      movie_id: form.elements.movie_id.value.trim(),
      auditorium: form.elements.auditorium.value.trim(),
      show_date: form.elements.show_date.value.trim(),
      show_time: form.elements.show_time.value.trim()
    };

    if (id) {
      ShowtimeData.id = parseInt(id, 10);
    }

    const url = id
      ? `${BASE_URL}/Update_Showtime`
      : `${BASE_URL}/Create_Showtime`;

    try {
      const res = await axios.post(
        url,
        { data: ShowtimeData },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status === 200) {
        alert("Showtime saved successfully!");
        modal.classList.add("hidden");
        loadShowtimes();
      } else {
        throw new Error(res.data.message || "Save failed");
      }
    } catch (err) {
      alert("Error: " + err.message);
      console.error("Save error:", err);
    }
  };

  
  async function loadShowtimes() {
    try {
      const res = await axios.get(`${BASE_URL}/All_Showtimes`);
      const data = res.data.payload || [];

      body.innerHTML = "";
      data.forEach((showtime) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${showtime.id}</td>
          <td>${showtime.movie_id}</td>
          <td>${showtime.auditorium}</td>
          <td>${showtime.show_date}</td>
          <td>${showtime.show_time}</td>
          <td>
            <button class="edit-btn" data-id="${showtime.id}">Edit</button>
            <button class="delete-btn" data-id="${showtime.id}">Delete</button>
          </td>
        `;
        body.appendChild(row);
      });

      attachListeners();
    } catch (err) {
      console.error("Failed to load showtimes:", err);
    }
  }

  
  function attachListeners() {
    
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        try {
          const res = await axios.get(`${BASE_URL}/Showtime?id=${id}`);
          if (res.data && res.data.payload) {
            openModal(res.data.payload);
          } else {
            alert("Failed to load showtime data for editing");
          }
        } catch (err) {
          console.error("Edit error:", err);
          alert("Error loading showtime data");
        }
      });
    });

    
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this showtime?")) {
          try {
            const res = await axios.post(
              `${BASE_URL}/Delete_Showtime`,
              { id: parseInt(id, 10) },
              { headers: { "Content-Type": "application/json" } }
            );
            if (res.data.status === 200) {
              alert("Showtime deleted successfully!");
              loadShowtimes();
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


  window.openModal = function (showtime = {}) {
    modal.classList.remove("hidden");
    form.reset();

    form.elements.id.value = showtime.id || "";
    form.elements.movie_id.value = showtime.movie_id || "";
    form.elements.auditorium.value = showtime.auditorium || "";
    form.elements.show_date.value = showtime.show_date || "";
    form.elements.show_time.value = showtime.show_time || "";
  };
});
