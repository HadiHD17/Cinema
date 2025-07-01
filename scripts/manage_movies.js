document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("movies-table-body");
  const modal = document.getElementById("movies-modal");
  const form = document.getElementById("movies-form");
  const closeBtn = document.getElementById("close-modal");
  const addBtn = document.getElementById("add-movie-btn");
  const BASE_URL = "http://localhost/wamp64_projects/Cinema/controllers";

  loadMovies();
  addBtn.addEventListener("click", () => {
    
    openModal();
  });

  function loadMovies() {
    axios.get(`${BASE_URL}/get_movies.php`).then((res) => {
      const data = res.data.movies;
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
    });
  }

  function attachListeners() {
    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const tr = button.closest("tr").children;
        const movie = {
          id: tr[0].innerText,
          title: tr[1].innerText,
          description: tr[2].innerText,
          genre: tr[3].innerText,
          age_rating: tr[4].innerText,
          trailer_url: tr[5].innerText,
          cast: tr[6].innerText,
          release_date: tr[7].innerText,
          end_date: tr[8].innerText,
          poster_image: tr[9].innerText,
        };
        openModal(movie);
      });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this movie?")) {
          try {
            const res = await axios.post(
              "http://localhost/wamp64_projects/Cinema/controllers/post_movies.php",
              {
                action: "delete",
                data: { id }
              },
              {
                headers: { "Content-Type": "application/json" }
              }
            );
            if (res.data.status === 200) {
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

    form.setAttribute("data-mode", movie.id ? "update" : "create");
  };

  closeBtn.onclick = () => modal.classList.add("hidden");

  form.onsubmit = async (e) => {
    e.preventDefault();

    const mode = form.getAttribute("data-mode");
    const movieData = {
      title: form.elements.title.value,
      description: form.elements.description.value,
      genre: form.elements.genre.value,
      age_rating: form.elements.age_rating.value,
      trailer_url: form.elements.trailer_url.value,
      cast: form.elements.cast.value,
      release_date: form.elements.release_date.value,
      end_date: form.elements.end_date.value,
      poster_image: form.elements.poster_image.value
      
    };

    if (mode === "update") {
      movieData.id = form.elements.id.value;
    }

    try {
      const res = await axios.post(`${BASE_URL}/post_movies.php`,{
       action:mode,
       data:movieData});
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
  });