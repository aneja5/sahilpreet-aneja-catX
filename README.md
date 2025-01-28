# CatX App

This is a social media application that mimics some core functionalities of platforms like Twitter. It allows users to post status updates, manage their profiles, and interact with other users in a simple, user-friendly interface.

## Deployment

The app is live and accessible at the following URL:  
[CatX App](https://sahilpreet-aneja-project3.onrender.com)

## Features

- **User Authentication**: Secure login and registration with session handling via cookies.
- **Status Updates**: Users can create, edit, and delete their status updates.
- **User Profiles**: Each user has a profile page displaying their statuses.
- **Responsive Design**: Optimized for both desktop and mobile views.

## Challenges Faced

One of the primary challenges I encountered during the development of the Bluesky/Twitter app was deploying the app. It took considerable effort to ensure that both the frontend and backend were correctly deployed on Render, particularly with managing the backend routes and APIs. Additionally, handling session states securely with cookies, managing authentication, and ensuring smooth integration between the frontend and backend posed some difficulties.

## Additional Features or Design Changes

If I had more time, I would add several additional features to enhance the user experience and app functionality:

1. **Likes**: Users would be able to like status updates to express their interest or approval.
2. **Reshare**: Users could reshare a status update from another user, potentially adding a comment or reaction to it.
3. **Comments**: Users could comment on status updates, allowing for conversations and interactions on specific posts.
4. **Direct Message**: A direct messaging feature would enable users to privately communicate with each other within the platform.
5. **Save Status**: Users would be able to save status updates they find interesting for easy access later.
6. **Edit User Profile**: On the profile page, users could edit their personal details, such as updating their profile description or changing their password.

Additionally, I would focus on enhancing the design by adding more responsive features to improve usability on mobile devices and streamlining the user interface to make navigation smoother.

## Assumptions Made

During the development of this app, I made a few key assumptions:

1. Users would have basic familiarity with social media platforms like Twitter, so the app’s core functionality (posting, editing, deleting) is modeled after their features.
2. I assumed that the backend would handle basic security tasks like password encryption, authentication with sessions, and ensuring the integrity of data from unauthorized users.
3. I assumed that users would expect a clean, simple design with the primary focus on the feed and user interactions, leaving advanced features like media uploads and likes for future improvements.

## Time Taken to Complete

This assignment took approximately 40 hours to complete. The initial setup, including creating the backend, connecting MongoDB, and setting up React, took about 15 hours. Implementing core functionality (such as login, post creation, and basic page routing) took around 15 hours. Finally, polishing the design, testing, and debugging took an additional 10 hours to ensure a smooth user experience and that all features worked correctly.

## Libraries and Tools Used

1. **TailwindCSS**: Used for rapid UI development with utility-first CSS, allowing me to quickly style the application with minimal custom CSS.
2. **DaisyUI**: A component library built on top of TailwindCSS, which provided ready-to-use UI components that helped accelerate the development process.
3. **Tanstack**: Used for managing application state, including handling data fetching and managing the data flow across different components.
4. **React Icons**: Used for adding scalable vector icons to enhance the UI.

---

Feel free to reach out if you have any questions or feedback!
