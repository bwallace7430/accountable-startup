# Accountable: Startup
A full-stack journaling web application that allows people to quickly journal in a social way.
## Elevator Pitch
Every year, hundreds of people begin the new year with a resolution to more consistently journal. Journaling can help to improve gratitude, positivity, self-awareness, and memory. However, it is so hard to stay consistent with this valuable habit. Accountable is a full stack web application that turns daily journaling into a social event, making it easier and more fun to adopt this critical daily practice. Users can follow one another, and can see whether or not their friends have journaled that day. All journal entries are easily accessible, allowing users to quickly look back at their previous entries.
## Design
![Mockup](StartupMockup.png)
## Key Features
- Secure login with HTTPS
- Ability to pick a day and view, add, or edit journal entries for that day
- Ability to follow and unfollow other users
- Writing status of other users displayed in real time
- Journal entries are persistently stored
## Technologies
I am going to use the required technologies in the following ways.
- **HTML:** Three HTML pages. One page to log in, one page to view friends requests, and one page to view and add journal entries.
- **CSS:** Styling the pages in a way that is consistent and simple across all three pages and various different devices.
- **JavaScript:** Allows login, navigating between pages, applying friending and unfriending, and saving journal entries.
- **Service:** Login, retrieving journal entries, allows for friend requests
- **Database:** Stores user login information, friend network, and journal entries. Credentials stored here as well. Secures the application.
- **WebSocket:** As friends write journal entries, their statuses will update in real time
- **React:** The application will be refactored to use React elements

## HTML Deliverable
In this deliverable, I coded markup for my site in HTML.
- **HTML pages:** I coded up 3 HTML pages. One is the landing page, where users will log in or create a profile. The second is the journaling page, where users will create and edit journal entries. The third is the friends page, where users can view which friends have journaled and add new friends.
- **Links:** The landing page redirects the user to the journaling page when the user clicks the "Log in" button. The journaling and friend pages both have nav bars with links to each of the other pages (with the link to the landing page being the "Log out" button).
- **Text:** The quote on the journaling page is the placeholder for the third party service I will be using, which is an inspirational quote API.
- **Image:** I included a logo image that will be in the header on each of my pages.
- **DB/Login:** I included an input box for username and password, and buttons for either creating an account or logging in. The authenication of users will happen through the database. The months and days on the journaling page will have a journaling entry associated with them that can be pulled from the database. If the current date is chosen - as it is in my html placeholders - there will be a text area where the user can write their journal entry. The friends list included on the friends page also represents data that will be pulled out of the database.
- **WebSocket:** The checkboxes represent the realtime reporting of whether a user has written or not.

## CSS Deliverable
In this deliverable, I styled each page on my site in CSS.
- **Sections:** I created 3 stylesheets, one for each page of my site. Each stylesheet has a header, body, and footer section.
- **Nav Bar:** I styled the navigation elements to appear as buttons and other properly stlyled elements. These navigation elements include the login button, the friends section of the nav bar, the journal section of the nav bar, and the logout section of the nav bar.
- **Resizing:** Each page is reponsive to resizing, and elements in the body will move and shrink as necessary to fit the screen.
- **Application Elements:** The page has consistent styling and colors, and a good use of white space.
- **Application Text:** The font sizes and styles are consistent across the site and intuitively hint to their use.
- **Logo Image:** There is a logo image on the left end of each nav bar that is properly styled and sized.

## JS Deliverable
In this deliverable, I made my site interactive, designed to mimic the way users will interact with the site.
- **Login:** The login requires a username that is then displayed in the top right corner of the journal and friend's pages. A password is not required currently, but the create user and login buttons both lead to the journal page.
- **Database Data:** The calendar on the journal page is completely interactive and has entries stored in localstorage for the current date, February 12th, and January 5th. The user can create an entry on any day, and it will be saved in local storage. There is a dummy list of friends on the friends page, and any friend that is added using "Add Friend" will be added to local storage.
- **WebSocket:** The friends page has a list of friends that each start out with a gray indicator (to mark them as not having journaled). Every five seconds, a single indicator is randomly selected on an interval timer to turn green, which simulates the realtime update of friends that have written.
- **Interaction Logic:** A user is able to select a given date on the calendar on the journal page. That date will highlight to indicate that it is actively selected. The user can also toggle back and forth between months to look at previous journal entries.

## Service Deliverable
In this deliverable, I created a service using Node.js and Express
- **Static Middleware:** Done!
- **Third Party Endpoints:** There is a daily quote on the journaling page that is called from type.fit's quote API.
- **Backend Endpoints:** There are backend endpoints for creating a user, logging in, creating a journal entry, getting a journal entry, adding a friend, and getting a friend's list.
- **Frontend Service Calls:** Each page of the site has a couple service calls made using fetch.

## Login Deliverable
In this deliverable, I connected my site to a database.
- **MongoDB Atlas:** I created a database with associated collections to store my data.
- **Data Storage:** All persistent data is stored in the Mongo database
- **User Registration:** Users can create an account that will be persistently stored.
- **Existing Users:** Users can access all previous entries on the calendar day they were written for.
- **Credential Storage:** Mongo DB stores authentication information, along with all user information and journaling entries.
- **Functionality Restriction:** A user can only log in if they have registered, and can only journal and add friends if they've logged in.

## WebSocket Deliverable
In this deliverable I used WebSocket to create real time updates of a user's "written" status.
- **Backend:** The backend listens for a WebSocket connection.
- **Frontend:** The frontend makes a WebSocket connection from the "Friends" page.
- **Data:** When a user writes in their journal, their "written" status is updated and set to all their followers.
- **Data Displayed:** When the follower recieves the updated "written" status of a friend, the friend's active status turns from gray to green.

## React Deliverable
In this deliverable I converted to React to create a single-page application with smooth reactivity.
- **Bundled:** The application is created and bundled using Vite.
- **Components:** The header, footer, login, journaling page, friend page, and friend activity indicator were all components.
- **Router:** The application uses a react router to navigate between components.
- **Hooks** I use multiple hooks throughout my components including useState, useEffect, and useLocation.
