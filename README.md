## Event Tracker Project

## Week 11-13 Project for Skill Distillery

## Overview

SleepTracker is a Spring REST CRUD API that tracks a user's sleeping hours and quality. Factors that influence sleep quality can be stored by the user, such as restfulness upon waking, temperature of the room being slept in, and length of sleep. Eventually I would like to be able to develop correlations in the user's data to determine optimal sleep quality parameters that could be used to improve the user's overall sleep quality.

## How to Use

Upon navigating to the site, the user is presented with all their previous sleep entries and the option to enter a new sleep entry. The user then has the option to update this information or delete the entry from the list. All changes in table data should appear instantly on the same page, but sometimes a refresh of the page and a new retrieval is required.

Information on the average restfulness upon waking is also presented at the bottom of the all results table.

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
