"""
Run these tests from the CLI (from within the python_rps directory)
as follows:

    python3 run_tests_vanilla.py

"""

from helpers import assert_print, run_all_tests
from your_task import hello_world, rps


def test_hello_world():
    return assert_print(hello_world() == "Hello world!", 'It returns "Hello world!"')


def test_paper_beats_rock():
    return assert_print(
        rps("rock", "paper") == "Paper wins!",  # condition to check
        "Paper beats rock",  # output message
    )


def test_paper_beats_rock_flipped():
    return assert_print(
        rps("paper", "rock") == "Paper wins!",  # condition to check
        "Paper beats rock (flipped)",  # output message
    )


def test_rock_beats_scissors():
    return assert_print(
        rps("rock", "scissors") == "Rock wins!",  # condition to check
        "Rock beats scissors",  # output message
    )


def test_rock_beats_scissors_flipped():
    return assert_print(
        rps("scissors", "rock") == "Rock wins!",  # condition to check
        "Rock beats scissors (flipped)",  # output message
    )


def test_scissors_beats_paper():
    return assert_print(
        rps("scissors", "paper") == "Scissors wins!",  # condition to check
        "Scissors beats paper",  # output message
    )


def test_scissors_beats_paper_flipped():
    return assert_print(
        rps("paper", "scissors") == "Scissors wins!",  # condition to check
        "Scissors beats paper (flipped)",  # output message
    )


def test_tie_rock():
    return assert_print(
        rps("rock", "rock") == "Tie!",  # condition to check
        "Double rock ties",  # output message
    )


def test_tie_paper():
    return assert_print(
        rps("paper", "paper") == "Tie!",  # condition to check
        "Double paper ties",  # output message
    )


def test_tie_scissors():
    return assert_print(
        rps("scissors", "scissors") == "Tie!",  # condition to check
        "Double scissors ties",  # output message
    )


def test_tie_invalid():
    return assert_print(
        rps("granite", "granite") == "Invalid",  # condition to check
        "Invalid tie",  # output message
    )


def test_invalid_input():
    return assert_print(
        rps("darcy", "snips") == "Invalid",  # condition to check
        "Invalid input",  # output message
    )


# don't forget to add any new tests to the list of tests to be run:
run_all_tests(
    [
        test_hello_world,
        test_paper_beats_rock,
        test_paper_beats_rock_flipped,
        test_rock_beats_scissors,
        test_rock_beats_scissors_flipped,
        test_scissors_beats_paper,
        test_scissors_beats_paper_flipped,
        test_tie_rock,
        test_tie_paper,
        test_tie_scissors,
        test_tie_invalid,
        test_invalid_input,
    ]
)