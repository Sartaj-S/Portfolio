import sqlite3
import json
import datetime
import os

conn = sqlite3.connect('test.db')
db = conn.cursor()
db.execute("""
DROP TABLE IF EXISTS agreements
""")
db.execute ("""CREATE TABLE agreements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        source_id INTEGER NOT NULL,
        target_id INTEGER NOT NULL,
        major TEXT NOT NULL,
        agreement_json TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        agreement_id INTEGER NOT NULL
    )
""")
with open('agreement_ids.json') as f: 
            schools = json.load(f) 

for school in schools:
    for x in school['agreementIds']:
        with open(os.getcwd()+'/jsons/'+str(school['id'])+'_'+str(x)+'.json',) as f2: 
            readable_json = json.load(f2) 
            print('File opened:',x)
            print(datetime.datetime.now().time())
        for y in readable_json: 
            db.execute("INSERT INTO agreements ('source_id','target_id','major','agreement_json', 'agreement_id') VALUES (?, ?, ?, ?, ?)", (school['id'], x, y['label'], json.dumps(readable_json),y['key']))

conn.commit()
conn.close()
