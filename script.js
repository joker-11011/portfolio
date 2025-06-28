document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('command-input');
    const output = document.getElementById('output');

    const commands = {
        help: 'Available commands: about, skills, education, experience, certificates, contact, whoami, tree, matrix, sudo, clear, ls',
        about: 'Hello there! I\'m Eeshan.\nI hold a Bachelor degree in Electronics and Communications from the National Institute of Engineering.',
        skills: 'C, C++, Python, JavaScript, AWS Cloud, SQL, HTML, CSS, Shell Scripting, Cadence ( analog design )',
        education: `
<h>* commit Bachelor Degree</h>
| School: The National Institute of Engineering, Mysore
| Date:   2024
|
|     - Electronics and Communication
|     - CGPA: 7.41
|
<h>* commit Pre-University</h>
| School: Sharada PU College, Mangaluru
| Date:   2020
|
|     - Percentage: 89.16%
|
<h>* commit High School</h>
| School: Sri Satya Sai Loka Seva Vidya Kendra, Alike, D.K
| Date:   2018
|
|     - Percentage: 79%`,
        experience: `
<h>* commit Data Scientist</h>
| Company: Knowledge Foundry Business Solutions
| Date:   July 2024
|
<h>* commit Intern</h>
| Company: Knowledge Foundry Business Solutions
| Date:   March 2024
|
|     - Developed a computer vision solutions using OpenCV, enhancing image processing and analysis capabilities.
|     - Utilized YOLO (You Only Look Once) for real-time object detection projects, improving detection accuracy and performance.
|     - Worked on different AWS cloud services.
|     - Gained hands-on experience in various stages of project development, from conceptualization to deployment.
|
<h>* commit IEEE Photonics Student Intern</h>
| Company: National Institute of Technology, Suratkal
| Date:   June 2022
|
|     - Focused on designing a ring resonator for cancer cell detection using optiFDTD software.`,
        certificates: `
<a href="https://coursera.org/verify/DCZNHM8GD4G4" class="certificate-link">Supervised Machine Learning: Regression and Classification</a>
<a href="https://www.credly.com/badges/2f332fda-1a77-4e9f-8701-ada189e1db0c/linked_in_profile" class="certificate-link">AWS Knowledge: Cloud Essentials</a>`,
        contact: 'Phone: <a href="tel:+919483975250">+91 9483975250</a>\nEmail: <a href="mailto:eeshanmanja2@gmail.com">eeshanmanja2@gmail.com</a>',
        whoami: () => {
            const userInfo = `
<span class="typing-effect">USER: eeshan</span>
<span class="typing-effect">HOST: portfolio-terminal</span>
<span class="typing-effect">SHELL: /bin/portfolio</span>
<span class="typing-effect">STATUS: Available for hire 🚀</span>
<span class="typing-effect">LOCATION: Karnataka, India</span>
<span class="typing-effect">INTERESTS: Computer Vision, Cloud Computing, Electronics</span>
<span class="typing-effect">COFFEE_LEVEL: ████████░░ 80%</span>
            `;
            return userInfo;
        },
        tree: `
📁 portfolio/
├── 👤 about
├── 🛠️  skills
├── 🎓 education
├── 💼 experience
├── 📜 certificates
├── 📞 contact
└── 🔧 system/
    ├── help
    ├── clear
    └── ls
        `,
        matrix: () => startMatrixEffect(),
        sudo: () => {
            const responses = [
                "Nice try! 😏 But you're not in the sudoers file.",
                "Permission denied. This incident will be reported to... nobody. 🤷‍♂️",
                "sudo: command not found. Try 'please' instead! 😄",
                "Access denied. Have you tried turning it off and on again? 🔄"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        },
        clear: '',
        ls: 'about  skills  education  experience  certificates  contact  whoami  tree  matrix  sudo  clear  help'
    };

    let commandHistory = [];
    let historyIndex = -1;

    commandInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const command = commandInput.value.trim();
            if (command) {
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                handleCommand(command);
                commandInput.value = '';
            }
        } else if (event.key === 'Tab') {
            event.preventDefault();
            autoCompleteCommand();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                commandInput.value = commandHistory[historyIndex];
            }
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                commandInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                commandInput.value = '';
            }
        }
    });

    function handleCommand(command) {
        const commandOutput = document.createElement('div');
        commandOutput.className = 'command-output';
        
        const commandLine = document.createElement('div');
        commandLine.textContent = `$ ${command}`;
        commandOutput.appendChild(commandLine);

        if (commands.hasOwnProperty(command)) {
            if (command === 'clear') {
                output.innerHTML = '';
            } else {
                const response = document.createElement('div');
                const commandResult = typeof commands[command] === 'function' ? commands[command]() : commands[command];
                
                if (command === 'whoami') {
                    response.innerHTML = commandResult;
                    animateTyping(response);
                } else {
                    response.innerHTML = commandResult;
                }
                commandOutput.appendChild(response);
            }
        } else {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = 'Command not found. Type "help" for a list of available commands.';
            commandOutput.appendChild(error);
        }

        output.appendChild(commandOutput);
        output.scrollTop = output.scrollHeight;
    }

    function autoCompleteCommand() {
        const input = commandInput.value;
        const matchingCommands = Object.keys(commands).filter(cmd => cmd.startsWith(input));
        if (matchingCommands.length === 1) {
            commandInput.value = matchingCommands[0];
        }
    }

    // Display welcome message with ASCII art banner
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'welcome-message';
    welcomeMessage.innerHTML = `
<pre class="ascii-art">
 _____ _____ _____ _   _   ___   _   _ 
| ____|___ // ____|_| | |_|   | | \\ | |
|  _|   |_ \\\\\___ \\| |_| |  _|  / |  \\| |
| |___ ___) |___) |  _  | |  / /| |\\  |
|_____|____/|____/|_| |_|_|/_/ |_| \\_|

   P O R T F O L I O   T E R M I N A L
   ════════════════════════════════════
</pre>
        Welcome, Guest! You've connected to Eeshan's system.
        Type 'help' to see available commands or 'whoami' to learn more.
    `;
    output.appendChild(welcomeMessage);
    output.scrollTop = output.scrollHeight;

    // Typing animation for whoami command
    function animateTyping(element) {
        const spans = element.querySelectorAll('.typing-effect');
        spans.forEach((span, index) => {
            span.style.opacity = '0';
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.animation = 'typing 0.5s steps(40, end)';
            }, index * 200);
        });
    }

    // Matrix effect for easter egg
    function startMatrixEffect() {
        const matrixContainer = document.createElement('div');
        matrixContainer.className = 'matrix-container';
        matrixContainer.innerHTML = '<canvas id="matrix-canvas"></canvas>';
        
        setTimeout(() => {
            const canvas = document.getElementById('matrix-canvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                canvas.width = 600;
                canvas.height = 200;
                
                const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
                const fontSize = 14;
                const columns = canvas.width / fontSize;
                const drops = Array(Math.floor(columns)).fill(1);
                
                function draw() {
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    
                    ctx.fillStyle = '#00ff00';
                    ctx.font = fontSize + 'px monospace';
                    
                    for (let i = 0; i < drops.length; i++) {
                        const text = chars[Math.floor(Math.random() * chars.length)];
                        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                        
                        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                            drops[i] = 0;
                        }
                        drops[i]++;
                    }
                }
                
                const interval = setInterval(draw, 50);
                setTimeout(() => {
                    clearInterval(interval);
                    matrixContainer.remove();
                }, 3000);
            }
        }, 100);
        
        return matrixContainer.outerHTML + '<br>Welcome to the Matrix... 🕶️<br>Follow the white rabbit.';
    }
});
