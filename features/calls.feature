
Feature: Calls Page Functionality
    
    Scenario Outline: Does /calls functionality work
        Given the app loads
        Given a user on a <device> device
        When I focus the USER_NAME_INPUT and type <username>
        When I focus the PASSWORD_INPUT and type <password>
        When I click the LOGIN_BUTTON
        Then the CALLER_ID should be displayed
        # Then I choose a CALLER_ID inner text from the view
        When I search for a CALLER_ID id
        Then I wait for 1 seconds
        When I click the NAV_DROP_DOWN
        When I click the LOGOUT_LINK
        Then the LOGIN_CONTAINER should be displayed
        
        
        Examples:
            | device | path       | username | password | client |
            | desktop|  /login    | cogadmin | C0Gility | jcsco  |



