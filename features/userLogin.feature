
Feature: Login Functionality
    
    Scenario Outline: Verify login and Logout
        Given the app loads
        Given a user on a <device> device
        Then the NAV_BAR should be displayed
        And the LOGIN_CONTAINER should be displayed
        When I focus the USER_NAME_INPUT and type <username>
        When I focus the PASSWORD_INPUT and type <password>
        When I click the LOGIN_BUTTON
        Then the CALL_LIST should be displayed
        When I click the NAV_DROP_DOWN
        When I click the LOGOUT_LINK
        Then the LOGIN_CONTAINER should be displayed
        
        Examples:
            | device | path       | username | password | client |
            | desktop|  /login    | cogadmin | C0Gility | jcsco  |



