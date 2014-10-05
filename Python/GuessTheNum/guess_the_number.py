# template for "Guess the number" mini-project
# input will come from buttons and an input field
# all output for the game will be printed in the console
import simplegui
import random
import math

#default varible high is 100.
high = 100

# helper function to start and restart the game
def new_game():
    # initialize global variables used in your code here
    global secret_number, n, high, count
    low = 0
       
    if high == 100:
       log_ret = math.log(high - low + 1, 2)
    else:
       log_ret = math.log(1000 - low + 1, 2)
    n = int(math.ceil(log_ret))
    
    count = n
    
    print "New game. Range is from 0 to", high
    print "Number of remaining guesses is", n
    print " "
    secret_number = random.randrange(100)
    

# define event handlers for control panel
def range100():
    # button that changes the range to [0,100) and starts a new game 
    
    # initialize global variables used in your code here
    global secret_number, count, high, n
    high = 100
    
    new_game()
    
    #print "New game. Range is from 0 to 100"
    #print "Number of remaining guesses is", count
    #print " "
    
    secret_number = random.randrange(100)
    #print "secret_number is :", secret_number
    

def range1000():
    # button that changes the range to [0,1000) and starts a new game  
    
   
    # initialize global variables used in your code here
    global secret_number, count, high
    
    high = 1000
    new_game()
    
    #print "New game. Range is from 0 to 1000"
    #print "Number of remaining guesses is ", count
    #print " "
    
    secret_number = random.randrange(1000)
    #print "secret_number is :", secret_number
    
  
    
def input_guess(guess):
    # main game logic goes here 
    global count
    count -= 1
    print "Guess was ", guess 
    print "Number of remaining guesses is", count
    
    if secret_number == int(guess):
       print "Correct!"
       print " "
       new_game()
    elif secret_number > int(guess):
       print "Higher!"
       print " "
    else:
       print "Lower!"
       print " "
    if count == 0 :
       print "You lose, the secret number is:", secret_number
       print " "
       new_game()
    

# create frame
frame = simplegui.create_frame("Guess the number", 200,200)


# register event handlers for control elements and start frame
frame.add_button("Range is [0,100)", range100, 200)
frame.add_button("Range is [0,1000)", range1000, 200)
frame.add_input("Enter a guess", input_guess, 200)
frame.start()


# call new_game 
new_game()


# always remember to check your completed program against the grading rubric

