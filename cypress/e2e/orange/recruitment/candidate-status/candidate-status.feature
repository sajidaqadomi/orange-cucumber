Feature: Candidate Status

    Scenario: Change the candidate status to "Interview Passed".
        Given The admin Access the candidate Profile page
        When The Admin Press "Mark Interview Passed"
        Then The Candidate Status should be "Interview Passed"
        Then The candidate should have the appropriate action buttons:
            | Reject | Schedule Interview | Offer Job |

    Scenario: Change the candidate status to "Interview Failed".
        Given The admin Access the candidate Profile page
        When The Admin Press " Mark Interview Failed "
        Then The Candidate Status should be "Interview Failed"
        Then The candidate should have the appropriate action buttons:
            | Reject |