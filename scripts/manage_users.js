document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("users-table-body");
  const modal = document.getElementById("users-modal");
  const form = document.getElementById("users-form");
  const closeBtn = document.getElementById("close-modal");

  axios.get("http://localhost/wamp64_projects/Cinema/controllers/get_users.php")
    .then(res => {
      const data = res.data.users;
      body.innerHTML = "";
      data.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.full_name}</td>
          <td>${user.email}</td>
          <td>${user.phone}</td>
          <td>${user.BDay}</td>
          <td>${user.password}</td>
          <td>
            <button class="edit-btn" data-id="${user.id}">Edit</button>
            <button class="delete-btn" data-id="${user.id}">Delete</button>
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
        const user = {
          id: tr[0].innerText,
          full_name: tr[1].innerText,
          email: tr[2].innerText,
          phone: tr[3].innerText,
          BDay: tr[4].innerText,
          password: tr[5].innerText
        };
        openModal(user);
      });
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this user?")) {
          axios.post("http://localhost/wamp64_projects/Cinema/controllers/post_users.php", {
            action: "delete",
            id
          }).then(() => location.reload());
        }
      });
    });
  }

  window.openModal = function(user = {}) {
    modal.classList.remove("hidden");
    form.id.value = user.id || "";
    form.full_name.value = user.full_name || "";
    form.email.value = user.email || "";
    form.phone.value = user.phone || "";
    form.BDay.value = user.BDay || "";
    form.password.value = user.password || "";
    form.setAttribute("data-mode", user.id ? "edit" : "create");
  };

  closeBtn.onclick = () => modal.classList.add("hidden");

  form.onsubmit = (e) => {
    e.preventDefault();
    const mode = form.getAttribute("data-mode");
    const userData = {
      id: form.id.value,
      full_name: form.full_name.value,
      email: form.email.value,
      phone: form.phone.value,
      BDay: form.BDay.value,
      password: form.password.value,
      action: mode
    };

    axios.post("http://localhost/wamp64_projects/Cinema/controllers/post_users.php", userData)
      .then(() => {
        alert("User saved successfully!");
        modal.classList.add("hidden");
        location.reload();
      })
      .catch(err => alert("Error: " + err));
  };
});
