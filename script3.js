// ==============================================
// 1. DYNAMIC CONTENT & INITIALIZATION
// ==============================================

const SCHOOL = {
    name: 'Frontline Group of Schools, Agbor',
    motto: 'Education is a Necessity',
    address: '23 & 37 Martin Street, Agbor (near St. Joseph Catholic Church)',
    phone: '+2347037173650',
    proprietor: 'Deacon Sunny Osuhon',
    headteacher: 'Mrs. Osuhon Marian',
    students2025: 640,
    staffCount: 37,
    passingRate: '100%',
    graduating2025: 173,
    skillPrograms: ['Perfume making', 'Liquid soap making'],
    note: 'School celebrated 100% pass rate in 2025 across WAEC, NECO, BECE and Cognitive (Primary 6).'
};

// Populate DOM with dynamic values
document.addEventListener('DOMContentLoaded', () => {
    // Populate stats and contact info from the SCHOOL object
    if (document.getElementById('stat-students')) document.getElementById('stat-students').textContent = SCHOOL.students2025;
    if (document.getElementById('stat-staff')) document.getElementById('stat-staff').textContent = SCHOOL.staffCount;
    if (document.getElementById('stat-pass')) document.getElementById('stat-pass').textContent = SCHOOL.passingRate;
    if (document.getElementById('school-address')) document.getElementById('school-address').textContent = SCHOOL.address;
    if (document.getElementById('school-phone')) {
        document.getElementById('school-phone').textContent = SCHOOL.phone;
        document.getElementById('school-phone').href = 'tel:' + SCHOOL.phone.replace(/\s+/g, '');
    }
    if (document.getElementById('proprietor')) document.getElementById('proprietor').textContent = SCHOOL.proprietor;
    if (document.getElementById('headteacher')) document.getElementById('headteacher').textContent = SCHOOL.headteacher;

    // Set current year in footer
    if (document.getElementById('current-year')) {
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }
});




    // ... (Your other JS code continues here, e.g., contact form logic, Jarvis) ...
});

// --- HIGHLY PROFESSIONAL HAMBURGER MENU FUNCTIONALITY ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Use the class/ID names from the professional snippet
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (menuToggle && mobileNav) {
        
        // Toggle menu visibility and icon state on click
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');      // Toggles menu visibility (using 'active' class)
            menuToggle.classList.toggle('is-active');  // Toggles X icon (using 'is-active' class)
            document.body.classList.toggle('no-scroll'); // Prevents background scroll
        });

        // Close menu when a link is clicked
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                menuToggle.classList.remove('is-active');
                document.body.classList.remove('no-scroll');
            });
        });
    }



// ==============================================
// 4. JARVIS ASSISTANT LOGIC (PRESERVED)
// ==============================================

const fab = document.getElementById('jarvisFab');
const panel = document.getElementById('jarvisPanel');
const closeBtn = document.getElementById('jarvisClose');
const messagesEl = document.getElementById('jarvisMessages');
const inputEl = document.getElementById('jarvisInput');
const sendEl = document.getElementById('jarvisSend');

function showPanel() { if (panel) { panel.style.display = 'flex'; if (inputEl) inputEl.focus(); } }
function hidePanel() { if (panel) panel.style.display = 'none'; }

if (fab) {
    fab.addEventListener('click', () => {
        const isVisible = panel && (panel.style.display === 'flex');
        if (isVisible) hidePanel(); else showPanel();
    });
}
if (closeBtn) closeBtn.addEventListener('click', hidePanel);

