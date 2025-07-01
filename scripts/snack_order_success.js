document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const back=document.getElementById('back-btn');
  const userId = params.get('user_id');
 
back.addEventListener('click', () => {
  
  window.location.href = `dashboard.html?id=${userId}`;
});
});
