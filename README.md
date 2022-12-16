
**Developers---------------**
***Parv Gupta,***
***Naman Malik,***
***Devansh Gupta,***
***Vaibhav Goyal***


**Wazir - The Smart Chessboard**
 
**Abstract**

Wazir is an automated voice chessboard with self-moving chess pieces. The board lets you play an authentic and real-time chess game against anyone and allows you to enjoy a great chess game wherever you are, anytime. It connects you with someone on the other side of the planet or with a family member or a friend you haven't seen in a long time. The pieces move independently with the assistance of AI, as if they are charmed, much like in a fairy novel. Playing a hands-free chess game will astound everyone. It will maintain the features such as voice command, playing against human-like AI, learning from every game, and serving as the ultimate instrument of communication for people worldwide.

The board has embedded Arduino mega and ESP modules connected to the Internet, allowing users to control the pieces through our web app. The user can play the game through our web application which is user-friendly and easy to navigate. The web app and the physical framework will be synced, making it easier to keep an apt track of the user's movements. Two stepper motors and timing belts move the electromagnet. Each component contains a loose steel ball bearing that allows them to glide around effortlessly.

This project will cater to the needs of a diverse group of people worldwide and of different age groups.

**Introduction**

1. **Project Overview**

Project Wazir aims to develop a fully automated voice-assisted chess board with self-moving chess pieces. The board will let a player play a real-time chess game with anyone, anywhere in the world. A game can also be played independently against the Artificial Intelligence model trained using reinforced learning.

The Chess Board is already embedded with Arduino Mega 2560 and ESP 8266 to seamlessly communicate with our server over the internet and perform various required moves. Users can play the game through our web application which is interactive and user-friendly.

The final aim of the project is to sync the web application and the physical board, making it easier to keep an apt track of the user’s movement. Chess Board is designed using two stepper motors and a timing belt in an H-Type plotter, which can move in a two-dimensional cartesian plane. The Electromagnet mounted on the plotter attracts the magnets present on the chess pieces, The swift movement of the plotter with coordination using relays allows the pieces to glide effortlessly.

1. **Problem Statement**

We are presently having the largest population of youth, and that is the bedrock of our future. However, we are soon also going to have perhaps the largest population of the elderly, and the elderly, as per the information gathered from the Department of Geriatrics, AIIMS, tend to face gradual degradation of mental faculties which could lead to several disorders like Amnesia, Alzheimer disease, among others. One possible way to arrest the onset or at least lessen the impact of these challenges is to engage the elderly in mind games like Sudoku, Chess, and so on. We targeted Chess as it is invented in India and is considered a mental sport.

2. **Goal**

A Real-time voice-controlled chess board with self-moving chess pieces and inbuild an Artificial intelligence model with different levels of difficulty. The main goal is to synchronize web-based chess to a real-life chess board by the use of fine engineering techniques and advanced technology. The device is an IoT edge device, therefore, it should not require any connectivity to external devices whereas a continuous connection to the internet is required.

The board should also consider the limitations posed when a player is new to the game. Therefore it has features like tutorial mode. The board can teach a beginner how to play the game by showing real-world moves and also makes the tutorial an interactive experience as the board uses the inbuilt speaker to interact with the user and guide them as they learn.

3. **Solution**

The Chess Board uses a 2 stepper motor H-plotter design to move the electromagnet, which is controlled by the Arduino Mega 2560 along with ESP 8266 for internet connectivity. Chess training and practice help to improve the game and the skills. The board has inbuilt LEDs to help a beginner to learn where they can move the chess pieces during the game.

The hardware brings out this feature from software to the real world thereby increasing the interactiveness of the board. Most of the online multiplayer games come with the feature of voice command, hence we have included the feature of voice command for ease of access for a person with disabilities. The detection of pieces is very important to know the position of the game, hence using an RFID detector and NFC stickers with a combination of multimeters allows us to detect the pieces accurately. Since the board is an IoT Edge device it should be standalone and connect to the internet directly. A Basic version of binaries is stored in the board’s memory which is used in the offline version against the computer mode. This can prove to be entertained during the internet cutoffs.

2. **Need Analysis**
1. **Universal use**

This board will minimize the Children's average Smartphone/Computer screen time, allowing children to learn without the assistance of another person, and is a stand-alone gadget that can teach youngsters how to play chess. This board is for anyone who wants to play with friends or strangers.

2. **Differently-Abled individuals**

This project will definitely help differently-abled people to play and learn chess by providing features such as move announcement, state announcement, and moving pieces with voice command. We aim to design a chessboard for the visually impaired as it is not possible for the blind to play chess on computers and smartphones.

3. **Dementia patients**

According to a Government survey [8], people who play Board games are less likely to develop Dementia. As a result, our board allows users to play chess without having to face an opponent and removing the loneliness feeling from their minds.

4. **A Board for professional players**

