document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("movies-table-body");
  const modal = document.getElementById("movies-modal");
  const form = document.getElementById("movies-form");
  const closeBtn = document.getElementById("close-modal");
  const addBtn = document.getElementById("add-movie-btn");
  const BASE_URL = "http://localhost/wamp64_projects/Cinema";

  // Load all movies when page loads
  loadMovies();

  // Open modal for new movie
  addBtn.addEventListener("click", () => {
    openModal(); // no movie passed → empty form
  });

  // Close modal
  closeBtn.onclick = () => modal.classList.add("hidden");

  // Form submit handler (create or update)
  form.onsubmit = async (e) => {
    e.preventDefault();

    const id = form.elements.id.value.trim();
    const movieData = {
      title: form.elements.title.value.trim(),
      description: form.elements.description.value.trim(),
      genre: form.elements.genre.value.trim(),
      age_rating: form.elements.age_rating.value.trim(),
      trailer_url: form.elements.trailer_url.value.trim(),
      cast: form.elements.cast.value.trim(),
      release_date: form.elements.release_date.value.trim(),
      end_date: form.elements.end_date.value.trim(),
      poster_image: form.elements.poster_image.value.trim()
    };

    if (id) {
      movieData.id = parseInt(id, 10);
    }

    const url = id
      ? `${BASE_URL}/Update_Movie`
      : `${BASE_URL}/Create_Movie`;

    try {
      const res = await axios.post(
        url,
        { data: movieData },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status === 200) {
        alert("Movie saved successfully!");
        modal.classList.add("hidden");
        loadMovies();
      } else {
        throw new Error(res.data.message || "Save failed");
      }
    } catch (err) {
      alert("Error: " + err.message);
      console.error("Save error:", err);
    }
  };

  // Load all movies
  async function loadMovies() {
    try {
      const res = await axios.get(`${BASE_URL}/All_Movies`);
      const data = res.data.payload || [];

      body.innerHTML = "";
      data.forEach((movie) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${movie.id}</td>
          <td>${movie.title}</td>
          <td>${movie.description}</td>
          <td>${movie.genre}</td>
          <td>${movie.age_rating}</td>
          <td>${movie.trailer_url}</td>
          <td>${movie.cast}</td>
          <td>${movie.release_date}</td>
          <td>${movie.end_date}</td>
          <td>${movie.poster_image}</td>
          <td>
            <button class="edit-btn" data-id="${movie.id}">Edit</button>
            <button class="delete-btn" data-id="${movie.id}">Delete</button>
          </td>
        `;
        body.appendChild(row);
      });

      attachListeners();
    } catch (err) {
      console.error("Failed to load movies:", err);
    }
  }

  // Attach event listeners for edit and delete
  function attachListeners() {
    // Edit
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        try {
          const res = await axios.get(`${BASE_URL}/Movie?id=${id}`);
          if (res.data && res.data.payload) {
            openModal(res.data.payload);
          } else {
            alert("Failed to load movie data for editing");
          }
        } catch (err) {
          console.error("Edit error:", err);
          alert("Error loading movie data");
        }
      });
    });

    // Delete
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this movie?")) {
          try {
            const res = await axios.post(
              `${BASE_URL}/Delete_Movie`,
              { id: parseInt(id, 10) },
              { headers: { "Content-Type": "application/json" } }
            );
            if (res.data.status === 200) {
              alert("Movie deleted successfully!");
              loadMovies();
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

  // Open modal for create or edit
  window.openModal = function (movie = {}) {
    modal.classList.remove("hidden");
    form.reset();

    form.elements.id.value = movie.id || "";
    form.elements.title.value = movie.title || "";
    form.elements.description.value = movie.description || "";
    form.elements.genre.value = movie.genre || "";
    form.elements.age_rating.value = movie.age_rating || "";
    form.elements.trailer_url.value = movie.trailer_url || "";
    form.elements.cast.value = movie.cast || "";
    form.elements.release_date.value = movie.release_date || "";
    form.elements.end_date.value = movie.end_date || "";
    form.elements.poster_image.value = movie.poster_image || "";
  };
});
