document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("snackorders-table-body");
  const modal = document.getElementById("snackorders-modal");
  const form = document.getElementById("snackorders-form");
  const closeBtn = document.getElementById("close-modal");
  const addBtn = document.getElementById("add-snackorder-btn");
  const BASE_URL = "http://localhost/wamp64_projects/Cinema";

  
  loadSnackOrders();

  
  addBtn.addEventListener("click", () => {
    openModal(); 
  });

  
  closeBtn.onclick = () => modal.classList.add("hidden");

  
  form.onsubmit = async (e) => {
    e.preventDefault();

    const id = form.elements.id.value.trim();
    const SnackOrderData = {
      booking_id: form.elements.booking_id.value.trim(),
      snack_id: form.elements.snack_id.value.trim(),
      quantity: form.elements.quantity.value.trim(),
    };

    if (id) {
      SnackOrderData.id = parseInt(id, 10);
    }

    const url = id
      ? `${BASE_URL}/Update_SnackOrder`
      : `${BASE_URL}/Create_SnackOrder`;

    try {
      const res = await axios.post(
        url,
        { data: SnackOrderData },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status === 200) {
        alert("SnackOrder saved successfully!");
        modal.classList.add("hidden");
        loadSnackOrders();
      } else {
        throw new Error(res.data.message || "Save failed");
      }
    } catch (err) {
      alert("Error: " + err.message);
      console.error("Save error:", err);
    }
  };

  
  async function loadSnackOrders() {
    try {
      const res = await axios.get(`${BASE_URL}/All_SnackOrders`);
      const data = res.data.payload || [];

      body.innerHTML = "";
      data.forEach((SnackOrder) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${SnackOrder.id}</td>
          <td>${SnackOrder.booking_id}</td>
          <td>${SnackOrder.snack_id}</td>
          <td>${SnackOrder.quantity}</td>
          <td>
            <button class="edit-btn" data-id="${SnackOrder.id}">Edit</button>
            <button class="delete-btn" data-id="${SnackOrder.id}">Delete</button>
          </td>
        `;
        body.appendChild(row);
      });

      attachListeners();
    } catch (err) {
      console.error("Failed to load snackorders:", err);
    }
  }

  
  function attachListeners() {
    
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        try {
          const res = await axios.get(`${BASE_URL}/SnackOrder?id=${id}`);
          if (res.data && res.data.payload) {
            openModal(res.data.payload);
          } else {
            alert("Failed to load snackorder data for editing");
          }
        } catch (err) {
          console.error("Edit error:", err);
          alert("Error loading snackorder data");
        }
      });
    });

    
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this snackorder?")) {
          try {
            const res = await axios.post(
              `${BASE_URL}/Delete_SnackOrder`,
              { id: parseInt(id, 10) },
              { headers: { "Content-Type": "application/json" } }
            );
            if (res.data.status === 200) {
              alert("snackorder deleted successfully!");
              loadSnackOrders();
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


  window.openModal = function (snackorder = {}) {
    modal.classList.remove("hidden");
    form.reset();

    form.elements.id.value = snackorder.id || "";
    form.elements.booking_id.value = snackorder.booking_id || "";
    form.elements.snack_id.value = snackorder.snack_id || "";
    form.elements.quantity.value = snackorder.quantity || "";
  };
});
