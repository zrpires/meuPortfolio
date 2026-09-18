const translations = {
    pt: {
        'nav-home': 'Início',
        'nav-journey': 'Jornada',
        'nav-projects': 'Projetos',
        'nav-terminal': 'Terminal',
        'hero-role': '>&lt; Desenvolvedor de Software /&gt;',
        'hero-location': 'Floresta / Maringá, PR',
        'btn-contact': 'Contato',
        'btn-demo': 'Ver Projeto Online',
        'btn-source': 'Código Fonte',
        'hero-hint': 'Dica: Digite "sith", "poke" ou "pref" no seu teclado a qualquer momento.',
        
        'title-journey': 'Linha do Tempo & Formação',
        'time1-title': 'Mix Cosméticos',
        'time1-desc': 'Auxiliar Administrativo e Auditoria. Gestão analítica de estoque em 15 filiais, auditoria de ERP e controle fiscal. Forte base em mapeamento de processos corporativos.',
        'time2-title': 'Início na UniCesumar (ADS)',
        'time2-desc': 'Ingresso na graduação em Análise e Desenvolvimento de Sistemas. Aprofundamento em lógica, estrutura de dados, Java e Engenharia de Software.',
        'time3-title': 'Alura & Especializações',
        'time3-desc': 'Formação em Front-End Developer e Python pela Alura. Foco em construir interfaces web modernas, responsivas e acessíveis (React, JS ES6+, HTML5/CSS3).',
        'time4-title': 'LD Hospitalar',
        'time4-desc': 'Gestão de E-commerce e Operações. Trabalho direto com fluxo de faturamento fiscal e otimização de catálogos online (Mercado Livre e Shopee).',
        'time5-title': 'Projeto: Jogo da Memória Web',
        'time5-desc': 'Criação de um sistema com foco em acessibilidade para crianças de 6 a 12 anos. Implementação de alto contraste e navegação via teclado validada em escolas.',
        'time6-title': 'Previsão de Formatura',
        'time6-desc': 'Conclusão da graduação (ADS). Buscando oportunidades como Desenvolvedor Júnior para impactar positivamente o mercado de tecnologia.',
        
        'title-projects': 'Projetos em Destaque',
        'proj1-title': '🧩 Jogo da Memória Web (Acessibilidade)',
        'proj1-desc': 'Desenvolvido em parceria com ambiente escolar para crianças de 6 a 12 anos com necessidades visuais e auditivas. Focado em inclusão real.',
        'proj1-f1': 'Alto contraste e semântica inclusiva',
        'proj1-f2': 'Navegabilidade total por teclado',
        'proj1-f3': 'Validação prática em ambiente de ensino',
        
        'terminal-hint': 'Dica: Digite <kbd>help</kbd> e pressione Enter. (Ou digite <kbd>sith</kbd> / <kbd>poke</kbd> / <kbd>pref</kbd> para segredos)'
    },
    en: {
        'nav-home': 'Home',
        'nav-journey': 'Journey',
        'nav-projects': 'Projects',
        'nav-terminal': 'Terminal',
        'hero-role': 'Software Developer /&gt;',
        'hero-location': 'Maringá, PR - Brazil',
        'btn-contact': 'Contact Me',
        'btn-demo': 'Live Demo',
        'btn-source': 'Source Code',
        'hero-hint': 'Hint: Type "sith", "poke" or "pref" on your keyboard at any time.',
        
        'title-journey': 'Timeline & Education',
        'time1-title': 'Mix Cosméticos',
        'time1-desc': 'Administrative & Audit Assistant. Analytical inventory management across 15 branches, ERP auditing, and tax control. Strong foundation in corporate process mapping.',
        'time2-title': 'Started at UniCesumar (Systems Analysis)',
        'time2-desc': 'Began degree in Systems Analysis and Development. Deepening knowledge in logic, data structures, Java, and Software Engineering.',
        'time3-title': 'Alura & Certifications',
        'time3-desc': 'Front-End Developer and Python tracks at Alura. Focused on building modern, responsive, and accessible web interfaces (React, JS ES6+, HTML5/CSS3).',
        'time4-title': 'LD Hospitalar',
        'time4-desc': 'E-commerce and Operations Management. Hands-on work with tax billing workflows and online catalog optimization (Mercado Livre and Shopee).',
        'time5-title': 'Project: Web Memory Game',
        'time5-desc': 'Created an accessibility-focused system for children aged 6-12. Implemented high contrast and keyboard navigation, validated in school environments.',
        'time6-title': 'Expected Graduation',
        'time6-desc': 'Graduation in Systems Analysis. Looking for Junior Developer opportunities to make a positive impact in the tech market.',
        
        'title-projects': 'Featured Projects',
        'proj1-title': '🧩 Web Memory Game (Accessibility)',
        'proj1-desc': 'Developed in partnership with schools for children aged 6 to 12 with visual and hearing needs. Focused on real inclusion.',
        'proj1-f1': 'High contrast and inclusive semantics',
        'proj1-f2': 'Full keyboard navigability',
        'proj1-f3': 'Practical validation in educational environments',
        
        'terminal-hint': 'Hint: Type <kbd>help</kbd> and hit Enter. (Or type <kbd>sith</kbd> / <kbd>poke</kbd> / <kbd>pref</kbd> for secrets)'
    }
};

