function enableBlock(blockId) {
    // Disable all inputs and selects except for the clicked block
    document
      .querySelectorAll(".block input, .block select")
      .forEach((el) => {
        el.disabled = true;
        el.classList.remove("active");
      });

    // Enable inputs and selects of the clicked block
    document
      .querySelectorAll(`#${blockId} input, #${blockId} select`)
      .forEach((el) => {
        el.disabled = false;
        el.classList.add("active");
      });

    // Automatically focus on the first input of the enabled block
    const firstInput = document.querySelector(`#${blockId} input`);
    if (firstInput) {
      firstInput.focus();
    }
  }

  function clearForm() {
    // Clear all input values and reset dropdowns
    document
      .querySelectorAll(".block input")
      .forEach((input) => (input.value = ""));
    document
      .querySelectorAll(".block select")
      .forEach((select) => (select.selectedIndex = 0));

    // Reset results
    document
      .querySelectorAll(".result")
      .forEach(
        (result) => (result.textContent = "Result will appear here")
      );

    // Disable all inputs and selects
    document
      .querySelectorAll(".block input, .block select")
      .forEach((el) => (el.disabled = true));
  }

  function resetOtherResults(selectedBlock) {
    // Reset all result fields except the selected block
    document.querySelectorAll(".block").forEach((block) => {
      if (block.id !== selectedBlock) {
        const result = block.querySelector(".result");
        if (result) {
          result.textContent = "Result will appear here";
        }
      }
    });
  }

  function convertValues() {
    // Find the active block (the one currently enabled)
    const activeBlock = document
      .querySelector(".block .active")
      ?.closest(".block");
    if (!activeBlock) return;

    // Get the ID of the active block
    const activeBlockId = activeBlock.id;

    // Reset other results
    resetOtherResults(activeBlockId);

    // Time Conversion
    if (activeBlockId === "time-block") {
      const timeValue = parseFloat(
        document.getElementById("time-value").value
      );
      const timeUnitFrom = document.getElementById("time-unit-from").value;
      const timeUnitTo = document.getElementById("time-unit-to").value;

      if (!isNaN(timeValue) && timeUnitFrom && timeUnitTo) {
        let convertedTime;
        if (timeUnitFrom === "seconds") {
          convertedTime =
            timeUnitTo === "minutes"
              ? timeValue / 60
              : timeUnitTo === "hours"
              ? timeValue / 3600
              : timeValue;
        } else if (timeUnitFrom === "minutes") {
          convertedTime =
            timeUnitTo === "seconds"
              ? timeValue * 60
              : timeUnitTo === "hours"
              ? timeValue / 60
              : timeValue;
        } else {
          convertedTime =
            timeUnitTo === "seconds"
              ? timeValue * 3600
              : timeValue === "minutes"
              ? timeValue * 60
              : timeValue;
        }
        document.getElementById(
          "time-result"
        ).textContent = `Result: ${convertedTime} ${timeUnitTo}`;
      } else {
        document.getElementById("time-result").textContent =
          "Invalid input. Please enter a numeric value.";
      }
    }

    // Temperature Conversion
    if (activeBlockId === "temperature-block") {
      const tempValue = parseFloat(
        document.getElementById("temperature-value").value
      );
      const tempUnitFrom = document.getElementById(
        "temperature-unit-from"
      ).value;
      const tempUnitTo = document.getElementById(
        "temperature-unit-to"
      ).value;

      if (!isNaN(tempValue) && tempUnitFrom && tempUnitTo) {
        let convertedTemp;
        if (tempUnitFrom === "celsius") {
          convertedTemp =
            tempUnitTo === "fahrenheit"
              ? (tempValue * 9) / 5 + 32
              : tempUnitTo === "kelvin"
              ? tempValue + 273.15
              : tempValue;
        } else if (tempUnitFrom === "fahrenheit") {
          convertedTemp =
            tempUnitTo === "celsius"
              ? ((tempValue - 32) * 5) / 9
              : tempUnitTo === "kelvin"
              ? ((tempValue - 32) * 5) / 9 + 273.15
              : tempValue;
        } else {
          convertedTemp =
            tempUnitTo === "celsius"
              ? tempValue - 273.15
              : tempUnitTo === "fahrenheit"
              ? ((tempValue - 273.15) * 9) / 5 + 32
              : tempValue;
        }

        // Check if converting to Celsius to add "degrees"
        if (tempUnitTo === "celsius") {
          document.getElementById(
            "temperature-result"
          ).textContent = `Result: ${convertedTemp.toFixed(
            2
          )} degrees Celsius`;
        } else {
          document.getElementById(
            "temperature-result"
          ).textContent = `Result: ${convertedTemp.toFixed(
            2
          )} ${tempUnitTo}`;
        }
      } else {
        document.getElementById("temperature-result").textContent =
          "Invalid input. Please enter a numeric value.";
      }
    }

    // Weight/Mass Conversion
    if (activeBlockId === "weight-block") {
      const weightValue = parseFloat(
        document.getElementById("weight-value").value
      );
      const weightUnitFrom =
        document.getElementById("weight-unit-from").value;
      const weightUnitTo = document.getElementById("weight-unit-to").value;

      if (!isNaN(weightValue) && weightUnitFrom && weightUnitTo) {
        const weightConversions = {
          grams: 1,
          kilograms: 1000,
          pounds: 453.592,
        };
        const convertedWeight =
          (weightValue * weightConversions[weightUnitFrom]) /
          weightConversions[weightUnitTo];
        document.getElementById(
          "weight-result"
        ).textContent = `Result: ${convertedWeight.toFixed(
          2
        )} ${weightUnitTo}`;
      } else {
        document.getElementById("weight-result").textContent =
          "Invalid input. Please enter a numeric value.";
      }
    }

    // Speed Conversion
    if (activeBlockId === "speed-block") {
      const speedValue = parseFloat(
        document.getElementById("speed-value").value
      );
      const speedUnitFrom =
        document.getElementById("speed-unit-from").value;
      const speedUnitTo = document.getElementById("speed-unit-to").value;

      if (!isNaN(speedValue) && speedUnitFrom && speedUnitTo) {
        let convertedSpeed;
        if (speedUnitFrom === "mps") {
          convertedSpeed =
            speedUnitTo === "kmph"
              ? speedValue * 3.6
              : speedUnitTo === "mph"
              ? speedValue * 2.237
              : speedValue;
        } else if (speedUnitFrom === "kmph") {
          convertedSpeed =
            speedUnitTo === "mps"
              ? speedValue / 3.6
              : speedUnitTo === "mph"
              ? speedValue / 1.609
              : speedValue;
        } else if (speedUnitFrom === "mph") {
          convertedSpeed =
            speedUnitTo === "mps"
              ? speedValue / 2.237
              : speedUnitTo === "kmph"
              ? speedValue * 1.60934
              : speedValue;
        }
        document.getElementById(
          "speed-result"
        ).textContent = `Result: ${convertedSpeed.toFixed(
          2
        )} ${speedUnitTo}`;
      } else {
        document.getElementById("speed-result").textContent =
          "Invalid input. Please enter a numeric value.";
      }
    }

    // Length Conversion
    if (activeBlockId === "length-block") {
      const lengthValue = parseFloat(
        document.getElementById("length-value").value
      );
      const lengthUnitFrom =
        document.getElementById("length-unit-from").value;
      const lengthUnitTo = document.getElementById("length-unit-to").value;

      if (!isNaN(lengthValue) && lengthUnitFrom && lengthUnitTo) {
        const lengthConversions = {
          millimeters: 1,
          centimeters: 10,
          meters: 1000,
          kilometers: 1000000,
        };
        const convertedLength =
          (lengthValue * lengthConversions[lengthUnitFrom]) /
          lengthConversions[lengthUnitTo];
        document.getElementById(
          "length-result"
        ).textContent = `Result: ${convertedLength.toFixed(
          2
        )} ${lengthUnitTo}`;
      } else {
        document.getElementById("length-result").textContent =
          "Invalid input. Please enter a numeric value.";
      }
    }
  }

  // Add event listeners to enable block inputs when a block is clicked
  document.querySelectorAll(".block").forEach((block) => {
    block.addEventListener("click", () => enableBlock(block.id));
  });

  // Allow interaction with enabled inputs and selects
  document.querySelectorAll(".block input, .block select").forEach((el) => {
    el.addEventListener("focus", () => {
      const parentBlock = el.closest(".block");
      enableBlock(parentBlock.id);
    });
  });

  let currentSlideIndex = 0;
  const slides = document.querySelectorAll(".slideshow-container .slide");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? 1 : 0; // Only show the current slide
    });
  }

  function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
  }

  // Start the slideshow automatically
  setInterval(nextSlide, 3000); // Change slide every 3 seconds

  // Show the first slide
  showSlide(currentSlideIndex);