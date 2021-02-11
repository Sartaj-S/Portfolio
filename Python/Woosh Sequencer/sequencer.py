"""
The Sequencer class is meant to transform a dna_record object into a protein object
that contains a string of the amino acid sequence. 
"""
class Sequencer():
    """
    DOCUMENTATION :: translate_dna(self, dna_record)
        INPUT:
        This function takes in a dna_record type object

        example:
        dna_record = {
            'name' : '[Insert DNA Record Name]'
            'sequence' : '[Insert DNA sequence here]'
        }
        
        METHOD:
        The function will take in a dna_record object, compute the first reading frame
        by finding the first start codon, and then derive the amino acid 
        sequence from the code given. The amino acid sequence will be computed from the
        first reading frame to the first stop codon.

        OUTPUT:
        The output of this is a protein: a string containing the amino acid sequence
        for the dna_record
    """
    def __init__(self):
        self.gencode = { 
            'ATA':'I', 'ATC':'I', 'ATT':'I', 
            'ATG':'M', 
            'ACA':'T', 'ACC':'T', 'ACG':'T', 'ACT':'T', 
            'AAC':'N', 'AAT':'N', 
            'AAA':'K', 'AAG':'K', 
            'AGC':'S', 'AGT':'S', 
            'AGA':'R', 'AGG':'R', 
            'CTA':'L', 'CTC':'L', 'CTG':'L', 'CTT':'L', 
            'CCA':'P', 'CCC':'P', 'CCG':'P', 'CCT':'P', 
            'CAC':'H', 'CAT':'H', 
            'CAA':'Q', 'CAG':'Q', 
            'CGA':'R', 'CGC':'R', 'CGG':'R', 'CGT':'R', 
            'GTA':'V', 'GTC':'V', 'GTG':'V', 'GTT':'V', 
            'GCA':'A', 'GCC':'A', 'GCG':'A', 'GCT':'A', 
            'GAC':'D', 'GAT':'D', 
            'GAA':'E', 'GAG':'E', 
            'GGA':'G', 'GGC':'G', 'GGG':'G', 'GGT':'G', 
            'TCA':'S', 'TCC':'S', 'TCG':'S', 'TCT':'S', 
            'TTC':'F', 'TTT':'F', 
            'TTA':'L', 'TTG':'L', 
            'TAC':'Y', 'TAT':'Y', 
            'TAA':'_', 'TAG':'_', 
            'TGC':'C', 'TGT':'C', 
            'TGA':'_', 
            'TGG':'W'} 

    def translate_dna(self, dna_record):

        last_codon_start = len(dna_record['sequence']) - 2 
        start = self.getReadingFrame(dna_record['sequence'])

        if start == -1:
            return None; 

        protein = "" 
        for i in range(start,last_codon_start,3): 
            codon = dna_record['sequence'][i:i+3] 
            aa = self.gencode.get(codon.upper(), 'X') 
            if(aa == '_'):
                return protein
            protein = protein + aa 

        return protein
    # end func
    """
    [HELPER FUNCTION]
    DOCUMENTATION :: getReadingFrame(self, sequence)
        INPUT:
        This function takes in a string type object that should be a DNA sequence.
        
        METHOD:
        The function will take in a sequence and return the starting index for the beginning
        of the first start codon. If a start codon is not found, it will return a -1

        OUTPUT:
        The output of this is an integer that notes the starting codon's index value. If it
        does not find one, it will return a -1.
    """
    def getReadingFrame(self, sequence):
        start = False
        sCodon = ""
        i = 0
        while start != True and i < len(sequence):
            if sCodon == "":
                if (sequence[i].upper() == "A"):
                    sCodon = "A"
            elif sCodon == "A" :
                if (sequence[i].upper() == "T"):
                    sCodon = "AT"
            elif sCodon == "AT" :
                if sequence[i].upper() == "G":
                    sCodon = "ATG"
                    i = i - 3
                    start = True
            i+=1

        if start == True:
            return i
        else:
            return -1
    # end func

    """
    DOCUMENTATION :: getExtrons(self, dna_record, frame)
    INPUT:
    This function will get you amino acid extrons from the given DNA record in the given reading frame (0, 1, 2)

    METHOD:
    The function interates through the sequence starting at the given reading frame. From there, the function will create separate sequence
    objects for each extron found (start codon -> stop codon)

    OUTPUT:
    The output of this is all the extrons at the given reading frame.
    """
    def getExtrons(self, dna_record,frame):
        last_codon_start = len(dna_record['sequence']) - 2 + frame
        sequences = []
        sequence = "" 
        start = False
        for i in range(frame,last_codon_start,3): 
            codon = dna_record['sequence'][i:i+3] 
            aa = self.gencode.get(codon.upper(), 'X') 
            if aa == 'M':
                start = True
            if(aa != 'M' and not start):
                continue

            if(aa == '_'):
                sequences.append(sequence)
                sequence = ""
                start = False
            else:
                sequence = sequence + aa 

        return sequences
# end class
