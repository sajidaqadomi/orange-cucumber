Feature: Candidate Resume

    Scenario: The user can upload a txt file for "Application Initiated Status".
        When The admin Access the candidate form
        When The admin Enable Edit candidate switch
        When The admin Upload a txt file to the Resume section
        When The admin Save the form
        When The admin download the uploaded file
        Then The uploaded file should contain the same data as what was originally uploaded

    Scenario: The user can upload a txt file for "Hired statuses" Status.
        Given The system has a candidate with Hired statuse Status
        When The admin Access the candidate form
        When The admin Enable Edit candidate switch
        When The admin Upload a txt file to the Resume section
        When The admin Save the form
        When The admin download the uploaded file
        Then The uploaded file should contain the same data as what was originally uploaded