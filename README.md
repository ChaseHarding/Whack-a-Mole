# Whack-A-Mole
Welcome to my take on a classic arcade game. This game features a dynamic and responsive design, with moles popping up randomly for users to quickly whack and score points.
Through this project I demonstrated my skills in combining my background in digital design and artwork with these newly aquired web languages.
## How it was made:
This project was crafted using a combination of HTML, CSS, and Javascript to achieve a seamless and immersive experience. 
HTML provided the structure of my game, defining elements such as the game board, score display, and of course, the moles.
CSS played a crucial role in enhancing my games visual appeal with animations and responsive design elements.
The dynamic functionality of the game was created with Javascript. This is where i programmed logic for the moles to appear and dissappear after being whacked. 
Event listeners were utilized to listen for user clicks and update the users score. 
To enhance the gmaing experience, I incorporated audio elements. For the distinctive "mole squeek" I utilized an audio file adn triggered it dynamically during specific game events.
As a digital artist i took a very hands on approach to this whack-a-mole by creating custom assets that contribute to the games unique visual identity. In addition to mole graphics, 
I created captivating background images that adorn the game, setting the tone for the players experience. I designed Dingo, the games spirited mascot destined to be the players
loyal companion--a spirited shiba ready to embark on thrilling mole-hunting adventured. Both the immersive backgrounds and lively mascot were brought to life through my artistic endeavors,
aiming to elevate the overall aethetic and engagement of the gaming environment.

## Optimization
In the optimzation phase, i focused on enhancing the games performancea and user experience. Through careful code refinement, I streamlined the javascript functions responsible for mole 
generation, click detection, and score updates. Additionally, I implemented responsive desingn principles in CSS to gurantee optimal displayacross various devices. 

##Known Bugs
1. Timer for game end can continue displaying a countdown animation after the game has ended for.
2. Possible to score a point if mole is still on screen while Game Over is displayed.

##Planned Updates
1. Bug fixes for UX/UI
2. Dingo, the loyal companion
3. Mole diversity
4. Bombs
5. Animations for moles appearing and hammer whacking
6. High Score systems with local storage 


## Lessons Learned
Autoplay Policy in Chrome changed during April of 2018. Autoplay is only allowed once a user interacts with the domain(click, tap, etc.)
see more here https://developer.chrome.com/blog/autoplay
Key concepts:
1. Event Handling: The concept of event handling by attaching functions to various user interactions such as clicking moles, toggling music and handling countdowns.
2. Randomization: My use of Math.random for mole appearence and time intervalsdemonstrates understanding of randomization techniques to create dynamic and unpredictable game elements.
3. Audio Integration: The incorporation of sound effects using Web Audio API showcase my ability to integrate multimedia elements, ehancing overall game experience.
4. DOM Manipulation: I've effectivley manipulated the Document Object Model(DOM) to update scores, change styles, and dynamically create elements.
5. Game Logic: This code reflects a solid understanding of gmae logic, including fucntions for mole appearences user interactions, score updates, and game end conditions.
6. Asynchronous Programming: Use of setTimeout and SetInterval demonstrates a grasp of asynchronous programming crucial for managing time-based events in games.
7. Function Modularity: Each function serves a specific purpose, contributing to overall readability and maintainability. Well-organzied into modular fucntions, promoting reusability and maintainability.
8. Responsive Design: The inclusion of a volume control slider reflect an awareness of user experience and resposiveness. allowing players to adjust the games audio according to their preferences.
## Credits
Music by <a href="https://pixabay.com/users/sergequadrado-24990007/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=15550">Sergei Chetvertnykh</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=15550">Pixabay</a>



Music by <a href="https://pixabay.com/users/xtremefreddy-32332307/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=146305">XtremeFreddy</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=146305">Pixabay</a>

Art by <a href="https://www.instagram.com/art.by.lgc/">art.by.lgc</a>
