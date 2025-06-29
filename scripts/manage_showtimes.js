document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("showtimes-table-body");
  const modal = document.getElementById("showtimes-modal");
  const form = document.getElementById("showtimes-form");
  const closeBtn = document.getElementById("close-modal");

  axios.get("http://localhost/wamp64_projects/Cinema/controllers/get_showtimes.php")
    .then(res => {
      const data = res.data.showtimes;
      body.innerHTML = "";
      data.forEach(st => {
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
    });

  function attachListeners() {
    document.querySelectorAll(".edit-btn").forEach(button => {
      button.addEventListener("click", () => {
        const tr = button.closest("tr").children;
        const st = {
          id: tr[0].innerText,
          movie_id: tr[1].innerText,
          auditorium: tr[2].innerText,
          show_date: tr[3].innerText,
          show_time: tr[4].innerText,
          is_peak: tr[5].innerText === "Yes" ? "1" : "0"
        };
        openModal(st);
      });
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this showtime?")) {
          axios.post("http://localhost/wamp64_projects/Cinema/controllers/post_showtimes.php", {
            action: "delete",
            id
          }).then(() => location.reload());
        }
      });
    });
  }

  window.openModal = function(st = {}) {
    modal.classList.remove("hidden");
    form.id.value = st.id || "";
    form.movie_id.value = st.movie_id || "";
    form.auditorium.value = st.auditorium || "";
    form.show_date.value = st.show_date || "";
    form.show_time.value = st.show_time || "";
    form.is_peak.value = st.is_peak || "0";
    form.setAttribute("data-mode", st.id ? "edit" : "create");
  };

  closeBtn.onclick = () => modal.classList.add("hidden");

  form.onsubmit = (e) => {
    e.preventDefault();
    const mode = form.getAttribute("data-mode");
    const data = {
      id: form.id.value,
      movie_id: form.movie_id.value,
      auditorium: form.auditorium.value,
      show_date: form.show_date.value,
      show_time: form.show_time.value,
      is_peak: form.is_peak.value,
      action: mode
    };

    axios.post("http://localhost/wamp64_projects/Cinema/controllers/post_showtimes.php", data)
      .then(() => {
        alert("Showtime saved!");
        modal.classList.add("hidden");
        location.reload();
      });
  };
});
