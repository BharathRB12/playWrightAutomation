Feature: Ecommerse Application Validation

@Validation
Scenario Outline: placing the oder
Given a login to Application with "<username>" and "<password>"
Then validate the error message

Examples:
    | username          | password       |
    | bharath01@gmail   | Simplify@@123  |
    | hello01@gmai      | Simplify@@     |