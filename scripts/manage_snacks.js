document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("snacks-table-body");
  const modal = document.getElementById("snacks-modal");
  const form = document.getElementById("snacks-form");
  const closeBtn = document.getElementById("close-modal");
  const addBtn = document.getElementById("add-snack-btn");
  const BASE_URL = "http://localhost/wamp64_projects/Cinema";

  
  loadSnacks();

  
  addBtn.addEventListener("click", () => {
    openModal(); 
  });

  
  closeBtn.onclick = () => modal.classList.add("hidden");

  
  form.onsubmit = async (e) => {
    e.preventDefault();

    const id = form.elements.id.value.trim();
    const SnackData = {
      name: form.elements.name.value.trim(),
      price: form.elements.price.value.trim(),
      image: form.elements.image.value.trim(),
    };

    if (id) {
      SnackData.id = parseInt(id, 10);
    }

    const url = id
      ? `${BASE_URL}/Update_Snack`
      : `${BASE_URL}/Create_Snack`;

    try {
      const res = await axios.post(
        url,
        { data: SnackData },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status === 200) {
        alert("Snack saved successfully!");
        modal.classList.add("hidden");
        loadSnacks();
      } else {
        throw new Error(res.data.message || "Save failed");
      }
    } catch (err) {
      alert("Error: " + err.message);
      console.error("Save error:", err);
    }
  };

  
  async function loadSnacks() {
    try {
      const res = await axios.get(`${BASE_URL}/All_Snacks`);
      const data = res.data.payload || [];

      body.innerHTML = "";
      data.forEach((Snack) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${Snack.id}</td>
          <td>${Snack.name}</td>
          <td>${Snack.price}</td>
          <td>${Snack.image}</td>
          <td>
            <button class="edit-btn" data-id="${Snack.id}">Edit</button>
            <button class="delete-btn" data-id="${Snack.id}">Delete</button>
          </td>
        `;
        body.appendChild(row);
      });

      attachListeners();
    } catch (err) {
      console.error("Failed to load snacks:", err);
    }
  }

  
  function attachListeners() {
    
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        try {
          const res = await axios.get(`${BASE_URL}/Snack?id=${id}`);
          if (res.data && res.data.payload) {
            openModal(res.data.payload);
          } else {
            alert("Failed to load snack data for editing");
          }
        } catch (err) {
          console.error("Edit error:", err);
          alert("Error loading snack data");
        }
      });
    });

    
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this snack?")) {
          try {
            const res = await axios.post(
              `${BASE_URL}/Delete_Snack`,
              { id: parseInt(id, 10) },
              { headers: { "Content-Type": "application/json" } }
            );
            if (res.data.status === 200) {
              alert("snack deleted successfully!");
              loadSnacks();
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


  window.openModal = function (snack = {}) {
    modal.classList.remove("hidden");
    form.reset();

    form.elements.id.value = snack.id || "";
    form.elements.name.value = snack.name || "";
    form.elements.price.value = snack.price || "";
    form.elements.image.value = snack.image || "";
  };
});
