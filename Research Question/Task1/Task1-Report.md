# Task1 - **Web Scraping Report**

## **Overview**

This was my first experience with web scraping. Initially, I considered using Python, but after some research, I discovered the Puppeteer package in Node.js. I watched a few YouTube tutorials and learned how to extract data by inspecting elements in the browser console. With the help of AI tools, I iteratively built and refined the project.



## **Tools & Libraries Used**

- **Puppeteer (Node.js)**: For automating web interactions and data extraction.
- **fs (File System Module)**: To write the extracted data to JSON and CSV files.
- **json2csv**: For converting JSON data into CSV format.



## **Approach**

1. **Extracting Basic Data**:
   - Started by scraping the first page, extracting 10 entries with `name`, `location`, and `sector`.
   - Printed results to the console for validation.
2. **Data Cleaning & Enhancement**:
   - Identified and removed duplicate entries.
   - Extracted `postcode` from the `<a>` tag's URL.
   - Followed the extracted URL to scrape `academic results` from the detailed page.
3. **Geolocation Data**:
   - Found that `location` alone might not be sufficient, so I attempted to retrieve latitude and longitude.
   - Checked HTML elements but did not find coordinate data.
   - Explored network requests and identified a Google Maps API call.
   - Extracted the first set of coordinates from the API response, though only some pages provided this data successfully.
4. **Scaling the Scraper**:
   - Adjusted the URL parameter to iterate through `page=1` to `page=5`, collecting a total of 50 entries.
   - Stored the results in both JSON and CSV formats for further use.



## **Challenges & Potential Issues**

1. **Inconsistent Data Availability**
   - Not all schools had complete academic results or geolocation data.
2. **Google Maps API Response Handling**
   - The API response structure was complex, making it unclear which data points were most reliable.
   - Further analysis of the API response could improve data accuracy.
3. **Website Structure & Anti-Scraping Measures**
   - Websites may change their structure, breaking existing selectors.
   - The site could implement anti-bot measures, requiring additional handling
4. **Performance Considerations**
   - Opening new pages for each request is resource-intensive.



## **Conclusion**

This project provided hands-on experience with web scraping, from basic data extraction to handling multi-page navigation and working with network requests. While the solution works well for now, improvements in handling geolocation data and optimising request efficiency would make it more robust.