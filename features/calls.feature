
Feature: Calls 

@callSearch
@callSearchValidInputs
    Scenario Outline: Renders search results
        Given the app loads
        Given a user on a <device> device
        
        When I focus the username input and type <username>
        And I focus the password input and type <password>
        Then I click the login button
        Then I should be on the calls page
        When I search for <transcript_text> transcript, <caller_id> caller id, <caller_name> caller name, <receiver_number> receiver number, and <from_date> from date
        And I click the nav drop down
        Then I click the logout link
        Then I should be on the login page
        # Then I wait for 1 seconds
        # Then I wait for 1 seconds
        # Then the call list items should be displayed
        # Then <pagination_qty> pagination element should be visible
        # Then more than <search_results> call list items should be displayed

        Examples:
            | transcript_text     | caller_id    | caller_name  | receiver_number  | device  | username | password | search_results | pagination_qty | from_date     | to_date       |
            | ""                  | ""           | ""           | ""               | desktop | cogadmin | C0Gility | 24             | 1              | "01/12/2018"  | ""            |
            | ""                  | ""           | ""           | ""               | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "*"                 | ""           | ""           | ""               | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "th*"               | ""           | ""           | ""               | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "th?"               | ""           | ""           | ""               | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "the"               | ""           | ""           | ""               | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "'the'"             | ""           | ""           | ""               | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |

            | ""                  | "caller id"  | ""           | ""               | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "*"                 | "caller id"  | ""           | ""               | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "th*"               | "caller id"  | ""           | ""               | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "the"               | "caller id"  | ""           | ""               | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |

            | ""                  | ""           |"caller name" | ""               | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "*"                 | ""           |"caller name" | ""               | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "th*"               | ""           |"caller name" | ""               | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |            
            | "the"               | ""           |"caller name" | ""               | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |

            | ""                  | ""           | ""           |"receiver number" | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "*"                 | ""           | ""           |"receiver number" | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "th*"               | ""           | ""           |"receiver number" | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "the"               | ""           | ""           |"receiver number" | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |

            | ""                  | ""           |"caller name" |"receiver number" | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "*"                 | ""           |"caller name" |"receiver number" | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "th*"               | ""           |"caller name" |"receiver number" | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "the"               | ""           |"caller name" |"receiver number" | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            
            | ""                  | "caller id"  |"caller name" |"receiver number" | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "*"                 | "caller id"  |"caller name" |"receiver number" | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "th*"               | "caller id"  |"caller name" |"receiver number" | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "the"               | "caller id"  |"caller name" |"receiver number" | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |

            | ""                  | "caller id"  |"caller name" | ""               | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "*"                 | "caller id"  |"caller name" | ""               | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "th*"               | "caller id"  |"caller name" | ""               | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "the"               | "caller id"  |"caller name" | ""               | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            
            | ""                  | "caller id"  | ""           |"receiver number" | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "*"                 | "caller id"  | ""           |"receiver number" | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "th*"               | "caller id"  | ""           |"receiver number" | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |
            | "the"               | "caller id"  | ""           |"receiver number" | desktop | cogadmin | C0Gility | 24             | 1              | ""            | ""            |

# @callSearch
@callSearchInvalidInputs
    Scenario Outline: Renders 0 results when searching
        Given the app loads
        Given a user on a <device> device
        When I focus the username input and type <username>
        And I focus the password input and type <password>
        And I click the login button
        Then I should be on the calls page
        When I search for <transcript_text> transcript, <caller_id> caller id, <caller_name> caller name, <receiver_number> receiver number, and <from_date> from date
        Then the no results text should be displayed
        And I click the nav drop down
        Then I click the logout link
        Then I should be on the login page


        Examples:
            | transcript_text  | caller_id    | caller_name  | receiver_number | device  | username | password | search_results | pagination_qty | from_date    | to_date   |
            | "expialidocious" |  ""          |      ""      |      ""         | desktop | cogadmin | C0Gility |      0         |  0             | "01/02/2018" | "today"   |
            | "tH*"            |  ""          |      ""      |      ""         | desktop | cogadmin | C0Gility |      0         |  0             | "01/02/2018" | "today"   |
            
            
# @callsPlay
#     Scenario Outline: paginate to last page of calls
#         Given the app loads
#         Given a user on a <device> device
#         When I focus the username input and type <username>
#         And I focus the password input and type <password>
#         And I click the login button
#         Then I should be on the calls page
#         And the calls should be displayed
#         When I click the pagination last icon
#         Then the call list items should be displayed
#         And I click the nav drop down
#         Then I click the logout link
#         Then I should be on the login page
            

#         Examples:
#             | transcript_text   | month | day | year | caller_id    | caller_name  | receiver_number | device  | username | password | search_results | pagination_qty | from_date    | to_date   |
#             | ""                |  ""   | ""  |  ""  |  ""          |      ""      |      ""         | desktop | cogadmin | C0Gility |      0         |  0             | ""           | ""        |

