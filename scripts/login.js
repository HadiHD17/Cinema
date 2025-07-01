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
      }).then(response=>{
          
      

      const {status,role,id} = response.data;

      if (status === 'success') {
        if (role === 'admin') {
          window.location.href = `../pages/admin.html?id=${id}`;
        } else if (role === 'user') {
          window.location.href = `../pages/dashboard.html?id=${id}`;
        }
      } else {
        errorMsg.textContent = data.message || 'Login failed';
      }
    })
    } catch (err) {
      console.error(err);
      errorMsg.textContent = 'Server error or network problem';
    }
  });
});
