
# Apex Style Guide

## Table of Contents

* [Introduction](#introduction)
  * [Notes](#notes)
  * [Sources](#sources)
* [Structure](#structure)
  * [Document Comment](#document-comment)
  * [Indentation](#indentation)
  * [New Lines and Spaces](#new-lines-and-spaces)
  * [Capitalization](#capitalizaiton)
  * [Example Code](#example-code)
* [SOQL](#soql)
  * [Example Query](#example-query)
* [SObject Constructor Syntax](#sobject-constructor-syntax)
* [Testing](#testing)
* [Naming Conventions](#naming-conventions)
  * [Classes and Triggers](#classes-and-triggers)
  * [Test Classes](#test-classes)

## Introduction

This document serves as a comprehensive style guide for all apex code throughout the project. The goal here is to create a product with readable and consistent back-end code for future developers. Use this as a guideline, but maintain your best judgement when you are not able to apply the rules specified below.

### Notes

* Example code shown in this guide is not necessarily the only way to write code in this style. Formatting not specified in the guide are preferences of the author and are not enforced as rules.

### Sources

* Utilized the Polaris Project [style guide](https://github.com/PolarisProject/salesforceStyleGuide/blob/master/Apex%20style%20guide.md#istest) as a template for this guide.

## Structure

The overall structure of a class should order its members logically. Classes should be easy to understand, for example, new methods should not be added to the end of classes, but rather inserted where they are logically relevant.

### Document Comment

Each apex file should have an initial comment containing a high-level description of its purpose. The comment should be formatted as shown below:

```java
/**
 * A description of the class and its methods should go here.
 * Make sure to make any important notes regarding parameters and what is returned.
 */
```

### Indentation

All blocks of code should be indented with 4 spaces to ensure consitency. 
    
### New Lines and Spaces

* Please place in-code context comments on their own line and use '/*' around comments.
* Opening braces should have a space before them and not a new line. Closing braces should line up with the start of the opening brace's line.
* 'else' and 'else if' do not get a new line prior. 'catch' and 'while' in a 'do...while' loop should follow suit.
* The parenthetical clause in 'if', 'while', 'do', 'catch', etc., statements should have spaces before and after.
* When declaring methods, there should be no space between the name of the method and the opening parenthesis, and one space after.
* All binary operators should have a space seperating them from surrounding elements. Unary operators should be attached to their parameters.
* A ':' in a 'for each' loop should have spaces on either side
* No whitespace prior to a comma, with a single space after

### Capitalization

* Java standard for capitalization with listed exceptions.
* 'for', 'if', etc. statements should be lowercase. constants should be 'UPPERCASE_WITH_UNDERSCORES'.
* classes and class-level variables should be 'UpperCamelCase', and methods and local variables should be 'lowerCamelCase'.
* Native apex methods and classes should be generally referenced as written in official SF documentation.

### Example Code
```java
public static void exampleMethod(Integer num) {
    if (num == 1) {
        System.debug('num is 1');
    } else {
        System.debug('num is ' + num);
    }
}
```

## SOQL
* SOQL keywords (e.g., 'SELECT', 'WHERE', 'FROM') should be written in all caps.
* objects fields and variables should be referenced as declared.
* For complex SOQL queries, please seperate clauses of the query into seperate lines for easier readability. Use your judgement for the complexity of the query.
* Clauses begin in the column of the most relevant 'SELECT'.

### Example Query
```java
String name = 'abcd';
List<Contact> cons = [SELECT Id, FirstName, LastName, Phone, Email, 
                             MailingCity, Mailing State,
                             (SELECT Id, ActivityDate, Origin, Type,
                             RecordTypeId
                             FROM ActivityHistories
                             WHERE Type =: name)
                      FROM Contact
                      WHERE CreatedDate >= TODAY];
```

## SObject Constructor Syntax
When constructing an SObject, prefer the apex-specific syntax wherein all fields can be initialized from the constructor. Please choose a different line for each property for code readability.

Example: 
```java
Account acc = new Account(RecordTypeId = CUSTOMER_ACCOUNT_ID,
                          FirstName = firstName,
                          LastName = lastName
                         );
```

## Testing

* Please use '@isTest' attribute to declare test methods rather then the 'testmethod' modifier.
* When writing test cases, always use Test.startTest(); and Test.stopTest(); methods and indent the code between those method calls.

## Naming Conventions

### Classes and Triggers

Make sure to name your classes/ triggers after their functionality. Triggers should be verbs and end with 'Trigger'.

### Test Classes

For naming your test classes, please use the best practice of specifying the type of unit test in all caps (eg.,'TP', 'TN', 'TB', 'TRU'), followed by an underscore, then the name of the class you are testing. For broader test cases use the convention of 'TEST_ClassUnderTest'.