function appendMessage(text, who = 'bot') {
    if (!messagesEl) return;
    const div = document.createElement('div');
    div.className = 'message ' + (who === 'user' ? 'user' : 'bot');
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

const LEARN_KEY = 'fg_jarvis_learn_v1';
function loadLearned() {
    try { return JSON.parse(localStorage.getItem(LEARN_KEY) || '{}'); } catch (e) { return {} }
}
function saveLearned(obj) {
    localStorage.setItem(LEARN_KEY, JSON.stringify(obj));
}

function jarvisReply(query) {
    const q = query.toLowerCase();
    const learned = loadLearned();

    if (learned[q]) return learned[q];

    if (/address|where|located/.test(q)) return SCHOOL.address + '\nPhone: ' + SCHOOL.phone;
    if (/phone|call/.test(q)) return 'You can call us at ' + SCHOOL.phone + ' or visit the school office.';
    if (/motto|slogan/.test(q)) return 'Official motto: "' + SCHOOL.motto + '"';
    if (/proprietor|owner/.test(q)) return SCHOOL.proprietor + ' (Proprietor)';
    if (/head teacher|headteacher|principal/.test(q)) return SCHOOL.headteacher + ' (Head Teacher)';
    if (/student|population|enrol|enroll/.test(q)) return 'Student population (2025): ' + SCHOOL.students2025 + '. Graduating students (2025): ' + SCHOOL.graduating2025;
    if (/staff|teacher/.test(q)) return 'Total staff: ' + SCHOOL.staffCount + '. For staff list, visit the Staff page.';
    if (/pass|result|exam|waec|neco/.test(q)) return SCHOOL.note;
    if (/skills|skill|perfume|soap/.test(q)) return 'Skill-acquisition programmes include: ' + SCHOOL.skillPrograms.join(', ');
    if (/admission|apply|fees|fee/.test(q)) return 'Admissions: contact the admissions office or visit the school to request the admissions form and fee schedule.';

    if (/^teach:/.test(q)) {
        const parts = query.split('=>');
        if (parts.length === 2) {
            const key = parts[0].replace(/^teach:/i, '').trim().toLowerCase();
            const val = parts[1].trim();
            const cur = loadLearned(); cur[key] = val; saveLearned(cur);
            return 'Done. Jarvis learned how to answer: "' + key + '"';
        }
        return 'To teach Jarvis use: teach: QUESTION => ANSWER';
    }

    return "I'm not sure about that. Try asking about admissions, address, staff or teach me using: 'teach: question => answer'";
}

if (sendEl) {
    sendEl.addEventListener('click', () => {
        const q = inputEl.value.trim();
        if (!q) return;
        appendMessage(q, 'user');
        const reply = jarvisReply(q);
        setTimeout(() => { appendMessage(reply, 'bot'); }, 350);
        inputEl.value = '';
    });
}
if (inputEl) {
    inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { sendEl.click(); }
    });
}

// Warm welcome message
if (messagesEl && fab) {
    setTimeout(() => {
        appendMessage('Hi — I am Jarvis, Frontline\'s assistant. Ask me about admissions, address, staff, achievements, or teach me new answers using: teach: question => answer');
    }, 600);
}


// --- ACTUAL CONTACT FORM SUBMISSION (Formspree) ---

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const contactResult = document.getElementById('contactResult');

    // This checks if the form element actually exists on the page
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Stop the default form submission for AJAX

            const status = contactResult;
            const data = new FormData(form);
            
            // Display loading state
            status.textContent = 'Sending message...';
            status.style.color = 'var(--accent-blue)';
            status.style.opacity = '1';

            try {
                // Use fetch to post the data to your Formspree endpoint
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    status.textContent = '✅ Message Sent! We will get back to you shortly.';
                    status.style.color = 'var(--accent-green)';
                    form.reset(); // Clear the form fields
                } else {
                    // Handle errors, often server-side validation or Formspree issues
                    const responseData = await response.json();
                    if (responseData.errors) {
                        status.textContent = '❌ Error: Submission failed. Please check your inputs.';
                    } else {
                        status.textContent = '❌ An unknown error occurred. Please try again or call us.';
                    }
                    status.style.color = 'var(--accent-red)';
                }
            } catch (error) {
                // Handle network errors
                status.textContent = '❌ Network Error. Please check your connection.';
                status.style.color = 'var(--accent-red)';
                console.error('Fetch error:', error);
            }
        });
    }
    
    // ... all your other JavaScript code (e.g., hamburger menu, current year, Jarvis logic) ...
});

// --- ADMISSIONS CONTACT FORM SUBMISSION ---
// This is a duplicate of the main contact logic, adjusted for the new IDs

document.addEventListener('DOMContentLoaded', () => {
    // ... existing code for the main contact form (contactForm) ...

    const admissionsForm = document.getElementById('admissionsContactForm');
    const admissionsResult = document.getElementById('contactResult-admissions');

    if (admissionsForm) {
        admissionsForm.addEventListener('submit', async (event) => {
            event.preventDefault(); 
            
            const status = admissionsResult;
            const data = new FormData(admissionsForm);
            
            status.textContent = 'Sending message...';
            status.style.color = 'var(--accent-blue)';
            status.style.opacity = '1';

            try {
                const response = await fetch(admissionsForm.action, {
                    method: admissionsForm.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    status.textContent = '✅ Inquiry Sent! We will contact you regarding admissions shortly.';
                    status.style.color = 'var(--accent-green)';
                    admissionsForm.reset(); 
                } else {
                    const responseData = await response.json();
                    status.textContent = '❌ Error: Submission failed. Please check your inputs.';
                    status.style.color = 'var(--accent-red)';
                }
            } catch (error) {
                status.textContent = '❌ Network Error. Please check your connection.';
                status.style.color = 'var(--accent-red)';
                console.error('Fetch error:', error);
            }
        });
    }

    // ... rest of your existing DOMContentLoaded code ...
});
