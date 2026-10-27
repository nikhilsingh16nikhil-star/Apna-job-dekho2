const jobsData = [
  { id: 1, title: 'Frontend Developer', company: 'TCS CodeHub', location: 'Bengaluru', salary: '₹8 LPA', type: 'Full-time', experience: '0-2 yrs', industry: 'IT Services', skills: ['React', 'JavaScript', 'CSS'], featured: true },
  { id: 2, title: 'Data Analyst', company: 'Analytica Labs', location: 'Hyderabad', salary: '₹7 LPA', type: 'Full-time', experience: '0-1 yrs', industry: 'Analytics', skills: ['SQL', 'Excel', 'Power BI'], featured: true },
  { id: 3, title: 'Sales Executive', company: 'GrowFast', location: 'Pune', salary: '₹5.5 LPA', type: 'Full-time', experience: '0-2 yrs', industry: 'Sales', skills: ['CRM', 'Negotiation', 'Lead Gen'], featured: false },
  { id: 4, title: 'Software Engineer Intern', company: 'Jio Platforms', location: 'Remote', salary: '₹25k/month', type: 'Internship', experience: '0-1 yrs', industry: 'Telecom', skills: ['Java', 'Spring', 'Git'], featured: true },
  { id: 5, title: 'UI/UX Designer', company: 'PixelCraft', location: 'Mumbai', salary: '₹9 LPA', type: 'Full-time', experience: '1-3 yrs', industry: 'Design', skills: ['Figma', 'UX', 'Wireframing'], featured: false },
  { id: 6, title: 'Operations Associate', company: 'SkillNest', location: 'Delhi', salary: '₹4.8 LPA', type: 'Part-time', experience: '0-2 yrs', industry: 'Operations', skills: ['Scheduling', 'Support', 'Excel'], featured: false },
  { id: 7, title: 'QA Tester', company: 'Cobalt Systems', location: 'Noida', salary: '₹6.2 LPA', type: 'Full-time', experience: '0-2 yrs', industry: 'IT Services', skills: ['Testing', 'Selenium', 'JIRA'], featured: false },
  { id: 8, title: 'Product Analyst', company: 'NexaStack', location: 'Remote', salary: '₹11 LPA', type: 'Remote', experience: '1-3 yrs', industry: 'Product', skills: ['Analytics', 'Research', 'SQL'], featured: true }
];

const defaultCompanies = [
  { name: 'TCS CodeHub', industry: 'IT Services', location: 'Bengaluru', jobs: 42, description: 'Global IT and consulting services company with digital transformation projects.' },
  { name: 'Analytica Labs', industry: 'Analytics', location: 'Hyderabad', jobs: 16, description: 'Data-driven decision platform delivering business intelligence products.' },
  { name: 'Jio Platforms', industry: 'Telecom', location: 'Remote', jobs: 28, description: 'Digital services and telecom infrastructure empire across India.' },
  { name: 'PixelCraft', industry: 'Design', location: 'Mumbai', jobs: 11, description: 'Award-winning design studio creating digital-first user experiences.' },
  { name: 'SkillNest', industry: 'EdTech', location: 'Delhi', jobs: 9, description: 'Upskilling platform helping learners and enterprises build future-ready teams.' },
  { name: 'Cobalt Systems', industry: 'IT Services', location: 'Noida', jobs: 19, description: 'Automation and enterprise software solutions company for large-scale businesses.' }
];

const companyStorageKey = 'apnaCompanies';
const usersStorageKey = 'apnaUsers';

function getSitePath(path) {
  const inPortalFolder = /\/(admin|user)\//i.test(window.location.pathname);
  return new URL(`${inPortalFolder ? '../' : ''}${path}`, window.location.href).href;
}

function getValidApplyUrl(value) {
  if (!value) return '';
  try {
    const url = new URL(value);
    return (url.protocol === 'http:' || url.protocol === 'https:') && url.hostname ? url.href : '';
  } catch (error) {
    return '';
  }
}

function seedStorageData() {
  if (!localStorage.getItem(companyStorageKey)) {
    localStorage.setItem(companyStorageKey, JSON.stringify(defaultCompanies));
  }

  if (!localStorage.getItem(usersStorageKey)) {
    const demoUsers = [
      { name: 'Admin User', email: 'admin@apnajobdekho.com', password: 'admin123', role: 'admin' },
      { name: 'Demo User', email: 'user@apnajobdekho.com', password: 'user123', role: 'user' }
    ];
    localStorage.setItem(usersStorageKey, JSON.stringify(demoUsers));
  }
}

function getCompanies() {
  try {
    const stored = JSON.parse(localStorage.getItem(companyStorageKey) || '[]');
    const companies = Array.isArray(stored) ? stored : [...defaultCompanies];
    return companies.map((company, index) => ({
      id: company.id || `company-${index + 1}-${String(company.name || 'record').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      name: String(company.name || ''),
      industry: String(company.industry || ''),
      location: String(company.location || ''),
      jobs: Number(company.jobs) || 0,
      description: String(company.description || ''),
      applyUrl: getValidApplyUrl(company.applyUrl || ''),
      createdAt: company.createdAt || null,
      updatedAt: company.updatedAt || company.createdAt || null
    }));
  } catch (error) {
    console.error('Unable to read saved companies.', error);
    return [...defaultCompanies];
  }
}

function saveCompanies(companies) {
  const normalizedCompanies = companies.map((company, index) => ({
    id: company.id || `company-${index + 1}-${String(company.name || 'record').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name: String(company.name || '').trim(),
    industry: String(company.industry || '').trim(),
    location: String(company.location || '').trim(),
    jobs: Number(company.jobs) || 0,
    description: String(company.description || '').trim(),
    applyUrl: getValidApplyUrl(String(company.applyUrl || '').trim()),
    createdAt: company.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));
  localStorage.setItem(companyStorageKey, JSON.stringify(normalizedCompanies));
}

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(usersStorageKey) || '[]');
  } catch (error) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(usersStorageKey, JSON.stringify(users));
}

