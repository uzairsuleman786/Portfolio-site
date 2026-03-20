// ── Typed.js Animation ──────────────────────────────────────
var typed = new Typed(".typing", {
    strings: ["", "Power Automate Expert", "Copilot Studio Builder", "Azure AI Architect", "Power Pages Developer"],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true
});

// ── Dynamic Age ──────────────────────────────────────────────
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
}
const ageEl = document.getElementById("age");
if (ageEl) ageEl.textContent = calculateAge("1997-09-27");

// ── Nav Active Highlighting on Scroll ───────────────────────
const sections   = document.querySelectorAll("section[id]");
const navLinks   = document.querySelectorAll(".aside .nav li a");

function updateNav() {
    let current = "";
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 140) current = sec.getAttribute("id");
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) link.classList.add("active");
    });
}
window.addEventListener("scroll", updateNav);

// ── Mobile Nav Toggler ───────────────────────────────────────
const toggler = document.querySelector(".nav-toggler");
const aside   = document.querySelector(".aside");

if (toggler) {
    toggler.addEventListener("click", () => {
        aside.classList.toggle("open");
    });
}

// Close aside when nav link clicked on mobile
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth < 1190) aside.classList.remove("open");
    });
});

// ── Scroll Reveal ────────────────────────────────────────────
const reveals = document.querySelectorAll(".reveal-up");
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
reveals.forEach(el => revealObserver.observe(el));

// ── Modal ────────────────────────────────────────────────────
const modalOverlay = document.getElementById("modal-overlay");
const modalClose   = document.getElementById("modal-close");

if (modalClose) {
    modalClose.addEventListener("click", function(e) {
        e.preventDefault();
        modalOverlay.classList.remove("active");
    });
}
modalOverlay && modalOverlay.addEventListener("click", function(e) {
    if (e.target === modalOverlay) modalOverlay.classList.remove("active");
});

// ── Contact Form (EmailJS) ───────────────────────────────────
const contactForm = document.getElementById("contact-form");
const submitBtn   = document.getElementById("button");

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        submitBtn.value = "Sending...";
        submitBtn.disabled = true;

        emailjs.sendForm("service_2fbeyzc", "template_bkwnjdj", this)
            .then(() => {
                submitBtn.value = "Send Message";
                submitBtn.disabled = false;
                modalOverlay.classList.add("active");
                contactForm.reset();
            }, (err) => {
                submitBtn.value = "Send Message";
                submitBtn.disabled = false;
                alert("Error sending message. Please try again or email directly.");
                console.error(err);
            });
    });
}

