import pandas as pd
import numpy as np
from math import radians, sin, cos, sqrt, atan2

# Calculate Haversine distance (in km)
def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Earth's radius in km
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c

# Load dataset
df = pd.read_csv("wa_secondary_schools.csv")

# Assume student location (Example: Perth city centre)
student_location = (-31.9505, 115.8605)  # Latitude, Longitude

# Calculate the distance from the student’s location to each school
df['Distance_km'] = df.apply(lambda row: haversine(student_location[0], student_location[1], row['Latitude'], row['Longitude']), axis=1)

# Filter schools that provide Year 10 education
df_filtered = df[df['Y10'].notnull()].copy()  # Ensure df_filtered is a copy

# Compute school ranking score (Distance 50%, ICSEA 30%, ATAR Rank 20%)
df_filtered['Score'] = (
    (1 / (df_filtered['Distance_km'] + 1)) * 50 +
    (df_filtered['ICSEA'].fillna(df_filtered['ICSEA'].mean()) / df_filtered['ICSEA'].max()) * 30 +
    ((df_filtered['ATAR Rank'].max() - df_filtered['ATAR Rank'].fillna(df_filtered['ATAR Rank'].max())) / df_filtered['ATAR Rank'].max()) * 20
)

# Sort and select the top 5 recommended schools
top_schools = df_filtered.sort_values(by='Score', ascending=False).head(5)

# Save recommendations
top_schools.to_csv("recommended_schools.csv", index=False)
top_schools.to_json("recommended_schools.json", orient="records", indent=2)

print("Recommended schools have been saved as recommended_schools.csv and recommended_schools.json")
