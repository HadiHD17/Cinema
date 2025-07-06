document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("users-table-body");
  const modal = document.getElementById("users-modal");
  const form = document.getElementById("users-form");
  const closeBtn = document.getElementById("close-modal");
  const addBtn = document.getElementById("add-user-btn");
  const BASE_URL = "http://localhost/wamp64_projects/Cinema";
  const hamburger = document.getElementById('hamburger');
const sidebar = document.querySelector('.sidebar');

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('show');
  document.body.classList.toggle('sidebar-open');
});


  
  loadUsers();

  
  addBtn.addEventListener("click", () => {
    openModal();
  });

  
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = form.elements["id"].value.trim();

    
    const userData = {
      full_name: form.elements["full_name"].value.trim(),
      email: form.elements["email"].value.trim(),
      phone: form.elements["phone"].value.trim(),
      BDay: form.elements["BDay"].value.trim(),
      comm_pref: form.elements["comm_pref"].value.trim(),
    };

    const password = form.elements["password"].value;
    if (password) {
      userData.password = password;
    }

    
    let url;
    if (id) {
      url = `${BASE_URL}/Update_User`;
      userData.id = parseInt(id, 10);
    } else {
      url = `${BASE_URL}/Create_User`;
    }

    try {
      const response = await axios.post(
        url,
        { data: userData },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data && response.data.status === 200) {
        alert("User saved successfully!");
        modal.classList.add("hidden");
        form.reset();
        loadUsers();
      } else {
        throw new Error(response.data.message || "Save failed");
      }
    } catch (error) {
      alert("Error: " + error.message);
      console.error(error);
    }
  });

 
  async function loadUsers() {
    try {
      const response = await axios.get(
        `${BASE_URL}/All_Users`
      );
      const users = response.data.payload || [];
      body.innerHTML = "";

      users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${(user.full_name)}</td>
          <td>${(user.email)}</td>
          <td>${(user.phone)}</td>
          <td>${(user.BDay)}</td>
          <td>${(user.comm_pref)}</td>
          <td>${user.is_verified ? "Yes" : "No"}</td>
          <td>
            <button class="edit-btn" data-id="${user.id}">Edit</button>
            <button class="delete-btn" data-id="${user.id}">Delete</button>
          </td>
        `;
        body.appendChild(row);
      });

      attachListeners();
    } catch (error) {
      console.error("Failed to load users:", error);
      alert("Failed to load users");
    }
  }

  
  function attachListeners() {
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        try {
          const res = await axios.get(
            `${BASE_URL}/User?id=${id}`
          );
          if (res.data && res.data.payload) {
            openModal(res.data.payload);
          } else {
            alert("Failed to load user data for editing");
          }
        } catch (err) {
          console.error("Edit error:", err);
          alert("Error loading user data");
        }
      });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this user?")) {
          try {
            const res = await axios.post(
              `${BASE_URL}/Delete_User`,
              { id: parseInt(id, 10) },
              { headers: { "Content-Type": "application/json" } }
            );
            if (res.data && res.data.status === 200) {
              alert("User deleted successfully!");
              loadUsers();
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

  
  window.openModal = function (user = {}) {
    modal.classList.remove("hidden");

    form.elements["id"].value = user.id || "";
    form.elements["full_name"].value = user.full_name || "";
    form.elements["email"].value = user.email || "";
    form.elements["phone"].value = user.phone || "";
    form.elements["BDay"].value = user.BDay || "";
    form.elements["comm_pref"].value = user.comm_pref || "";
    form.elements["password"].value = ""; 
  };


});
