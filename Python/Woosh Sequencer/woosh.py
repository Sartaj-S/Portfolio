"""
The application itself run in one of the following two modes : (amino sequencer -a OR nucleotide comparator -c)
'-a : converts all sequences in the basefile to amino acid sequences - ONE .txt file input'
'-c : compares nucleotide sequence in basefile to all sequences in target file - TWO .txt file input with first file only having one sequence'
This code verifies the option selected and runs the application accordingly. If the command is not appropriate, it will throw an error.
"""

import sys
from sequencer import Sequencer
from utility import *

tool = ToolBelt()

if tool.checkOption(sys.argv):
    mode = sys.argv[1]
    print('Successful input')
    if (mode == '-a'):
        recorder = Recorder(sys.argv[2], None)
        recorder.resultsA()

    elif (mode == '-c'):
        recorder = Recorder(sys.argv[2], sys.argv[3])
        recorder.resultsC()


else :
    tool.printError()
