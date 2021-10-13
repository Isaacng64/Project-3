# JavaScript Style Guide
## Table of Contents
* [1. Introduction](#1-introduction)
    * [1.1 Guide Notes](#11-guide-notes)
* [2. Source File Basics](#2-source-file-basics)
    * [2.1 File Name](#21-file-name)
* [3. Formatting](#3-formatting)
    * [3.1 Braces](#31-braces)
    * [3.2 Code Blocks](#32-code-blocks)
    * [3.3 Statements](#33-statements)
    * [3.4 Whitespace](#34-whitespace)
    * [3.5 Parentheses](#35-parentheses)
    * [3.6 Comments](#36-comments)
* [4. Language Features](#4-language-features)
    * [4.1 Local Variables](#41-local-variables)
    * [4.2 Arrays](#42-arrays)
    * [4.3 Objects](#43-objects)
    * [4.4 Classes](#44-classes)
    * [4.5 Functions](#45-functions)
    * [4.6 Strings](#46-strings)
    * [4.7 This](#47-this)
    * [4.8 Comparators](#48-comparators)
* [5. Naming](#5-naming)
    * [5.1 Rules For Identifiers](#51-rules-for-identifiers)
    * [5.2 Rules By Identifier Types](#52-rules-by-identifier-types)
    * [5.3 Camel Case](#53-camel-case)

## 1. Introduction
This style guide lists conventions to write elegant JavaScript. The goal is to encourage writing clean, readable code and promote consistency across the project, discussions, and tutorials.

This style guide isn't meant as a hard rulebook. At times, you may not be able to apply some of the guidelines below. When that happens, use your best judgment, and ask your cohort for insight, if needed.

### 1.1 Guide Notes
Example code shown in this guide is not necessarily the only way to write code in this style. Optional formatting choices made in the example code are simply the preference of the author and not meant to be followed as rules.

## 2. Source File Basics

### 2.1 File Name
File names must be all lowercase and may include underscores (_) or dashes (-), but no additional punctuation. Decide upon the convention as a cohort and ensure that file names are kept consistent. Filenames’ extension must be .js

## 3. Formatting
Note: "code block" refers to the body of a class, function, method, or any brace-delimited block of code (for example, the contents of a for-loop).

### 3.1 Braces
Braces are REQUIRED for all control structures

Braces are required for all control structures (if, else, for, do, while, etc.) even if the body contains only a single statement. The first statement of a code block must begin on its own line.

* There must be NO line break before the opening brace.
* There MUST be a space before the opening brace.
* There MUST be a line break before the closing brace.

#### Good:
```JS

if (conditional) {
    doSomething();
} else if (anotherConditional) {
    doSomethingElse();
} else {
    doSomethingElser();
}

for (let i = 0; i < foo.length; i++) {
    bar(foo[i]);
}
```

#### Bad:
```JS
if (conditional)
  doSomething();

for (let i = 0; i < foo.length; i++) bar(foo[i]);
```

### 3.2 Code Blocks
Each time a new code block (refer to note at start of "formatting" section) is opened, the indent must increase by two spaces. When the block ends, the indent is decreased by two spaces again to match the previous code block level. The indent applies to both code and comments inside the block.

#### Good:
```JS
function checkCondition() {
  if (conditional) {
    doSomething();
  } else if (anotherConditional) {
    doSomethingElse();
  } else {
    doSomethingElser();
  }
}
```

#### Bad:
```JS
function checkCondition() {
if (conditional) {
doSomething();
} else if (anotherConditional) {
doSomethingElse();
} else {
doSomethingElser();
}
}
```

### 3.3 Statements
* Only one statement per line.
* Every statement MUST end with a semicolon.

### 3.4 Whitespace
#### Vertical whitespace:

* A single blank line MUST be inserted between the end of a function and the start of the next function.
* A single blank line MUST be inserted between code blocks with a class or function. For example, the end of an if block must be followed by a blank line.
* A single blank line MUST be inserted between class declaration and the start of its first function.
* There should NOT be multiple consecutive blank lines.

#### Horizontal whitespace:

* There should be a single space between if, for, do, and similar keywords and the parentheses that follow them.
* There should be a single space between the close parentheses and the open brace that follows them.
* There should NOT be a space between a function or constructor and the parentheses that follow them.
* There should be a single space on both sides of the ternary operator.
* There should be a single space following every comma or semicolon.
* There should be a single space after the opening curly brace and before the closing curly brace when initializing objects in a single line.

#### Good:
```JS
function checkCondition() {
  let result;
  
  if (conditional) {
    result = doSomething();
  } else if (anotherConditional) {
    result = doSomethingElse();
  } else {
    result = doSomethingElser();
  }
  
  return result;
}

function nextFunction() {
  /* some actions here */
}
```

### 3.5 Parentheses
Grouping parentheses are allowed but should not be used excessively, in order to maintain the readability of the code.

### 3.6 Comments
* Block comments are indented at the same level as the surrounding code.
* Block comments are opened with /* and closed with */. Every line between the open and close should start with an asterisk at the proper indent level to make it immediately known that it is a comment line.
* Comments should be used for parameters where the method name does not immediately convey the parameters that it is taking. This will make any future refactoring of code easier.
* Parameter comments should be in the "parameter=" format displayed below.
* All comments should be in the /* comment */ format. We do not use double slash (//) comments.

#### Good:
```JS
function checkCondition() {
  let result;
  
  /*  
   *  Here is
   *  an example
   *  of
   *  multiline comments.
   */
  
  if (conditional) {
    result = doSomething();
  } else if (anotherConditional) {
    result = doSomethingElse();
  } else {
    result = doSomethingElser();
  }
  
  /* This is another comment. */
  return result;
}
```

## 4. Language Features

### 4.1 Local Variables
* When declaring variables, use either const or let. Avoid using var.
* Only declare one variable per declaration.
* Always initialize variables as close to the point they are declared as possible.

#### Good:
```JS
function checkCondition() {
  let result = false;
  let x = 2;
  let y = 8;
  
  if (conditional) {
    result = doSomething();
  } else if (anotherConditional) {
    result = doSomethingElse();
  } else {
    result = doSomethingElser();
  }
  
  return result;
}

function nextFunction() {
  /* some actions here */
}

```

#### Bad:
```JS
function checkCondition() {
  let result = false, x = 2, y = 8;
  
  if (conditional) {
    result = doSomething();
  } else if (anotherConditional) {
    result = doSomethingElse();
  } else {
    result = doSomethingElser();
  }
  
  return result;
}

function nextFunction() {
  /* some actions here */
}
```

### 4.2 Arrays
* Include trailing commas in between elements.
* Array initialization CAN be done in multiple lines. When using multiple line initialization, use code block indentation practices defined in 3.2.
* Use [] when initializing arrays instead of "new Array()"

#### Good:
```JS
function checkCondition() {
  let result;
  let array1 = [0, 3, 5, 9];
  let array2 = ["zero",
                "three",
                "five",
                "nine"]
  
  if (conditional) {
    result = doSomething();
  } else if (anotherConditional) {
    result = doSomethingElse();
  } else {
    result = doSomethingElser();
  }
  
  return result;
}

function nextFunction() {
  /* some actions here */
}
```

### 4.3 Objects
* Include trailing commas in between properties.
* Similar to arrays, object initialization CAN be done in multiple lines. When using multiple line initialization, use code block indentation practices defined in 3.2.
* Use {} or { prop1: 1, prop2: 2 }
* Do not mix quoted and unquoted keys in a single object literal.

#### Good:
```JS
function checkCondition() {
  let result;
  let object1 = {name: "name1", value: "value1"};
  let object2 = {name: "name2",
                 value: "value2"};
  
  if (conditional) {
    result = doSomething();
  } else if (anotherConditional) {
    result = doSomethingElse();
  } else {
    result = doSomethingElser();
  }
  
  return result;
}

function nextFunction() {
  /* some actions here */
}
```

### 4.4 Classes
* Constructors are optional.
* Set all of an object's fields in the constructor and annotate fields that should not be reassigned with @const.
* Use custom getter and setter methods instead of JavaScript's default getter and setter methods.

### 4.5 Functions
* Functions may contain nested function definitions.

### 4.6 Strings
* ALL string literals MUST be surrounded by single quotes, rather than double quotes.
* String literals may not span multiple lines, unless you are including variables.
* If a string literal is long enough that it would naturally span multiple lines, cut the string at the end of the line, use + to concatenate them, and follow the proper indentation practices.

#### Good:
```JS
function outputLongString() {
  let longString = 'I sat on the bus, on my way to school. At one of the stops my mind snapped back to reality.' +
                   'I looked towards Tommy’s house.  A hand slipped through the drapes of the window and waved the' +
                   'bus driver to move on. The day flew by.  I watched the local news channel after school.' +
                   'Tommy’s entire family was murdered that day by an unknown suspect.  After hearing this news,' +
                   'I moved back up to my room and quietly fell asleep';

  console.log(longString);
}
```

### 4.7 This
* Only use this in class constructor and methods. NEVER use this to refer to the global object.

### 4.8 Comparators
* Use === and !== unless you're trying to compare with null or undefined, in which case you can use ==.

## 5. Naming

### 5.1 Rules For Identifiers
* Identifiers must be named only using ASCII letters and digits.
* Identifiers should be given descriptive names to make code as naturally readable as possible. Avoid using uncommon abbreviations.

### 5.2 Rules By Identifier Types
* Package Names are to be written in lowerCamelCase.
* Method Names are to be written in lowerCamelCase.
* Non-Constant Names are to be written in lowerCamelCase.
* Parameter Names are to be written in lowerCamelCase.
* Local Variable Names are to be written in lowerCamelCase.
* Class Names are to be written in UpperCamelCase.
* Enum Names are to be written in UpperCamelCase.
* Constant Names are to be written in all uppercase, with words separated by underscores.

### 5.3 Camel Case
Here are the steps for converting text to camel case:

* Remove all apostrophes from the phrase. For example, "Field's name" becomes "Fields name"
* Capitalize each word and remove any spaces. Continuing on the previous example, "Fields name" becomes "FieldsName"
* Lastly, if you are trying to get lowerCamelCase, change the first letter to lower case. If you are trying to get UpperCamelCase, make sure the first letter is upper case.