// ── Download CV ──────────────────────────────────────────────
const downloadBtn = document.getElementById("download-button");
if (downloadBtn) {
    downloadBtn.addEventListener("click", function(e) {
        e.preventDefault();
        fetch("Download/CV_MuhammadUzair.pdf")
            .then(r => r.blob())
            .then(blob => {
                const url  = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "CV_MuhammadUzair.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(err => console.error("CV download error:", err));
    });
}

// ── Add Contact (vCard) ──────────────────────────────────────
const addContact = document.getElementById("add-contact");
if (addContact) {
    addContact.addEventListener("click", function(e) {
        e.preventDefault();
        const vcf = `BEGIN:VCARD
VERSION:4.0
N:Suleman;Muhammad Uzair;;; 
FN:Muhammad Uzair
ORG:Systems Limited
TITLE:Principal Consultant – Power Platform Solution Architect
TEL;TYPE=WORK,voice;VALUE=uri:tel:+923112983500
EMAIL:uzairsuleman786@gmail.com
URL:https://www.linkedin.com/in/muhammaduzairsuleman/
ADR;TYPE=WORK:;;Lahore;Punjab;;Pakistan
REV:20260101T000000Z
END:VCARD`;
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(new Blob([vcf], { type: "text/vcard" }));
        link.download = "Muhammad_Uzair.vcf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// ═══════════════════════════════════════════════════════════
//  DATA — Nodes & Detail Content
// ═══════════════════════════════════════════════════════════
const NODES = [
  {
    id: 'dataverse',
    label: 'Dataverse',
    icon: '🗄️',
    color: '#5b8dee',
    hub: true,
    // Position as % of container (x, y)
    pos: [50, 50],
    proficiency: 91,
    category: 'Data Platform',
    description: 'The unified data backbone of the entire Power Platform. Dataverse acts as the enterprise-grade storage layer — tables, relationships, security roles, business rules, and plugins all live here. Every solution I architect is Dataverse-first.',
    skills: ['Custom Tables & Columns', 'Relationships & Lookups', 'Security Roles & Teams', 'Business Rules & Flows', 'Plugins & PCF Controls', 'Solutions & ALM'],
    projects: [
      { name: 'HECO IAM Automation', detail: 'Designed full Dataverse schema for Joiner-Mover-Leaver lifecycle — identity records, approval queues, audit logs.' },
      { name: 'Beazley Insurance Portal', detail: 'Multi-table Dataverse model powering insurance policy management with complex security role matrix.' },
      { name: 'Power Pages Self-Service', detail: 'Dataverse as backend for external portal — table permissions, column security, and portal metadata.' },
    ],
    certs: ['PL-400', 'PL-200', 'PL-600'],
    connects: ['power-apps', 'power-automate', 'power-bi', 'power-pages', 'copilot-studio']
  },
  {
    id: 'power-apps',
    label: 'Power Apps',
    icon: '📱',
    color: '#7b61ff',
    hub: false,
    pos: [22, 22],
    proficiency: 92,
    category: 'App Development',
    description: 'Canvas Apps for highly customized, pixel-perfect mobile/desktop experiences. Model-Driven Apps for data-heavy enterprise workflows. I build both — from field technician apps to executive dashboards — with PCF components when native controls fall short.',
    skills: ['Canvas App Architecture', 'Model-Driven Apps', 'PCF Components', 'Responsive Design', 'Component Libraries', 'Custom Connectors'],
    projects: [
      { name: 'HECO IAM – Admin App', detail: 'Canvas App for IT admins to manage provisioning requests, approvals, and audit trails in real-time.' },
      { name: 'Arrowhead Pharma MDA', detail: 'Model-Driven App for clinical operations — complex forms, views, dashboards, and business process flows.' },
      { name: 'Emirates Digital Card', detail: 'Canvas App delivering digital business card experience with QR generation and vCard export.' },
    ],
    certs: ['PL-400', 'PL-200'],
    connects: ['dataverse', 'power-automate', 'azure-ai']
  },
  {
    id: 'power-automate',
    label: 'Power Automate',
    icon: '🔄',
    color: '#2dd4bf',
    hub: false,
    pos: [78, 22],
    proficiency: 96,
    category: 'Automation & Integration',
    description: 'My strongest tool. Cloud flows for cloud-native automation, Desktop flows for legacy system RPA, and HTTP connectors for REST API integration. Also architect Azure Logic Apps and Hybrid Runbook Workers when Power Automate hits its limits — like on-prem AD provisioning.',
    skills: ['Cloud Flows (Automated/Scheduled/Instant)', 'HTTP & Custom Connectors', 'Approvals & Adaptive Cards', 'Azure Logic Apps', 'Hybrid Runbook Worker', 'Error Handling & Retry Patterns'],
    projects: [
      { name: 'HECO JML Lifecycle Flows', detail: 'End-to-end automation: SuccessFactors → Dataverse → AD provisioning via Azure Hybrid Runbook Worker.' },
      { name: 'Beazley Approval Orchestration', detail: 'Multi-stage approval flows with Teams Adaptive Cards, SLA timers, and escalation logic.' },
      { name: 'DocuSign + ServiceNow Integration', detail: 'Automated contract signing trigger → ServiceNow ticket creation → SAP/GRC access provisioning.' },
    ],
    certs: ['PL-400', 'PL-600'],
    connects: ['dataverse', 'azure-ai', 'external-systems']
  },
  {
    id: 'power-bi',
    label: 'Power BI',
    icon: '📊',
    color: '#f59e0b',
    hub: false,
    pos: [22, 78],
    proficiency: 85,
    category: 'Analytics & Reporting',
    description: 'Interactive dashboards and paginated reports that surface operational insights from Dataverse, SQL, and external APIs. I design for C-suite consumption — clean visual hierarchy, drill-throughs, and row-level security ensuring each user sees only their data.',
    skills: ['DAX Measures & Calculated Columns', 'Power Query (M Language)', 'Dataverse Connector', 'Row-Level Security', 'Paginated Reports', 'Embedded Analytics'],
    projects: [
      { name: 'HECO IAM Operations Dashboard', detail: 'Real-time identity lifecycle dashboard — onboarding velocity, SLA compliance, and exception tracking.' },
      { name: 'Beazley Policy Analytics', detail: 'Executive dashboard across policy portfolio with drill-through to individual claim records.' },
      { name: 'Systems Limited Delivery KPIs', detail: 'Internal delivery metrics dashboard tracking project health, utilization, and milestone adherence.' },
    ],
    certs: ['PL-200', 'PL-600'],
    connects: ['dataverse', 'external-systems']
  },
  {
    id: 'power-pages',
    label: 'Power Pages',
    icon: '🌐',
    color: '#10b981',
    hub: false,
    pos: [78, 78],
    proficiency: 90,
    category: 'External Portals',
    description: 'Low-code external web portals built on top of Dataverse — for partner portals, customer self-service, and employee-facing applications requiring external access. I handle everything from table permissions and web templates to Liquid templating and custom JavaScript.',
    skills: ['Web Templates & Page Templates', 'Liquid Templating', 'Table Permissions & Security', 'Custom JavaScript/CSS', 'Power Pages Studio', 'Web API Integration'],
    projects: [
      { name: 'HECO Employee Onboarding Portal', detail: 'External Power Pages portal for new hires to complete identity setup, submit documentation, and track onboarding status.' },
      { name: 'Beazley Broker Self-Service', detail: 'Partner portal for insurance brokers to submit, track, and manage policy applications against Dataverse.' },
      { name: 'Power Pages Full Course 2025', detail: 'Published 6-part YouTube course teaching Power Pages from zero to production — 1000s of views.' },
    ],
    certs: ['PL-200', 'PL-600'],
    connects: ['dataverse', 'power-automate']
  },
  {
    id: 'copilot-studio',
    label: 'Copilot Studio',
    icon: '🤖',
    color: '#a78bfa',
    hub: false,
    pos: [50, 15],
    proficiency: 88,
    category: 'AI & Conversational',
    description: 'Building intelligent virtual agents that handle real business tasks — not just FAQs. Copilot Studio bots with Power Automate action triggers, Dataverse knowledge bases, and Azure OpenAI grounding for context-aware responses embedded in Teams, websites, or portals.',
    skills: ['Topic Design & Dialog Management', 'Power Automate Action Triggers', 'Azure OpenAI Grounding', 'Teams & Website Embedding', 'Generative Answers', 'Adaptive Cards in Bot'],
    projects: [
      { name: 'IT Helpdesk Bot – HECO', detail: 'Virtual agent handling password resets, access requests, and IT ticket routing — integrated with ServiceNow.' },
      { name: 'HR FAQ Agent', detail: 'Copilot for HR answering policy questions, grounded on SharePoint knowledge base with Dataverse user context.' },
      { name: 'Beazley Intake Bot', detail: 'Conversational intake flow collecting policy information and creating Dataverse records via structured dialog.' },
    ],
    certs: ['AI-102', 'PL-600'],
    connects: ['dataverse', 'power-automate', 'azure-ai']
  },
  {
    id: 'azure-ai',
    label: 'Azure AI',
    icon: '☁️',
    color: '#38bdf8',
    hub: false,
    pos: [50, 85],
    proficiency: 80,
    category: 'Cloud & AI Services',
    description: 'Azure services that extend Power Platform beyond its native capabilities — Azure Automation for on-prem AD provisioning, AI Foundry for custom LLM deployments, AI Builder for document processing, and Azure Functions as escape hatches for complex logic.',
    skills: ['Azure Automation + Hybrid Runbook', 'AI Foundry & Azure OpenAI', 'AI Builder (Forms, Object Detection)', 'Azure Functions', 'Azure Service Bus', 'Entra ID & AD Connect'],
    projects: [
      { name: 'HECO On-Prem AD Provisioning', detail: 'Azure Automation with Hybrid Runbook Worker replacing PAD for on-premises Active Directory user lifecycle.' },
      { name: 'AI Builder Document Processing', detail: 'Invoice and contract extraction models integrated into Power Automate approval flows for Arrowhead Pharma.' },
      { name: 'Azure OpenAI Copilot Grounding', detail: 'Custom RAG pipeline in AI Foundry grounding Copilot Studio responses on internal knowledge bases.' },
    ],
    certs: ['AI-102', 'PL-600'],
    connects: ['power-automate', 'copilot-studio', 'external-systems']
  },
  {
    id: 'external-systems',
    label: 'Integrations',
    icon: '🔗',
    color: '#f472b6',
    hub: false,
    pos: [12, 50],
    proficiency: 87,
    category: 'External Integrations',
    description: 'Connecting the Power Platform ecosystem to the enterprise world — SuccessFactors, ServiceNow, DocuSign, SAP/GRC, CCure/Victor (physical security), and banking middleware. REST APIs, webhooks, OData feeds, and custom connectors are my integration toolkit.',
    skills: ['SuccessFactors HR Integration', 'ServiceNow ITSM Connector', 'DocuSign eSignature', 'SAP/GRC Provisioning', 'REST API & OData', 'Custom Connectors'],
    projects: [
      { name: 'HECO Full Integration Hub', detail: 'SuccessFactors → Power Platform → ServiceNow + DocuSign + SAP/GRC + CCure/Victor — full JML orchestration.' },
      { name: 'DIBP Banking Middleware', detail: 'Raast & Roshan Digital Account integration via banking APIs with Power Automate as orchestration layer.' },
      { name: 'PowerTextor SMS Platform', detail: 'Twilio SMS integration via custom connector into Power Apps for bulk messaging workflows.' },
    ],
    certs: ['PL-400', 'PL-600'],
    connects: ['power-automate', 'power-bi', 'azure-ai']
  },
  {
    id: 'alm-devops',
    label: 'ALM & DevOps',
    icon: '⚙️',
    color: '#fb923c',
    hub: false,
    pos: [88, 50],
    proficiency: 82,
    category: 'Delivery & Governance',
    description: 'Enterprise delivery isn\'t just building — it\'s deploying reliably. I use GitHub Actions and Octopus Deploy for Power Platform solution pipelines, environment strategies (Dev/Test/UAT/Prod), managed solutions, and dataverse solution layering.',
    skills: ['GitHub Actions for Power Platform', 'Octopus Deploy Pipelines', 'Solution Layering Strategy', 'Environment Variables & Connections', 'Managed vs Unmanaged Solutions', 'Dataverse Backup & Restore'],
    projects: [
      { name: 'HECO Multi-Env Pipeline', detail: 'GitHub → Octopus pipeline deploying Power Platform solutions across 4 environments with automated config swap.' },
      { name: 'Systems Limited ALM Framework', detail: 'Established team-wide ALM framework: branching strategy, solution segmentation, and deployment runbooks.' },
      { name: 'Beazley Deployment Governance', detail: 'Regulated-industry deployment approach with change management gates and rollback procedures.' },
    ],
    certs: ['PL-400', 'PL-600'],
    connects: ['dataverse', 'power-apps']
  }
];

// ═══════════════════════════════════════════════════════════
//  EDGE DEFINITIONS (source, target, type)
//  types: 'core' | 'data' | 'external'
// ═══════════════════════════════════════════════════════════
const EDGES = [
  { from: 'dataverse',      to: 'power-apps',      type: 'core' },
  { from: 'dataverse',      to: 'power-automate',  type: 'core' },
  { from: 'dataverse',      to: 'power-bi',        type: 'data' },
  { from: 'dataverse',      to: 'power-pages',     type: 'core' },
  { from: 'dataverse',      to: 'copilot-studio',  type: 'data' },
  { from: 'power-automate', to: 'external-systems',type: 'external' },
  { from: 'power-automate', to: 'azure-ai',        type: 'core' },
  { from: 'copilot-studio', to: 'azure-ai',        type: 'data' },
  { from: 'power-apps',     to: 'power-automate',  type: 'data' },
  { from: 'power-pages',    to: 'power-automate',  type: 'data' },
  { from: 'azure-ai',       to: 'external-systems',type: 'external' },
  { from: 'dataverse',      to: 'alm-devops',      type: 'data' },
  { from: 'power-bi',       to: 'external-systems',type: 'external' },
  { from: 'alm-devops',     to: 'power-apps',      type: 'data' },
];

// ═══════════════════════════════════════════════════════════
//  RENDER ENGINE
// ═══════════════════════════════════════════════════════════
let activeNodeId = null;

function buildMap() {
  const inner = document.getElementById('tsMapInner');
  const canvas = document.getElementById('tsCanvas');
  inner.innerHTML = '';

  NODES.forEach((node, i) => {
    const el = document.createElement('div');
    el.className = 'ts-node' + (node.hub ? ' hub' : '');
    el.id = 'node-' + node.id;
    el.style.cssText = `left:${node.pos[0]}%; top:${node.pos[1]}%; --node-color:${node.color};`;
    el.style.animationDelay = (i * 0.06) + 's';

    // Build proficiency dots (5 dots)
    const filled = Math.round(node.proficiency / 20);
    let dots = '';
    for (let d = 0; d < 5; d++) {
      dots += `<span class="${d < filled ? 'filled' : ''}"></span>`;
    }

    el.innerHTML = `
      <div class="ts-node-body">
        <div class="ts-node-ring"></div>
        <div class="ts-node-icon">${node.icon}</div>
        <div class="ts-node-dots">${dots}</div>
        <div class="ts-node-label">${node.label}</div>
      </div>`;

    el.addEventListener('click', () => selectNode(node.id));
    inner.appendChild(el);
  });

  // Draw edges after DOM is ready
  requestAnimationFrame(() => drawEdges());
}

function drawEdges(highlightId = null) {
  const canvas = document.getElementById('tsCanvas');
  const wrap   = canvas.parentElement;
  const W = wrap.clientWidth;
  const H = wrap.clientHeight;
  canvas.setAttribute('viewBox', `0 0 ${W} ${H}`);
  canvas.setAttribute('width',  W);
  canvas.setAttribute('height', H);

  // Clear
  while (canvas.firstChild) canvas.removeChild(canvas.firstChild);

  // Defs for glow filter
  const defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
  defs.innerHTML = `
    <filter id="edgeGlow">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>`;
  canvas.appendChild(defs);

  EDGES.forEach(edge => {
    const fromNode = NODES.find(n => n.id === edge.from);
    const toNode   = NODES.find(n => n.id === edge.to);
    if (!fromNode || !toNode) return;

    const x1 = (fromNode.pos[0] / 100) * W;
    const y1 = (fromNode.pos[1] / 100) * H;
    const x2 = (toNode.pos[0]   / 100) * W;
    const y2 = (toNode.pos[1]   / 100) * H;

    // Bezier control point
    const mx = (x1 + x2) / 2 + (y2 - y1) * 0.12;
    const my = (y1 + y2) / 2 - (x2 - x1) * 0.12;

    const isHighlighted = highlightId &&
      (edge.from === highlightId || edge.to === highlightId);

    let stroke, dash, opacity, width;
    if (edge.type === 'core') {
      stroke = isHighlighted ? fromNode.color : 'rgba(91,141,238,0.35)';
      dash   = 'none';
      opacity = isHighlighted ? 1 : 0.55;
      width  = isHighlighted ? 2 : 1.5;
    } else if (edge.type === 'data') {
      stroke = isHighlighted ? fromNode.color : 'rgba(45,212,191,0.3)';
      dash   = '6,4';
      opacity = isHighlighted ? 0.9 : 0.45;
      width  = isHighlighted ? 1.8 : 1.2;
    } else {
      stroke = isHighlighted ? fromNode.color : 'rgba(244,114,182,0.25)';
      dash   = '3,6';
      opacity = isHighlighted ? 0.85 : 0.35;
      width  = isHighlighted ? 1.6 : 1;
    }

    // Dim non-related edges when a node is selected
    if (highlightId && !isHighlighted) {
      opacity *= 0.25;
    }

    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d', `M${x1},${y1} Q${mx},${my} ${x2},${y2}`);
    path.setAttribute('stroke', stroke);
    path.setAttribute('stroke-width', width);
    path.setAttribute('stroke-dasharray', dash);
    path.setAttribute('fill', 'none');
    path.setAttribute('opacity', opacity);
    if (isHighlighted) {
      path.setAttribute('filter', 'url(#edgeGlow)');
    }

    // Animated dash for highlighted
    if (isHighlighted) {
      const len = path.getTotalLength ? path.getTotalLength() : 200;
      path.style.strokeDasharray = dash === 'none' ? `${len}` : dash;
      path.style.animation = 'edgeDash 1.5s linear infinite';
    }

    canvas.appendChild(path);
  });

  // Inject animation keyframe once
  if (!document.getElementById('edgeDashStyle')) {
    const style = document.createElement('style');
    style.id = 'edgeDashStyle';
    style.textContent = `@keyframes edgeDash { to { stroke-dashoffset: -30; } }`;
    document.head.appendChild(style);
  }
}

// ═══════════════════════════════════════════════════════════
//  SELECT NODE → populate panel
// ═══════════════════════════════════════════════════════════
function selectNode(id) {
  // Toggle off
  if (activeNodeId === id) {
    activeNodeId = null;
    clearPanel();
    drawEdges();
    document.querySelectorAll('.ts-node').forEach(n => n.classList.remove('active'));
    return;
  }

  activeNodeId = id;
  const node = NODES.find(n => n.id === id);
  if (!node) return;

  // Update node active states
  document.querySelectorAll('.ts-node').forEach(n => {
    n.classList.toggle('active', n.id === 'node-' + id);
  });

  // Highlight edges
  drawEdges(id);

  // Populate panel
  populatePanel(node);
}

function clearPanel() {
  const panel = document.getElementById('tsPanel');
  const empty  = document.getElementById('tsPanelEmpty');
  const detail = document.getElementById('tsPanelDetail');
  const bar    = document.getElementById('tsPanelBar');
  panel.classList.remove('highlighted');
  panel.style.removeProperty('--panel-accent');
  bar.style.background = '';
  empty.style.display = 'flex';
  detail.classList.remove('visible');
  detail.style.display = 'none';
}

function populatePanel(node) {
  const panel  = document.getElementById('tsPanel');
  const empty  = document.getElementById('tsPanelEmpty');
  const detail = document.getElementById('tsPanelDetail');
  const bar    = document.getElementById('tsPanelBar');

  panel.classList.add('highlighted');
  panel.style.setProperty('--panel-accent', node.color);
  bar.style.background = `linear-gradient(90deg, ${node.color}, transparent)`;
  empty.style.display = 'none';

  // Build connect chips
  const connectChips = (node.connects || []).map(cid => {
    const cn = NODES.find(n => n.id === cid);
    if (!cn) return '';
    return `<span class="ts-connect-chip" onclick="selectNode('${cid}')">
      <span class="chip-dot" style="background:${cn.color}"></span>${cn.label}
    </span>`;
  }).join('');

  // Build projects
  const projectsHTML = node.projects.map(p => `
    <div class="ts-project-item">
      <div class="ts-project-dot"></div>
      <div class="ts-project-text">
        <strong>${p.name}</strong>
        ${p.detail}
      </div>
    </div>`).join('');

  // Build certs
  const certsHTML = node.certs.map(c => `
    <div class="ts-cert">
      <div class="ts-cert-badge">✓</div>
      ${c}
    </div>`).join('');

  // Build skill tags
  const skillsHTML = node.skills.map(s => `<span class="ts-tag">${s}</span>`).join('');

  detail.innerHTML = `
    <div class="ts-panel-head">
      <div class="ts-panel-node-icon">${node.icon}</div>
      <div class="ts-panel-title-wrap">
        <div class="ts-panel-title">${node.label}</div>
        <div class="ts-panel-category">${node.category}</div>
      </div>
    </div>
    <div class="ts-panel-prof">
      <div class="ts-panel-prof-label">
        <span>Proficiency</span>
        <span>${node.proficiency}%</span>
      </div>
      <div class="ts-panel-prof-track">
        <div class="ts-panel-prof-fill" id="profFill"></div>
      </div>
    </div>
    <hr class="ts-panel-divider"/>
    <div class="ts-panel-body">
      <div class="ts-panel-desc">${node.description}</div>
      <div>
        <div class="ts-section-label">Core Skills</div>
        <div class="ts-tags">${skillsHTML}</div>
      </div>
      <div>
        <div class="ts-section-label">Real Projects</div>
        <div class="ts-projects">${projectsHTML}</div>
      </div>
      <div>
        <div class="ts-section-label">Certifications</div>
        <div class="ts-certs">${certsHTML}</div>
      </div>
      <div>
        <div class="ts-section-label">Connects With</div>
        <div class="ts-connects">${connectChips}</div>
      </div>
    </div>`;

  detail.classList.remove('visible');
  detail.style.display = 'flex';
  // Trigger reflow for animation
  detail.offsetHeight;
  detail.classList.add('visible');

  // Animate proficiency bar
  setTimeout(() => {
    const fill = document.getElementById('profFill');
    if (fill) fill.style.width = node.proficiency + '%';
  }, 60);
}

// ═══════════════════════════════════════════════════════════
//  INIT & RESIZE
// ═══════════════════════════════════════════════════════════
buildMap();

// Redraw edges on resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => drawEdges(activeNodeId), 120);
});

// Initial edge draw after layout settles
setTimeout(() => drawEdges(), 80);

// ── Scroll-reveal for cards ─────────────────────
const cards = document.querySelectorAll('.cw-card');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => {
  card.style.animationPlayState = 'paused';
  io.observe(card);
});

// ── Particle burst on card click ────────────────
cards.forEach(card => {
  card.addEventListener('click', function(e) {
    const color = getComputedStyle(this).getPropertyValue('--card-color').trim() || '#5b8dee';
    burst(e.clientX, e.clientY, color);
  });
});

function burst(x, y, color) {
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    const angle  = (i / 12) * Math.PI * 2;
    const radius = 40 + Math.random() * 40;
    const size   = 4 + Math.random() * 4;
    p.style.cssText = `
      position:fixed;
      left:${x}px; top:${y}px;
      width:${size}px; height:${size}px;
      border-radius:50%;
      background:${color};
      pointer-events:none;
      z-index:9999;
      box-shadow:0 0 8px ${color};
      transition:all 0.6s cubic-bezier(0.4,0,0.2,1);
      transform:translate(-50%,-50%);
      opacity:1;
    `;
    document.body.appendChild(p);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        p.style.transform = `translate(calc(-50% + ${Math.cos(angle)*radius}px), calc(-50% + ${Math.sin(angle)*radius}px)) scale(0)`;
        p.style.opacity = '0';
      });
    });
    setTimeout(() => p.remove(), 700);
  }
}

