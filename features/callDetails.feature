Feature: Calls 

@callDetails
@GTL
    Scenario Outline: Renders search results
        Given the app loads
        Given a user on a <device> device
        
        When I focus the username input and type <username>
        And I focus the password input and type <password>
        Then I click the login button
        Then I should be on the calls page

        Then I click the first call
        Then the callerName should match
        


    Examples:
        | username | password |device  |
        | cogadmin | C0G!lity |desktop |