
@login
Feature: Login Functionality
    
    Scenario Outline: Verify login and Logout
        Given the app loads
        And a user on a <device> device
        Then the nav bar should be displayed

        When I wait for 2 seconds
        And I focus the username input and type <username>
        And I focus the password input and type <password>
        And I click the login button
        Then I should be on the calls page

        When I click the nav drop down
        And I click the logout link
        Then I should be on the login page
        
        Examples:
            | device | path       | username | password | client |
            | desktop|  /login    | cogadmin | C0Gility | jcsco  |



