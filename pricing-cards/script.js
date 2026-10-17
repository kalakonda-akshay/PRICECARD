(function () {
  var sw = document.getElementById("billing-switch");
  var labelMonthly = document.getElementById("label-monthly");
  var labelYearly = document.getElementById("label-yearly");
  var chip = document.getElementById("save-chip");
  var cards = document.querySelectorAll(".card");
  var toast = document.getElementById("toast");
  var toastTimer = null;

  var yearly = false;

  // Write the price and billing note for the current cycle into one card
  function paint(card) {
    var amount = card.querySelector(".amount");
    var billed = card.querySelector(".billed");
    amount.textContent = yearly ? card.dataset.yearly : card.dataset.monthly;
    billed.textContent = yearly
      ? "Billed $" + card.dataset.yearlyTotal + " yearly"
      : "Billed monthly";
  }

  function setCycle(nextYearly) {
    yearly = nextYearly;
    sw.setAttribute("aria-checked", String(yearly));
    labelMonthly.classList.toggle("active", !yearly);
    labelYearly.classList.toggle("active", yearly);
    chip.classList.toggle("on", yearly);

    cards.forEach(function (card) {
      var amount = card.querySelector(".amount");
      amount.classList.add("swap");            // fade the old number out
      setTimeout(function () {
        paint(card);                            // swap the text while invisible
        amount.classList.remove("swap");        // fade the new number in
      }, 150);
    });
  }

  // Click on the switch toggles the cycle
  sw.addEventListener("click", function () { setCycle(!yearly); });

  // Click on either text label picks that cycle
  labelMonthly.addEventListener("click", function () { setCycle(false); });
  labelYearly.addEventListener("click", function () { setCycle(true); });

  // Call to action buttons: show a confirmation instead of navigating
  document.querySelectorAll(".cta").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      toast.textContent = link.dataset.plan + " plan selected, billed " + (yearly ? "yearly" : "monthly") + ".";
      toast.hidden = false;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toast.hidden = true; }, 2400);
    });
  });

  // Initial state
  labelMonthly.classList.add("active");
  cards.forEach(paint);
})();
