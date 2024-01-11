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