// ── Counter animation for stats ─────────────────
function animateCounter(el, target, suffix='') {
  let start = 0;
  const duration = 1200;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Trigger counters when stats strip enters view
const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    statsObserver.disconnect();
    // Nothing numeric to animate here — but keeping hook for future
  }
}, { threshold: 0.5 });
const statsEl = document.querySelector('.cw-stats');
if (statsEl) statsObserver.observe(statsEl);

// ═══════════════════════════════════════════════════════════
//  CONFIG
// ═══════════════════════════════════════════════════════════
const BLOG_URL    = 'https://muzairsuleman.blogspot.com';
const FEED_URL    = `${BLOG_URL}/feeds/posts/default?alt=json&max-results=12&callback=bfFeedReceived`;
const MAX_DISPLAY = 6;

// Category → color + icon mapping
const CATEGORY_MAP = {
  'Power Automate':   { color: '#2dd4bf', icon: '🔄' },
  'Power Pages':      { color: '#10b981', icon: '🌐' },
  'Copilot Studio':   { color: '#a78bfa', icon: '🤖' },
  'Power Apps':       { color: '#7b61ff', icon: '📱' },
  'Dynamics 365':     { color: '#f59e0b', icon: '⚙️' },
  'Power Platform':   { color: '#5b8dee', icon: '⚡' },
  'Azure':            { color: '#38bdf8', icon: '☁️' },
  'AI':               { color: '#f472b6', icon: '🧠' },
  'Dataverse':        { color: '#5b8dee', icon: '🗄️' },
  'CRM':              { color: '#fb923c', icon: '📋' },
  'JavaScript':       { color: '#fbbf24', icon: '💻' },
  'ALM':              { color: '#6ee7b7', icon: '🔧' },
};

