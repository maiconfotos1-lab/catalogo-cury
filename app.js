
const d=CATALOG_DATA, qs=s=>document.querySelector(s);
const grid=qs("#grid"), search=qs("#search");
let region="Todos";

function render(){
 const term=(search.value||"").toLowerCase();
 const list=d.projects.filter(p=>(region==="Todos"||p.region===region)&&
   (p.name+" "+p.region+" "+p.address+" "+p.bedrooms).toLowerCase().includes(term));
 grid.innerHTML=list.map(p=>`
 <article class="card">
   <div class="visual"><span>${p.status}</span></div>
   <div class="body">
    <h3>${p.name}</h3>
    <div class="meta">📍 ${p.address}<br>🏠 ${p.bedrooms}</div>
    <div class="tags">${p.features.slice(0,5).map(x=>`<span class="tag">${x}</span>`).join("")}</div>
    <a class="btn" href="?empreendimento=${p.slug}">Ver detalhes</a>
   </div>
 </article>`).join("") || "<p>Nenhum empreendimento encontrado.</p>";
}
function detail(){
 const slug=new URLSearchParams(location.search).get("empreendimento");
 if(!slug) return;
 const p=d.projects.find(x=>x.slug===slug); if(!p)return;
 qs("#catalog").innerHTML=`<main class="detail">
 <a class="back" href="./">← Voltar ao catálogo</a>
 <div class="brand">CURY • CATÁLOGO RIO DE JANEIRO</div>
 <h1>${p.name}</h1><p class="meta">${p.status} · ${p.region}</p>
 <p>${p.description}</p>
 <h2>Informações</h2>
 <div class="feature-grid">
  <div class="feature"><b>📍 Localização</b><br>${p.address}</div>
  <div class="feature"><b>🏠 Tipologia</b><br>${p.bedrooms}</div>
  <div class="feature"><b>🏗️ Status</b><br>${p.status}</div>
 </div>
 <h2>Estrutura e diferenciais</h2>
 <div class="tags">${p.features.map(x=>`<span class="tag">${x}</span>`).join("")}</div>
 <a class="whats" target="_blank" href="https://wa.me/${d.broker.phone}?text=${encodeURIComponent("Olá Maicon! Quero saber mais sobre "+p.name+".") }">Falar com Maicon no WhatsApp</a>
 <p class="meta" style="margin-top:20px">Informações oficiais do empreendimento: <a href="${p.url}" target="_blank" style="text-decoration:underline">ver página da Cury</a></p>
 </main>`;
}
qs("#broker").textContent=d.broker.name; qs("#phone").textContent=d.broker.displayPhone;
["Todos",...new Set(d.projects.map(p=>p.region))].forEach(r=>{
 const b=document.createElement("button");b.textContent=r;b.className=r==="Todos"?"active":"";
 b.onclick=()=>{region=r;document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");render()};qs("#filters").appendChild(b);
});
search.addEventListener("input",render); render(); detail();
