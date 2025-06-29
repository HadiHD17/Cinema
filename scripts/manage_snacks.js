document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("snacks-table-body");
  const modal = document.getElementById("snacks-modal");
  const form = document.getElementById("snacks-form");
  const closeBtn = document.getElementById("close-modal");

  axios.get("http://localhost/wamp64_projects/Cinema/controllers/get_snacks.php")
    .then(res => {
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
    });

  function attachListeners() {
    document.querySelectorAll(".edit-btn").forEach(button => {
      button.addEventListener("click", () => {
        const tr = button.closest("tr").children;
        const snack = {
          id: tr[0].innerText,
          name: tr[1].innerText,
          price: tr[2].innerText,
          image: tr[3].querySelector("img")?.src || ""
        };
        openModal(snack);
      });
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        if (confirm("Delete this snack?")) {
          axios.post("http://localhost/wamp64_projects/Cinema/controllers/post_snacks.php", {
            action: "delete",
            id
          }).then(() => location.reload());
        }
      });
    });
  }

  window.openModal = function(snack = {}) {
    modal.classList.remove("hidden");
    form.id.value = snack.id || "";
    form.name.value = snack.name || "";
    form.price.value = snack.price || "";
    form.image.value = snack.image || "";
    form.setAttribute("data-mode", snack.id ? "edit" : "create");
  };

  closeBtn.onclick = () => modal.classList.add("hidden");

  form.onsubmit = (e) => {
    e.preventDefault();
    const mode = form.getAttribute("data-mode");

    const snackData = {
      id: form.id.value,
      name: form.name.value,
      price: form.price.value,
      image: form.image.value,
      action: mode
    };

    axios.post("http://localhost/wamp64_projects/Cinema/controllers/post_snacks.php", snackData)
      .then(() => {
        alert("Snack saved!");
        modal.classList.add("hidden");
        location.reload();
      });
  };
});