// Tag → label normalisation for filter matching
const FILTER_MAP = {
  'Power Platform': ['Power Platform','Power Apps','Dataverse','ALM','PCF'],
  'Power Automate': ['Power Automate','Automate Flow','Cached Runs','Process Automation'],
  'Power Pages':    ['Power Pages','Portal','Customer Portal','Liquid','Web API'],
  'Dynamics 365':   ['Dynamics 365','CRM','CRM Best Practices','dynamic 365','bpf','business process flow'],
  'AI':             ['AI','Copilot Studio','Azure AI','AI Builder','claude ai','claude code','agent'],
};

let allPosts    = [];
let activeFilter = 'all';

// ═══════════════════════════════════════════════════════════
//  RSS / JSON FEED FETCH via JSONP (no CORS issues)
// ═══════════════════════════════════════════════════════════
function loadFeed() {
  const script  = document.createElement('script');
  script.src    = FEED_URL;
  script.onerror = () => showError('Could not load feed. Check connection or CORS policy.');
  document.head.appendChild(script);

  // Fallback timeout
  setTimeout(() => {
    if (allPosts.length === 0) showError('Feed took too long to respond. Please try again.');
  }, 8000);
}

// JSONP callback — Blogger calls this automatically
window.bfFeedReceived = function(data) {
  try {
    const entries = data.feed.entry || [];
    allPosts = entries.map(parseEntry);

    // Update count strip
    document.getElementById('bfTotalCount').textContent = data.feed.openSearch$totalResults.$t || entries.length;
    document.getElementById('bfShowCount').textContent  = Math.min(MAX_DISPLAY, allPosts.length);
    document.getElementById('bfCountStrip').style.display = 'flex';
    document.getElementById('bfCta').style.display = 'flex';

    renderPosts(allPosts.slice(0, MAX_DISPLAY));
  } catch(e) {
    showError('Failed to parse feed data.');
  }
};

