const userId = new URLSearchParams(window.location.search).get('id');

document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  const navButtons = document.querySelectorAll('.nav-btn');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (btn.id === 'nav-movies') loadMovies();
      else if (btn.id === 'nav-snacks') loadSnacks();
      else if (btn.id === 'nav-account') loadAccount();
      else if (btn.id === 'nav-logout') logout();
    });
  });

  async function loadMovies() {
  content.innerHTML = '<h2>Loading Movies...</h2>';
  try {
    const res = await axios.get('http://localhost/wamp64_projects/Cinema/controllers/get_movies.php');
    const movies = res.data.movies;

    let html = '<h2>🎬 Movies</h2><div class="movie-grid">';
    movies.forEach(movie => {
      html += `
        <div class="movie-card">
          <img src="../assets/${movie.poster_image}" alt="${movie.title}" />
          <h3>${movie.title}</h3>
          <p>${movie.description}</p>
          <p><strong>Genre:</strong> ${movie.genre}</p>
          <p><strong>Age Rating:</strong> ${movie.age_rating}</p>
          <p><strong>Cast:</strong> ${movie.cast}</p>
          <p><strong>Release Date:</strong> ${movie.release_date}</p>
          <p><strong>End Date:</strong> ${movie.end_date}</p>
          <p><a href="${movie.trailer_url}" target="_blank" rel="noopener noreferrer">Watch Trailer ▶️</a></p>
          <button onclick="viewShowtimes(${movie.id})">View Showtimes</button>
          <div id="showtimes-${movie.id}" class="showtimes" style="display:none;"></div>
        </div>`;
    });
    html += '</div>';
    content.innerHTML = html;
  } catch (error) {
    content.innerHTML = '<p>Error loading movies.</p>';
    console.error(error);
  }
}


  window.viewShowtimes = async function(movieId) {
    const container = document.getElementById(`showtimes-${movieId}`);
    if (container.style.display === 'block') {
      container.style.display = 'none';
      container.innerHTML = '';
      return;
    }
    container.style.display = 'block';
    container.innerHTML = '<p>Loading showtimes...</p>';

    try {
      const res = await axios.get(`http://localhost/wamp64_projects/Cinema/controllers/get_showtimes.php?movie_id=${movieId}`);
      const showtimes = res.data.showtimes;

      if (!showtimes.length) {
        container.innerHTML = '<p>No showtimes available.</p>';
        return;
      }

      let html = '<ul>';
      showtimes.forEach(st => {
        html += `<li>
          🏛 ${st.auditorium} | 📅 ${st.show_date} | ⏰ ${st.show_time}
          <button onclick="bookSeat(${st.id})">Book Seat</button>
        </li>`;
      });
      html += '</ul>';
      container.innerHTML = html;
    } catch (err) {
      container.innerHTML = '<p>Error loading showtimes.</p>';
      console.error(err);
    }
  };

  window.bookSeat = function(showtimeId) {
    const currentUserId = new URLSearchParams(window.location.search).get('id');

    window.location.href = `../pages/book_seat.html?showtime_id=${showtimeId}&id=${currentUserId}`;
  };

  async function loadSnacks() {
    content.innerHTML = '<h2>Loading Snacks...</h2>';
    try {
      const res = await axios.get('http://localhost/wamp64_projects/Cinema/controllers/get_snacks.php');
      const snacks = res.data.snacks;

      let html = '<h2>🍿 Snacks</h2><div class="snack-grid">';
      snacks.forEach(snack => {
        html += `
          <div class="snack-card">
            <img src="../assets/${snack.image}" alt="${snack.name}" />
            <h4>${snack.name}</h4>
            <p>$${parseFloat(snack.price).toFixed(2)}</p>
            <button onclick="orderSnack(${snack.id})">Order</button>
          </div>`;
      });
      html += '</div>';
      content.innerHTML = html;
    } catch (error) {
      content.innerHTML = '<p>Error loading snacks.</p>';
      console.error(error);
    }
  }

  window.orderSnack = function(snackId) {
    const userId = new URLSearchParams(window.location.search).get('id');
    const quantity = parseInt(prompt("Enter quantity to order:"), 10);
    if (!quantity || quantity <= 0) 
      return alert('Invalid quantity');

    axios.post('http://localhost/wamp64_projects/Cinema/controllers/post_snackorders.php', {
      user_id: userId,
      snack_id: snackId,
      quantity
    }).then(() => {
      window.location.href = `snack_order_success.html?id=${userId}`;
    }).catch(err => {
      alert('Failed to place snack order.');
      console.error(err);
    });
  };

  async function loadAccount() {
  content.innerHTML = '<h2>Loading Account...</h2>';
  try {
    const res = await axios.get(`http://localhost/wamp64_projects/Cinema/controllers/get_users.php?id=${userId}`);
    const user = res.data.users;

    if (!user) {
      content.innerHTML = '<p>User data not found.</p>';
      console.error('User data missing:', res.data);
      return;
    }

    content.innerHTML = `
      <h2>👤 Account Details</h2>
      <p><strong>Full Name:</strong> ${user.full_name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Birthday:</strong> ${user.BDay}</p>
      <p><strong>Comm. Pref:</strong> ${user.comm_pref}</p>
      <p><strong>Created At:</strong> ${user.created_at}</p>
    `;
  } catch (error) {
    content.innerHTML = '<p>Error loading account details.</p>';
    console.error(error);
  }
}

  function logout() {
      window.location.href =('../index.html');
  }
  loadMovies();
});
