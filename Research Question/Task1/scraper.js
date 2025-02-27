const puppeteer = require("puppeteer");
const fs = require("fs");
const { parse } = require("json2csv");

// Scrapes GoodSchools website for secondary schools in Victoria and exports results to JSON and CSV files.
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const results = [];

  // Scrape 5 pages of results (each page contains 10 schools)
  for (let pageNum = 1; pageNum <= 5; pageNum++) {
    const page = await browser.newPage();
    await page.goto(
      `https://www.goodschools.com.au/compare-schools/search/in-victoria/secondary?page=${pageNum}`,
      { waitUntil: "domcontentloaded", timeout: 60000 }
    );
    const SEL = "div.col-md-7";
    await page.waitForSelector(SEL, { timeout: 500 });

    const schools = await page.$$eval(SEL, (items) =>
      items
        .map((wrapper) => {
          const anchor = wrapper.querySelector(
            'div.media-body a[rel="canonical"]'
          );
          let name = "",
            location = "",
            postcode = "",
            sector = "",
            url = "";

          if (anchor) {
            const h5 = anchor.querySelector("h5");
            if (h5) name = h5.textContent.trim();
            url = anchor.getAttribute("href") || "";
            const match = url.match(/in-[^/]+-(\d{4})\//);
            if (match) postcode = match[1];
          }

          const locElem = wrapper.querySelector(
            "div.media-body p.primary-site"
          );
          if (locElem) location = locElem.textContent.trim();

          const sectorDiv = Array.from(
            wrapper.querySelectorAll("div.col-md-3.col-6.small")
          ).find((div) => {
            const b = div.querySelector("b");
            return b && b.textContent.trim() === "Sector";
          });
          if (sectorDiv) {
            const br = sectorDiv.querySelector("br");
            if (br && br.nextSibling) {
              sector = br.nextSibling.textContent.trim();
            }
          }

          return name && location && postcode
            ? { name, location, postcode, sector, url }
            : null;
        })
        .filter(Boolean)
    );

    // Scrape academic results for each school
    for (const school of schools) {
      const schoolPage = await browser.newPage();
      await schoolPage.goto(school.url, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });

      let academicResults = {};
      try {
        academicResults = await schoolPage.$$eval(
          ".col-md-6.col-sm-6.col-6",
          (sections) => {
            const result = {};
            sections.forEach((section) => {
              if (
                section
                  .querySelector("h4")
                  ?.textContent.includes("Academic Results")
              ) {
                const items = section.querySelectorAll("p");
                items.forEach((p) => {
                  const text = p.textContent.trim();
                  const match = text.match(/(.+?):\s*(\d+%?)/);
                  if (match) {
                    result[match[1].trim()] = match[2];
                  }
                });
              }
            });
            return result;
          }
        );
      } catch (error) {}

      // Scrape location coordinates for each school
      let latitude = "",
        longitude = "";
      try {
        const locationPage = await browser.newPage();
        await locationPage.goto(`${school.url}/location`, {
          waitUntil: "domcontentloaded",
          timeout: 60000,
        });

        const responsePromise = new Promise((resolve) => {
          locationPage.on("response", async (response) => {
            if (response.url().includes("GetViewportInfo")) {
              try {
                const json = await response.json();
                if (
                  Array.isArray(json) &&
                  json.length > 1 &&
                  Array.isArray(json[1])
                ) {
                  const coords = json[1].find(
                    (entry) => entry[0] === "obliques"
                  );
                  if (coords && coords[1] && coords[1].length > 0) {
                    latitude = coords[1][0][0];
                    longitude = coords[1][0][1];
                  }
                }
              } catch (err) {}
              resolve();
            }
          });
        });

        await responsePromise;
        await locationPage.close();
      } catch (error) {}

      // Save results
      results.push({
        name: school.name,
        location: school.location,
        postcode: school.postcode,
        sector: school.sector,
        latitude,
        longitude,
        "Scores of 40+": academicResults["Scores of 40+"] || "",
        "Median Score": academicResults["Median Score"] || "",
        "Satisfactory completions of VCE":
          academicResults["Satisfactory completions of VCE"] || "",
        "Satisfactory completions of VET":
          academicResults["Satisfactory completions of VET"] || "",
      });
      await schoolPage.close();
    }
  }

  // Save results to JSON and CSV files
  fs.writeFileSync(
    "vic_secondary_schools.json",
    JSON.stringify(results, null, 2)
  );

  const csv = parse(results);
  fs.writeFileSync("vic_secondary_schools.csv", csv);

  await browser.close();
})();