function getLoggedUser() {
  try {
    return JSON.parse(localStorage.getItem(storageKeys.userSession) || 'null');
  } catch (error) {
    return null;
  }
}

const plansData = [
  { name: 'Free', price: 0, companies: 25, interview: false, description: 'Ideal for basic job discovery and profile exploration.' },
  { name: 'Basic', price: 49, companies: 100, interview: false, description: 'Unlock a broader company access experience for entry-level jobs.', featured: false },
  { name: 'Premium', price: 111, companies: 200, interview: true, description: 'Complete support for job, resume, and interview preparation journey.', featured: true }
];

const questionBank = [
  { category: 'HR', question: 'Tell me about yourself and your career goals.', difficulty: 'Easy' },
  { category: 'Technical', question: 'What is the difference between array.map() and forEach() in JavaScript?', difficulty: 'Medium' },
  { category: 'Programming', question: 'Write a program to reverse a string without using built-in reverse().', difficulty: 'Medium' },
  { category: 'Fresher', question: 'Describe a time you worked in a team and solved a challenge together.', difficulty: 'Easy' },
  { category: 'Technical', question: 'Explain the difference between SQL JOIN types and when to use each.', difficulty: 'Hard' },
  { category: 'HR', question: 'How do you handle a situation where you miss a deadline?', difficulty: 'Medium' }
];

const storageKeys = {
  savedJobs: 'apnaSavedJobs',
  userSession: 'apnaUserSession',
  resume: 'apnaResumeDraft'
};

const savedJobs = JSON.parse(localStorage.getItem(storageKeys.savedJobs) || '[]');

