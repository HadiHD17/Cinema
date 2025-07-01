document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const back=document.getElementById('back-btn');
  const userId = params.get('id');
 
back.addEventListener('click', () => {
  
  window.location.href = `../pages/dashboard.html?id=${userId}`;
});
});
