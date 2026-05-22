// Populate project cards from public GitHub repos
const projects = [
  {
    title: 'Capstone Report: Pathogenic vs. Benign Missense Variants',
    desc: 'Machine learning classification of pathogenic versus benign missense variants using protein language model embeddings and reproducible analysis notebooks.',
    links: [
      { href: 'docs/Morenu_EGN6933_FinalReport.pdf', label: 'Report ↗' },
      { href: 'https://github.com/angelmorenu/egn6933-capstone-variant-pathogenicity-esm2', label: 'Repository ↗' }
    ],
    tech: ['Python', 'Bioinformatics', 'Protein Language Models', 'Genomics', 'ML']
  },
  {
    title: 'Multi-Modal CVD Predictor',
    desc: 'A multi-modal cardiovascular disease risk project combining tabular, imaging, and clinical features to support improved risk stratification and outcome modeling.',
    link: 'https://github.com/angelmorenu/multi-modal-cvd-predictor',
    tech: ['Python', 'Machine Learning', 'Jupyter']
  },
  {
    title: 'Transformer Regulatory DNA',
    desc: 'Evaluation of transformer models against CNN baselines for regulatory genomics tasks such as functional element classification and variant impact prediction.',
    link: 'https://github.com/angelmorenu/transformer-regulatory-dna',
    tech: ['Python', 'Deep Learning', 'Genomics']
  },
  {
    title: 'Global Religious Demographics',
    desc: 'Explores global religious demographics using Kaggle datasets with data preprocessing, exploratory analysis, and visual storytelling.',
    link: 'https://github.com/angelmorenu/cap5771sp25-project',
    tech: ['Python', 'EDA', 'Visualization']
  },
  {
    title: 'Additional Reproducible Notebooks',
    desc: 'Additional Jupyter notebooks and reproducible analyses covering model evaluation, data cleaning, and domain-specific pipelines.',
    link: 'https://github.com/angelmorenu?tab=repositories',
    tech: ['Jupyter', 'Scripts']
  }
];

function renderProjects(){
  const grid = document.getElementById('projects-grid');
  if(!grid) return;
  projects.forEach(p=>{
    const el = document.createElement('div');
    el.className = 'project';
    const techBadges = (p.tech||[]).map(t=>`<span class="tech">${t}</span>`).join(' ');
    const links = p.links
      ? p.links.map(link => `<a class="proj-link" href="${link.href}" target="_blank" rel="noopener">${link.label}</a>`).join(' ')
      : (p.link ? `<a class="proj-link" href="${p.link}" target="_blank" rel="noopener">${p.linkLabel || 'Repository ↗'}</a>` : '');
    el.innerHTML = `<h3>${p.title}${links ? ' ' + links : ''}</h3><p>${p.desc}</p><div class="tech-row">${techBadges}</div>`;
    grid.appendChild(el);
  });
}

window.addEventListener('DOMContentLoaded', ()=>{
  renderProjects();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click', e=>{
      const target = document.querySelector(anchor.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Headshot handling: add a body class when the visible profile image is present
  const headshot = document.querySelector('.headshot');
  if(headshot){
    try{
      if(headshot.complete && headshot.naturalWidth > 0){
        document.body.classList.add('has-headshot');
      } else {
        headshot.addEventListener('load', ()=> document.body.classList.add('has-headshot'));
      }
    }catch(e){
      // defensive: ignore any errors related to image detection
    }
  }

  // Tab navigation: show/hide panels and sync with URL hash
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  function showPanel(name, pushState=true){
    panels.forEach(p=>{ p.hidden = p.id !== name });
    tabButtons.forEach(b=> b.classList.toggle('is-active', b.dataset.tab === name));
    if(pushState){
      history.replaceState(null, '', '#'+name);
    }
  }

  tabButtons.forEach(btn=>{
    btn.addEventListener('click', ()=> showPanel(btn.dataset.tab));
  });

  // On load, honor hash or default to home/about sections (home = visible main content)
  const hash = location.hash ? location.hash.replace('#','') : '';
  if(hash){
    // if the hash corresponds to a panel, show it
    const panel = document.getElementById(hash);
    if(panel) showPanel(hash, false);
  }

  // Contact form: only intercept submit and open mail client when no external action is provided.
  const contactForm = document.getElementById('contact-form');
  if(contactForm){
    const action = (contactForm.getAttribute('action') || '').trim();

    // If the form posts to Formspree, submit via fetch to keep the user on-page
    if(action && action.includes('formspree.io')){
      contactForm.addEventListener('submit', async (e)=>{
        e.preventDefault();
        const statusEl = document.getElementById('form-status');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if(submitBtn) submitBtn.disabled = true;
        if(statusEl) statusEl.textContent = 'Sending…';

        try{
          const formData = new FormData(contactForm);
          const res = await fetch(action, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: formData
          });

          if(res.ok){
            if(statusEl) statusEl.textContent = 'Thanks — message sent!';
            contactForm.reset();
          } else {
            // Try to parse error details from JSON response
            let msg = 'Submission failed. Please try again.';
            try{ const data = await res.json(); if(data && data.error) msg = data.error; }catch(_){ }
            if(statusEl) statusEl.textContent = msg;
          }
        }catch(err){
          if(statusEl) statusEl.textContent = 'Network error. Please try again.';
        }finally{
          if(submitBtn) submitBtn.disabled = false;
          // Clear status after a while
          setTimeout(()=>{ if(statusEl) statusEl.textContent = ''; }, 5000);
        }
      });

    } else if(!action || action.toLowerCase().startsWith('mailto:')){
      // If there's no action or action indicates mailto, use the old mailto handler.
      contactForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const form = new FormData(contactForm);
        const to = 'angelhdbaez@gmail.com';
        const subject = encodeURIComponent(form.get('subject') || 'Message from portfolio');
        const bodyLines = [];
        bodyLines.push('Name: ' + (form.get('name')||''));
        bodyLines.push('Email: ' + (form.get('email')||''));
        bodyLines.push('');
        bodyLines.push(form.get('message')||'');
        const body = encodeURIComponent(bodyLines.join('\n'));
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      });
    }
    // Otherwise: action exists and is not Formspree — allow normal browser submission (e.g., other backends)
  }
});