function getInitials(name) {
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function renderFeaturedJobs() {
  const container = document.getElementById('featured-jobs');
  if (!container) return;
  const cards = jobsData.filter(job => job.featured).slice(0, 4);
  container.innerHTML = cards.map(job => `
    <div class="col-md-6 col-xl-3">
      <article class="job-card">
        <div class="job-top">
          <div class="job-logo">${getInitials(job.company)}</div>
          <button class="bookmark-btn ${savedJobs.includes(job.id) ? 'active' : ''}" data-job-id="${job.id}" aria-label="Save job"><i class="fa-solid fa-bookmark"></i></button>
        </div>
        <div class="company-name">${job.company}</div>
        <h3 class="job-title">${job.title}</h3>
        <div class="meta-line">
          <span><i class="fa-solid fa-location-dot"></i> ${job.location}</span>
          <span><i class="fa-solid fa-briefcase"></i> ${job.type}</span>
        </div>
        <div class="job-skills">
          ${job.skills.map(skill => `<span>${skill}</span>`).join('')}
        </div>
        <div class="salary-pill">${job.salary}</div>
        <div class="job-actions">
          <span class="tag">${job.experience}</span>
          <a href="job-details.html?id=${job.id}" class="btn btn-primary btn-sm">View</a>
        </div>
      </article>
    </div>
  `).join('');
}

function renderFreshJobs() {
  const container = document.getElementById('fresh-jobs');
  if (!container) return;
  const cards = jobsData.filter(job => job.type === 'Internship' || job.type === 'Part-time' || job.experience === '0-1 yrs').slice(0, 4);
  container.innerHTML = cards.map(job => `
    <div class="col-md-6 col-xl-3">
      <article class="job-card">
        <div class="job-top">
          <div class="job-logo">${getInitials(job.company)}</div>
          <button class="bookmark-btn ${savedJobs.includes(job.id) ? 'active' : ''}" data-job-id="${job.id}" aria-label="Save job"><i class="fa-solid fa-bookmark"></i></button>
        </div>
        <div class="company-name">${job.company}</div>
        <h3 class="job-title">${job.title}</h3>
        <div class="meta-line">
          <span><i class="fa-solid fa-location-dot"></i> ${job.location}</span>
          <span><i class="fa-solid fa-briefcase"></i> ${job.type}</span>
        </div>
        <div class="job-skills">
          ${job.skills.slice(0, 2).map(skill => `<span>${skill}</span>`).join('')}
        </div>
        <div class="salary-pill">${job.salary}</div>
        <div class="job-actions">
          <span class="tag">Fresher</span>
          <a href="job-details.html?id=${job.id}" class="btn btn-primary btn-sm">Apply</a>
        </div>
      </article>
    </div>
  `).join('');
}

function renderCompanies() {
  const container = document.getElementById('featured-companies');
  if (!container) return;
  const companies = getCompanies();
  container.innerHTML = companies.slice(0, 4).map(company => `
    <div class="col-md-6 col-xl-3">
      <article class="company-card">
        <div class="company-meta">
          <div class="company-logo">${escapeHtml(getInitials(company.name))}</div>
          <span class="tag">${escapeHtml(company.jobs)} jobs</span>
        </div>
        <h4>${escapeHtml(company.name)}</h4>
        <div class="meta-line">
          <span><i class="fa-solid fa-industry"></i> ${escapeHtml(company.industry)}</span>
          <span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(company.location)}</span>
        </div>
        <p>${escapeHtml(company.description)}</p>
        <div class="d-flex gap-2 flex-wrap">
          <a href="company-details.html?name=${encodeURIComponent(company.name)}" class="btn btn-outline-primary btn-sm">View profile</a>
          ${company.applyUrl ? `<a href="${escapeHtml(company.applyUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Apply directly</a>` : ''}
        </div>
      </article>
    </div>
  `).join('');
}

function renderPricingHome() {
  const container = document.getElementById('pricing-home');
  if (!container) return;
  container.innerHTML = plansData.map(plan => `
    <div class="col-lg-4">
      <article class="pricing-card ${plan.featured ? 'featured' : ''}">
        ${plan.featured ? '<span class="featured-badge">Most popular</span>' : ''}
        <div class="pricing-header">
          <div>
            <h3>${plan.name}</h3>
            <p>${plan.description}</p>
          </div>
        </div>
        <div class="plan-price">₹${plan.price}<small>/mo</small></div>
        <ul>
          <li>${plan.companies} companies access</li>
          <li>${plan.interview ? 'Interview practice included' : 'Interview practice not included'}</li>
          <li>${plan.name === 'Free' ? 'Essential discovery access' : 'Career support resources'}</li>
        </ul>
        <a href="pricing.html" class="btn ${plan.featured ? 'btn-primary' : 'btn-outline-primary'} w-100">Choose plan</a>
      </article>
    </div>
  `).join('');
}

function renderJobCards(filter = {}) {
  const container = document.getElementById('job-results');
  if (!container) return;

  let filtered = [...jobsData];
  const q = (filter.query || '').toLowerCase();
  if (q) filtered = filtered.filter(job => `${job.title} ${job.company} ${job.skills.join(' ')}`.toLowerCase().includes(q));
  if (filter.type && filter.type !== 'all') filtered = filtered.filter(job => job.type.toLowerCase() === filter.type.toLowerCase());
  if (filter.location && filter.location !== 'all') filtered = filtered.filter(job => job.location.toLowerCase().includes(filter.location.toLowerCase()) || (filter.location === 'Remote' && job.location.toLowerCase() === 'remote'));
  if (filter.experience && filter.experience !== 'all') filtered = filtered.filter(job => job.experience === filter.experience);
  if (filter.industry && filter.industry !== 'all') filtered = filtered.filter(job => job.industry === filter.industry);

  const total = filtered.length;
  const countEl = document.getElementById('jobs-count');
  if (countEl) countEl.textContent = `${total} jobs found`;

  if (!filtered.length) {
    container.innerHTML = '<div class="alert alert-light border">No jobs match your filters. Try widening your search criteria.</div>';
    return;
  }

  container.innerHTML = filtered.map(job => `
    <article class="job-row">
      <div class="job-logo">${getInitials(job.company)}</div>
      <div class="job-row-main">
        <div class="company-name">${job.company}</div>
        <h3 class="job-title">${job.title}</h3>
        <div class="meta-line">
          <span><i class="fa-solid fa-location-dot"></i> ${job.location}</span>
          <span><i class="fa-solid fa-briefcase"></i> ${job.type}</span>
          <span><i class="fa-solid fa-clock"></i> ${job.experience}</span>
        </div>
        <div class="job-skills">${job.skills.map(skill => `<span>${skill}</span>`).join('')}</div>
      </div>
      <div class="job-row-side">
        <div class="salary-pill">${job.salary}</div>
        <span class="tag">${job.industry}</span>
        <div class="row-actions">
          <button class="bookmark-btn ${savedJobs.includes(job.id) ? 'active' : ''}" data-job-id="${job.id}" aria-label="Save job"><i class="fa-solid fa-bookmark"></i></button>
          <a href="job-details.html?id=${job.id}" class="btn btn-primary btn-sm">View details</a>
        </div>
      </div>
    </article>
  `).join('');
}

function bindBookmarkButtons() {
  document.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.jobId);
      const index = savedJobs.indexOf(id);
      if (index >= 0) {
        savedJobs.splice(index, 1);
        btn.classList.remove('active');
      } else {
        savedJobs.push(id);
        btn.classList.add('active');
      }
      localStorage.setItem(storageKeys.savedJobs, JSON.stringify(savedJobs));
      updateDashboardSavedJobs();
    });
  });
}

function setupJobFilters() {
  const form = document.getElementById('job-filter-form');
  if (!form) return;

  const fields = {
    query: form.querySelector('[name="query"]'),
    type: form.querySelector('[name="type"]'),
    location: form.querySelector('[name="location"]'),
    experience: form.querySelector('[name="experience"]'),
    industry: form.querySelector('[name="industry"]')
  };

  const apply = () => renderJobCards({
    query: fields.query?.value || '',
    type: fields.type?.value || 'all',
    location: fields.location?.value || 'all',
    experience: fields.experience?.value || 'all',
    industry: fields.industry?.value || 'all'
  });

  Object.values(fields).forEach(field => field && field.addEventListener('input', apply));
  Object.values(fields).forEach(field => field && field.addEventListener('change', apply));
  document.getElementById('reset-filters')?.addEventListener('click', () => {
    form.reset();
    renderJobCards();
  });

  renderJobCards();
}

function renderPricingPage() {
  const container = document.getElementById('pricing-page');
  if (!container) return;
  container.innerHTML = plansData.map(plan => `
    <div class="col-lg-4">
      <article class="pricing-card ${plan.featured ? 'featured' : ''}">
        ${plan.featured ? '<span class="featured-badge">Recommended</span>' : ''}
        <div class="pricing-header">
          <div>
            <h3>${plan.name}</h3>
            <p>${plan.description}</p>
          </div>
        </div>
        <div class="plan-price">₹${plan.price}<small>${plan.price === 0 ? ' forever' : ' /month'}</small></div>
        <ul>
          <li>Access to ${plan.companies} companies</li>
          <li>${plan.interview ? 'Interview practice included' : 'Interview practice not included'}</li>
          <li>Resume and job discovery tools</li>
        </ul>
        <button class="btn ${plan.featured ? 'btn-primary' : 'btn-outline-primary'} w-100 select-plan" data-plan="${plan.name}">Select plan</button>
      </article>
    </div>
  `).join('');

  document.querySelectorAll('.select-plan').forEach(button => {
    button.addEventListener('click', () => {
      const planName = button.dataset.plan;
      localStorage.setItem('selectedPlan', planName);
      const message = document.getElementById('plan-message');
      if (message) message.textContent = `Plan selected: ${planName}. Continue to create your account or upgrade in your dashboard.`;
    });
  });
}

function setupResumeBuilder() {
  const form = document.getElementById('resume-form');
  const preview = document.getElementById('resume-preview');
  if (!form || !preview) return;

  const savedResume = JSON.parse(localStorage.getItem(storageKeys.resume) || '{}');
  Object.entries(savedResume).forEach(([key, value]) => {
    const field = form.querySelector(`[name="${key}"]`);
    if (field) field.value = value;
  });

  const updatePreview = () => {
    const values = Object.fromEntries(new FormData(form).entries());
    localStorage.setItem(storageKeys.resume, JSON.stringify(values));
    preview.innerHTML = `
      <div class="preview-body">
        <h3>${values.fullName || 'Your Name'}</h3>
        <p class="summary">${values.role || 'Career Objective'} • ${values.email || 'you@example.com'}</p>
        <div class="preview-list">
          <div class="preview-row"><strong>Summary</strong><span>${values.summary || 'Add a short professional summary.'}</span></div>
          <div class="preview-row"><strong>Skills</strong><span>${values.skills || 'List your technical and soft skills.'}</span></div>
          <div class="preview-row"><strong>Education</strong><span>${values.education || 'Add your highest qualification and other degrees.'}</span></div>
          <div class="preview-row"><strong>Projects</strong><span>${values.projects || 'Highlight your key projects or internships.'}</span></div>
        </div>
      </div>
    `;
  };

  form.addEventListener('input', updatePreview);
  form.addEventListener('change', updatePreview);
  updatePreview();

  const printBtn = document.getElementById('print-resume');
  if (printBtn) printBtn.addEventListener('click', () => window.print());
}

function setupAuthForms() {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  const roleField = loginForm?.querySelector('[name="role"]');
  if (roleField) {
    const params = new URLSearchParams(window.location.search);
    const preferredRole = params.get('role');
    if (preferredRole === 'admin' || preferredRole === 'user') {
      roleField.value = preferredRole;
    }
  }

  const demoCredentials = document.getElementById('demo-credentials');
  if (demoCredentials) {
    demoCredentials.innerHTML = `
      <div class="alert alert-light border mt-3 mb-0">
        <strong>Demo accounts:</strong><br>
        Admin: admin@apnajobdekho.com / admin123<br>
        User: user@apnajobdekho.com / user123
      </div>
    `;
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = loginForm.email.value.trim();
      const password = loginForm.password.value.trim();
      const roleField = loginForm.querySelector('[name="role"]');
      const role = roleField ? roleField.value : 'user';

      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }

      const users = getUsers();
      const matchedUser = users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password && user.role === role);

      if (!matchedUser) {
        alert('Invalid credentials for the selected role. Use the demo accounts shown below.');
        return;
      }

      const sessionUser = { name: matchedUser.name || 'User', email: matchedUser.email, role: matchedUser.role };
      localStorage.setItem(storageKeys.userSession, JSON.stringify(sessionUser));
      window.location.href = getSitePath(role === 'admin' ? 'admin/index.html' : 'user/dashboard.html');
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const firstName = registerForm.firstName.value.trim();
      const middleName = registerForm.middleName.value.trim();
      const lastName = registerForm.lastName.value.trim();
      const name = [firstName, middleName, lastName].filter(Boolean).join(' ');
      const email = registerForm.email.value.trim();
      const password = registerForm.password.value.trim();
      if (!firstName || !lastName || !email || !password) {
        alert('Please complete all details to register.');
        return;
      }

      const users = getUsers();
      const userExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
      if (userExists) {
        alert('An account with this email already exists. Please log in instead.');
        return;
      }

      const newUser = { name, email, password, role: 'user' };
      users.push(newUser);
      saveUsers(users);
      localStorage.setItem(storageKeys.userSession, JSON.stringify({ name, email, role: 'user' }));
      window.location.href = getSitePath('user/dashboard.html');
    });
  }
}

function updateDashboardSavedJobs() {
  const saved = document.getElementById('saved-jobs-list');
  if (!saved) return;

  const selected = jobsData.filter(job => savedJobs.includes(job.id));
  if (!selected.length) {
    saved.innerHTML = '<div class="alert alert-light border">No saved jobs yet. Add some from the jobs page.</div>';
    return;
  }

  saved.innerHTML = selected.map(job => `
    <div class="card p-3 mb-3 border-0 shadow-sm">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <strong>${job.title}</strong><br>
          <small>${job.company} • ${job.location}</small>
        </div>
        <span class="status-pill active">Saved</span>
      </div>
    </div>
  `).join('');
}

function renderDashboard() {
  const user = getLoggedUser() || {};
  const nameEl = document.getElementById('dashboard-name');
  const emailEl = document.getElementById('dashboard-email');
  if (nameEl) nameEl.textContent = user.name || 'Welcome back';
  if (emailEl) emailEl.textContent = user.email || 'student@apnajobdekho.com';
  updateDashboardSavedJobs();

  const companyList = document.getElementById('dashboard-company-list');
  if (companyList) {
    const companies = getCompanies();
    companyList.innerHTML = companies.slice(0, 4).map(company => `
      <div class="dash-row">
        <div class="dash-row-main">
          <strong>${escapeHtml(company.name)}</strong>
          <small>${escapeHtml(company.industry)} • ${escapeHtml(company.location)}</small>
        </div>
        <span class="status-pill active">${escapeHtml(company.jobs)} jobs</span>
        <div class="row-actions">
          <a href="${getSitePath(`company-details.html?name=${encodeURIComponent(company.name)}`)}" class="btn btn-outline-primary btn-sm">Details</a>
          ${company.applyUrl ? `<a href="${escapeHtml(company.applyUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Apply</a>` : ''}
        </div>
      </div>
    `).join('');
  }

  const savedCount = document.getElementById('dashboard-saved-count');
  if (savedCount) savedCount.textContent = savedJobs.length;

  const selectedPlan = localStorage.getItem('selectedPlan') || 'Free';
  const planEl = document.getElementById('current-plan');
  if (planEl) planEl.textContent = selectedPlan;
}

function setupInterviewPractice() {
  const categoryEl = document.getElementById('question-category');
  const questionEl = document.getElementById('question-text');
  const feedbackEl = document.getElementById('feedback-box');
  const nextBtn = document.getElementById('next-question');
  const submitBtn = document.getElementById('submit-answer');

  if (!categoryEl || !questionEl || !feedbackEl || !nextBtn || !submitBtn) return;

  let currentQuestion = null;

  function pickQuestion() {
    const category = categoryEl.value || 'HR';
    const filtered = questionBank.filter(q => q.category === category);
    currentQuestion = filtered[Math.floor(Math.random() * filtered.length)] || questionBank[0];
    questionEl.textContent = currentQuestion.question;
    feedbackEl.textContent = 'Draft your answer and click submit to get beginner-friendly tips.';
    document.getElementById('answer-input').value = '';
  }

  categoryEl.addEventListener('change', pickQuestion);
  nextBtn.addEventListener('click', pickQuestion);
  submitBtn.addEventListener('click', () => {
    const answer = document.getElementById('answer-input').value.trim();
    if (!answer) {
      feedbackEl.textContent = 'Please write an answer before getting feedback.';
      return;
    }
    feedbackEl.innerHTML = `<strong>Rule-based feedback:</strong> Start with a clear opening statement, use the STAR format, and include one example of impact or learning. This system provides guidance only; it does not replace a real AI evaluator.`;
  });

  pickQuestion();
}

let companyEditId = null;

function renderAdminDashboard() {
  const panel = document.getElementById('admin-table');
  if (!panel) return;

  const companies = getCompanies();
  if (!companies.length) {
    panel.innerHTML = '<tr><td colspan="8" class="text-center text-muted py-4">No company records yet. Add a company using the form above.</td></tr>';
    renderAdminDirectLinks();
    return;
  }

  panel.innerHTML = companies.map((company, index) => `
    <tr>
      <td><strong>${escapeHtml(company.name)}</strong></td>
      <td>${escapeHtml(company.industry)}</td>
      <td>${escapeHtml(company.location)}</td>
      <td><span class="status-pill active">${escapeHtml(company.jobs)} open roles</span></td>
      <td>${company.applyUrl ? `<a href="${escapeHtml(company.applyUrl)}" target="_blank" rel="noopener noreferrer">Open apply link</a>` : '<span class="text-muted">Not added</span>'}</td>
      <td class="company-description-cell">${escapeHtml(company.description)}</td>
      <td class="admin-updated-cell">${company.updatedAt ? escapeHtml(new Date(company.updatedAt).toLocaleDateString()) : '<span class="text-muted">Legacy record</span>'}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-2" data-action="edit" data-id="${escapeHtml(company.id)}">Edit</button>
        <button class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${escapeHtml(company.id)}">Delete</button>
      </td>
    </tr>
  `).join('');

  panel.querySelectorAll('[data-action="edit"]').forEach(button => {
    button.addEventListener('click', () => {
      beginCompanyEdit(button.dataset.id);
    });
  });

  panel.querySelectorAll('[data-action="delete"]').forEach(button => {
    button.addEventListener('click', () => {
      const companyId = button.dataset.id;
      const updatedCompanies = getCompanies().filter(company => company.id !== companyId);
      try {
        saveCompanies(updatedCompanies);
      } catch (error) {
        console.error('Unable to delete company record.', error);
        alert('Company could not be deleted. Please check browser storage and try again.');
        return;
      }

      if (companyEditId === companyId) {
        companyEditId = null;
        const form = document.getElementById('company-form');
        const submitButton = form?.querySelector('button[type="submit"]');
        const cancelButton = document.getElementById('cancel-edit-company');
        const heading = document.getElementById('company-form-heading');
        form?.reset();
        if (submitButton) submitButton.textContent = 'Save company';
        if (cancelButton) cancelButton.hidden = true;
        if (heading) heading.textContent = 'Add a company';
      }

      renderAdminDashboard();
      renderAdminMetrics();
      renderCompanyDirectory();
      renderCompanies();
      renderDashboard();
    });
  });
  renderAdminDirectLinks();
}

function beginCompanyEdit(companyId) {
  const company = getCompanies().find(record => record.id === companyId);
  const form = document.getElementById('company-form');
  const submitButton = form?.querySelector('button[type="submit"]');
  const cancelButton = document.getElementById('cancel-edit-company');
  const heading = document.getElementById('company-form-heading');

  if (!form || !company) return;

  companyEditId = company.id;
  if (heading) heading.textContent = 'Edit company';
  form.companyName.value = company.name;
  form.industry.value = company.industry;
  form.location.value = company.location;
  form.jobs.value = company.jobs || 0;
  form.description.value = company.description;
  form.applyUrl.value = company.applyUrl || '';
  if (submitButton) submitButton.textContent = 'Update company';
  if (cancelButton) cancelButton.hidden = false;
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderAdminDirectLinks() {
  const panel = document.getElementById('admin-direct-links-table');
  if (!panel) return;

  const companies = getCompanies();
  if (!companies.length) {
    panel.innerHTML = '<tr><td colspan="4" class="text-center text-muted py-4">No company records available.</td></tr>';
    return;
  }

  panel.innerHTML = companies.map(company => `
    <tr>
      <td><strong>${escapeHtml(company.name)}</strong></td>
      <td>${company.applyUrl ? '<span class="status-pill active">Added</span>' : '<span class="status-pill pending">Missing</span>'}</td>
      <td>${company.applyUrl ? `<a href="${escapeHtml(company.applyUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(company.applyUrl)}</a>` : '<span class="text-muted">No direct link added</span>'}</td>
      <td><button type="button" class="btn btn-outline-primary btn-sm" data-action="edit-apply-link" data-id="${escapeHtml(company.id)}">${company.applyUrl ? 'Edit link' : 'Add link'}</button></td>
    </tr>
  `).join('');

  panel.querySelectorAll('[data-action="edit-apply-link"]').forEach(button => {
    button.addEventListener('click', () => beginCompanyEdit(button.dataset.id));
  });
}

function setupAdminCompanyForm() {
  const form = document.getElementById('company-form');
  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const cancelButton = document.getElementById('cancel-edit-company');
  const heading = document.getElementById('company-form-heading');

  const resetFormState = () => {
    companyEditId = null;
    form.reset();
    if (submitButton) submitButton.textContent = 'Save company';
    if (cancelButton) cancelButton.hidden = true;
    if (heading) heading.textContent = 'Add a company';
  };

  if (cancelButton) {
    cancelButton.addEventListener('click', resetFormState);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const company = {
      name: form.companyName.value.trim(),
      industry: form.industry.value.trim(),
      location: form.location.value.trim(),
      jobs: Number(form.jobs.value || 0),
      description: form.description.value.trim(),
      applyUrl: form.applyUrl.value.trim()
    };

    if (!company.name || !company.industry || !company.location || !company.description || !Number.isInteger(company.jobs) || company.jobs < 0) {
      alert('Enter a company name, industry, location, a whole-number role count of zero or more, and a description.');
      return;
    }

    if (company.applyUrl && !getValidApplyUrl(company.applyUrl)) {
      alert('Enter a valid direct application link starting with http:// or https://, or leave it blank.');
      form.applyUrl.focus();
      return;
    }

    const existing = getCompanies();
    const updatedCompanies = [...existing];
    const editingIndex = companyEditId === null
      ? -1
      : updatedCompanies.findIndex(record => record.id === companyEditId);
    const editingCompany = editingIndex < 0 ? null : updatedCompanies[editingIndex];
    if (companyEditId !== null && !editingCompany) {
      alert('This company record is no longer available. Refresh the page and try again.');
      resetFormState();
      return;
    }
    const duplicate = updatedCompanies.some(record =>
      record.id !== companyEditId && record.name.toLowerCase() === company.name.toLowerCase()
    );

    if (duplicate) {
      alert('A company with this name already exists. Edit that company record instead.');
      return;
    }

    if (editingIndex >= 0) {
      updatedCompanies[editingIndex] = {
        ...updatedCompanies[editingIndex],
        ...company,
        updatedAt: new Date().toISOString()
      };
    } else {
      updatedCompanies.unshift({
        ...company,
        id: `company-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    try {
      saveCompanies(updatedCompanies);
    } catch (error) {
      console.error('Unable to save company record.', error);
      alert('Company could not be saved. Please check browser storage and try again.');
      return;
    }

    resetFormState();
    renderAdminDashboard();
    renderAdminMetrics();
    renderCompanyDirectory();
    renderCompanies();
    renderDashboard();
    alert(editingCompany ? 'Company updated successfully.' : 'Company added successfully.');
  });
}

