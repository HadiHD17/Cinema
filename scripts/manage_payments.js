document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("payments-table-body");
  const modal = document.getElementById("payments-modal");
  const form = document.getElementById("payments-form");
  const closeBtn = document.getElementById("close-modal");
  const addBtn = document.getElementById("add-payment-btn");

  // Load existing payments
  loadPayments();

  // Open modal for creating
  addBtn.addEventListener("click", () => openModal());

  // Close modal
  closeBtn.onclick = () => modal.classList.add("hidden");

  // Form submit
  form.onsubmit = (e) => {
    e.preventDefault();
    const mode = form.getAttribute("data-mode");

    const paymentData = {
      booking_id: form.booking_id.value,
      amount: form.amount.value,
      payment_method: form.payment_method.value,
      payer_user_id: form.payer_user_id.value,
      payment_time: form.payment_time.value
    };

    if (mode === "update") {
      paymentData.id = form.id.value;
    }

    axios
      .post("http://localhost/wamp64_projects/Cinema/controllers/post_payments.php", {
        action: mode,
        data: paymentData
      })
      .then((res) => {
        if (res.data.status === 200) {
          alert("Payment saved!");
          modal.classList.add("hidden");
          loadPayments();
        } else {
          alert("Failed to save payment: " + res.data.message);
          console.error(res.data);
        }
      })
      .catch((err) => {
        alert("Error saving payment");
        console.error(err);
      });
  };

  // Load data
  function loadPayments() {
    axios
      .get("http://localhost/wamp64_projects/Cinema/controllers/get_payments.php")
      .then((res) => {
        const payments = res.data.payments;
        body.innerHTML = "";

        payments.forEach((payment) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${payment.id}</td>
            <td>${payment.booking_id}</td>
            <td>${payment.amount}</td>
            <td>${payment.payment_method}</td>
            <td>${payment.payer_user_id}</td>
            <td>${formatForDisplay(payment.payment_time)}</td>
            <td>
              <button class="edit-btn" data-id="${payment.id}">Edit</button>
              <button class="delete-btn" data-id="${payment.id}">Delete</button>
            </td>
          `;
          body.appendChild(row);
        });

        attachListeners();
      })
      .catch((err) => {
        console.error("Failed to load payments:", err);
      });
  }

  // Format ISO to readable
  function formatForDisplay(datetime) {
    return new Date(datetime).toLocaleString();
  }

  // Format for datetime-local input
  function formatForInput(datetime) {
    const d = new Date(datetime);
    return d.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
  }

  // Open modal with data
  window.openModal = function (payment = {}) {
    modal.classList.remove("hidden");

    form.id.value = payment.id || "";
    form.booking_id.value = payment.booking_id || "";
    form.amount.value = payment.amount || "";
    form.payment_method.value = payment.payment_method || "card";
    form.payer_user_id.value = payment.payer_user_id || "";
    form.payment_time.value = payment.payment_time
      ? formatForInput(payment.payment_time)
      : "";

    form.setAttribute("data-mode", payment.id ? "update" : "create");
  };

  // Add edit/delete listeners
  function attachListeners() {
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");

        try {
          const res = await axios.get(
            `http://localhost/wamp64_projects/Cinema/controllers/get_payments.php?id=${id}`
          );
          if (res.data && res.data.payment) {
            openModal(res.data.payment);
          } else {
            alert("Payment not found");
          }
        } catch (err) {
          console.error("Edit error:", err);
        }
      });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this payment?")) {
          try {
            const res = await axios.post(
              "http://localhost/wamp64_projects/Cinema/controllers/post_payments.php",
              {
                action: "delete",
                data: { id }
              }
            );

            if (res.data.status === 200) {
              loadPayments();
            } else {
              alert("Failed to delete payment: " + res.data.message);
            }
          } catch (err) {
            console.error("Delete error:", err);
            alert("Delete error");
          }
        }
      });
    });
  }
});
