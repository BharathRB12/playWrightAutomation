Feature: Ecommerse Application Validation

@Regression
Scenario: placing the oder
Given a login to Application with "bharath01@gmail.com" and "Simplify@@123"
When add the "zara coat 3" to cart
Then verify "zara coat 3" is displayed in the cart page
When enter valid details and place the order using country "ind", email is "bharath01@gmail.com" and message is " Thankyou for the order. "
Then verify order is present in the order history page

Scenario Outline: placing the oder
Given a login to Application with "<username>" and "<password>"
Then validate the error message

Examples:
    | username          | password       |
    | bharath01@gmail   | Simplify@@123  |
    | hello01@gmai      | Simplify@@     |