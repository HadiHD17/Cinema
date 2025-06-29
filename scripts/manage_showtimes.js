console.log("✅ Showtimes script is running!");

document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("showtimes-table-body");
  const modal = document.getElementById("showtimes-modal");
  const form = document.getElementById("showtimes-form");
  const closeBtn = document.getElementById("close-modal");
  const addBtn = document.getElementById("add-showtime-btn");

  console.log("📍 Add button:", addBtn);

  loadShowtimes();

  addBtn.addEventListener("click", () => {
    console.log("🟢 Add button clicked");
    openModal();
  });

  closeBtn.onclick = () => modal.classList.add("hidden");

  form.onsubmit = async (e) => {
    e.preventDefault();
    const mode = form.getAttribute("data-mode");
    const id = form.elements.id.value.trim();

    const showtimeData = {
      movie_id: form.elements.movie_id.value,
      auditorium: form.elements.auditorium.value,
      show_date: form.elements.show_date.value,
      show_time: form.elements.show_time.value,
      is_peak: form.elements.is_peak.value
    };

    if (mode === "update") {
      if (!id) {
        alert("Showtime ID is required for update");
        return;
      }
      showtimeData.id = parseInt(id, 10);
    }

    try {
      const response = await axios.post(
        "http://localhost/wamp64_projects/Cinema/controllers/post_showtimes.php",
        {
          action: mode,
          data: showtimeData
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      if (response.data.status === 200) {
        alert("Showtime saved successfully!");
        modal.classList.add("hidden");
        loadShowtimes();
      } else {
        console.log("❌ Server response:", response.data);
        throw new Error(response.data.message || "Save failed");
      }
    } catch (error) {
      alert("Error: " + error.message);
      console.error(error);
    }
  };

  async function loadShowtimes() {
    try {
      const response = await axios.get(
        "http://localhost/wamp64_projects/Cinema/controllers/get_showtimes.php"
      );
      const data = response.data.showtimes;
      body.innerHTML = "";

      data.forEach((st) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${st.id}</td>
          <td>${st.movie_id}</td>
          <td>${st.auditorium}</td>
          <td>${st.show_date}</td>
          <td>${st.show_time}</td>
          <td>${st.is_peak == 1 ? "Yes" : "No"}</td>
          <td>
            <button class="edit-btn" data-id="${st.id}">Edit</button>
            <button class="delete-btn" data-id="${st.id}">Delete</button>
          </td>
        `;
        body.appendChild(row);
      });

      attachListeners();
    } catch (error) {
      console.error("Failed to load showtimes:", error);
    }
  }

  function attachListeners() {
    document.querySelectorAll(".edit-btn").forEach(async (btn) => {
      btn.addEventListener("click", async () => {
        const showtimeId = btn.getAttribute("data-id");
        try {
          const res = await axios.get(
            `http://localhost/wamp64_projects/Cinema/controllers/get_showtimes.php?id=${showtimeId}`
          );
          if (res.data && res.data.showtimes) {
            openModal(res.data.showtimes);
          }
        } catch (err) {
          console.error("Edit error:", err);
        }
      });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this showtime?")) {
          try {
            const res = await axios.post(
              "http://localhost/wamp64_projects/Cinema/controllers/post_showtimes.php",
              {
                action: "delete",
                data: { id }
              },
              {
                headers: { "Content-Type": "application/json" }
              }
            );
            if (res.data.status === 200) {
              alert("Showtime deleted.");
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

  window.openModal = function (st = {}) {
    modal.classList.remove("hidden");

    form.elements.id.value = st.id || "";
    form.elements.movie_id.value = st.movie_id || "";
    form.elements.auditorium.value = st.auditorium || "";
    form.elements.show_date.value = st.show_date || "";
    form.elements.show_time.value = st.show_time || "";
    form.elements.is_peak.value = st.is_peak != null ? st.is_peak.toString() : "0";

    form.setAttribute("data-mode", st.id ? "update" : "create");
  };
});
