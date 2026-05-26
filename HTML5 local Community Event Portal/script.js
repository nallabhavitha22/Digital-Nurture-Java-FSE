let formStarted = false;

window.addEventListener("load", function () {
  document.getElementById("pageLoader").classList.add("hide");

  const savedEvent = localStorage.getItem("preferredEventType");
  const eventType = document.getElementById("eventType");
  const form = document.getElementById("eventForm");

  if (savedEvent && eventType) {
    eventType.value = savedEvent;
    showEventFee();
  }

  form.addEventListener("input", function () {
    formStarted = true;
    sessionStorage.setItem("formStarted", "true");
  });

  setupScrollAnimations();
  setupActiveNavigation();

  console.log("Local Community Event Portal loaded successfully");
});

window.onbeforeunload = function () {
  if (formStarted) {
    return "You have unfinished form changes. Are you sure you want to leave?";
  }
};

document.getElementById("menuBtn").addEventListener("click", function () {
  document.getElementById("navLinks").classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(function (link) {
  link.addEventListener("click", function () {
    document.getElementById("navLinks").classList.remove("open");
  });
});

function submitForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const eventType = document.getElementById("eventType").value;
  const confirmationMessage = document.getElementById("confirmationMessage");

  if (!name || !eventType) {
    confirmationMessage.textContent = "Please complete all required fields.";
    confirmationMessage.style.color = "#ef4444";
    return;
  }

  localStorage.setItem("preferredEventType", eventType);
  sessionStorage.setItem("lastRegisteredUser", name);

  confirmationMessage.style.color = "#047857";
  confirmationMessage.textContent = "Thank you, " + name + ". Your registration has been submitted successfully.";

  formStarted = false;

  console.log("Form submitted successfully");
  console.log("Selected event:", eventType);
}

function validatePhone() {
  const phone = document.getElementById("phone").value.trim();
  const phoneError = document.getElementById("phoneError");
  const phonePattern = /^[0-9]{10}$/;

  if (phone === "") {
    phoneError.textContent = "";
  } else if (!phonePattern.test(phone)) {
    phoneError.textContent = "Enter a valid 10-digit phone number.";
    phoneError.style.color = "#ef4444";
  } else {
    phoneError.textContent = "Valid phone number.";
    phoneError.style.color = "#047857";
  }
}

function showEventFee() {
  const eventType = document.getElementById("eventType").value;
  const feeDisplay = document.getElementById("feeDisplay");

  const fees = {
    cleanup: "Free",
    music: "Rs. 200",
    food: "Rs. 150",
    health: "Free"
  };

  if (eventType) {
    localStorage.setItem("preferredEventType", eventType);
    feeDisplay.textContent = fees[eventType];
  } else {
    feeDisplay.textContent = "Select an event";
  }

  console.log("Selected event fee:", feeDisplay.textContent);
}

function buttonConfirmation() {
  console.log("Registration button clicked");
}

function enlargeImage(image) {
  image.classList.toggle("large");
}

function countCharacters() {
  const feedbackText = document.getElementById("feedbackText").value;
  document.getElementById("charCount").textContent = feedbackText.length;

  console.log("Feedback characters:", feedbackText.length);
}

function videoReady() {
  document.getElementById("videoMessage").textContent = "Video ready to play.";
  console.log("Video ready to play");
}

function clearPreferences() {
  localStorage.clear();
  sessionStorage.clear();

  document.getElementById("eventType").value = "";
  document.getElementById("feeDisplay").textContent = "Select an event";
  document.getElementById("confirmationMessage").textContent = "";

  alert("Preferences cleared successfully.");
  console.log("localStorage and sessionStorage cleared");
}

function findNearbyEvents() {
  const locationResult = document.getElementById("locationResult");

  if (!navigator.geolocation) {
    locationResult.textContent = "Geolocation is not supported by this browser.";
    return;
  }

  locationResult.textContent = "Finding your location...";

  navigator.geolocation.getCurrentPosition(
    function (position) {
      const latitude = position.coords.latitude.toFixed(5);
      const longitude = position.coords.longitude.toFixed(5);

      locationResult.textContent = "Latitude: " + latitude + " | Longitude: " + longitude;

      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
    },
    function (error) {
      if (error.code === error.PERMISSION_DENIED) {
        locationResult.textContent = "Location permission was denied.";
      } else if (error.code === error.TIMEOUT) {
        locationResult.textContent = "Location request timed out.";
      } else {
        locationResult.textContent = "Unable to retrieve your location.";
      }

      console.log("Geolocation error:", error.message);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}

function setupScrollAnimations() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach(function (element) {
    observer.observe(element);
  });
}

function setupActiveNavigation() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", function () {
    let currentSection = "";

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;

      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  });
}