This project will also help Professional Chess players by doing data analysis of their moves, guiding them about their blunders, hence increasing their skills. They can practice against an AI according to their rating, which will help them hone their skills. According to International Chess Federation (FIDE), there are a total of 67 Chess Grandmasters from India and our board aims to make a significant increase in this number. [17]

5. **Connecting people**

According to the research findings loneliness, sociability, depression, and lack of interaction are severe problems in nursing homes and care facilities. As a result, our board focuses on connecting individuals from all over the world and providing the capability to play alone to offer people healthy exercise.

**Methodology Adapted**

**3.1. Investigative Techniques**

1. **Goals & Unique features**

The goal of this project is to develop a physical chessboard that has a compatibility with our web based platform. This will be an AI integrated and Wi-Fi enabled system that enables the uses to play chess with anyone in the world with ease. This project will also help Professional Chess players by doing data analysis of their moves, guiding them about their blunders, hence increasing their skills. They can practice against an AI according to their rating, which will help them hone their skills. According to the research findings, loneliness, sociability, and depression in nursing home seniors, loneliness, and lack of interaction are severe problems in nursing homes and care facilities. As a result, our board focuses on connecting individuals from all over the world and providing the capability to play alone to offer people healthy exercise.

The chessboard also considers the limitations posed when a player is new to the game. Therefore it has features like tutorial mode. The board can teach a beginner how to play the game by showing real world moves and also makes the tutorial an interactive experience as the board uses the inbuilt speaker to interact with the user and guide them as they learn.The introduction of audio feedback and visual feedback makes the board more attractive to younger players. Therefore they will be introduced to chess in a more fun and intuitive way.

2. **Design & Implementation of application**

The modules of application are divided into two parts where a part is dedicated to server side API and other part/layer is dedicated to client or the front-end of the project. The Server is then connected with the physical boards using ESP-8266 module coded over C/C++. The framework to develop various APIs is NODE Js along with Express Js with direct connection with the database i.e. Mongo DB. The APIs follow various security and engineering standard including authentication using JWT which are considered to be production ready and highly reliable.

The Client or the front-end part of the project is developed using JavaScript based framework React JS, being the most popular framework with best support for production ready components and high scalability makes this the best choice to use react. The sockets work over a library socket io which provides the solution for socket/async applications by emitting data on various events.

**3.1.3 Design & Implementation of hardware**

Hardware for the project has two sides including technical and mechanical. The motors used for the development of H-Plotter were Nema Stepper Motors with the combination of belts,steel rods and ball bearings that ensures the smooth movement of electromagnet that is mounted over the plotter. The electomagnet, motors & display is ![](Aspose.Words.bb321486-1594-4552-a469-4479c10af2dc.007.jpeg)controlled by the use of relays and Arduino Mega 2560 that communicated with ESP-8266 module by digital signals. 

A custom circuit is used along with a combination of multiplexers, which are used to detect the pieces that are present physically over the board. 

The RFID detection and electromagnetic sensing makes sure the algorithm is fed with the required data correctly, which further defines the position of the board at any moment to analyse the game. 

**3.2 Proposed Solution**

- Wazir comes with a package of tutorial and practice mode, where a tyro can learn to play and learn various tactics from a robot trained on a large data to give the best and analytic knowledge to play the right move.

The game of chess is a matter of two fundamental skills, positional evaluation and calculations. Its possible to learn these skills by playing games and learning from the experience. The AI makes it possible to generate a number of tactics in accordance to past games and their results. This allows the user to learn the best moves and tactics from the pre-processed and carefully analysed knowledge that comes from a number of games.

- We are currently using DATABASE by ChessBase which is an open source repository for around 8 million games, that are processed and used to train the artificial intelligence algorithm for best results.
- Person with disability used to face problems while playing chess. This can be removed by introducing voice command recognition to play the game, and hereby making autonomous moves on the physical board so our board has voic e automated chess board with self moving chess pieces.
- With Wazir, you'll always have a worthy opponent to challenge, whether it's face-to-face with a friend, a competitor across the world, or the chessboard's Adaptive AI, which adjusts to your skill level quickly.
- Wazir has hardware and online platform and they are integrated with each other.
- Two chess boards are connected with each other through Wazir online platform. This platform will connect you with an opponent living anywhere in the world. Suppose you get the black pieces and make the move Qh6 on the board, that same move will automatically be executed on your opponent's board.
- Wazir also provide a vast set of problems to help the beginners to learn the chess very easily which we call the tutorial mode for beginner.
- Wazir promotes Make in India initiative, and helps to generate skilled employment. It also promotes chess culture in India.
3. **Work breakdown structure**

![](/Readme Images/Aspose.Words.bb321486-1594-4552-a469-4479c10af2dc.008.jpeg)

