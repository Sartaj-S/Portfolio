import random

def search(letter, word):

    n=0  
    i=0
    for x in word:
        if letter==x:
            n=i
    i= i+1           

#load words
word=[ 'apple', 'notebook', 'phone', 'monitor', 'coconut', 'burrito', 'convertible', 'mansion', 'unorthodox', 'hangman']

#get random word
i=(random.randint(0,9))
man=word[i]


#get length of word, declare it to x to work with it
x=len(man)

tries=6

#Creating the word with dashes 
display = list(man)
i=0
for y in man:
    display[i]=' _ '
    i+=1

#Begin game:
print("WELCOME TO HANGMAN!")
print("You have %i tries to guess the word"%tries)
print("YOUR WORD:")
   
print(display)
#keeps program going while the user has tries left
while tries>0:
    r=0
    
    #if there are not any dashes left, meaning the user found all the letters in the word, they win
    if not(' _ ' in display):
        print("Congratulations! You have found the word, please play again by restarting the program")
        break
    
    #displays tries and asks for input
    print("You still have %i tries left to guess the word"%tries)
    let=input("\nEnter a letter to guess: ")

    #if the user enters the whole word, they win
    if let==man:
        print("Congratulations! You have found the word, please play again by restarting the program")
        break
    
    # if the letter is found in the word
    if let in man:
        i=0
        #search for all occurances of the word
        for y in range(0,x):
            if let==man[i]:

                #this segment checks if the letter has already been found and sets r to 1 so that the
                #congratulations statement doesn't appear again
                if let==display[i]:
                    print("You found that letter already silly")
                    r=1
                    break
                
                display[i]=let
            i=i+1
        if not r==1:
            print("Awesome! You got it")
        
    elif (let in str(display)):
        print("You already found that letter! Try again.")
    else:
        print("That letter is not in the word, sorry! Try again.")
        tries=tries-1
    print (display)

if tries==0:
    print("You tried!")
    print("Unfortunately, you failed. The word was: "+man)




