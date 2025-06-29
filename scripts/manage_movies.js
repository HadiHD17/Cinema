document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("movies-table-body");
  const modal = document.getElementById("movies-modal");
  const form = document.getElementById("movies-form");
  const closeBtn = document.getElementById("close-modal");

  axios.get("http://localhost/wamp64_projects/Cinema/controllers/get_movies.php")
    .then(res => {
      const data = res.data.movies;
      body.innerHTML = "";
      data.forEach(movie => {
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

  function attachListeners() {
    document.querySelectorAll(".edit-btn").forEach(button => {
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
          poster_image: tr[9].innerText
        };
        openModal(movie);
      });
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this movie?")) {
          axios.post("http://localhost/wamp64_projects/Cinema/controllers/post_movies.php", {
            action: "delete",
            id
          }).then(() => location.reload());
        }
      });
    });
  }

  window.openModal = function(movie = {}) {
    modal.classList.remove("hidden");
    form.id.value = movie.id || "";
    form.title.value = movie.title || "";
    form.description.value = movie.description || "";
    form.genre.value = movie.genre || "";
    form.age_rating.value = movie.age_rating || "";
    form.trailer_url.value = movie.trailer_url || "";
    form.cast.value = movie.cast || "";
    form.release_date.value = movie.release_date || "";
    form.end_date.value = movie.end_date || "";
    form.poster_image.value = movie.poster_image || "";
    form.setAttribute("data-mode", movie.id ? "edit" : "create");
  };

  closeBtn.onclick = () => modal.classList.add("hidden");

  form.onsubmit = (e) => {
    e.preventDefault();
    const mode = form.getAttribute("data-mode");
    const movieData = {
      id: form.id.value,
      title: form.title.value,
      description: form.description.value,
      genre: form.genre.value,
      age_rating: form.age_rating.value,
      trailer_url: form.trailer_url.value,
      cast: form.cast.value,
      release_date: form.release_date.value,
      end_date: form.end_date.value,
      poster_image: form.poster_image.value,
      action: mode
    };

    axios.post("http://localhost/wamp64_projects/Cinema/controllers/post_movies.php", movieData)
      .then(() => {
        alert("Movie saved successfully!");
        modal.classList.add("hidden");
        location.reload();
      })
      .catch(err => alert("Error: " + err));
  };
});
