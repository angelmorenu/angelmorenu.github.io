// Populate project cards from public GitHub repos
const projects = [
  {
    title: 'Multi-Modal CVD Predictor',
    desc: 'A multi-modal cardiovascular disease risk project combining tabular, imaging, and clinical features to support improved risk stratification and outcome modeling.',
    link: 'https://github.com/angelmorenu/multi-modal-cvd-predictor',
    tech: ['Python', 'Machine Learning', 'Jupyter']
  },
  {
    title: 'Variant Pathogenicity (ESM2)',
    desc: 'Machine learning classification of pathogenic versus benign missense variants using protein language model embeddings and reproducible analysis notebooks.',
    link: 'https://github.com/angelmorenu/egn6933-capstone-variant-pathogenicity-esm2',
    tech: ['Python', 'Bioinformatics', 'ML']
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
    const link = p.link ? `<a class="proj-link" href="${p.link}" target="_blank">Repository ↗</a>` : '';
    el.innerHTML = `<h3>${p.title} ${link}</h3><p>${p.desc}</p><div class="tech-row">${techBadges}</div>`;
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
});