4. **Tools & Technology**
- **Arduino Mega 2560:** The Arduino Mega 2560 is a microcontroller board based on the ATmega2560. It has 54 digital input/output pins (of which 15 can be used as PWM outputs), 16 analog inputs, 4 UARTs (hardware serial ports), a 16 MHz crystal oscillator, a USB connection, a power jack, an ICSP header, and a reset button. It contains everything needed to support the microcontroller; simply connect it to a computer with a USB cable or power it with a AC-to-DC adapter or battery to get started. The Mega 2560 board is compatible with most shields designed for the Uno and the former boards Duemilanove or Diecimila.
- **ESP8266:** The ESP8266 WiFi Module is a self contained SOC with integrated TCP/IP protocol stack that can give any microcontroller access to your WiFi network. The ESP8266 is capable of either hosting an application or offloading all Wi-Fi networking functions from another application processor.
- **Node Js:** Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on a JavaScript Engine and executes JavaScript code outside a web browser, which was designed to build scalable network applications.
- **Express Js:** Express.js, or simply Express, is a back end web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.
- **React Js:** React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies.
- **Mongo DB:** MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License which is deemed non-free by several distributions.
- **Socket.IO:** Socket.IO is an event-driven library for real-time web applications. It enables real-time, bi-directional communication between web clients and servers. It has two parts: a client-side library that runs in the browser, and a server-side library for Node.js. Both components have a nearly identical API.

**Design Specifications**

1. **System architecture**
1. **Use Case Diagram**

![](Aspose.Words.bb321486-1594-4552-a469-4479c10af2dc.009.jpeg)

Use Case Diagram

2. **Activity Diagram**

![](Aspose.Words.bb321486-1594-4552-a469-4479c10af2dc.010.jpeg)

Activity Diagram

3. **Sequence Diagram**

![](Aspose.Words.bb321486-1594-4552-a469-4479c10af2dc.011.jpeg)

Sequence Diagram

4. **State Chart Diagram**

![](Aspose.Words.bb321486-1594-4552-a469-4479c10af2dc.012.jpeg)

State Chart Diagram

2. **Design Model**
1. **Class Design**

![](Aspose.Words.bb321486-1594-4552-a469-4479c10af2dc.013.jpeg)

Class Design

2. **ER Diagram**

![](Aspose.Words.bb321486-1594-4552-a469-4479c10af2dc.014.jpeg)

ER Diagram

3. **Data Flow Diagram**
1. **Level 0**

![](Aspose.Words.bb321486-1594-4552-a469-4479c10af2dc.015.jpeg)

FIGURE 4.2.3.1.1 Data Flow Diagram Level 0

2. **Level 1**

![](Aspose.Words.bb321486-1594-4552-a469-4479c10af2dc.016.jpeg)

Data Flow Diagram Level 1

3. **Level 2**

![](Aspose.Words.bb321486-1594-4552-a469-4479c10af2dc.017.jpeg)

Data Flow Diagram Level 2 (For Chessboard Mode)

FIGURE 4.2.3.3.2 Data Flow Diagram Level2 (For Chess Pieces Movement)![](Aspose.Words.bb321486-1594-4552-a469-4479c10af2dc.018.jpeg)

![](Aspose.Words.bb321486-1594-4552-a469-4479c10af2dc.019.jpeg)

Data Flow Diagram Level2 (For Plotter Data)

3. **Gantt Chart**

![](Aspose.Words.bb321486-1594-4552-a469-4479c10af2dc.020.jpeg)

Gantt Chart

4. **Architecture Design**

**4.4.1 Component Diagram**

![](Aspose.Words.bb321486-1594-4552-a469-4479c10af2dc.021.jpeg)

Component Diagram

5. **Hardware Design**

![](Aspose.Words.bb321486-1594-4552-a469-4479c10af2dc.022.jpeg)

Hardware Design

6. **Web-app Screenshots**

![](Aspose.Words.bb321486-1594-4552-a469-4479c10af2dc.023.jpeg)

Login Screen

![](Aspose.Words.bb321486-1594-4552-a469-4479c10af2dc.024.jpeg)

Playing Screen

**Conclusion & Future Scope**

1. **Work Accomplished**

By the end of this project, we aim to provide a working model of the Smart Chess Board which will enable the user to play or learn with Voice Commands.

**Hardware developments**– We have developed a functional XY Plotter (H bot mechanism) prototype, which will be equipped with an electromagnet for the smooth movement of the chess pieces. (Tech Stack includes Arduino Mega, Esp/Wifi Modules, IoT, Nema Motors, CNC shields, Electro Magnets, Circuit Designing)

**Software developments -** We have developed a compatible Web server that will coordinate with our inhouse ChessBoard (Plotter) so that the movements of the chess pieces could be reflected on the hardboard. Our further developments will be to train and deploy a Reinforced Learning Model for the move predictions. (Tech Stack includes Node JS, React Js, Mongo DB, Socket.IO, Reinforced Learning, Fast API, Django Rest Framework).

2. **Future work plan**

The speeds of communication with the server are right now estimated to 6 to 30s, in furure we aim to decrease this time to make it real time by using better algorithms and communication techniques.

Till the date the detection system works on wired mechanism while we plan to move with a better method of detecting pieces, i.e. by using RFID and electromagnetic detection.
