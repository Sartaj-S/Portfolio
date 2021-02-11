readme.txt

What is CC-Compare?

CC compare is a web application that provides an easy-to-understand interface for California college students to compare transfer requirements between multiple universities. There exists public data which compiles transfer requirements, but the format is confusing and tedious to read through. Our project parses this existing data, reformats it, and displays it to the user in an interactive, easy-to-understand website.

A link to the project demonstration:

https://www.youtube.com/watch?v=i0c2X2-HEFg&feature=youtu.be


My Backend Contribution:
	Data retrieval consisting of accessing API endpoints and parsing the JSONs provided by those endpoints. The different JSONs had a variety of information, often times more than required to complete certain needs. Therefore, the JSONs were parsed for the needed information and new JSONs were created that were more compact, flexible, and relevant to project needs. Data retrieval allowed for us to populate all of the information on the website and ultimately get the required 260,000+ PDFs. 

	PDF parsing consisted of writing a bash script that used a pdftotext program to convert all the PDFs into text files that would be parseable. 

	Furthermore, a data structure needed to be constructed that could record the different intricacies of the information listed on the PDFs. This included different types of ors, (O_R and OR), different types of ands, (&_, AND), non comparable courses, and miscellaneous strings such as ‘One other course in English composition’. 

	Thus, a script was constructed that would break down the PDF into multiple layers of subsections and retrieve all the information and populate an easily iterable data structure that is ultimately converted to a JSON file that is stored in the database.



Webscraping + SQL Database Population 
	In this folder, you will find the work I did by taking advantage of Python's powerful scripting capabilities which were perfect for this project. It allowed for effective webscraping by accessing JSON files, reading them, and processing them to set up further webscraping that allowed us to retrieve all the PDFs for the agreements that I would later go on to parse. 

	Furthermore, an SQL database was also created to provide early data to the front end for UI data population while the backend frontend communication was still being set up with flask

Backend
	In this folder, the text parsing and data formatting portion of the backend is contained. Ultimately, the scripts in this folder are responsible for downloading ALL the agreements from assist.org, converting them into text files, and then parsing through those files for class equivalency data. Once this data is read, it is formatted for the front end and connected via flask.


