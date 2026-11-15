// ============================================
// SR Nivas — page code
// Each page's <body> has data-page="..." so we
// know which part of this file to run.
// ============================================

// Footer year (runs on every page)
document.getElementById("year").textContent = new Date().getFullYear();

const page = document.body.dataset.page;

// ---------- Makes the HTML for one home card ----------
function makeCard(home) {
  const badge = home.available
    ? '<span class="badge badge-free">Available</span>'
    : '<span class="badge badge-taken">Rented out</span>';

  return `
    <div class="col-sm-6 col-lg-4">
      <a href="home.html?id=${home.id}" class="card home-card">
        <div class="position-relative">
          <img src="${home.image}" class="card-img-top" alt="${home.name}">
          <span class="badge badge-type position-absolute top-0 start-0 m-3">${home.type}</span>
          <span class="position-absolute top-0 end-0 m-3">${badge}</span>
        </div>
        <div class="card-body p-4">
          <h3 class="h4">${home.name}</h3>
          <p class="text-soft small">${home.summary}</p>
          <p class="small text-soft mb-3">
            <i class="bi bi-door-open"></i> ${home.bedrooms} bed ·
            <i class="bi bi-droplet"></i> ${home.bathrooms} bath ·
            <i class="bi bi-arrows-fullscreen"></i> ${home.area} sq ft
          </p>
          <p class="price mb-0">${formatRupees(home.rent)} <span class="small text-soft fw-normal">/ month</span></p>
        </div>
      </a>
    </div>`;
}

// ---------- Home page: show the first 3 homes ----------
if (page === "home") {
  const box = document.getElementById("featured-list");
  box.innerHTML = rentals.slice(0, 3).map(makeCard).join("");
}

// ---------- Rentals page: all homes + filter buttons ----------
if (page === "rentals") {
  const box = document.getElementById("rental-list");
  const buttons = document.querySelectorAll("#filters button");

  function showHomes(type) {
    const list = type === "All" ? rentals : rentals.filter(h => h.type === type);
    box.innerHTML = list.length
      ? list.map(makeCard).join("")
      : '<p class="text-soft">No homes of this size right now.</p>';
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      showHomes(button.dataset.type);
    });
  });

  showHomes("All");
}

// ---------- Details page: read ?id= from the address ----------
if (page === "details") {
  const box = document.getElementById("home-details");
  const id = new URLSearchParams(window.location.search).get("id");
  const home = rentals.find(h => h.id === id);

  if (!home) {
    box.innerHTML = `
      <h1>Home not found</h1>
      <p class="text-soft">This home may have been removed.</p>
      <a href="rentals.html" class="btn btn-terra rounded-pill">See all homes</a>`;
  } else {
    document.title = home.name + " — SR Nivas";
    const amenities = home.amenities
      .map(a => `<div class="col-6 amenity mb-2"><i class="bi bi-check-circle-fill"></i> ${a}</div>`)
      .join("");

    box.innerHTML = `
      <a href="rentals.html" class="text-terra fw-semibold">← Back to all homes</a>
      <div class="row g-5 mt-1">
        <div class="col-lg-8">
          <img src="${home.image}" alt="${home.name}" class="detail-img">
          <p class="eyebrow mt-4">${home.type} · ${home.furnishing}</p>
          <h1 class="display-5">${home.name}</h1>
          <p class="lead text-soft">${home.summary}</p>

          <div class="row g-3 my-3">
            <div class="col-6 col-md-3"><div class="fact"><i class="bi bi-door-open"></i><p class="fw-bold">${home.bedrooms}</p><p class="small text-soft">Bedrooms</p></div></div>
            <div class="col-6 col-md-3"><div class="fact"><i class="bi bi-droplet"></i><p class="fw-bold">${home.bathrooms}</p><p class="small text-soft">Bathrooms</p></div></div>
            <div class="col-6 col-md-3"><div class="fact"><i class="bi bi-arrows-fullscreen"></i><p class="fw-bold">${home.area}</p><p class="small text-soft">Sq ft</p></div></div>
            <div class="col-6 col-md-3"><div class="fact"><i class="bi bi-house-heart"></i><p class="fw-bold">${home.furnishing.split(" ")[0]}</p><p class="small text-soft">Furnished</p></div></div>
          </div>

          <h2 class="h3 mt-4">What's included</h2>
          <div class="row mt-3">${amenities}</div>
        </div>

        <div class="col-lg-4">
          <div class="rent-box">
            <p class="label-small">Monthly rent</p>
            <p class="big-price mb-0">${formatRupees(home.rent)}</p>
            <p class="text-soft">Deposit: ${formatRupees(home.deposit)}</p>
            <p>${home.available
              ? '<span class="badge badge-free">Available now</span>'
              : '<span class="badge badge-taken">Currently rented out</span>'}</p>
            <a href="contact.html?home=${encodeURIComponent(home.name)}" class="btn btn-terra btn-lg rounded-pill w-100 mt-2">Book a visit</a>
          </div>
        </div>
      </div>`;
  }
}

// ---------- Contact page: form ----------
if (page === "contact") {
  const form = document.getElementById("visit-form");
  const thanks = document.getElementById("thank-you");

  // If we came from a home page, fill in the home's name
  const homeName = new URLSearchParams(window.location.search).get("home");
  if (homeName) document.getElementById("home").value = homeName;

  // When the form is sent, give the details to our Java server.
  form.addEventListener("submit", async event => {
    event.preventDefault();          // stop the page from reloading
    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    button.textContent = "Sending...";

    const visit = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      home: document.getElementById("home").value,
      message: document.getElementById("message").value
    };

    try {
      const response = await fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visit)
      });
      if (!response.ok) throw new Error("Server said no");
      form.classList.add("d-none");      // hide the form
      thanks.classList.remove("d-none"); // show "Thank you!"
    } catch (error) {
      alert("Sorry, your message could not be sent. Please try again.");
    } finally {
      button.disabled = false;
      button.textContent = "Send message";
    }
  });

  document.getElementById("send-another").addEventListener("click", () => {
    form.reset();
    thanks.classList.add("d-none");
    form.classList.remove("d-none");
  });
}
