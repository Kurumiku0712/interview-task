# Task2 - **School Recommendation System**

## **Approach to Researching and Selecting Criteria**

The selection of criteria for the school recommendation system was based on a combination of geographical accessibility, academic performance, and school characteristics. The primary factors considered were:

1. **Geolocation (50%)**:
   - Students often prefer schools within a reasonable commuting distance.
   - The Haversine formula was used to calculate the straight-line distance between the student’s location and each school.
2. **Academic Performance (50%)**:
   - **ICSEA (30%)**: Measures the school’s socio-educational advantage, indicating student performance potential.
   - **ATAR Rank (20%)**: Indicates the academic competitiveness of the school, relevant for students aiming for higher education.
3. **School Type and Year Availability**:
   - Schools were filtered based on whether they offered the student’s current year level.
   - Public vs. private school preferences could be incorporated as additional criteria in future iterations.

## **Methods and Technologies Used**

- Data Processing
  - `pandas` for data handling and filtering.
  - `numpy` for numerical computations, including distance calculations.
- Distance Computation
  - The **Haversine formula** was implemented to determine proximity to schools.
- Scoring Algorithm
  - A weighted score was calculated based on distance (50%), ICSEA (30%), and ATAR Rank (20%).
  - Missing ICSEA or ATAR values were handled using mean imputation.
- Output Generation
  - The system exports the top-ranked schools into **CSV** and **JSON** formats for easy interpretation.

## **Validating the Recommender System**

1. Manual Validation
   - Cross-checking whether the top-ranked schools align with known high-performing institutions.
2. Comparison with Student Preferences
   - Testing with different student locations and academic preferences to assess output consistency.
3. User Feedback & Adjustments
   - Incorporating feedback from real students or educators to fine-tune the weightage of different factors.
4. Potential Future Enhancements
   - **Web Interface**: Allowing students to input preferences interactively.
   - **Machine Learning**: Training a recommendation model based on historical student choices.
   - **Public Transport Accessibility**: Factoring in travel times rather than just distance.

