"""Turn the response sheet (File > Download > CSV) into one JSON list, keeping the last save per participant.

Usage: python load_responses.py responses.csv > responses.json
"""
import csv, json, sys

csv.field_size_limit(10**9)
last = {}
with open(sys.argv[1], newline="", encoding="utf-8") as f:
    rows = list(csv.reader(f))
for row in rows[1:]:
    session = json.loads("".join(row[5:]))
    if not str(session["sid"]).startswith("TEST"):  # rows written while testing the endpoint
        last[session["sid"]] = session
json.dump(list(last.values()), sys.stdout)
