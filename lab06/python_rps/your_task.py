def hello_world():
    return "Hello world!"


def rps(hand1, hand2):
    # finish this code:
    if hand1 == "rock" and hand2 == "paper":  # rock vs paper
        return "Paper wins!"
    elif hand1 == "paper" and hand2 == "rock":  # paper vs rock
        return "Paper wins!"
    elif hand1 == "rock" and hand2 == "scissors":  # rock vs scissors
        return "Rock wins!"
    elif hand1 == "scissors" and hand2 == "rock":  # scissors vs rock
        return "Rock wins!"
    elif hand1 == "paper" and hand2 == "scissors":  # paper vs scissors
        return "Scissors wins!"
    elif hand1 == "scissors" and hand2 == "paper":  # scissors vs paper
        return "Scissors wins!"
    elif hand1 == hand2 and hand1 in ["rock", "paper", "scissors"]:
        return "Tie!"
    else:
        return "Invalid"