let currentLang = 'pt';

function toggleLanguage() {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    const btn = document.getElementById('lang-toggle');
    btn.innerHTML = currentLang === 'pt' ? '🇺🇸 EN' : '🇧🇷 PT';
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });
}
document.getElementById('lang-toggle').addEventListener('click', toggleLanguage);


class ModernParticles {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.getElementById('particles-js').appendChild(this.canvas);
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };

        this.init();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x; this.mouse.y = e.y;
        });
        window.addEventListener('mouseout', () => {
            this.mouse.x = null; this.mouse.y = null;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createParticles();
    }

    createParticles() {
        this.particles = [];
        const numParticles = (this.canvas.width * this.canvas.height) / 15000;
        for (let i = 0; i < numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
    }

    init() { this.resize(); this.animate(); }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const isSith = document.body.classList.contains('sith-mode');
        const particleColor = isSith ? 'rgba(225, 29, 72, 0.5)' : 'rgba(16, 185, 129, 0.5)';
        
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            p.x += p.vx; p.y += p.vy;

            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            if (this.mouse.x != null) {
                let dx = this.mouse.x - p.x;
                let dy = this.mouse.y - p.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    p.x -= forceDirectionX * force * 5;
                    p.y -= forceDirectionY * force * 5;
                }
            }

            this.ctx.fillStyle = particleColor;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();

            for (let j = i; j < this.particles.length; j++) {
                let p2 = this.particles[j];
                let dist = Math.sqrt((p.x - p2.x)**2 + (p.y - p2.y)**2);
                if (dist < 100) {
                    this.ctx.beginPath();
                    let alpha = 0.2 - dist/500;
                    this.ctx.strokeStyle = isSith ? `rgba(225, 29, 72, ${alpha})` : `rgba(16, 185, 129, ${alpha})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
        requestAnimationFrame(() => this.animate());
    }
}


class EasterEggManager {
    constructor() {
        this.keyBuffer = '';
        this.sithAudio = document.getElementById('sith-on-sound');
        this.jediAudio = document.getElementById('jedi-on-sound');
        
        window.addEventListener('keydown', (e) => {
            if(document.activeElement.id === 'terminal-input') return;
            
            this.keyBuffer += e.key.toLowerCase();
            if(this.keyBuffer.length > 10) {
                this.keyBuffer = this.keyBuffer.substring(1);
            }

            if(this.keyBuffer.includes('sith')) {
                this.triggerSith();
                this.keyBuffer = '';
            }
            if(this.keyBuffer.includes('poke')) {
                this.triggerPoke();
                this.keyBuffer = '';
            }
            if(this.keyBuffer.includes('pref')) {
                this.triggerPref();
                this.keyBuffer = '';
            }
        });
    }

    triggerSith() {
        document.body.classList.toggle('sith-mode');
        
        this.sithAudio.pause();
        this.jediAudio.pause();

        if(document.body.classList.contains('sith-mode')) {
            this.sithAudio.volume = 0.5;
            this.sithAudio.currentTime = 0;
            this.sithAudio.play().catch(e => console.log('Audio error:', e));
        } else {
            this.jediAudio.volume = 0.5;
            this.jediAudio.currentTime = 0;
            this.jediAudio.play().catch(e => console.log('Audio error:', e));
        }
    }

    triggerPoke() {
        let randomId = Math.floor(Math.random() * 1025) + 1;
        if (randomId === 249) randomId = 250; 
        this.spawnPokemon(randomId, false);
    }

    triggerPref() {
        this.spawnPokemon(249, true);
    }

    spawnPokemon(id, isSpecial) {
        const img = document.createElement('img');
        
        if(isSpecial) {
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
            img.className = 'pokemon-sprite lugia-special';
        } else {
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
            img.className = 'pokemon-sprite';
        }
        
        const randomX = 20 + Math.random() * 60; 
        const randomY = 20 + Math.random() * 60; 
        
        img.style.left = `${randomX}vw`;
        img.style.top = `${randomY}vh`;
        
        document.body.appendChild(img);
        
        setTimeout(() => {
            img.remove();
        }, isSpecial ? 6000 : 4000);
    }
}


class AdvancedTerminal {
    constructor() {
        this.output = document.getElementById('terminal-output');
        this.input = document.getElementById('terminal-input');
        this.body = document.getElementById('terminal-body');
        
        this.commandHistory = [];
        this.historyIndex = -1;

        this.body.addEventListener('click', () => { this.input.focus({ preventScroll: true }); });
        this.input.addEventListener('keydown', (e) => this.handleInput(e));
        
        this.bootSequence();
    }

    bootSequence() {
        this.printSystem("Initializing Zé_RafaelOS v3.6...");
        setTimeout(() => this.printSystem("Loading modules: [React, Java, SocialMedia API]... OK"), 400);
        setTimeout(() => {
            this.printSuccess("System ready.");
            this.printCommand("Type 'help' to see available commands.");
            this.input.focus({ preventScroll: true });
        }, 900);
    }

    printCommand(text) {
        const div = document.createElement('div');
        div.className = 'cmd-response';
        div.innerHTML = text;
        this.output.appendChild(div);
        this.scrollToBottom();
    }

    printSystem(text) {
        const div = document.createElement('div');
        div.className = 'cmd-response';
        div.style.color = '#7dcfff';
        div.innerHTML = `[SYSTEM] ${text}`;
        this.output.appendChild(div);
        this.scrollToBottom();
    }

    printError(cmd) {
        const div = document.createElement('div');
        div.className = 'cmd-error';
        const msg = currentLang === 'pt' ? 'comando não encontrado.' : 'command not found.';
        div.innerHTML = `bash: ${cmd}: ${msg}<br>
        <span style="color: var(--text-muted);">Type <span class="cmd-highlight">help</span>.</span>`;
        this.output.appendChild(div);
        this.scrollToBottom();
    }

    printSuccess(text) {
        const div = document.createElement('div');
        div.className = 'cmd-success';
        div.innerHTML = `✔ ${text}`;
        this.output.appendChild(div);
        this.scrollToBottom();
    }

    printUser(cmd) {
        const div = document.createElement('div');
        div.className = 'terminal-line cmd-user';
        div.innerHTML = `<span class="prompt">zerafael@portfolio:~$</span> ${cmd}`;
        this.output.appendChild(div);
    }

    scrollToBottom() {
        this.body.scrollTop = this.body.scrollHeight;
    }

    handleInput(e) {
        if (e.key === 'Enter') {
            const rawCmd = this.input.value.trim();
            const cmd = rawCmd.toLowerCase();
            this.input.value = '';
            
            if (cmd === '') return;

            this.commandHistory.push(rawCmd);
            this.historyIndex = this.commandHistory.length;
            
            this.printUser(rawCmd);
            this.processCommand(cmd);
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.commandHistory[this.historyIndex];
            }
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.input.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                this.input.value = '';
            }
        }
    }

    processCommand(cmd) {
        const commands = {
            'help': () => {
                let html = `
    Commands:
    <span class="cmd-highlight">whoami</span>    - Profile summary
    <span class="cmd-highlight">skills</span>    - Main stack
    <span class="cmd-highlight">xp</span>        - Experience
    <span class="cmd-highlight">github</span>    - Open GitHub
    <span class="cmd-highlight">linkedin</span>  - Open LinkedIn
    <span class="cmd-highlight">twitter</span>   - Open X/Twitter
    <span class="cmd-highlight">instagram</span> - Open Instagram
    <span class="cmd-highlight">clear</span>     - Clear terminal
    <span class="cmd-highlight">sith</span>      - 🔴 Power...
    <span class="cmd-highlight">poke</span>      - ⚡ Catch 'em all
    <span class="cmd-highlight">pref</span>      - 🌊 The Guardian`;
                this.printCommand(html);
            },
            'whoami': () => this.printCommand(currentLang === 'pt' ? "José Rafael Pires de Souza, 'Zé Rafael'. Estudante de ADS, apaixonado por back-end e soluções eficientes." : "José Rafael Pires de Souza, 'Zé Rafael'. Systems Analysis student passionate about backend and efficient solutions."),
            'skills': () => {
                let html = `
    Stack:
    - 🟨 JavaScript (ES6+), HTML5, CSS3, React
    - ☕ Java, Spring Boot
    - 🐍 Python, C, C++
    - 🗄️ SQL, Git/GitHub`;
                this.printCommand(html);
            },
            'xp': () => this.printCommand(currentLang === 'pt' ? "Mix Cosméticos (Admin/ERP) | LD Hospitalar (E-commerce) | Jogo da Memória (Dev)" : "Mix Cosméticos (Admin/ERP) | LD Hospitalar (E-commerce) | Memory Game (Dev)"),
            'github': () => {
                this.printSystem("Opening github.com/zrpires...");
                window.open('https://github.com/zrpires', '_blank');
            },
            'linkedin': () => {
                this.printSystem("Opening LinkedIn...");
                window.open('https://linkedin.com/in/zrpires', '_blank');
            },
            'twitter': () => {
                this.printSystem("Opening X/Twitter...");
                window.open('https://twitter.com/zrpires', '_blank');
            },
            'instagram': () => {
                this.printSystem("Opening Instagram...");
                window.open('https://instagram.com/zrpires', '_blank');
            },
            'sith': () => {
                this.printSystem("May the force be with you...");
                window.easterEggs.triggerSith();
            },
            'poke': () => {
                this.printSystem("A wild Pokemon appeared!");
                window.easterEggs.triggerPoke();
            },
            'pref': () => {
                this.printSystem("The Guardian of the Seas approaches!");
                window.easterEggs.triggerPref();
            },
            'clear': () => { this.output.innerHTML = ''; }
        };

        const action = commands[cmd];
        if (action) {
            action();
        } else {
            this.printError(cmd);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ModernParticles();
    window.easterEggs = new EasterEggManager();
    new AdvancedTerminal();
    
    window.scrollTo(0, 0);
});
