let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open')
}

// script.js
// Function to create a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  
  // Function to get a cookie
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  
  // Function to erase a cookie
  function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }
  
  // Show cookie banner if consent is not given
  window.onload = function() {
    if (!getCookie('cookieConsent')) {
      document.getElementById('cookie-banner').style.display = 'block';
    }
  };
  
  // Add event listener to the accept button
  document.getElementById('accept-cookies').addEventListener('click', function() {
    setCookie('cookieConsent', 'true', 30); // Set cookie for 30 days
    document.getElementById('cookie-banner').style.display = 'none';
  });

  document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesButton = document.getElementById('accept-cookies');
    const closeBannerButton = document.getElementById('close-banner');

    // Check if cookies have already been accepted
    if (localStorage.getItem('cookies-accepted') === 'true') {
        cookieBanner.style.display = 'none';
    } else {
        cookieBanner.style.display = 'block'; // Show the banner if consent is not given
    }

    // Handle accept cookies button click
    acceptCookiesButton.addEventListener('click', function() {
        localStorage.setItem('cookies-accepted', 'true'); // Set consent in localStorage
        cookieBanner.style.display = 'none'; // Hide the banner
        sendConsentData(); // Send consent data to the server
    });

    // Handle close banner button click
    closeBannerButton.addEventListener('click', function() {
        cookieBanner.style.display = 'none'; // Hide the banner without setting consent
    });

    function getDeviceDetails() {
        return {
            userAgent: navigator.userAgent,
            language: navigator.language,
            screenWidth: screen.width,
            screenHeight: screen.height,
        };
    }

    function sendConsentData() {
        fetch('/api/track-consent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                consent: true,
                timestamp: new Date(),
                deviceDetails: getDeviceDetails(),
            }),
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
    }
});