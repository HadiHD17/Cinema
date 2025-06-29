document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const errorMsg = document.getElementById('error-msg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.textContent = '';

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    try {
      const response = await axios.post('http://localhost/wamp64_projects/Cinema/controllers/login.php', {
        email,
        password
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      const data = response.data;

      if (data.status === 'success') {
        if (data.role === 'admin') {
          window.location.href = '../pages/admin.html';
        } else if (data.role === 'user') {
          window.location.href = '../pages/dashboard.html';
        }
      } else {
        errorMsg.textContent = data.message || 'Login failed';
      }
    } catch (err) {
      console.error(err);
      errorMsg.textContent = 'Server error or network problem';
    }
  });
});
