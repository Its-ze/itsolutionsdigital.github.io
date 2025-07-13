// Tab switching
function showTab(tab) {
  document.querySelectorAll('.tab-content').forEach(e => e.style.display = 'none');
  document.querySelectorAll('.tab-btn').forEach(e => e.classList.remove('active'));
  document.getElementById(tab).style.display = 'block';
  document.querySelector('.tab-btn[onclick="showTab(''+tab+'')"]').classList.add('active');
}

// Helper: Validate domain
function isValidDomain(domain) {
  return /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain);
}
// Helper: Validate IP
function isValidIP(ip) {
  return /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);
}
// Copy result to clipboard
function copyResult(id) {
  const el = document.getElementById(id);
  // Clipboard logic here (fix Konami logic if needed)
  if (el) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(el.textContent || el.value || '').then(() => {
        el.style.background = '#d0f5d0';
        setTimeout(() => el.style.background = '', 700);
      });
    }
  }
}
// ...other tool logic from previous script...
