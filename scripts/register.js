document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      full_name: form.fullname.value,
      email: form.email.value,
      phone: form.phone.value,
      BDay: form.bday.value,
      password: form.password.value,
      comm_pref:form.comm_pref.value
    };

    try {
      const response = await axios.post('http://localhost/wamp64_projects/Cinema/controllers/Register', data, {
        headers: { 'Content-Type': 'application/json' }
      });

      const resData = response.data;

      if (resData.status === 'success') {
        alert('Registration successful! Redirecting to login...');
        window.location.href = '../pages/dashboard.html';
      } else {
        alert(resData.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Server error or network issue');
    }
  });
});
