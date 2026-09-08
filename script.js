const projects = [
  {
    title: 'Genetic Variant Classification',
    desc: 'An end-to-end Python and SQL workflow for classifying pathogenic versus benign missense variants with reproducible evaluation and technical documentation.',
    links: [{ href: 'docs/Morenu_EGN6933_FinalReport.pdf', label: 'Report ↗' }, { href: 'https://github.com/angelmorenu/egn6933-capstone-variant-pathogenicity-esm2', label: 'Repository ↗' }],
    tech: ['Python', 'SQL', 'Genomics', 'ML']
  },
  {
    title: 'Transformer Regulatory DNA',
    desc: 'Evaluation of transformer models against CNN baselines for regulatory genomics tasks, including functional element classification and variant impact prediction.',
    link: 'https://github.com/angelmorenu/transformer-regulatory-dna',
    tech: ['Python', 'Deep Learning', 'Bioinformatics']
  },
  {
    title: 'Multi-Modal CVD Predictor',
    desc: 'A cardiovascular disease risk project comparing tabular, imaging, and clinical features to explore interpretable risk stratification.',
    link: 'https://github.com/angelmorenu/multi-modal-cvd-predictor',
    tech: ['Python', 'Machine Learning', 'Jupyter']
  },
  {
    title: 'Global Sensitivity & Uncertainty Analysis',
    desc: 'Morris screening of a sediment particle-size model, with two-phase sensitivity runs and decision-focused interpretation of uncertainty.',
    link: 'docs/Morenu_GSUA_d50_report.pdf',
    linkLabel: 'Report ↗',
    tech: ['Python', 'Sensitivity Analysis', 'UQ']
  },
  {
    title: 'NOAA Hurricane Predictions',
    desc: 'A reproducible analysis of historical tropical cyclone data with cleaning, geospatial and temporal visualization, classification, and SARIMAX forecasting.',
    link: 'docs/Group4_EGN5442_Project_Report.pdf',
    linkLabel: 'Report ↗',
    tech: ['Python', 'Forecasting', 'Geospatial']
  },
  {
    title: 'Global Religious Demographics',
    desc: 'Exploration of demographic datasets through preprocessing, statistical analysis, classification, and visual storytelling.',
    link: 'https://github.com/angelmorenu/cap5771sp25-project',
    tech: ['Python', 'EDA', 'Visualization']
  }
];

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = projects.map((project) => {
    const links = project.links
      ? project.links.map((link) => `<a class="proj-link" href="${link.href}" target="_blank" rel="noopener">${link.label}</a>`).join(' ')
      : `<a class="proj-link" href="${project.link}" target="_blank" rel="noopener">${project.linkLabel || 'Repository ↗'}</a>`;
    const tech = project.tech.map((item) => `<span class="tech">${item}</span>`).join('');
    return `<article class="project"><h3>${project.title} ${links}</h3><p>${project.desc}</p><div class="tech-row">${tech}</div></article>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
});
