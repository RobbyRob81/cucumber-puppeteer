
Feature: Calls Page Functionality
    
    Scenario Outline: Calls do load
        Given the app loads
        Given a user on a <device> device
        When I focus the username input and type <username>
        And I focus the password input and type <password>
        And I click the login button
        Then the caller id should be displayed
        And I click the nav drop down
        Then I click the logout link

        Examples:
            | device | path       | username | password | client | 
            | desktop|  /login    | cogadmin | C0Gility | jcsco  | 

@callSearch
    Scenario Outline: Calls Search with results
        Given the app loads
        Given a user on a <device> device
            When I focus the username input and type <username>
            And I focus the password input and type <password>
            And I click the login button
            Then the call list items should be displayed
            When I search for <transcript_text> text, <caller_id> caller id, <caller_name> caller name, and <callee_number> callee number
            # Then more than <search_results> call list items should be displayed
            # Then <pagination_qty> pagination element should be visible
            And I click the nav drop down
            Then I click the logout link

        Examples:
            | transcript_text     | month | day | year | caller_id    | caller_name   | callee_number | device  | username | password | search_results | pagination_qty |
            |        ""           |  ""   | ""  |  ""  |     ""       |      ""       |"callee number"| desktop | cogadmin | C0Gility |      1         |  1           |
            # |        ""         |  ""   | ""  |  ""  |  "caller id" |      ""       |"callee number"| desktop | cogadmin | C0Gility |      1         |  1           |
            # |        "the"      |  ""   | ""  |  ""  |  "caller id" |      ""       |      ""       | desktop | cogadmin | C0Gility |      1         |  1           |
            # |        "the"      |  ""   | ""  |  ""  |  "caller id" |      ""       |      ""       | desktop | cogadmin | C0Gility |      1         |  1           |
            # |        "the"      |  ""   | ""  |  ""  |     ""       |      ""       |      ""       | desktop | cogadmin | C0Gility |      24        |  1           |
            # |        ""         |  ""   | ""  |  ""  |     ""       |      ""       |      ""       | desktop | cogadmin | C0Gility |      24        |  1           |


# @callSearch
    Scenario Outline: Calls Search without results
        Given the app loads
        Given a user on a <device> device
            When I focus the username input and type <username>
            And I focus the password input and type <password>
            And I click the login button
            Then the call list items should be displayed
            When I search for <transcript_text> text, <caller_id> caller id, <caller_name> caller name, and <callee_number> callee number
            Then the no results text should be displayed
            And I click the nav drop down
            Then I click the logout link


        Examples:
            | transcript_text   | month | day | year | caller_id    | caller_name  | callee_number | device  | username | password | search_results | pagination_qty |
            | "expialidocious"  |  ""   | ""  |  ""  |  ""          |      ""      |      ""     | desktop | cogadmin | C0Gility |      0         |  0           |
            | "tH*"             |  ""   | ""  |  ""  |  ""          |      ""      |      ""     | desktop | cogadmin | C0Gility |      0         |  0           |
            
            
            


