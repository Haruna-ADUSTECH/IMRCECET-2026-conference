const drawer=document.getElementById('drawer');
const backdrop=document.getElementById('backdrop');
const openMenu=document.getElementById('openMenu');
const closeMenu=document.getElementById('closeMenu');
const navLinks=[...document.querySelectorAll('.nav a')];

function openDrawer(){drawer.classList.add('open');backdrop.classList.add('show');drawer.setAttribute('aria-hidden','false');openMenu.setAttribute('aria-expanded','true');document.body.classList.add('drawer-open');}
function closeDrawer(){drawer.classList.remove('open');backdrop.classList.remove('show');drawer.setAttribute('aria-hidden','true');openMenu.setAttribute('aria-expanded','false');document.body.classList.remove('drawer-open');}
openMenu.addEventListener('click',openDrawer);closeMenu.addEventListener('click',closeDrawer);backdrop.addEventListener('click',closeDrawer);
navLinks.forEach(link=>link.addEventListener('click',closeDrawer));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawer();});

const sections=[...document.querySelectorAll('main section[id], footer[id]')];
const linkMap=new Map(navLinks.map(a=>[a.getAttribute('href').slice(1),a]));
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.remove('active'));const link=linkMap.get(entry.target.id);if(link)link.classList.add('active');const index=sections.indexOf(entry.target);if(index>=0)document.getElementById('pageNo').textContent=String(index+1).padStart(2,'0');}})},{rootMargin:'-35% 0px -55% 0px',threshold:0});
sections.forEach(s=>observer.observe(s));

const progress=document.getElementById('progress');
function updateScroll(){const h=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(h>0?(window.scrollY/h)*100:0)+'%';document.getElementById('toTop').classList.toggle('show',window.scrollY>700);}
window.addEventListener('scroll',updateScroll,{passive:true});updateScroll();

document.getElementById('toTop').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const revealTargets=document.querySelectorAll('.section > *, .feature-grid article, .session-grid > div, .paper-grid article, .timeline > div, .hotel-grid article, .guideline-grid > div, .host-card, .speaker-placeholder');
revealTargets.forEach(el=>el.classList.add('reveal'));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.08});
revealTargets.forEach(el=>revealObserver.observe(el));
