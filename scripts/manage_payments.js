document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("payments-table-body");
  const modal = document.getElementById("payments-modal");
  const form = document.getElementById("payments-form");
  const closeBtn = document.getElementById("close-modal");

  axios.get("http://localhost/wamp64_projects/Cinema/controllers/get_payments.php")
    .then(res => {
      const payments = res.data.payments;
      body.innerHTML = "";
      payments.forEach(payment => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${payment.id}</td>
          <td>${payment.booking_id}</td>
          <td>${payment.amount}</td>
          <td>${payment.payment_method}</td>
          <td>${payment.payer_user_id}</td>
          <td>${payment.payment_time}</td>
          <td>
            <button class="edit-btn" data-id="${payment.id}">Edit</button>
            <button class="delete-btn" data-id="${payment.id}">Delete</button>
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
        const payment = {
          id: tr[0].innerText,
          booking_id: tr[1].innerText,
          amount: tr[2].innerText,
          payment_method: tr[3].innerText,
          payer_user_id: tr[4].innerText,
          payment_time: new Date(tr[5].innerText).toISOString().slice(0, 16),
        };
        openModal(payment);
      });
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        if (confirm("Delete this payment?")) {
          axios.post("http://localhost/wamp64_projects/Cinema/controllers/post_payments.php", {
            action: "delete",
            id
          }).then(() => location.reload());
        }
      });
    });
  }

  window.openModal = function(payment = {}) {
    modal.classList.remove("hidden");
    form.id.value = payment.id || "";
    form.booking_id.value = payment.booking_id || "";
    form.amount.value = payment.amount || "";
    form.payment_method.value = payment.payment_method || "card";
    form.payer_user_id.value = payment.payer_user_id || "";
    form.payment_time.value = payment.payment_time || "";
    form.setAttribute("data-mode", payment.id ? "edit" : "create");
  };

  closeBtn.onclick = () => modal.classList.add("hidden");

  form.onsubmit = (e) => {
    e.preventDefault();
    const mode = form.getAttribute("data-mode");

    const paymentData = {
      id: form.id.value,
      booking_id: form.booking_id.value,
      amount: form.amount.value,
      payment_method: form.payment_method.value,
      payer_user_id: form.payer_user_id.value,
      payment_time: form.payment_time.value,
      action: mode
    };

    axios.post("http://localhost/wamp64_projects/Cinema/controllers/post_payments.php", paymentData)
      .then(() => {
        alert("Payment saved!");
        modal.classList.add("hidden");
        location.reload();
      });
  };
});
