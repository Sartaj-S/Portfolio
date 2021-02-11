import unittest 

from sequencer import Sequencer

class Test_getReadingFrame(unittest.TestCase):
    seq = Sequencer();
    def testNotFound(self):
        start = self.seq.getReadingFrame("AGGATACACACA")
        self.assertEqual(start, -1)
    def testFirstCodonStart( self):
        start = self.seq.getReadingFrame("ATGATACACACA")
        self.assertEqual(start, 0)
    def testLastCodonStart(self):
        start = self.seq.getReadingFrame("AGGATACACATG")
        self.assertEqual(start, 9)
    def testMiddleCodonStart(self):
        start = self.seq.getReadingFrame("AGATGCACACA")
        self.assertEqual(start, 2)

class Test_translateDNA(unittest.TestCase):
    seq = Sequencer();
    dnaSeq = {
        'name' : 'Test Sequence',
        'sequence' : ""

    }
    def test1_basic(self):
        self.dnaSeq['sequence'] = "ATGATAATCTTTGTTGTGTAA"
        start = self.seq.getReadingFrame(self.dnaSeq['sequence'])
        protein = self.seq.translate_dna(self.dnaSeq) 
        self.assertEqual(protein, "MIIFVV")
    
    def test2_middleStart(self):
        self.dnaSeq['sequence'] = "ATAATCTTTATGGTTGTGTAG"
        protein = self.seq.translate_dna(self.dnaSeq)
        self.assertEqual(protein, "MVV")

    def test3_earlyStop(self):
        self.dnaSeq['sequence'] = "ATGATAATCTAATTGTTGTGTAA"
        protein = self.seq.translate_dna(self.dnaSeq)
        self.assertEqual(protein, "MII")

    def test3_midStartEarlyStop(self):
        self.dnaSeq['sequence'] = "ATAATCTTTATGGTTTGAGTGTAG"
        protein = self.seq.translate_dna(self.dnaSeq)
        self.assertEqual(protein, "MV")


if __name__ == '__main__':
    unittest.main()