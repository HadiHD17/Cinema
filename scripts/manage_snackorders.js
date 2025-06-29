document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("snackorders-table-body");
  const modal = document.getElementById("snackorders-modal");
  const form = document.getElementById("snackorders-form");
  const closeBtn = document.getElementById("close-modal");

  axios.get("http://localhost/wamp64_projects/Cinema/controllers/get_snackorders.php")
    .then(res => {
      const snackorders = res.data.snackorders;
      body.innerHTML = "";
      snackorders.forEach(order => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${order.id}</td>
          <td>${order.booking_id}</td>
          <td>${order.snack_id}</td>
          <td>${order.quantity}</td>
          <td>
            <button class="edit-btn" data-id="${order.id}">Edit</button>
            <button class="delete-btn" data-id="${order.id}">Delete</button>
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
        const order = {
          id: tr[0].innerText,
          booking_id: tr[1].innerText,
          snack_id: tr[2].innerText,
          quantity: tr[3].innerText
        };
        openModal(order);
      });
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        if (confirm("Delete this snack order?")) {
          axios.post("http://localhost/wamp64_projects/Cinema/controllers/post_snackorders.php", {
            action: "delete",
            id
          }).then(() => location.reload());
        }
      });
    });
  }

  window.openModal = function(order = {}) {
    modal.classList.remove("hidden");
    form.id.value = order.id || "";
    form.booking_id.value = order.booking_id || "";
    form.snack_id.value = order.snack_id || "";
    form.quantity.value = order.quantity || "";
    form.setAttribute("data-mode", order.id ? "edit" : "create");
  };

  closeBtn.onclick = () => modal.classList.add("hidden");

  form.onsubmit = (e) => {
    e.preventDefault();
    const mode = form.getAttribute("data-mode");

    const orderData = {
      id: form.id.value,
      booking_id: form.booking_id.value,
      snack_id: form.snack_id.value,
      quantity: form.quantity.value,
      action: mode
    };

    axios.post("http://localhost/wamp64_projects/Cinema/controllers/post_snackorders.php", orderData)
      .then(() => {
        alert("Snack order saved!");
        modal.classList.add("hidden");
        location.reload();
      });
  };
});
