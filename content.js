console.log("Extension script loaded");

// Function to process divs with 'relative group' classes
function processDivs() {
  const targetDivs = document.querySelectorAll("div.relative.group");

  console.log(`Found ${targetDivs.length} div(s) with 'relative group' classes`);

  targetDivs.forEach((div) => {
    // Skip if already processed
    if (div.dataset.processed === "true") return;

    div.dataset.processed = "true"; // Mark as processed

    // Find the first child with the class 'flex items-center gap-1' to append the button to
    const firstFlexChild = div.querySelector("div.flex.items-center.gap-1");
    if (firstFlexChild) {
      // Create a new button for "Contract Address"
      const contractButton = document.createElement("button");
      contractButton.innerText = "Contract Address"; // Set button text to "Contract Address"
      contractButton.style.color = "white"; // Set text color to white
      contractButton.style.border = "2px solid white"; // Add a white border
      contractButton.style.padding = "10px 15px"; // Add padding for the button
      contractButton.style.cursor = "pointer"; // Change cursor to pointer on hover
      contractButton.style.zIndex = "9999"; // Make sure the button is clickable on top
      contractButton.style.position = "relative"; // Ensure the button is positioned correctly
      contractButton.style.backgroundColor = "transparent"; // Remove background color

      // Get the link and clean the href for copying
      const link = div.querySelector("a");
      if (link && link.href) {
        const cleanHref = link.href.replace("https://pump.fun/coin/", ""); // Clean href for clipboard

        // Add click event to copy the href to the clipboard
        contractButton.addEventListener("click", (event) => {
          event.stopPropagation(); // Prevent propagation to avoid triggering other actions
          event.preventDefault(); // Ensure no navigation happens

          // Copy the cleaned href to the clipboard
          navigator.clipboard.writeText(cleanHref).then(() => {
            contractButton.innerText = "Copied"; // Change button text to "Copied"
            setTimeout(() => {
              contractButton.innerText = "Contract Address"; // Reset text after 2 seconds
            }, 2000);
          }).catch((err) => {
            console.error("Failed to copy: ", err);
          });
        });
      }

      console.log("Appending Contract Address button...");
      firstFlexChild.appendChild(contractButton); // Append the button as the new content
    } else {
      console.log("No flex items found in:", div);
    }

    // Remove the old "CA" button, if it exists
    const oldCaButton = div.querySelector("button");
    if (oldCaButton) {
      console.log("Removing old 'CA' button...");
      oldCaButton.remove(); // Remove the old "CA" button
    }
  });
}

// Initial processing
processDivs();

// Set up a MutationObserver to monitor for dynamically added elements
const observer = new MutationObserver(() => {
  processDivs(); // Re-check for new matching elements
});

// Start observing the document for changes
observer.observe(document.body, { childList: true, subtree: true });