// ═══════════════════════════════════════════════════════════
//  PARSE ENTRY
// ═══════════════════════════════════════════════════════════
function parseEntry(entry) {
  // Title
  const title = entry.title?.$t || 'Untitled';

  // URL
  const link = (entry.link || []).find(l => l.rel === 'alternate')?.href || BLOG_URL;

  // Date
  const rawDate = entry.published?.$t || '';
  const date    = rawDate ? new Date(rawDate) : null;
  const dateStr = date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  // Tags/Labels
  const tags = (entry.category || []).map(c => c.term).filter(Boolean);

  // Excerpt — strip HTML from content
  const content = entry.content?.$t || entry.summary?.$t || '';
  const stripped = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const excerpt  = stripped.length > 160 ? stripped.slice(0, 160).trim() + '…' : stripped;

  // Thumbnail — look for media thumbnail or first img src in content
  let thumb = null;
  const mediaThumb = entry['media$thumbnail']?.url;
  if (mediaThumb) {
    // Upgrade resolution
    thumb = mediaThumb.replace(/\/s\d+(-c)?\//, '/s600/');
  } else {
    const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch) thumb = imgMatch[1];
  }

  // Category detection
  let detectedCategory = 'Power Platform';
  let catColor  = '#5b8dee';
  let catIcon   = '⚡';

  for (const [cat, cfg] of Object.entries(CATEGORY_MAP)) {
    if (tags.some(t => t.toLowerCase().includes(cat.toLowerCase()))) {
      detectedCategory = cat;
      catColor  = cfg.color;
      catIcon   = cfg.icon;
      break;
    }
  }

  // Reading time estimate
  const wordCount = stripped.split(/\s+/).length;
  const readTime  = Math.max(1, Math.ceil(wordCount / 200));

  return { title, link, dateStr, date, tags, excerpt, thumb, detectedCategory, catColor, catIcon, readTime };
}

