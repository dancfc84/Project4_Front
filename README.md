
## Description

This was the fourth project for the General Assembly Software Engineering Immersive course, I built a full-stack application where users can exchange books with other users.

You will find the deployed app here:  [Book Exchange](https://b00k-exchange.netlify.app)

## Getting started

1. Download source code via the 'Clone or download' button in GitHub.
2. In the CLI navigate to the root of the Project4_Front, then run npm i to install dependencies.
3. In CLI, open a new tab, and navigate to the root of Project4_Back and run pipenv install to install required dependencies.
4. Finally, run npm run start in Project4_Front, and run pipenv run flask run in Project4_Back to start the program in your local environment.

## Timeframe & Working Team

- Timeframe:
    - 2 weeks
 
- Working Team:
    - Solo project

## Technologies used
- Node.js
- Flask
- PostgreSQL
- Python
- JavaScript
- React
- JSON Web Tokens (JWT)
- Bcrypt
- Axios
- GitHub
- Bulma
- HTML
- CSS

## Brief
- Build a full-stack application by making your own backend and your own front-end.
- Use a Python Flask API using a Flask REST Framework to serve your data from a PostgreSQL database.
- Consume your API with a separate front-end built with React.
- Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models.
- Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut.
- Have a visually impressive design to kick your portfolio up a notch and have something to wow future clients & employers. ALLOW time for this.
- Be deployed online so it's publicly accessible.
 
 
## Planning
After we were given the brief, I investigated a few different ideas and decided to create a book exchange website.

I then considered what functionality I wanted to have in the app. I broke down all the different tasks that would need to be achieved for the basic functionality to be implemented and put the jobs in Jira. I split the tasks into different sprints, starting with the technical setup and the MVP goals, then followed by my stretch goals.

![Screenshot - Jira](https://github.com/dancfc84/Project3_Front/blob/main/Screenshots/jobpage.png) 
 
As I completed tasks, I marked them as done within Jira. It was crucial to keep tabs on all outstanding jobs as there was a lot to do and I was working alone.

I also created wireframes for the core components of the website and planned out the models required and the relationships between them.
 

Database relationship diagram

 
Build Code Process
Back-end (days 2 to 4)
The back-end was created using Python, the brief stipulated that we use the Django web framework with a PostgreSQL database, in total I had 10 models to create. Firstly, I created the base model, which was included in every other model, this allocated each entry a unique ID and noted when the entry was created and updated. I found the process of creating the models and serializers to be straightforward. However, creating the controllers was an enjoyable challenge because there was complex logic that needed to be implemented. Once everything had been created, I began to test each of the endpoints using Insomnia, this was to confirm I was receiving the responses that I expected.
 
 
 
 
Featured code: Book model and controller
The book model was crucial, it had several relationships with other tables and was part of two key join tables, the tables allowed users to list books for sale and to add book to the users wish list.

Here is the wish list join table, which joined a book.id with a user.id.

I used SQL queries in my controller routes to gather the relevant data and send it back as JSON. 

 
Front-End (days 5-8)
React was used for the front-end; several React hooks were used including useState, useContext, useEffect and useReducer. I used Axios for the http requests to the back-end.
Featured Code – Creating a cart using useContext and useReducer
I created the CartContext function using createContext and used it to create a provider so that my components would have access to my cart state globally throughout the app.
 
store/cart-context.js

 
store/CartProvider.js








I then wrapped all the components that require access to my Cart state in the CartProvider in my App.js file.



I then created a reducer function, that contained logic to add or remove items from my cart and added it as an argument to the useReducer hook.





The returned dispatch function was called when a user either added or removed an item, when the dispatch function was called, the type was set to either ADD or REMOVE.




Styling (days 9 to 12)

I styled the site mainly using CSS but used Bulma too. I felt comfortable using flexbox to style my pages and made the site responsive. I used coolers.co to pick a colour scheme and I made sure that I stuck with the palette I had chosen throughout the website to keep styling consistent.



Challenges

When I went to deploy my website using Netlify, I experienced issues when I attempted to communicate with some of my endpoints from the front-end; I got a mixed-content http error.



Firstly, I went through my code to see if I had made any requests with links using http instead of https, however, that was not the issue. Consequently, I did some research on stack overflow and I found that adding the following line of code to the head of my index.html file in my public folder fixed the problem.

  <head>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
  </head>

Wins

Creating a complete, responsive, full-stack application despite going solo for the project was an incredible feeling, it was missing some advanced features that I wanted to implement but I was very pleased with what I achieved in the timeframe, I feel that it gives me confidence going forward in my career as a developer.


Key Learnings/Takeaways

I learnt two new React hooks that we weren’t taught within the course (useContext and useReducer), and I reinforced my understanding of the useEffect hook.  

This was the first project that I used Flask, initially, I found it quite cumbersome in comparison to Express.js but as I began to build my back-end, I started to become more comfortable with Flask and Python, I especially enjoyed using it in tandem with postgreSQL queries when retrieving data as I have prior experience using MSSQL at my previous company.

Bugs

An issue with registering if the user has already been created, logic needs to be added in the user controller to send an appropriate error back when this occurs.
Token is still saved in local storage even if the token has expired which causes issues, need to add some logic so that the token is checked and removed if expired.

Future Improvements

To improve the styling of the header and footer.
I want the user to be able to view books they are selling in their user profile.
Add in a system where you can review books and sellers on the site.
Add data validation, error handling.
Add a loading screen when the front-end is waiting for data from my backend.
I want a user to be notified when they need to send a book.
