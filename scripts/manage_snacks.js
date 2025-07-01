document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("snacks-table-body");
  const modal = document.getElementById("snacks-modal");
  const form = document.getElementById("snacks-form");
  const closeBtn = document.getElementById("close-modal");
  const addBtn = document.getElementById("add-snack-btn");

  loadSnacks();

  addBtn.addEventListener("click", () => {
    openModal();
  });

  closeBtn.onclick = () => modal.classList.add("hidden");

  form.onsubmit = async (e) => {
    e.preventDefault();
    const mode = form.getAttribute("data-mode");

    const snackData = {
      name: form.name.value,
      price: form.price.value,
      image: form.image.value
    };

    if (mode === "update") {
      snackData.id = form.id.value;
    }

    try {
      const res = await axios.post("http://localhost/wamp64_projects/Cinema/controllers/post_snacks.php", {
        action: mode,
        data: snackData
      }, {
        headers: { "Content-Type": "application/json" }
      });

      if (res.data.status === 200) {
        alert("Snack saved!");
        modal.classList.add("hidden");
        loadSnacks();
      } else {
        alert("Error saving snack: " + res.data.message);
        console.error(res.data);
      }
    } catch (err) {
      alert("Failed to save snack: " + err.message);
      console.error(err);
    }
  };

  async function loadSnacks() {
    try {
      const res = await axios.get("http://localhost/wamp64_projects/Cinema/controllers/get_snacks.php");
      const snacks = res.data.snacks;
      body.innerHTML = "";

      snacks.forEach(snack => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${snack.id}</td>
          <td>${snack.name}</td>
          <td>${snack.price}</td>
          <td><img src="${snack.image}" width="50" /></td>
          <td>
            <button class="edit-btn" data-id="${snack.id}">Edit</button>
            <button class="delete-btn" data-id="${snack.id}">Delete</button>
          </td>
        `;
        body.appendChild(row);
      });

      attachListeners();
    } catch (err) {
      alert("Failed to load snacks");
      console.error(err);
    }
  }

  function attachListeners() {
    document.querySelectorAll(".edit-btn").forEach(button => {
      button.addEventListener("click", async () => {
        const id = button.getAttribute("data-id");

        try {
          const res = await axios.get(`http://localhost/wamp64_projects/Cinema/controllers/get_snacks.php?id=${id}`);
          if (res.data && res.data.snack) {
            openModal(res.data.snack);
          } else {
            alert("Snack not found");
          }
        } catch (err) {
          console.error("Error fetching snack:", err);
        }
      });
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", async () => {
        const id = button.getAttribute("data-id");
        if (confirm("Delete this snack?")) {
          try {
            const res = await axios.post("http://localhost/wamp64_projects/Cinema/controllers/post_snacks.php", {
              action: "delete",
              data: { id }
            }, {
              headers: { "Content-Type": "application/json" }
            });

            if (res.data.status === 200) {
              loadSnacks();
            } else {
              alert("Delete failed: " + res.data.message);
              console.error(res.data);
            }
          } catch (err) {
            alert("Failed to delete snack: " + err.message);
            console.error(err);
          }
        }
      });
    });
  }

  window.openModal = function (snack = {}) {
    modal.classList.remove("hidden");

    form.id.value = snack.id || "";
    form.name.value = snack.name || "";
    form.price.value = snack.price || "";
    form.image.value = snack.image || "";

    form.setAttribute("data-mode", snack.id ? "update" : "create");
  };
});
