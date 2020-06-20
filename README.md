## Event Tracker Project

## Week 11-13 Project for Skill Distillery

## Overview

SleepTracker is a Spring REST CRUD API that tracks a user's sleeping hours and quality. Factors that influence sleep quality can be stored by the user, such as restfulness upon waking, temperature of the room being slept in, and length of sleep. Eventually I would like to be able to develop correlations in the user's data to determine optimal sleep quality parameters that could be used to improve the user's overall sleep quality.

## How to Use

Upon navigating to the site, the user is presented with 3 options: search sleep entries by ID; retrieve all sleep entries; and add a new sleep session. If a user enters an ID, and if the ID exists, a information will be displayed about the sleep session. The user then has the option to update this information or delete the entry. If a user chooses to retrieve all sleep entries, a table with all the data will appear. If the user clicks on the ID of the sleep entry, the information on the entry will also appear, with the options to update or delete the entry. All changes in table data should appear instantly on the same page, but sometimes a refresh of the page and a new retrieval is required.

When the user displays all sleep entries, they will be given information on their average restfulness upon waking, which covers the average of the measure across all sleep entries.

## API Endpoints

| Returns | Verb      | URI                       | Description                          |
|---------|-----------|---------------------------|--------------------------------------|
| List    | GET       | api/sleeplist             | Gets all sleep entries               |
|---------|-----------|---------------------------|--------------------------------------|
| Sleep   | GET       | api/sleeplist/{sleepId}   | Gets specific sleep session by ID    |
|---------|-----------|---------------------------|--------------------------------------|
| Sleep   | PUT       | api/sleeplist/{sleepId}   | Updates existing sleep session by ID |  
|---------|-----------|---------------------------|--------------------------------------|
| Sleep   | POST      | api/sleeplist             | Creates new sleep session            |
|---------|-----------|---------------------------|--------------------------------------|
| Void    | DELETE    | api/sleeplist/{sleepId}   | Deletes sleep session by ID          |        
|---------|-----------|---------------------------|--------------------------------------|

## Technologies Used
* MySQL, MySQL Workbench
* JPA/Hibernate
* Spring Boot
* Spring Data JPA
* Postman
* Gradle
* J-Unit
* Git/Github
* Atom
