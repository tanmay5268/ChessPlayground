#  ChessPlayground - Real-time Multiplayer Chess Game

A real-time multiplayer chess application built with Node.js, Express, Socket.IO, and Chess.js. This project enables two players to play chess together in real-time through their web browsers, with support for spectators and move logging.

##  Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Installation & Setup](#installation--setup)
- [Special Features](#special-features)
- [What You'll Learn](#what-youll-learn)
- [Future Enhancements](#future-enhancements)

##  Features

- **Real-time Multiplayer**: Two players can play chess simultaneously from different browsers
- **Spectator Mode**: Additional users can join and watch the game without participating
- **Move Validation**: All chess rules enforced using Chess.js library
- **Drag & Drop Interface**: Intuitive piece movement using HTML5 drag and drop
- **Move History**: Separate move logs for both White and Black players
- **Board Flip**: Black player's view automatically flips for better perspective
- **Game Status Messages**: Real-time status updates (waiting for opponent, game started, checkmate)
- **Checkmate Detection**: Automatic game-over detection and winner announcement
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS

##  Technologies Used

- **Backend**:
  - Node.js
  - Express.js (v5.2.1)
  - Socket.IO (v4.8.3) - Real-time bidirectional communication
  - Chess.js (v1.4.0) - Chess game logic and validation

- **Frontend**:
  - HTML5 & EJS (Embedded JavaScript templates)
  - Tailwind CSS - Styling
  - Vanilla JavaScript
  - Socket.IO Client
  - Chess.js Client

##  Project Structure

```
ChessPlayground/
├── app.js                 # Main server file with Socket.IO logic
├── package.json           # Project dependencies
├── views/
│   └── index.ejs         # Main HTML template
└── public/
    └── js/
        └── chessgame.js  # Client-side game logic
```

##  How It Works

### Backend Architecture (app.js)

1. **Server Setup**: 
   - Express server created and linked with HTTP server
   - Socket.IO attached to HTTP server for WebSocket connections

2. **Player Management**:
   - First connection assigned as White player
   - Second connection assigned as Black player
   - Additional connections become spectators
   - Players tracked by unique socket IDs

3. **Game State Management**:
   - Chess.js instance maintains the game state
   - FEN notation used to sync board state across clients
   - Move validation handled server-side to prevent cheating

4. **Event Handling**:
   - `connection`: Assigns roles (white/black/spectator)
   - `move`: Validates and broadcasts moves
   - `disconnect`: Handles player leaving
   - `gameStarted`: Emitted when both players are connected

### Frontend Architecture (chessgame.js)

1. **Socket Connection**:
   - Establishes WebSocket connection with server
   - Can be configured for manual connection (autoConnect: false)

2. **Board Rendering**:
   - Dynamically generates 8x8 grid using JavaScript
   - Uses Unicode characters for chess pieces (♔♕♖♗♘♙)
   - Applies light/dark square coloring

3. **Drag & Drop System**:
   - `dragstart`: Captures source square
   - `dragover`: Allows drop on valid squares
   - `drop`: Triggers move validation and emission

4. **Role-based Interaction**:
   - Only allows players to move their own pieces
   - Spectators can view but not interact
   - Board flips for Black player perspective

5. **Move Logging**:
   - Tracks all moves with piece Unicode and notation
   - Separate logs for White and Black moves
   - Automatically scrollable for long games

##  Installation & Setup

1. **Clone or Download the Project**
   ```bash
   cd ChessPlayground
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Server**
   ```bash
   node app.js
   # or with nodemon for auto-restart
   nodemon app.js
   ```

4. **Access the Game**
   - Open browser and navigate to `http://localhost:3000`
   - Open second browser/tab for the second player
   - Game starts automatically when both players connect

##  Special Features

### 1. **Real-time Bidirectional Communication**
Uses Socket.IO for instant move synchronization without page refreshes. This demonstrates the power of WebSockets over traditional HTTP requests.

### 2. **Role-based Access Control**
Intelligent player assignment:
- First user → White player
- Second user → Black player
- Subsequent users → Spectators

### 3. **Client-Server Validation**
Dual validation layer:
- Client-side: Prevents dragging opponent's pieces
- Server-side: Validates all moves to prevent cheating

### 4. **FEN Notation Synchronization**
Uses Forsyth-Edwards Notation (FEN) to maintain consistent board state across all connected clients.

### 5. **Dynamic Board Rotation**
Black player's board automatically flips 180° for intuitive gameplay, with pieces counter-rotated to remain upright.

### 6. **Game State Management**
Tracks whether game has started, preventing moves until both players are ready.

### 7. **Automatic Promotion**
Pawns automatically promote to Queens when reaching the opposite end (configurable).

##  What You'll Learn

By understanding this project completely, you'll gain expertise in:

### 1. **Real-time Web Applications**
- WebSocket protocol and Socket.IO implementation
- Event-driven architecture
- Bidirectional client-server communication
- Connection state management

### 2. **Game Development Concepts**
- Turn-based game logic
- Move validation and game rules
- State synchronization across multiple clients
- Player role management

### 3. **Frontend JavaScript Skills**
- DOM manipulation and dynamic rendering
- HTML5 Drag and Drop API
- Event handling (dragstart, dragover, drop, dragend)
- CSS Grid layout for game boards
- Responsive design patterns

### 4. **Backend Node.js Development**
- Express.js server setup
- HTTP server integration
- Event-driven programming with Socket.IO
- Session management using socket IDs
- Error handling and move validation

### 5. **Chess Programming Basics**
- Chess notation (algebraic notation, FEN)
- Using chess libraries (Chess.js)
- Game state representation
- Move generation and validation

### 6. **Software Architecture Patterns**
- Client-server architecture
- Model-View separation
- Event-driven design
- State management strategies

### 7. **Modern Web Technologies**
- EJS templating engine
- CDN integration for libraries
- Tailwind CSS utility-first styling
- Unicode characters for UI elements

### 8. **Debugging Real-time Applications**
- Console logging strategies
- Network inspection for WebSocket traffic
- State debugging across multiple clients

##  Key Concepts Demonstrated

1. **Multiplayer Synchronization**: All players see the same board state instantly
2. **Graceful Degradation**: Handles disconnections and reconnections
3. **Security**: Server-side validation prevents client manipulation
4. **User Experience**: Real-time feedback and status messages
5. **Scalability Foundation**: Socket rooms concept (can be extended for multiple games)

##  Future Enhancements

Potential improvements to explore:
- Timer/clock for each player
- Chat functionality between players
- Multiple game rooms support
- Game history and replay functionality
- Player authentication and rating system
- Draw offers and resignation
- Save/load games in PGN format
- AI opponent using chess engines
- Sound effects for moves
- Highlighted last move and legal moves
- Undo/redo functionality (in friendly games)

##  Notes

- Game state resets when all players disconnect
- Manual connection can be enabled by setting `autoConnect: false` in Socket.IO client
- Spectators receive board updates but cannot make moves
- Server runs on port 3000 by default
  
  
---

**Congratulations!** If you've understood this project completely, you now have a solid foundation in real-time multiplayer game development and can build similar applications like tic-tac-toe, checkers, or even more complex multiplayer games!
