import re
import unittest

class TestEmails(unittest.TestCase):
    def test_emails_correct(self):
        example1= "bhbdcsjbwd@xyz.com"
        program= re.compile("^([a-zA-Z0-9])+@[a-zA-Z0-9]+\.+[a-zA-Z0-9]{2,3}$")
        self.assertTrue(program.match(example1))

    def test_emails_incorrect(self):
        example2= "bhwbduebwuebwb..com"
        program= re.compile("^([a-zA-Z0-9])+@[a-zA-Z0-9]+\.+[a-zA-Z0-9]{2,3}$")
        self.assertIsNone(program.match(example2))