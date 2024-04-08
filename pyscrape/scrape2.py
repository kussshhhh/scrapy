import sqlite3

# Connect to the database
conn = sqlite3.connect('median.db')
cursor = conn.cursor()

# Execute a SELECT query
cursor.execute("SELECT * FROM daily_median_rents")

# Fetch the results
data = cursor.fetchall()

# Print the data (replace with your desired output formatting)
for row in data:
  print(row)

# Close the connection
conn.close()
