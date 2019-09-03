Feature: Display the weather forecast 
  As a weather Forecast Provider I should be able to display Weather Forecast

  @wF-One
  Scenario Outline: Verifying Weather forecast for 5 days.

    Given I launch the weather forecast application
    When  I enter the city as "<cityname>"
    Then  It should display weather forecast for five days 

    Examples:
    | cityname  |
    | glasgow   |
    | aberdeen  |
    | dundee    |

  @WF-Two @NS-One
  Scenario Outline:  Verifying Error Message incase of incorrect city.

    Given I launch the weather forecast application
    When I enter the city as "<cityname>"
    Then I should not be able to see weather forecast data
    
    Examples:
    | cityname  |
    | Paris     |
    | ......    |
    | !@£       |

  @WF-Three
  Scenario Outline: Verifying the application displays 3 hourly forecast on a particular day.

    Given I launch the weather forecast application
    When  I enter the city as "<cityname>"
    Then  It should display weather forecast for five days
    When I select day "<day>"
    Then I should be able to see 3 hourly forecast for that day "<day>"

    Examples:
    | cityname  | day |
    | dundee    | 1   |
    | aberdeen  | 2   |
    | stirling  | 3   |


    @WF-Four
    Scenario Outline:  Verifying the Temperature Values are rounded up or not.

    Given I launch the weather forecast application
    When I enter the city as "<cityname>"
    Then It should display weather forecast for five days
    Then I should be able to see all values are rounded up
    
    Examples:
    | cityname  |
    | edinburgh |
    | aberdeen  |
    | dundee    |

    @WF-Five
    Scenario Outline: Verifying the Weather condition for the Current Time.

    Given I launch the weather forecast application
    When I enter the city as "<cityname>"
    Then It should display weather forecast for five days
    When I select day "<day>"
    Then I should be able to see 3 hourly forecast for that day "<day>"
    Then I should be able to see summary of current condtion of the day
    Examples:
    | cityname  | day |
    | aberdeen  | 1   |

    @WF-Six
    Scenario Outline: Verifying the wind speed for the Weather Forecast
    Given I launch the weather forecast application
    When I enter the city as "<cityname>"
    Then It should display weather forecast for five days
    When I select day "<day>"
    Then I should be able to see 3 hourly forecast for that day "<day>"
    Then I should be able to see summary of most dominant wind speed of the day "<day>"
    Examples:
    | cityname  | day |
    | edinburgh | 1   |

   @WF-Seven
   Scenario Outline:  To verify the application is showing the 3 hour data for daily forecast for aggregate rainfall.
   Given I launch the weather forecast application
    When I enter the city as "<cityname>"
    Then It should display weather forecast for five days
    When I select day "<day>"
    Then I should be able to see 3 hourly forecast for that day "<day>"
    Then I should be able to see summary of Aggregate rainfall of the day "<day>"
    Then I should be able to see summary of min and max temparture of the day "<day>"
    
    Examples:
    | cityname  | day |
    | dundee    | 1   |

    @WF-Eight
    Scenario Outline:  To verify the application is showing the 3 hour data for daily forecast for min and max temparture .
    Given I launch the weather forecast application
    When I enter the city as "<cityname>"
    Then It should display weather forecast for five days
    When I select day "<day>"
    Then I should be able to see 3 hourly forecast for that day "<day>"
    Then I should be able to see summary of min and max temparture of the day "<day>"
    
    Examples:
    | cityname  | day |
    | stirling  |  1  |

   @WF-Nine @NS-Two
   Scenario Outline: Verifying the City Name is Case-Sensitive.

    Given I launch the weather forecast application
    When  I enter the city as "<cityname>"
    Then  It should display weather forecast for five days 

    Examples:
    | cityname  |
    | EdinburgH |

  @WF-Ten
  Scenario Outline: To verify if weather forecast is displayed from the current day.

    Given I launch the weather forecast application
    When  I enter the city as "<cityname>"
    Then  It should display weather forecast for five days from today

    Examples:
    | cityname  |
    | dundee    |

   @WF-Eleven @UIVerification
   Scenario Outline: Verify the UI properties of Maximum Temperature Values.

    Given I launch the weather forecast application
    When  I enter the city as "<cityname>"
    Then  It should display weather forecast for five days from today
    Then  I verify the "<font-color>" of the Max temperature Value
    Then  I verify the "<font-weight>" of the Max temperature Values
    Then  I verify the "<font-size>" of the Max temperature values
    Then  I verify the "<font-family>" of the temperature value

    Examples:
    | cityname   | font-color         | font-weight | font-size | font-family |
    | glasgow    | rgba(0, 0, 0, 1)   | 400         | 24px      | Lato        |

   @WF-Twelve @UIVerification
   Scenario Outline: Verify the UI properties of Minimum Temperature Values.

    Given I launch the weather forecast application
    When  I enter the city as "<cityname>"
    Then  It should display weather forecast for five days from today
    Then  I verify the "<font-color>" of the Min temperature Value
    Then  I verify the "<font-weight>" of the Min temperature Values
    Then  I verify the "<font-size>" of the Min temperature value
    Then  I verify the "<font-family>" of the temperature value

    Examples:
    | cityname    | font-color               | font-weight | font-size | font-family |
    | stirling    | rgba(153, 153, 153, 1)   | 300         |  19.2px   | Lato        |