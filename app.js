const $=s=>document.querySelector(s);
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const maps='https://www.google.com/maps/place/MEGA+GRILL+Streetfood/@51.2647285,7.1420863,17z/data=!4m5!3m4!1s0x47b8d79cd1cedd71:0x589a825911fc539a!8m2!3d51.2647285!4d7.1420863';
document.querySelectorAll('.maps-link').forEach(a=>a.href=maps);
const nav=$('#navigation'),hamburger=$('.hamburger');
function closeNav(){nav.classList.remove('open');hamburger.setAttribute('aria-expanded','false');hamburger.setAttribute('aria-label','Navigation öffnen')}
hamburger.addEventListener('click',()=>{const open=hamburger.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);hamburger.setAttribute('aria-expanded',String(open));hamburger.setAttribute('aria-label',open?'Navigation schließen':'Navigation öffnen')});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeNav()}});window.addEventListener('resize',()=>{if(innerWidth>760)closeNav()});
const data=window.menuData;
const tabs=$('#categories');
const images={'Menüs':['teller','Drehspießteller mit Pommes und Salat'],'Drehspieß':['doener','Drehspieß-Tasche mit Salat und Sauce'],'Pizza':['pizza-salami','Pizza mit Salami'],'Burger':['kueche','Die Küche von Mega Grill'],'Pide':['kueche','Zubereitung bei Mega Grill'],'Calzone':['pizza-doener','Einblick in die Pizza-Auswahl'],'Salate':['teller','Frischer Salat als Beilage zum Teller']};
function el(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e}
function labels(cat,item,parts){if(parts<2)return [''];if(cat==='Pizza')return ['26 cm','29 cm','50 cm'];if(cat==='Drehspieß')return ['Hähnchen','Kalb'];if(cat==='Getränke')return ['0,33 l','1 l'];if(cat==='Salate')return ['Klein','Groß'];if(cat==='Fingerfood')return Number(item.id)>=54?['6 Stück','9 Stück']:['Klein','Groß'];return ['','']}
function selectCategory(index,focus=false){const cat=data[index];tabs.querySelectorAll('button').forEach((b,i)=>{b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1;if(i===index&&focus){b.focus();b.scrollIntoView({block:'nearest',inline:'nearest',behavior:reduced.matches?'instant':'smooth'})}});$('#menu-panel').setAttribute('aria-labelledby','category-'+index);$('#category-title').textContent=cat.name;$('#category-note').textContent=cat.note||'Entdecke die Auswahl und finde deinen nächsten Lieblingsbissen.';$('#menu-heading').textContent=cat.name==='Menüs'?'Unsere Menüs':cat.name;$('#menu-count').textContent=cat.items.length+' '+(cat.name==='Menüs'?'Menüs':'Gerichte');const image=images[cat.name]||['kueche','Blick in die Küche von Mega Grill'];$('#category-image').src='assets/'+image[0]+'.webp';$('#category-image').alt=image[1];const container=$('#menu-items');container.replaceChildren();for(const [i,item] of cat.items.entries()){const parts=item.price.split(' / ');const row=el('article','dish'+(parts.length>1?' multi-price':''));row.style.animationDelay=Math.min(i*.025,.2)+'s';const copy=el('div');const h=el('h4');h.append(el('span','dish-number',item.id),document.createTextNode(item.name));copy.append(h);if(item.description)copy.append(el('p','',item.description));const prices=el('div','dish-prices');parts.forEach((price,j)=>{const p=el('span','price-part');p.append(el('b','',price.includes('*')?'Auf Anfrage':price+' €'));const label=labels(cat.name,item,parts.length)[j];if(label)p.append(el('small','',label));prices.append(p)});row.append(copy,prices);container.append(row)}$('#menu-extra').textContent=cat.name==='Pizza'?'Je weitere Zutat: 1,00 € (26 cm) · 1,50 € (29 cm) · 4,00 € (50 cm)':'';}
data.forEach((cat,i)=>{const b=el('button','',cat.name);b.type='button';b.id='category-'+i;b.setAttribute('role','tab');b.setAttribute('aria-controls','menu-panel');b.append(el('small','',String(cat.items.length)));b.addEventListener('click',()=>selectCategory(i));b.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%data.length;if(e.key==='ArrowLeft')n=(i-1+data.length)%data.length;if(e.key==='Home')n=0;if(e.key==='End')n=data.length-1;if(n!==undefined){e.preventDefault();selectCategory(n,true)}});tabs.append(b)});selectCategory(0);
document.querySelectorAll('[data-category]').forEach(a=>a.addEventListener('click',()=>selectCategory(data.findIndex(c=>c.name===a.dataset.category))));
const reviews=[{name:'Alev Tuğçe ÖZDEMİR',initials:'AÖ',meta:'Local Guide · Google-Rezension',text:'Der Döner war sehr lecker. Die Mitarbeiter waren herzlich und freundlich, das Essen wurde heiß serviert. Wir mussten nicht lange warten. Auch für Familien geeignet.'},{name:'M.S Ö',initials:'MÖ',meta:'Local Guide · Google-Rezension',text:'Das selbstgemachte Fladenbrot war sehr lecker und die Portion Fleisch großzügig. Auch die Pizza war großartig – besonders die mit Hähnchen und Hollandaise. Freundlicher, herzlicher Service.'},{name:'Cumhur Adali',initials:'CA',meta:'Google-Rezension',text:'Herzlicher Service, gutes und vertrauenswürdiges Essen. Die beste Pide mit Käse und Sucuk, die ich in Deutschland gegessen habe.'}];
reviews.push(...[{"name": "Eis Cafe Capri", "initials": "EC", "meta": "Local Guide · Google-Rezension", "text": "Bei der Pizza im Mega Grill in Wuppertal fühlte ich mich wie in Italien. Sie war hervorragend und hatte einen dünnen Teig. Die Atmosphäre war wunderbar – mit freundlichem Service und gutem, vertrauenswürdigem Essen."}, {"name": "Bxer Hati", "initials": "BH", "meta": "Google-Rezension", "text": "Als jemand, der gerne Streetfood probiert, war das eine meiner besten Erfahrungen. Die Menüs sind großzügig und sättigend. Besonders die frisch zubereiteten Teigwaren machen den Laden attraktiv. Auch preislich empfehlenswert."}, {"name": "Musa Gumussoy", "initials": "MG", "meta": "Google-Rezension", "text": "Super Lecker Döner"}, {"name": "Ramazan Er", "initials": "RE", "meta": "Local Guide · Google-Rezension", "text": "Ich kann es nur jedem empfehlen. Ausgezeichnete Speisekarte, super Geschmack. Der Döner und die Pizzen sind ausgezeichnet. Die Atmosphäre ist toll, der Service ist freundlich und schnell."}]);
const track=$('#reviews-track');
// Preserve the reading speed as more reviews join the seamless loop.
track.style.animationDuration = (reviews.length * 16) + 's';
for(let copy=0;copy<2;copy++){
 const group=el('div','review-set');if(copy)group.setAttribute('aria-hidden','true');
 for(const r of reviews){const card=el('article','review-card');const stars=el('span','stars','★★★★★');stars.setAttribute('aria-label','5 von 5 Sternen');const person=el('div','review-card-person');person.append(el('span','avatar',r.initials));const info=el('div');info.append(el('strong','',r.name),el('small','',r.meta));person.append(info);card.append(stars,el('blockquote','','„'+r.text+'“'),person);group.append(card)}track.append(group)
}
if('IntersectionObserver' in window&&!reduced.matches){document.documentElement.classList.add('motion');const obs=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('visible',e.isIntersecting)),{threshold:.06,rootMargin:'0px 0px -20px 0px'});document.querySelectorAll('.reveal').forEach(e=>obs.observe(e))}

// Keep the highlighted day aligned with Wuppertal, including overnight visits.
const berlinWeekday = new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', weekday: 'long' });
function updateOpeningDay() {
 const today = berlinWeekday.format(new Date());
 document.querySelectorAll('.hours-table tbody tr').forEach(row => {
  const active = row.querySelector('th').textContent.trim() === today;
  row.classList.toggle('is-today', active);
  if (active) row.setAttribute('aria-current', 'date');
  else row.removeAttribute('aria-current');
 });
}
updateOpeningDay();
setInterval(updateOpeningDay, 30000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) updateOpeningDay(); });
