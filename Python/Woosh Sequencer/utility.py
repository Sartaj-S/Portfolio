from sequencer import Sequencer
"""
The recorder class is responsible for reading multiple dna records from the files. From there, the class is able to create results
depending on the mode that the program was run in (amino sequencer -a OR nucleotide comparator -c)
"""
class Recorder():

    def __init__(self, basefile, targetfile):
        self.basefile = basefile
        self.targetfile = targetfile

    """
    DOCUMENTATION :: getRecords(self, file)

    INPUT: The input is the file name
    

    METHOD: The function will take the input file name, open that file, and parse it for different dna_record objects. 
    The function compiles them into a list and returns that list
    
    OUTPUT: The output is a list all dna_record objects
    
    """
    def getRecords(self, file):
        records = list()
        try:
            with open(file) as f:
                lines = f.readlines()
                print("Successfully opened file: " + file + '\n')
        except:
            print('Error opening file: '+ file)
            return


        i = 0
        while i < len(lines):
            if lines[i][0] == '>':
                name = lines[i]
                sequence = ''
                i+=1

                while i < len(lines) and lines[i].strip() is not None:
                    if lines[i][0] == '>':
                        i-=1
                        break
                    sequence += lines[i]
                    i+=1
                
                tempRecord = {
                    'name' : name,
                    'sequence' : sequence
                }
                
                records.append(tempRecord)
            i+=1
        # end while loop
        return records 
    """
    DOCUMENTATION :: resultsC()
    INPUT: no input
    

    METHOD: The method is responsible for finding and outputting the result from running the program in -c
    The method will compare the base nucleotide sequence to all the different target sequences. To do this, the method generates
    identity scores for each alignmight (start -> finish of the largest sequence) and records the highest identity score along with the 
    starting nucleotide for the longer sequence. The program will do this for all dna_records in the target file and output the result to
    the terminal and a file named 'woosh_output_c.txt'
    
    OUTPUT: The identity score for each target sequence that was compared to the base sequence, as well as the starting position of the longer
    strand to begin alignment.
    
    """
    def resultsC(self):
        # get the records inside each txt file
        baseRecords = self.getRecords(self.basefile)
        targetRecords = self.getRecords(self.targetfile)

        # checks to see sequences were read
        if len(baseRecords) > 1:
            raise ImportError('FORMATTING ERROR in base text file');
        else :
            baseRecord = baseRecords[0]
        if len(targetRecords) < 1 :
            raise ImportError('FORMATTING ERROR in target text file');

        # begins to match each target record to the base record 
        results = []
        for record in targetRecords:
            results.append(self.match(baseRecord, record))

        file = open("woosh_output_c.txt", 'w')
        print('=============================== R E S U L T S ===============================')
        file.write('=============================== R E S U L T S ===============================\n')
        for result in results:
            if result['start'] < 0:
                print(result['name'])
                print ("IDENTITY/MATCH SCORE      : " , result['idScore'])
                print ("TARGET SEQ STARTING POS   : " , -result['start'])
                print ('--------------------------------------------------------')
                # file
                file.write(result['name'])
                file.write ("\nIDENTITY/MATCH SCORE      : " + str(result['idScore']))
                file.write ("\nTARGET SEQ STARTING POS   : " + str(-result['start']))
                file.write ('\n--------------------------------------------------------')
            if result['start'] >= 0:
                print(result['name'])
                print ("IDENTITY/MATCH SCORE      : " , result['idScore'])
                print ("BASE SEQ STARTING POS     : " , result['start'])
                print('--------------------------------------------------------')
                # file
                file.write(result['name'])
                file.write ("\nIDENTITY/MATCH SCORE      : " + str(result['idScore']))
                file.write ("\nBASE SEQ STARTING POS     : " + str(result['start']))
                file.write('\n--------------------------------------------------------\n')
        file.close()
    """
    DOCUMENTATION :: resultsA()
    
    INPUT: no input
    

    METHOD: This method is responsible for finding and outputting the result form running the program in -a
    The method will find all the dna_records in the base file. For these records, it will generate all amino acid extrons in the three reading
    frames. It will output the extrons for each record and each frame to the terminal 
    and to a file named "woosh_output_a.txt
    
    OUTPUT: All extrons for each dna_record in each reading frame in as an amino acid sequence
    
    """
    def resultsA(self):
        records = self.getRecords(self.basefile)
        if len(records) > 1:
            raise ImportError('FORMATTING ERROR in base text file');
        sequencer = Sequencer()
        results = []
        for record in records:
            record['sequence'] = record['sequence'].replace("\n", "")
            frames = list()
            for i in range (0, 3):
                sequence = sequencer.getExtrons(record,i)
                frames.append(sequence)
            result = {
                'name' : record['name'],
                'extrons' : frames.copy() 
            }
            results.append(result)
            frames.clear()
        file = open("woosh_output_a.txt", 'w')
        print('=============================== R E S U L T S ===============================')
        file.write('=============================== R E S U L T S ===============================\n')
        for result in results:
            print(result['name'])
            file.write(result['name'])
            i = 1
            for frame in result['extrons']:
                print('\n ------------ Frame ', i, ' ------------')
                file.write('\n ------------ Frame ' + str(i) + ' ------------')
                for sequence in frame:
                    print(sequence)
                    file.write(('\n' + sequence))
                i+=1
            print('**********************************************')
            file.write('\n**********************************************\n\n')


        file.close()
        
    """
    [HELPER FUNCTION]
    DOCUMENTATION :: match(baseRec, targetRec)
    
    INPUT: the base dna_record object and the target dna_record object
    

    METHOD: This is a helper funciton for resultsC() that mathes the base dna sequence to that target dna sequence. This checks all possible alignments
    and records the highest identity score. This score will be returned along with the any relevant information requried for resultsC()
    
    OUTPUT: the match start point on the longer strand, highest identity score, which strand was longer
    
    """

    def match(self, baseRec, targetRec):
        # discr is the different between the base seq length and the targ seq length
        base = baseRec['sequence'].replace("\n", "")
        target = targetRec['sequence'].replace("\n", "")
        discr = len(base) - len(target)
        matches = []

        highest = 0;

        if discr < 0 :
            discr *= -1
            # we have to check i sequences each starting at diff nucleo
            #these are the number of diff starting pos. 
            for i in range(0, discr):
                tempMatch = {
                    'name' : baseRec['name'] + ' === to ===  \n' + targetRec['name'],
                    'idScore' : 0,
                    'length' : len(base),
                    'start' : i
                }
                counter = 0
                for x in range (i, len(target)):
                    if counter == len(base):
                        break
                    if base[counter] == target[x+1]:
                        tempMatch['idScore'] +=1
                    counter +=1
                matches.append(tempMatch)
                if matches[highest]['idScore'] < tempMatch['idScore']:
                    highest = i

                
            
        elif discr > 0:
            # we have to check i sequences each starting at diff nucleo
            #these are the number of diff starting pos. 
            for i in range(0, discr):
                tempMatch = {
                    'name' : baseRec['name'] + '\n  === to ===  \n' + targetRec['name'],
                    'idScore' : 0,
                    'length' : len(target),
                    'start' : -i
                }

                counter = 0
                for x in range (i, len(base)):
                    if counter == len(target):
                        break
                    if base[x+1] == target[counter]:
                        tempMatch['idScore'] +=1
                    counter +=1                
                matches.append(tempMatch)
                if matches[highest]['idScore'] < tempMatch['idScore']:
                    highest = i
                    
        matches[highest]['idScore'] = matches[highest]['idScore'] / matches[highest]['length'] * 100
        return matches[highest]


# end class

"""
The ToolBelt class is responsible for making sure the application is run in the proper format. Will inform user on what the format is.
No further documentation will be given
"""
class ToolBelt():
    
    def checkOption(self, args):
        if (len(args) < 3):
            return False

        if(args[1] == '-a'):
            if(len(args) > 3):
                print('ERROR: Please only input one file for -a mode!')
                return False
            return True
        
        if(args[1] == '-c'):
            if(len(args) > 4):
                print('ERROR: Please only input two file for -c mode!')
                return False
            return True
        
        print('ERROR: Option not recognized')
        return False


    def printError(self):
        print('Incorrect amount of arguments for program!\n')

        print('== Woosh supports the following modes: ==')
        print('-a : converts all sequences in the basefile to amino acid sequences - ONE .txt file input')
        print('-c : compares nucleotide sequence in basefile to all sequences in target file - TWO .txt file input with first file only having one sequence')
