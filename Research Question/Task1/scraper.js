const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    "https://www.goodschools.com.au/compare-schools/search/in-victoria/secondary?page=1",
    { waitUntil: "domcontentloaded" }
  );
  const SEL = "div.col-md-7";
  await page.waitForSelector(SEL, { timeout: 500 });
  const raw = await page.$$eval(SEL, (items) => {
    const arr = [];
    for (let i = 0; i < items.length; i++) {
      const wrapper = items[i];
      const anchor = wrapper.querySelector('div.media-body a[rel="canonical"]');
      let name = "";
      let location = "";
      let postcode = "";
      let sector = "";

      if (anchor) {
        const h5 = anchor.querySelector("h5");
        if (h5) name = h5.textContent.trim();
        const href = anchor.getAttribute("href") || "";
        const match = href.match(/in-[^/]+-(\d{4})\//);
        if (match) postcode = match[1];
      }

      const locElem = wrapper.querySelector("div.media-body p.primary-site");
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

      if (name && location && postcode) {
        arr.push({ name, location, postcode, sector });
      }
    }
    return arr;
  });

  const uniqueMap = new Map();
  raw.forEach((item) => {
    const key = [item.name, item.location, item.postcode, item.sector].join(
      "|"
    );
    if (!uniqueMap.has(key)) uniqueMap.set(key, item);
  });
  const data = [...uniqueMap.values()];

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
