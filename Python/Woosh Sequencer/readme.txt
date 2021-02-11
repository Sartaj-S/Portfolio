readme.txt

Woosh Sequencer is a terminal python application that can convert all nucleotide sequences to amino acid sequences in a text file and also compare two sets of nucleotide sequences to determine how alike they are.

The application itself run in one of the following two modes : (amino sequencer -a OR nucleotide comparator -c)
'-a : converts all sequences in the basefile to amino acid sequences - ONE .txt file input'
'-c : compares nucleotide sequence in basefile to all sequences in target file - TWO .txt file input with first file only having one sequence'
This code verifies the option selected and runs the application accordingly. If the command is not appropriate, it will throw an error.