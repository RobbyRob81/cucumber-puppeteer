
@login
Feature: Login Functionality
    
    Scenario Outline: Verify login and Logout
        Given the app loads
        And a user on a <device> device

        Then
        
        Examples:
            | device |
            | desktop|