function renderAdminMetrics() {
  const users = getUsers().filter(user => user.role === 'user');
  const companies = getCompanies();
  const userCount = document.getElementById('admin-user-count');
  const companyCount = document.getElementById('admin-company-count');
  const openRoleCount = document.getElementById('admin-open-role-count');
  const planCount = document.getElementById('admin-plan-count');

  if (userCount) userCount.textContent = users.length;
  if (companyCount) companyCount.textContent = companies.length;
  if (openRoleCount) openRoleCount.textContent = companies.reduce((total, company) => total + (Number(company.jobs) || 0), 0);
  if (planCount) planCount.textContent = localStorage.getItem('selectedPlan') || 'Free';
}

function setupAdminNavigation() {
  const nav = document.querySelector('.admin-sidebar nav');
  if (!nav) return;

  const updateActiveLink = () => {
    const hash = window.location.hash;
    const activeHref = hash === '#company-form-card' ? '#company-form-card'
      : hash === '#company-records' ? '#company-records' : 'index.html';
    nav.querySelectorAll('a[data-admin-section]').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === activeHref);
    });
  };

  window.addEventListener('hashchange', updateActiveLink);
  updateActiveLink();
}

function setupPortalLogout() {
  document.querySelectorAll('[data-portal-logout]').forEach(link => {
    link.addEventListener('click', () => {
      localStorage.removeItem(storageKeys.userSession);
    });
  });
}

