document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("payments-table-body");
  const modal = document.getElementById("payments-modal");
  const form = document.getElementById("payments-form");
  const closeBtn = document.getElementById("close-modal");
  const addBtn = document.getElementById("add-payment-btn");
  const BASE_URL = "http://localhost/wamp64_projects/Cinema";
  const hamburger = document.getElementById('hamburger');
const sidebar = document.querySelector('.sidebar');

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('show');
  document.body.classList.toggle('sidebar-open');
});


  
  loadPayments();

  
  addBtn.addEventListener("click", () => {
    openModal(); 
  });

  
  closeBtn.onclick = () => modal.classList.add("hidden");

  
  form.onsubmit = async (e) => {
    e.preventDefault();

    const id = form.elements.id.value.trim();
    const PaymentData = {
      booking_id: form.elements.booking_id.value.trim(),
      amount: form.elements.amount.value.trim(),
      payment_method: form.elements.payment_method.value.trim(),
      payer_user_id: form.elements.payer_user_id.value.trim(),
    };

    if (id) {
      PaymentData.id = parseInt(id, 10);
    }

    const url = id
      ? `${BASE_URL}/Update_Payment`
      : `${BASE_URL}/Create_Payment`;

    try {
      const res = await axios.post(
        url,
        { data: PaymentData },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status === 200) {
        alert("Payment saved successfully!");
        modal.classList.add("hidden");
        loadPayments();
      } else {
        throw new Error(res.data.message || "Save failed");
      }
    } catch (err) {
      alert("Error: " + err.message);
      console.error("Save error:", err);
    }
  };

  
  async function loadPayments() {
    try {
      const res = await axios.get(`${BASE_URL}/All_Payments`);
      const data = res.data.payload || [];

      body.innerHTML = "";
      data.forEach((Payment) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${Payment.id}</td>
          <td>${Payment.booking_id}</td>
          <td>${Payment.amount}</td>
          <td>${Payment.payment_method}</td>
          <td>${Payment.payer_user_id}</td>
          <td>
            <button class="edit-btn" data-id="${Payment.id}">Edit</button>
            <button class="delete-btn" data-id="${Payment.id}">Delete</button>
          </td>
        `;
        body.appendChild(row);
      });

      attachListeners();
    } catch (err) {
      console.error("Failed to load payments:", err);
    }
  }

  
  function attachListeners() {
    
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        try {
          const res = await axios.get(`${BASE_URL}/Payment?id=${id}`);
          if (res.data && res.data.payload) {
            openModal(res.data.payload);
          } else {
            alert("Failed to load payment data for editing");
          }
        } catch (err) {
          console.error("Edit error:", err);
          alert("Error loading payment data");
        }
      });
    });

    
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this payment?")) {
          try {
            const res = await axios.post(
              `${BASE_URL}/Delete_Payment`,
              { id: parseInt(id, 10) },
              { headers: { "Content-Type": "application/json" } }
            );
            if (res.data.status === 200) {
              alert("payment deleted successfully!");
              loadPayments();
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


  window.openModal = function (payment = {}) {
    modal.classList.remove("hidden");
    form.reset();

    form.elements.id.value = payment.id || "";
    form.elements.booking_id.value = payment.booking_id || "";
    form.elements.amount.value = payment.amount || "";
    form.elements.payment_method.value = payment.payment_method || "";
    form.elements.payer_user_id.value = payment.payer_user_id || "";
  };
});
