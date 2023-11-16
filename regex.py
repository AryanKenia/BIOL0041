import re

program= re.compile("^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.+[a-zA-Z0-9]{2,3}$")

print(program.search("aryankenia00@gmail.com"))

import numpy
a= numpy.array(1)
print(a)

import unittest

def check_car_colour(colour):
    if colour == "red":
        return {"Car colour is ": colour}

class TestCarColour(unittest.TestCase):
    def test_car_colour(self):
        actual= check_car_colour("red")
        return {"Car colour is ": "red"}
