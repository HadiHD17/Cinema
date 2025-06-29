console.log("✅ Script is running!");

document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("users-table-body");
  const modal = document.getElementById("users-modal");
  const form = document.getElementById("users-form");
  const closeBtn = document.getElementById("close-modal");
  const addBtn = document.getElementById("add-user-btn");

  console.log("📍 Add button:", addBtn);

  loadUsers();

  addBtn.addEventListener("click", () => {
    console.log("🟢 Add button clicked");
    openModal();
  });

  closeBtn.onclick = () => modal.classList.add("hidden");

  form.onsubmit = async (e) => {
    e.preventDefault();
    const mode = form.getAttribute("data-mode");
    const id = form.elements.id.value.trim();

    const userData = {
      full_name: form.elements.full_name.value,
      email: form.elements.email.value,
      phone: form.elements.phone.value,
      BDay: form.elements.BDay.value,
      comm_pref: form.elements.comm_pref.value
    };

    if (mode === "update") {
      if (!id) {
        alert("User ID is required for update");
        return;
      }
      userData.id = parseInt(id, 10);
    }

    const password = form.elements.password.value;
    if (password) {
      userData.password = password;
    }

    try {
      const response = await axios.post(
        "http://localhost/wamp64_projects/Cinema/controllers/post_users.php",
        {
          action: mode,
          data: userData
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      if (response.data.status === 200) {
        alert("User saved successfully!");
        modal.classList.add("hidden");
        loadUsers();
      } else {
        console.log("❌ Server response:", response.data);
        throw new Error(response.data.message || "Save failed");
      }
    } catch (error) {
      alert("Error: " + error.message);
      console.error(error);
    }
  };

  async function loadUsers() {
    try {
      const response = await axios.get(
        "http://localhost/wamp64_projects/Cinema/controllers/get_users.php"
      );
      const data = response.data.users;
      body.innerHTML = "";

      data.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.full_name}</td>
          <td>${user.email}</td>
          <td>${user.phone}</td>
          <td>${user.BDay}</td>
          <td>${user.comm_pref}</td>
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
    }
  }

  function attachListeners() {
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const userId = btn.getAttribute("data-id");
        try {
          const res = await axios.get(
            `http://localhost/wamp64_projects/Cinema/controllers/get_users.php?id=${userId}`
          );
          if (res.data && res.data.users) {
            openModal(res.data.users);
          }
        } catch (err) {
          
          console.error("Edit error:", err);
        }
      });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this user?")) {
          try {
            const res = await axios.post(
              "http://localhost/wamp64_projects/Cinema/controllers/post_users.php",
              {
                action: "delete",
                data: { id }
              },
              {
                headers: { "Content-Type": "application/json" }
              }
            );
            if (res.data.status === 200) {
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

    form.elements.id.value = user.id || "";
    form.elements.full_name.value = user.full_name || "";
    form.elements.email.value = user.email || "";
    form.elements.phone.value = user.phone || "";
    form.elements.BDay.value = user.BDay || "";
    form.elements.comm_pref.value = user.comm_pref || "";
    form.elements.password.value = "";

    form.setAttribute("data-mode", user.id ? "update" : "create");
  };
});