const game = ()=>{
    let playerScore = 0;
    let computerScore = 0;
    let rounds = 0;
    let result = "";
    
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const popUp = document.querySelector(".popup-container");
    const roundChoices = document.querySelectorAll(".round-choices li");
    const handChoices = document.querySelectorAll(".hand-choices li");
    const hands = document.querySelectorAll(".hand");
    const gameResult = document.querySelector(".display-score .game-result");
    const popUpChoices = document.querySelector(".popup-choices");
    const displayScore = document.querySelector(".display-score");
    const playChoices = document.querySelectorAll(".play-again li");
    const message = document.querySelector(".match h1");
    const computerChoices = ["rock", "paper", "scissors"];
    
    //prompts the round selector
    popUp.style.display = "grid";
    roundChoices.forEach(roundChoice=>{
        roundChoice.addEventListener("click",()=>{
            rounds = roundChoice.textContent;
            popUp.style.display = "none";
            
        })
    })
    
    //main game
    handChoices.forEach(handChoice=>{
        handChoice.addEventListener("click",()=>{
            const playerChoice = handChoice.textContent;
            
            //Generate number for computer's choice
            const computerNumber = Math.floor(Math.random() * 3);
            const computerChoice = computerChoices[computerNumber];

            //disabling the buttons while the hands are animating 
            //to prevent the user from clicking another button
            handChoices[0].children[0].disabled = true;
            handChoices[1].children[0].disabled = true;
            handChoices[2].children[0].disabled = true;
            
            //decrementing the amount of rounds to track the amount of rounds the player has reached
            rounds--;
            
            //set timeout to let the hands animate first before showing the results
            setTimeout(()=>{
                //Function to compare choices
                compareChoice(playerChoice, computerChoice);
                //Update hand images
                playerHand.src = `./assets/${playerChoice}.png`;
                computerHand.src = `./assets/${computerChoice}.png`;
                //Update score
                updateScore();

            if(rounds === 0){
                if(playerScore === computerScore){
                    message.textContent = "It's a tie. Choose another one."
                    rounds++;
                }else{
                    if(playerScore > computerScore){
                        result = "You win!";
                    }else{
                        result = "You lose...";
                    
                }

                //prompt message after the game
                popUp.style.display = "grid";
                gameResult.textContent = `${result} Do you want to play again?`;
                displayScore.style.display = "block";
                popUpChoices.style.display = "none";

                //the player will chose to play again or not
                playChoices.forEach(playChoice=>{
                    playChoice.addEventListener("click", ()=>{
                        if(playChoice.textContent === "yes"){
                            location.reload();
                        }else{
                           history.back();
                        }
                    })
                })
                }
            }
            }, 1500);

            //ANIMATION PART
            //Turn hand in rock position while animating
            playerHand.src = `./assets/rock.png`;
            computerHand.src = `./assets/rock.png`;

            playerHand.style.animation = "player-handshake 1.5s ease";
            computerHand.style.animation = "computer-handshake 1.5s ease";
            
            //AFTER ANIMAITON
            hands.forEach(hand=>{
                hand.addEventListener("animationend",()=>{
                    hand.style.animation = "";

                    //enabling again the buttons
                    handChoices[0].children[0].disabled = false;
                    handChoices[1].children[0].disabled = false;
                    handChoices[2].children[0].disabled = false;

                    
                    
                })
            })
        })
    })




const compareChoice = (playerChoice, computerChoice)=>{
    

    if(playerChoice == computerChoice){
        return;
    }

    if(playerChoice == "rock"){
        if(computerChoice == "paper"){
            computerScore++;
            return;
        }else{
            playerScore++;
            return;
        }
    }
    
    if(playerChoice == "paper"){
        if(computerChoice == "rock"){
            playerScore++;
            return;
        }else{
            computerScore++;
            return;
        }
    }
    
    if(playerChoice == "scissors"){
        if(computerChoice == "rock"){
            computerScore++;
            return;
        }else{
            playerScore++;
            return;
        }
    }
}

const updateScore =()=>{
    const pScore = document.querySelector(".player-score p");
    const comScore = document.querySelector(".computer-score p");

     pScore.textContent = playerScore;
     comScore.textContent = computerScore;
}

}

//Start the game function
game();