/**********************************************
 * checkConnection.js
 *
 * This file demonstrates how to check internet
 * connection quality using Node.js built-in fetch
 * (Node v22.13.1)
 **********************************************/

// Threshold and timeout values for checking connection quality
const THRESHOLD_MS = 500;
const TIMEOUT_MS = 5000;

/**
 * checkConnection
 * @param {string} uri - The URI to fetch.
 * @returns {Promise<"good" | "fine" | "terrible">} Internet connection quality:
 *   - "good": The request completed within 500ms.
 *   - "fine": The request completed between 501ms and 5000ms.
 *   - "terrible": The request failed or timed out after 5000ms.
 */
async function checkConnection(uri) {
  // Create an AbortController with signal (false as default value)
  const ac = new AbortController();
  const startTime = performance.now();

  // Set a timer to abort the request if it doesn't complete within 5000ms
  const timeoutId = setTimeout(() => {
    ac.abort();
  }, TIMEOUT_MS);

  try {
    // Perform the fetch with the AbortController signal (fetch listens to the signal)
    const response = await fetch(uri, { signal: ac.signal });
    const duration = performance.now() - startTime;
    const condition = duration < THRESHOLD_MS ? "good" : "fine";
    console.log(`Connection Time (${uri}): ${duration.toFixed(3)}ms`);
    console.log(`Connection Condition: ${condition} \n`);

    // Return "good" if the request completed within 500ms, "fine" if between 501ms and 5000ms
    return condition;
  } catch (error) {
    console.log(`Connection Time (${uri}): Over 5000ms`);
    console.log(`Connection Condition: terrible \n`);
    // If an error occurs ("AbortError", DNS error, connection refused, etc.), return "terrible"
    return "terrible";
  } finally {
    // Clear the timeout to prevent the abort signal from being sent
    // after the fetch request has already completed or failed.
    clearTimeout(timeoutId);
  }
}

/**********************************************
 * Test code
 **********************************************/
async function main() {
  console.log("Running tests..." + "\n");

  // Define all the test URIs
  const testURIs = [
    { uri: "https://www.google.com" },
    { uri: "https://this-domain-should-not-exist-zzzzz.com" },
    { uri: "https://www.webkaka.com/" },
    { uri: "https://github.com" },
    { uri: "https://www.bilibili.com/" },
    { uri: "https://www.mihoyo.com/" },
  ];

  // Run all the tests
  for (const { uri } of testURIs) {
    try {
      await checkConnection(uri);
    } catch (err) {
      console.error(`Connection Condition (${uri}) error:`, err);
    }
  }

  console.log(
    "-------------------------------------------------------------------"
  );
}

main();