function setupBackHomeButton() {
  const inPortalFolder = /\/(admin|user)\//i.test(window.location.pathname);
  const currentPage = window.location.pathname.split('/').pop().toLowerCase();
  if (!inPortalFolder && (currentPage === '' || currentPage === 'index.html' || currentPage === '404.html')) return;

  const homeButton = document.createElement('a');
  homeButton.className = 'back-home-button';
  homeButton.href = getSitePath('index.html');
  homeButton.textContent = '← Back to Home';
  homeButton.setAttribute('aria-label', 'Go back to homepage');
  document.body.append(homeButton);
}

function renderCompanyDirectory() {
  const container = document.getElementById('company-list');
  if (!container) return;
  const companies = getCompanies();
  if (!companies.length) {
    container.innerHTML = '<div class="alert alert-light border">No companies have been added yet.</div>';
    return;
  }
  container.innerHTML = companies.map(company => `
    <article class="company-row">
      <div class="company-logo">${escapeHtml(getInitials(company.name))}</div>
      <div class="company-row-main">
        <h4>${escapeHtml(company.name)}</h4>
        <div class="meta-line">
          <span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(company.location)}</span>
          <span><i class="fa-solid fa-people-group"></i> ${escapeHtml(company.jobs)} open roles</span>
        </div>
        <p>${escapeHtml(company.description)}</p>
      </div>
      <div class="company-row-side">
        <span class="tag">${escapeHtml(company.industry)}</span>
        <div class="row-actions">
          <a href="company-details.html?name=${encodeURIComponent(company.name)}" class="btn btn-primary btn-sm">Details</a>
          <a href="jobs.html" class="btn btn-outline-primary btn-sm">Open jobs</a>
          ${company.applyUrl ? `<a href="${escapeHtml(company.applyUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary btn-sm">Apply directly</a>` : ''}
        </div>
      </div>
    </article>
  `).join('');
}

