// Tab switching
function showTab(tab) {
  document.querySelectorAll('.tab-content').forEach(e => e.style.display = 'none');
  document.querySelectorAll('.tab-btn').forEach(e => e.classList.remove('active'));
  document.getElementById(tab).style.display = 'block';
  document.querySelector(`.tab-btn[onclick="showTab('${tab}')"]`).classList.add('active');
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
// Get Public IP
function getIP() {
  fetch('https://api.ipify.org?format=json')
    .then(r => r.json())
    .then(data => {
      document.getElementById('ipresult').textContent = data.ip;
    });
}

// Reverse DNS Lookup
function reverseDNS() {
  const ip = document.getElementById('revip').value;
  if (!isValidIP(ip)) {
    document.getElementById('ptrresult').textContent = 'Invalid IP address.';
    return;
  }
  fetch('https://dns.google/resolve?name=' + ip + '.in-addr.arpa&type=PTR')
    .then(r => r.json())
    .then(data => {
      if (data.Answer && data.Answer.length) {
        document.getElementById('ptrresult').textContent = data.Answer[0].data;
      } else {
        document.getElementById('ptrresult').textContent = 'No PTR record found.';
      }
    });
}

// DNS Lookup
function lookupDNSCombo() {
  const domain = document.getElementById('dnscomboinput').value;
  const type = document.getElementById('dnsrecordtype').value;
  if (!isValidDomain(domain)) {
    document.getElementById('dnscomboresult').textContent = 'Invalid domain.';
    return;
  }
  fetch('https://dns.google/resolve?name=' + domain + '&type=' + type)
    .then(r => r.json())
    .then(data => {
      if (data.Answer && data.Answer.length) {
        document.getElementById('dnscomboresult').textContent = data.Answer.map(a => a.data).join('\n');
      } else {
        document.getElementById('dnscomboresult').textContent = 'No records found.';
      }
    });
}

// HTTP Ping
function pingSite() {
  const url = document.getElementById('pingurl').value;
  if (!isValidDomain(url)) {
    document.getElementById('pingresult').textContent = 'Invalid domain.';
    return;
  }
  fetch('https://' + url)
    .then(() => {
      document.getElementById('pingresult').textContent = 'Site is reachable.';
    })
    .catch(() => {
      document.getElementById('pingresult').textContent = 'Site is not reachable.';
    });
}

// HTTPS Check
function checkHTTPS() {
  const url = document.getElementById('httpsurl').value;
  if (!isValidDomain(url)) {
    document.getElementById('httpsresult').textContent = 'Invalid domain.';
    return;
  }
  fetch('https://' + url)
    .then(() => {
      document.getElementById('httpsresult').textContent = 'HTTPS is supported.';
    })
    .catch(() => {
      document.getElementById('httpsresult').textContent = 'HTTPS is not supported.';
    });
}

// HTTP Header Viewer
function viewHeaders() {
  const url = document.getElementById('headerurl').value;
  if (!isValidDomain(url)) {
    document.getElementById('headerresult').textContent = 'Invalid domain.';
    return;
  }
  fetch('https://' + url)
    .then(r => {
      let headers = '';
      for (let pair of r.headers.entries()) {
        headers += pair[0] + ': ' + pair[1] + '\n';
      }
      document.getElementById('headerresult').textContent = headers;
    })
    .catch(() => {
      document.getElementById('headerresult').textContent = 'Could not fetch headers.';
    });
}

// WHOIS Lookup
function lookupWHOIS() {
  const domain = document.getElementById('whoisurl').value;
  if (!isValidDomain(domain)) {
    document.getElementById('whoisresult').textContent = 'Invalid domain.';
    return;
  }
  fetch('https://api.api-ninjas.com/v1/whois?domain=' + domain, {
    headers: { 'X-Api-Key': 'demo' }
  })
    .then(r => r.json())
    .then(data => {
      document.getElementById('whoisresult').textContent = JSON.stringify(data, null, 2);
    });
}

// SSL Certificate Info
function lookupSSL() {
  const domain = document.getElementById('sslurl').value;
  if (!isValidDomain(domain)) {
    document.getElementById('sslresult').textContent = 'Invalid domain.';
    return;
  }
  fetch('https://api.ssllabs.com/api/v3/analyze?host=' + domain)
    .then(r => r.json())
    .then(data => {
      document.getElementById('sslresult').textContent = JSON.stringify(data, null, 2);
    });
}

// Random Joke
function getJoke() {
  fetch('https://v2.jokeapi.dev/joke/Programming?type=single')
    .then(r => r.json())
    .then(data => {
      document.getElementById('jokeResult').textContent = data.joke || 'No joke found.';
    });
}

// Tech Quote
function getQuote() {
  fetch('https://api.quotable.io/random?tags=technology')
    .then(r => r.json())
    .then(data => {
      document.getElementById('quoteResult').textContent = data.content || 'No quote found.';
    });
}

// QR Code Generator
function generateQR() {
  const text = document.getElementById('qrinput').value;
  if (!text) return;
  document.getElementById('qrResult').innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}" alt="QR Code">`;
}

// Password Generator
function generatePassword() {
  const len = parseInt(document.getElementById('pwlength').value) || 12;
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
  let pass = '';
  for (let i = 0; i < len; i++) pass += chars[Math.floor(Math.random() * chars.length)];
  document.getElementById('pwResult').textContent = pass;
}

// Base64 Encode/Decode
function encodeBase64() {
  const txt = document.getElementById('b64input').value;
  document.getElementById('b64Result').textContent = btoa(txt);
}
function decodeBase64() {
  const txt = document.getElementById('b64input').value;
  try {
    document.getElementById('b64Result').textContent = atob(txt);
  } catch {
    document.getElementById('b64Result').textContent = 'Invalid Base64.';
  }
}

// Color Picker
function showColor() {
  const val = document.getElementById('colorinput').value;
  document.getElementById('colorResult').textContent = val;
}

// HTTP Status Code Lookup
function lookupHTTPCode() {
  const code = document.getElementById('httpcodeinput').value;
  const codes = {
    200: 'OK', 301: 'Moved Permanently', 302: 'Found', 400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not Found', 500: 'Internal Server Error', 502: 'Bad Gateway', 503: 'Service Unavailable'
  };
  document.getElementById('httpcodeResult').textContent = codes[code] || 'Unknown code.';
}
