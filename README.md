# ShakeSearch

ShakeSearch is a chat application where you can ask anything related to Shakespeare and his works.
Using AI, the chat app provides meaningful and engaging conversations to help users learn and explore the world of Shakespeare.

## Project Journey
### Design
The design process was carried out using Figma.
Throughout the journey, I created and iterated on various designs, eventually settling on a simple and intuitive chat interface.

## Backend Development
For the backend, I used the mux library to implement routing and added linters to ensure code quality.
The project follows a typical scaffolding structure with /pkg and /cmd directories.
I decoupled the HTTP server from the core ask logic
and added observability using my own [open-source library](https://github.com/lucianogarciaz/kit) 🙂⭐ (it's in progress yet).

## Frontend Implementation
The frontend was built using a simple React app created with create-react-app.
CSS styling is contained in a single file. While there's room for improvement in the frontend,
my primary focus was on creating a seamless user interaction with the product.

## Iterative Design Process
### Initial Design:
The initial design included a filter for Shakespeare's works and a search input to look up specific parts of his work.

### First Redesign:
Introduced example questions for users and placed the input on the left side.
This design was found to be too text-heavy and not as user-friendly as desired.
![design](./design/first.png)

### Second Redesign:
Moved everything to the right side (input and answer) but still faced the issue of users needing to read a lot before they could start asking questions.
![second](./design/second.png)
![third](./design/third.png)

### Third Redesign Inspired by Google:
Focused on the chat experience by removing unnecessary elements and creating a seamless user onboarding experience.
![fourth](./design/fourth.png)

### Final Design:
A chat application that simulates a conversation with a Shakespearean expert, enabling users to quickly engage and learn about Shakespeare without any distractions.
![fifth](./design/fifth.png)

## Conclusion
I must say, working on ShakeSearch was fun!
Going through the various design iterations, try to understand users, and create a seamless user experience has been both fun and rewarding.
The opportunity to chat with a Shakespearean expert is undoubtedly an intriguing concept 😂
