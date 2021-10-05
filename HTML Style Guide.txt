HTML Style Guide

Table of Content
    - Code Style
        - Syntax
        - CSS Styling
        - Comments
    - Coding Preferences
        - Section vs. Div
        - Classes vs ID

Code Style

    Syntax
        - Use soft tabs with two spaces. Best way to guarantee code rerenders the same in any environment.
        - Nested elements should be indented once
        - Always use double quotes on attributes ""

            Bad:
                <h1 class='theClass'>The Heading</h1>
            
            Good:
                <h1 class="theClass">The Heading</h1>

        - Don't use the back slash in self-closing elements

            Bad:
                <img src="image.png"></img>

            Good:
                <img src="image.png">

        - Only use lowercase 

            Bad:
                <A HREF="/">Home</A>
            
            Good:
                <img src="google.png" alt="Google">

        - Don't omit optional closing tags 

    CSS Styling
        - Use link 
        - Use inline Styling only if neccessary
        - Avoid using the <style> tag in the HTML document

            Bad:
                <style>
                    body {background-color: powderblue;}
                    h1   {color: blue;}
                    p    {color: red;}
                </style>


            Exceptional:
                <h1 style="color:blue;">A Blue Heading</h1>

            Good:
                <link rel="stylesheet" href="code-guide.css"> 

    JavaScript Styling 
        - Use the <script> tag
            example: 
                <script src="code-guide.js"></script>

    Attrbutes
        - Omit "type" for style sheets and scripts

            Bad:
                <link rel="stylesheet" href="https://www.google.com/css/maia.css" type="text/css">
                <script src="https://www.google.com/js/gweb/analytics/autotrack.js" type="text/javascript"></script>

            Good:
                <link rel="stylesheet" href="https://www.google.com/css/maia.css">
                <script src="https://www.google.com/js/gweb/analytics/autotrack.js"></script>

    Semantics
        - Use HTML according to its purpose
        - Use elements for what they are created for 

            Bad:
                <div onclick="goToRecommendations();">All recommendations</div>

            Good:
                <a href="recommendations/">All recommendations</a>

    Multimedia Fallback
        - Provide alternative contents for multimedia. This is important for accessibility reasons.
        - For multimedia (images, videos, animated objects via canvas), offer alternative access.
        - For images, use the alternative text (alt) also for video and audio transcripts and captions, if available.

            Bad:
                <img src="spreadsheet.png">

            Good:
                <img src="spreadsheet.png" alt="Spreadsheet screenshot.">

    Comments 
        - Use comments as needed to specify what is the purpose of a certain attribute

Code Preferences

    section vs. div
        - Use section for large portion of code
        - Use div for a small block of code

    classes vs ID
        - Use classes when defining elements
        - Use ID only when neccessary