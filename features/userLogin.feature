
Feature: Login Functionality
    
    Scenario Outline: Verify login and Logout
        Given the app loads
        Given a user on a <device> device
        Then the nav bar should be displayed
        Then I wait for 2 seconds
        When I focus the username input and type <username>
        And I focus the password input and type <password>
        And I click the login button

        Then I wait for 1 seconds
        Then the call list should be displayed
        Then I wait for 1 seconds
        When I click the nav drop down
        When I click the logout link
        Then I wait for 1 seconds
        # Then I wait for 1 seconds
        # Then the LOGIN_CONTAINER should be displayed
        
        Examples:
            | device | path       | username | password | client |
            | desktop|  /login    | cogadmin | C0Gility | jcsco  |



