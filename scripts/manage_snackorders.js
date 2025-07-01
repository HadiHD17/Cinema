document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("snackorders-table-body");
  const modal = document.getElementById("snackorders-modal");
  const form = document.getElementById("snackorders-form");
  const closeBtn = document.getElementById("close-modal");

  loadSnackOrders();

  closeBtn.onclick = () => modal.classList.add("hidden");

  form.onsubmit = async (e) => {
    e.preventDefault();
    const mode = form.getAttribute("data-mode");

    const orderData = {
  booking_id: form.booking_id.value,
  snack_id: form.snack_id.value,
  quantity: form.quantity.value,
};

if (mode === "update") {
  orderData.id = form.id.value; 
}
    try {
      const response = await axios.post(
  "http://localhost/wamp64_projects/Cinema/controllers/post_snackorders.php",
  {
    action: mode,
    data: orderData,
  },
  {
    headers: { "Content-Type": "application/json" },
  }
);

      if (response.data.status === 200) {
        alert("Snack order saved!");
        modal.classList.add("hidden");
        loadSnackOrders();
      } else {
        alert("Failed to save snack order: " + (response.data.message || "Unknown error"));
      }
    } catch (err) {
      alert("Error saving snack order: " + err.message);
      console.error(err);
    }
  };

  function loadSnackOrders() {
    axios
      .get("http://localhost/wamp64_projects/Cinema/controllers/get_snackorders.php")
      .then((res) => {
        const snackorders = res.data.orders || [];
        body.innerHTML = "";
        snackorders.forEach((order) => {
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
      })
      .catch((err) => {
        console.error("Failed to load snack orders:", err);
      });
  }

  function attachListeners() {
    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const tr = button.closest("tr").children;
        const order = {
          id: tr[0].innerText,
          booking_id: tr[1].innerText,
          snack_id: tr[2].innerText,
          quantity: tr[3].innerText,
        };
        openModal(order);
      });
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        if (confirm("Delete this snack order?")) {
          axios
            .post(
              "http://localhost/wamp64_projects/Cinema/controllers/post_snackorders.php",
              {
                action: "delete",
                data: { id },
              },
              {
                headers: { "Content-Type": "application/json" },
              }
            )
            .then((res) => {
              if (res.data.status === 200) {
                loadSnackOrders();
              } else {
                alert("Failed to delete snack order: " + (res.data.message || "Unknown error"));
              }
            })
            .catch((err) => {
              alert("Error deleting snack order: " + err.message);
              console.error(err);
            });
        }
      });
    });
  }

  window.openModal = function (order = {}) {
    modal.classList.remove("hidden");
    form.id.value = order.id || "";
    form.booking_id.value = order.booking_id || "";
    form.snack_id.value = order.snack_id || "";
    form.quantity.value = order.quantity || "";
    form.setAttribute("data-mode", order.id ? "update" : "create");
  };

  
  const addBtn = document.getElementById("add-snackorder-btn");
  if (addBtn) {
    addBtn.addEventListener("click", () => openModal());
  }
});