// ═══════════════════════════════════════════════════════════
//  RENDER
// ═══════════════════════════════════════════════════════════
function renderPosts(posts) {
  const grid = document.getElementById('bfGrid');
  grid.innerHTML = '';

  if (!posts.length) {
    grid.innerHTML = `
      <div class="bf-error">
        <div class="bf-error-icon">🔍</div>
        <h3>No posts in this category</h3>
        <p>Try a different filter or view all posts on the blog.</p>
      </div>`;
    return;
  }

  posts.forEach((post, i) => {
    const card = document.createElement('a');
    card.href   = post.link;
    card.target = '_blank';
    card.rel    = 'noopener noreferrer';
    card.className = 'bf-card';
    card.style.cssText = `--tag-color:${post.catColor}; animation-delay:${i * 0.07}s;`;
    card.style.animationPlayState = 'paused';

    // Primary tag — pick first meaningful one
    const primaryTag = post.tags[0] || post.detectedCategory;
    // Secondary tag
    const secondaryTag = post.tags[1] || null;

    card.innerHTML = `
      <div class="bf-card-bar"></div>
      <div class="bf-thumb">
        ${post.thumb
          ? `<img src="${escHtml(post.thumb)}" alt="${escHtml(post.title)}" loading="lazy"
               onerror="this.parentElement.innerHTML='<div class=\\'bf-thumb-placeholder\\'><div class=\\'bf-thumb-icon\\'>${post.catIcon}</div><div class=\\'bf-thumb-label\\'>${escHtml(post.detectedCategory)}</div></div>'">`
          : `<div class="bf-thumb-placeholder">
               <div class="bf-thumb-icon">${post.catIcon}</div>
               <div class="bf-thumb-label">${escHtml(post.detectedCategory)}</div>
             </div>`
        }
      </div>
      <div class="bf-card-body">
        <div class="bf-tags">
          <span class="bf-tag">${escHtml(primaryTag)}</span>
          ${secondaryTag ? `<span class="bf-tag" style="--tag-color:var(--accent-2)">${escHtml(secondaryTag)}</span>` : ''}
        </div>
        <div class="bf-title">${escHtml(post.title)}</div>
        <div class="bf-excerpt">${escHtml(post.excerpt)}</div>
        <div class="bf-card-footer">
          <div class="bf-meta">
            <i class="fas fa-calendar"></i>
            ${post.dateStr}
            &nbsp;·&nbsp;
            <i class="fas fa-clock"></i>
            ${post.readTime} min read
          </div>
          <div class="bf-read-more">Read <i class="fas fa-arrow-right"></i></div>
        </div>
      </div>`;

    grid.appendChild(card);
  });

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.bf-card').forEach(c => io.observe(c));
}

