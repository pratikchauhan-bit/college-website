const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    menuToggle.textContent =
      mainNav.classList.contains("open") ? "✕" : "☰";
  });

  document.querySelectorAll("#mainNav a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.textContent = "☰";
    });
  });
}


// Highlight navigation item while scrolling
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll("#mainNav a")];

window.addEventListener("scroll", () => {
  const current = sections.reduce((active, section) => {
    const top = section.getBoundingClientRect().top;
    return top <= 130 ? section.id : active;
  }, "home");

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + current
    );
  });
});


// Search
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function doSearch() {

  if (!searchInput) return;

  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    searchInput.focus();
    return;
  }

  const searchable = [
    ...document.querySelectorAll(
      "main h2, main h3, main p, main a"
    )
  ];

  const match = searchable.find(el =>
    el.textContent.toLowerCase().includes(query)
  );

  if (match) {

    match.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    match.style.transition = "background .3s";
    match.style.background = "#fff2a8";

    setTimeout(() => {
      match.style.background = "";
    }, 1200);

  } else {

    alert(
      "No matching content found. Please try another search."
    );

  }
}


if (searchBtn) {
  searchBtn.addEventListener("click", doSearch);
}


if (searchInput) {
  searchInput.addEventListener("keydown", e => {

    if (e.key === "Enter") {
      doSearch();
    }

  });
}



// =====================================================
// GOOGLE SHEETS CONTACT FORM
// =====================================================

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwSe1PCr9VQhaTHbXKGKM7HNsjxogzs7WF8QuarLxqK3I0FELh7JZqQE0ffQopWdmwMXw/exec";


const contactForm =
  document.getElementById("collegeContactForm");


if (contactForm) {

  contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    const submitButton =
      contactForm.querySelector(".contact-submit");


    const originalText =
      submitButton
        ? submitButton.innerHTML
        : "Send Message";


    if (submitButton) {

      submitButton.disabled = true;
      submitButton.innerHTML = "Sending...";

    }


    // Get form data
    const formData = new URLSearchParams();


    formData.append(
      "name",
      document.getElementById("contactName")?.value.trim() || ""
    );


    formData.append(
      "phone",
      document.getElementById("contactPhone")?.value.trim() || ""
    );


    formData.append(
      "email",
      document.getElementById("contactEmail")?.value.trim() || ""
    );


    formData.append(
      "course",
      document.getElementById("courseInterest")?.value || ""
    );


    formData.append(
      "message",
      document.getElementById("contactMessage")?.value.trim() || ""
    );


    try {

      await fetch(GOOGLE_SCRIPT_URL, {

        method: "POST",

        mode: "no-cors",

        body: formData

      });


      alert(
        "✅ your enquiry has been successfully submitted"
      );


      contactForm.reset();


    } catch (error) {

      console.error(
        "Google Sheets submission error:",
        error
      );


      alert(
        "❌ There is an error please try again!"
      );

    }


    if (submitButton) {

      submitButton.disabled = false;

      submitButton.innerHTML = originalText;

    }

  });

}



// Footer Year
const yearElement =
  document.getElementById("year");


if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}