function renderJobsCompanyRows() {
  const rows = document.getElementById('jobs-company-rows');
  if (!rows) return;

  const companies = getCompanies();
  if (!companies.length) {
    rows.innerHTML = '<tr><td colspan="5" class="text-center text-muted py-4">No companies have been added yet.</td></tr>';
    return;
  }

  rows.innerHTML = companies.map(company => `
    <tr>
      <td><strong>${escapeHtml(company.name)}</strong></td>
      <td>${escapeHtml(company.industry)}</td>
      <td>${escapeHtml(company.location)}</td>
      <td><span class="status-pill active">${escapeHtml(company.jobs)} open roles</span></td>
      <td>
        <div class="d-flex gap-2">
          <a href="company-details.html?name=${encodeURIComponent(company.name)}" class="btn btn-outline-primary btn-sm">View</a>
          ${company.applyUrl ? `<a href="${escapeHtml(company.applyUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Apply</a>` : '<span class="text-muted small align-self-center">No link</span>'}
        </div>
      </td>
    </tr>
  `).join('');
}

function setupUserPortalLayout() {
  const portalPages = new Set([
    'companies.html',
    'company-details.html',
    'jobs.html',
    'job-details.html',
    'resume.html',
    'interview.html',
    'profile.html',
    'subscription.html',
    'account.html'
  ]);
  const page = window.location.pathname.split('/').pop().toLowerCase();
  if (!portalPages.has(page)) return;

  const main = document.querySelector('main');
  if (!main) return;

  const links = [
    { rootPath: 'user/dashboard.html', nestedPath: 'dashboard.html', label: 'Overview', icon: 'fa-house' },
    { rootPath: 'user/profile.html', nestedPath: 'profile.html', label: 'Profile', icon: 'fa-user' },
    { rootPath: 'companies.html', nestedPath: '../companies.html', label: 'Companies', icon: 'fa-building' },
    { rootPath: 'jobs.html', nestedPath: '../jobs.html', label: 'Jobs', icon: 'fa-magnifying-glass' },
    { rootPath: 'resume.html', nestedPath: '../resume.html', label: 'Resume', icon: 'fa-file-lines' },
    { rootPath: 'interview.html', nestedPath: '../interview.html', label: 'Interview Prep', icon: 'fa-chalkboard-user' },
    { rootPath: 'user/subscription.html', nestedPath: 'subscription.html', label: 'Subscription', icon: 'fa-credit-card' },
    { rootPath: 'user/account.html', nestedPath: 'account.html', label: 'Settings', icon: 'fa-gear' }
  ];
  const inUserFolder = /\/user\//i.test(window.location.pathname);
  const activePage = page === 'company-details.html' ? 'companies.html'
    : page === 'job-details.html' ? 'jobs.html' : page;
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.innerHTML = `
    <h4>User Dashboard</h4>
    <nav>
      ${links.map(link => {
        const href = inUserFolder ? link.nestedPath : link.rootPath;
        const currentPath = link.rootPath.split('/').pop();
        return `
        <a href="${href}" class="${currentPath === activePage ? 'active' : ''}">
          <i class="fa-solid ${link.icon}"></i> ${link.label}
        </a>
      `;
      }).join('')}
      <a href="${inUserFolder ? '../index.html' : 'index.html'}" data-portal-logout><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
    </nav>
  `;

  const content = document.createElement('div');
  content.className = 'user-portal-content';
  while (main.firstChild) content.append(main.firstChild);

  const shell = document.createElement('div');
  shell.className = 'container dashboard-shell';
  shell.append(sidebar, content);
  main.className = 'section user-portal-main';
  main.append(shell);
  document.body.classList.add('user-portal-page');

  document.querySelectorAll('.site-header, .site-footer, .announcement-bar').forEach(element => element.remove());
}

function renderCompanyDetails() {
  const detail = document.getElementById('company-detail');
  if (!detail) return;

  const requestedName = new URLSearchParams(window.location.search).get('name');
  const companies = getCompanies();
  const company = companies.find(item => item.name === requestedName) || companies[0];
  if (!company) {
    detail.innerHTML = '<h1>Company not found</h1><p>This company is no longer listed.</p><a href="companies.html" class="btn btn-primary">Back to companies</a>';
    return;
  }

  detail.innerHTML = `
    <div class="company-meta mb-3">
      <div class="company-logo">${escapeHtml(getInitials(company.name))}</div>
      <span class="tag">${escapeHtml(company.jobs)} open roles</span>
    </div>
    <h1>${escapeHtml(company.name)}</h1>
    <p>Industry: ${escapeHtml(company.industry)} • Location: ${escapeHtml(company.location)}</p>
    <p>${escapeHtml(company.description)}</p>
    <div class="d-flex gap-2 flex-wrap">
      <a href="${getSitePath('companies.html')}" class="btn btn-outline-primary">Back to companies</a>
      ${company.applyUrl ? `<a href="${escapeHtml(company.applyUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Apply directly</a>` : '<span class="text-muted align-self-center">Direct application link not available yet.</span>'}
    </div>
  `;
}

function initialize() {
  seedStorageData();
  renderFeaturedJobs();
  renderFreshJobs();
  renderCompanies();
  renderPricingHome();
  renderJobCards();
  renderPricingPage();
  setupJobFilters();
  setupResumeBuilder();
  setupAuthForms();
  setupAdminCompanyForm();
  renderDashboard();
  setupInterviewPractice();
  renderAdminDashboard();
  renderCompanyDirectory();
  renderJobsCompanyRows();
  renderCompanyDetails();
  setupUserPortalLayout();
  renderAdminMetrics();
  setupAdminNavigation();
  setupPortalLogout();
  setupBackHomeButton();
  bindBookmarkButtons();

  const planMessage = document.getElementById('plan-message');
  if (planMessage) {
    const plan = localStorage.getItem('selectedPlan') || 'Free';
    planMessage.textContent = `Current selection: ${plan}.`;
  }
}

document.addEventListener('DOMContentLoaded', initialize);

/* Mobile navigation: copies the desktop menu into a simple dropdown */
(function () {
  var btn = document.querySelector('.mobile-menu-toggle');
  var nav = document.querySelector('.main-nav');
  var header = document.querySelector('.site-header');
  if (!btn || !nav || !header) return;
  var panel = document.createElement('nav');
  panel.className = 'mobile-nav';
  panel.id = 'mobile-nav';
  panel.setAttribute('aria-label', 'Mobile navigation');
  panel.innerHTML = nav.innerHTML;
  header.appendChild(panel);
  btn.setAttribute('aria-controls', 'mobile-nav');
  btn.setAttribute('aria-expanded', 'false');
  btn.addEventListener('click', function () {
    var open = panel.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
})();