function showError(msg) {
  document.getElementById('bfGrid').innerHTML = `
    <div class="bf-error">
      <div class="bf-error-icon">📡</div>
      <h3>Could not load posts</h3>
      <p>${escHtml(msg)}<br>
        <a href="${BLOG_URL}" target="_blank" style="color:var(--skin-color);font-weight:600;">
          Visit blog directly →
        </a>
      </p>
    </div>`;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;')
    .replace(/'/g,'&#039;');
}

// ═══════════════════════════════════════════════════════════
//  FILTER LOGIC
// ═══════════════════════════════════════════════════════════
document.getElementById('bfFilters').addEventListener('click', function(e) {
  const btn = e.target.closest('.bf-filter');
  if (!btn) return;

  document.querySelectorAll('.bf-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = btn.dataset.filter;

  let filtered = allPosts;
  if (activeFilter !== 'all') {
    const matchTags = FILTER_MAP[activeFilter] || [activeFilter];
    filtered = allPosts.filter(post =>
      post.tags.some(tag =>
        matchTags.some(m => tag.toLowerCase().includes(m.toLowerCase()))
      )
    );
  }

  document.getElementById('bfShowCount').textContent = Math.min(MAX_DISPLAY, filtered.length);
  renderPosts(filtered.slice(0, MAX_DISPLAY));
});

// ═══════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════
loadFeed();

// ═══════════════════════════════════════════════════════
//  ★ VIDEO DATA
//  Replace each videoId with your actual YouTube video ID
//  e.g. if URL is youtube.com/watch?v=abc123XYZ  →  videoId: 'abc123XYZ'
//  Thumbnails are auto-fetched from YouTube using the ID
// ═══════════════════════════════════════════════════════
const VIDEOS = [
  {
    part:     'Part 1',
    videoId:  'QN7t9z5d3i0',   // ← Replace with real ID
    title:    'Microsoft Power Pages Full Course 2026 | Pages, Navigation, Brand Kit & Styling | Part 1 of 6',
    desc:     'Welcome to the Microsoft Power Pages Full Course 2026 — a free, complete, hands-on tutorial series designed to take you from zero to building a fully functional, professionally designed Power Pages site step by step.',
    duration: '05:48',               // ← Replace with real duration e.g. '18:42'
    topics:   ['Design Studio', 'Pages', 'Navigation', 'Brand Kit'],
  },
  {
    part:     'Part 2',
    videoId:  '1YhKcM8T3SE',
    title:    'Microsoft Power Pages Full Course 2026 | Tables, Views & Lists in Data Workspace | Part 2 of 6',
    desc:     '✅ Create a table in the Power Pages Data Workspace, ✅ Create and configure a View for your table, ✅ Add a List component to your page using that data',
    duration: '02:24',
    topics:   ['Data Workspace', 'Tables', 'Views', 'Lists'],
  },
  {
    part:     'Part 3',
    videoId:  'GMjxUtlrhzw',
    title:    'Microsoft Power Pages Full Course 2026 | Table Permissions, Web Roles & Page Security | Part 3 of 6',
    desc:     '✅ Create Table Permissions in Power Pages, ✅ Set up Access Types and Privileges correctly, ✅ Add and configure Web Roles, ✅ Configure Page Permissions to control who sees what',
    duration: '06:10',
    topics:   ['Security', 'Web Roles', 'Table Permissions', 'Page Security'],
  },
  {
    part:     'Part 4',
    videoId:  'ME77QGcVh54',
    title:    'Microsoft Power Pages Full Course 2026 | Forms, Tables, Attachments & Code Components | Part 4 of 6',
    desc:     '✅ Create a Table directly in Dataverse, ✅ Create a Form and configure it for Power Pages, ✅ Add a Form component to your page, ✅ Enable Attachments on your form, ✅ Add a Code Component to extend form functionality',
    duration: '04:21',
    topics:   ['Forms', 'Dataverse', 'Tables', 'Code Components'],
  },
  {
    part:     'Part 5',
    videoId:  'hbmqjiVFrcY',
    title:    'Microsoft Power Pages Full Course 2026 | Multi-Step Forms, Configuration & Permissions | Part 5 of 6',
    desc:     '✅ Create Dataverse forms for each step of a multi-step form component, ✅ Add a Multi-Step Form component to a Power Pages webpage, ✅ Configure and connect each step correctly, ✅ Set up Table Permissions specifically for multi-step form security',
    duration: '03:52',
    topics:   ['Multi-Step Form', 'Configuration', 'Permissions'],
  },
  {
    part:     'Part 6',
    videoId:  'z84s6jBSZhg',
    title:    'Microsoft Power Pages Full Course 2026 | Authentication & Identity Provider Setup | Part 6 of 6',
    desc:     '✅ Authentication overview in Power Pages — how the auth model works end to end, ✅ Understand the difference between local authentication and external identity providers, ✅ Configure an Identity Provider for your Power Pages site, ✅ Connect authenticated users to Dataverse contacts and web roles, ✅ Test the full authentication flow on your completed site',
    duration: '02:26',
    topics:   ['Authentication', 'Identity Provider', 'Login Setup'],
  },
];

const CHANNEL_URL = 'https://www.youtube.com/@learnwith-uzair';
let activeIdx = -1;

// ── Build progress strip ─────────────────────────────
function buildProgressStrip() {
  const strip = document.getElementById('ytProgressStrip');
  VIDEOS.forEach((v, i) => {
    const el = document.createElement('div');
    el.className = 'yt-progress-part';
    el.dataset.idx = i;
    el.innerHTML = `<div class="yt-progress-num">${v.part}</div><div class="yt-progress-lbl">${v.topics[0]}</div>`;
    el.addEventListener('click', () => playVideo(i));
    strip.appendChild(el);
  });
}

// ── Build video grid ─────────────────────────────────
function buildGrid() {
  const grid = document.getElementById('ytGrid');
  VIDEOS.forEach((v, i) => {
    const thumbUrl = v.videoId.startsWith('REPLACE')
      ? null
      : `https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg`;

    const card = document.createElement('div');
    card.className = 'yt-card';
    card.id = `ytCard${i}`;
    card.style.animationDelay = `${i * 0.08}s`;
    card.style.animationPlayState = 'paused';

    card.innerHTML = `
      <div class="yt-thumb">
        ${thumbUrl
          ? `<img src="${thumbUrl}" alt="${escHtml(v.title)}" loading="lazy">`
          : buildThumbPlaceholder(v, i)
        }
        <div class="yt-thumb-overlay">
          <div class="yt-thumb-play"><i class="fas fa-play"></i></div>
        </div>
        <div class="yt-part-badge">${v.part}</div>
        <div class="yt-duration">${v.duration}</div>
      </div>
      <div class="yt-card-body">
        <div class="yt-card-title">${escHtml(v.title)}</div>
        <div class="yt-card-desc">${escHtml(v.desc)}</div>
        <div class="yt-card-meta">
          <div class="yt-card-topics">
            ${v.topics.map(t => `<span class="yt-topic">${escHtml(t)}</span>`).join('')}
          </div>
          <div class="yt-card-watch">Watch <i class="fas fa-arrow-right" style="font-size:10px"></i></div>
        </div>
      </div>`;

    card.addEventListener('click', () => playVideo(i));
    grid.appendChild(card);
  });

  // Scroll reveal
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.yt-card').forEach(c => io.observe(c));
}

function buildThumbPlaceholder(v, i) {
  const colors = ['#ff4444','#7c6af7','#2dd4bf','#f59e0b','#10b981','#38bdf8'];
  const icons  = ['🌐','🎨','🗄️','🔒','📋','⚙️'];
  const c = colors[i % colors.length];
  const ic = icons[i % icons.length];
  return `<div style="position:absolute;inset:0;background:linear-gradient(135deg,${c}18,${c}08);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;">
    <div style="font-size:40px">${ic}</div>
    <div style="font-size:11px;font-weight:700;color:${c};letter-spacing:0.1em;text-transform:uppercase">${v.part}</div>
  </div>`;
}

// ── Play video ───────────────────────────────────────
function playVideo(idx) {
  const v = VIDEOS[idx];
  if (!v) return;

  activeIdx = idx;

  // Update active card
  document.querySelectorAll('.yt-card').forEach((c, i) => {
    c.classList.toggle('active', i === idx);
  });

  // Update progress strip
  document.querySelectorAll('.yt-progress-part').forEach((p, i) => {
    p.classList.toggle('active', i === idx);
  });

  // Scroll player into view
  document.getElementById('ytPlayerRatio').scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Remove placeholder
  const placeholder = document.getElementById('ytPlaceholder');
  if (placeholder) placeholder.remove();

  const ratio = document.getElementById('ytPlayerRatio');

  // If real video ID — embed
  if (!v.videoId.startsWith('REPLACE')) {
    ratio.innerHTML = `<iframe
      src="https://www.youtube.com/embed/${v.videoId}?autoplay=1&rel=0&modestbranding=1"
      title="${escHtml(v.title)}"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen>
    </iframe>`;
  } else {
    // Placeholder video IDs — show stylised "coming" screen
    ratio.innerHTML = `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;background:rgba(0,0,0,0.6);">
      <div style="font-size:48px">🎬</div>
      <div style="font-size:16px;font-weight:700;color:#fff;">${escHtml(v.part)}</div>
      <div style="font-size:13px;color:#8b90a8;max-width:300px;text-align:center">${escHtml(v.title)}</div>
      <a href="${CHANNEL_URL}" target="_blank" style="margin-top:8px;padding:10px 22px;background:#ff4444;color:#fff;border-radius:50px;font-size:13px;font-weight:700;text-decoration:none;">
        Watch on YouTube →
      </a>
    </div>`;
  }

  // Update now-playing bar
  const bar = document.getElementById('ytNowPlaying');
  document.getElementById('ytNowTitle').textContent = v.title;
  document.getElementById('ytNowPart').textContent  = v.part;
  bar.classList.add('visible');
}

function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Init ─────────────────────────────────────────────
buildProgressStrip();
buildGrid();