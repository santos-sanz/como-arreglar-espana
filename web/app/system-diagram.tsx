'use client';

import { useRef, useState } from 'react';
import { edges, edgeGeometry, groups, loopInfo, nodes } from './diagram-data';
import sources from './sources.json';
import subsystems from './subsystems.json';

const svgStyles = `
.sd-paper{fill:#fffdf5}.sd-title{font:700 42px Georgia,serif;fill:#152e52}
.sd-subtitle{font:22px system-ui;fill:#354b67}.sd-group{cursor:pointer}
.sd-group:focus-visible ellipse{stroke-width:5;stroke:#142d54}
.sd-group-title{font:700 23px Georgia,serif;fill:#152e52;pointer-events:none}
.sd-node{pointer-events:none}.sd-node text{pointer-events:auto;cursor:text;font:21px system-ui;fill:#152e52;paint-order:stroke;stroke:#fffdf5;stroke-width:5;stroke-linejoin:round;user-select:text}
.sd-edge{fill:none;stroke:#60748c;stroke-width:2;opacity:.65;stroke-dasharray:5 5;cursor:pointer}
.sd-edge.loop{stroke-width:4;opacity:1;stroke-dasharray:none}
.sd-edge.muted{opacity:.14}.sd-edge.selected{stroke-width:6;opacity:1}
.sd-edge-hit{fill:none;stroke:transparent;stroke-width:16;cursor:pointer}
.sd-sign{font:700 24px system-ui;fill:#152e52;paint-order:stroke;stroke:#fffdf5;stroke-width:8;stroke-linejoin:round;pointer-events:none}
.sd-loop-name{font:700 20px system-ui;fill:#152e52;pointer-events:none}
`;
function wrap(label: string) {
  return label.split(' ').reduce<string[]>((lines, word) => {
    const last=lines.length-1;
    if (last<0 || `${lines[last]} ${word}`.length>21) lines.push(word);
    else lines[last]+=` ${word}`;
    return lines;
  }, []);
}

export default function SystemDiagram() {
  const [zoom,setZoom]=useState(100);
  const [active,setActive]=useState('');
  const [selected,setSelected]=useState('');
  const svgRef=useRef<SVGSVGElement>(null);
  const viewportRef=useRef<HTMLDivElement>(null);
  const selectedEdge=edges.find(e=>e.id===selected);
  const nodeById=(id:string)=>nodes.find(n=>n.id===id)!;
  const relationName=(e:typeof edges[number])=>`${nodeById(e.from).label} ${e.loop?'→':'—'} ${nodeById(e.to).label}`;
  const relevant=(e:typeof edges[number])=>!active || nodeById(e.from).group===active || nodeById(e.to).group===active;
  const chooseGroup=(id:string)=>{setActive(active===id?'':id);setSelected('');};
  const contextIds=selectedEdge ? (selectedEdge.loop ? loopInfo[selectedEdge.loop].sourceIds : [...new Set([selectedEdge.from,selectedEdge.to].flatMap(id=>subsystems.find(s=>s.id===nodeById(id).group)!.sourceIds))]) : [];
  function download() {
    const clone=svgRef.current!.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('xmlns','http://www.w3.org/2000/svg');
    clone.setAttribute('width','2000'); clone.setAttribute('height','1900'); clone.removeAttribute('style');
    clone.querySelectorAll('.muted,.selected').forEach(el=>{el.classList.remove('muted','selected');});
    const url=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)],{type:'image/svg+xml;charset=utf-8'}));
    const link=document.createElement('a');link.href=url;link.download='espana-sistema.svg';link.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  return <section id="diagrama" className="system-diagram" data-diagram-version="rigorous-svg-v1" aria-labelledby="diagram-title">
    <div className="section-top"><h2 id="diagram-title">España · Anatomía de un sistema</h2><p>{groups.length} subsistemas · {nodes.length} variables · {edges.length} relaciones</p></div>
    <p>La red completa permanece visible. Selecciona un subsistema para seguir sus conexiones, o una relación para consultar su interpretación y sus límites.</p>
    <div className="diagram-tools">
      <label>Resaltar subsistema <select aria-label="Resaltar subsistema" value={active} onChange={e=>{setActive(e.target.value);setSelected('');}}><option value="">Toda la red</option>{groups.map(g=><option key={g.id} value={g.id}>{g.title}</option>)}</select></label>
      {[100,150,200].map(value=><button type="button" key={value} aria-pressed={zoom===value} onClick={()=>{setZoom(value);if(value===100)viewportRef.current?.scrollTo(0,0);}}>{value===100?'Ajustar':`${value} %`}</button>)}
      <button type="button" onClick={()=>{setActive('');setSelected('');}}>Restablecer resaltado</button>
      <button type="button" onClick={download}>Descargar SVG</button>
    </div>
    <figure>
      <div ref={viewportRef} className="diagram-native-viewport" tabIndex={0} role="region" aria-label="Mapa de interdependencias: área desplazable">
        <svg ref={svgRef} className="native-diagram rigorous-diagram" viewBox="0 0 2000 1900" role="group" aria-labelledby="svg-title svg-description" style={{width:`${zoom}%`,maxWidth:'none'}}>
          <title id="svg-title">España: mapa de interdependencias</title>
          <desc id="svg-description">Los tres bucles dirigidos representan mecanismos simplificados. Las relaciones discontinuas son hipótesis editoriales sin dirección ni efecto estimados. Las fuentes se consultan con el selector de relaciones.</desc>
          <style>{svgStyles}</style>
          <defs>{groups.filter(g=>['vivienda','productividad','pensiones'].includes(g.id)).map(g=><marker key={g.id} id={`sd-arrow-${g.id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill={g.color}/></marker>)}</defs>
          <rect width="2000" height="1900" className="sd-paper"/>
          <path d="M70 35H1930" stroke="#b21f48" strokeWidth="14"/><path d="M70 47H1930" stroke="#edbf45" strokeWidth="8"/>
          <text x="1000" y="120" textAnchor="middle" className="sd-title">ESPAÑA · ANATOMÍA DE UN SISTEMA</text>
          <text x="1000" y="165" textAnchor="middle" className="sd-subtitle">Decisiones conectadas · relaciones cualitativas y bucles condicionados</text>
          {groups.map(g=><g key={g.id} className="sd-group" role="button" tabIndex={0} aria-label={`Resaltar ${g.title}`} aria-pressed={active===g.id} onClick={()=>chooseGroup(g.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();chooseGroup(g.id);}}}>
            <ellipse cx={g.x} cy={g.y+55} rx="290" ry="140" fill={g.color} fillOpacity={active === g.id ? .16 : .06} stroke={g.color} strokeWidth={active===g.id?4:1.5}/>
            <text x={g.x} y={g.y-60} textAnchor="middle" className="sd-group-title">{g.title}</text>
          </g>)}
          <g className="diagram-edges">{edges.map(e=>{
            const geometry=edgeGeometry(e),g=groups.find(g=>g.id===nodeById(e.from).group)!;
            return <g key={e.id} data-edge-id={e.id}>
              <path d={geometry.path} data-relation={e.loop?'mechanism':'hypothesis'} className={`sd-edge ${e.loop?'loop':''} ${!relevant(e)?'muted':''} ${selected===e.id?'selected':''}`} stroke={e.loop?g.color:undefined} style={e.loop?{stroke:g.color}:undefined} markerEnd={e.loop?`url(#sd-arrow-${g.id})`:undefined}/>
              <path className="sd-edge-hit" d={geometry.path} onClick={()=>setSelected(e.id)}><title>{`${relationName(e)} · ${e.loop?`${e.loop}, ${e.sign}${e.delay?', con retardo':''}`:'Hipótesis editorial'}`}</title></path>
              {e.loop&&<text className="sd-sign" x={geometry.x} y={geometry.y-10} textAnchor="middle">{e.sign}{e.delay?' //':''}</text>}
            </g>;
          })}</g>
          {nodes.map(n=>{const lines=wrap(n.label);return <g key={n.id} className="sd-node" data-node-id={n.id}><circle cx={n.x} cy={n.y} r="10" fill={groups.find(g=>g.id===n.group)!.color}/><text x={n.x} y={n.y-22-(lines.length-1)*24} textAnchor="middle">{lines.map((line,i)=><tspan key={line} x={n.x} dy={i?24:0}>{line}</tspan>)}</text></g>;})}
          {Object.entries(loopInfo).map(([id,info])=>{const g=groups.find(g=>g.id==={B1:'vivienda',R1:'productividad',R2:'pensiones'}[id as 'B1'|'R1'|'R2'])!;return <text key={id} className="sd-loop-name" x={g.x} y={g.y+215} textAnchor="middle">{id} · {info.title}</text>;})}
          <text x="1000" y="1855" textAnchor="middle" className="sd-subtitle">+ misma dirección · − dirección contraria · // retardo · R refuerzo · B equilibrio</text>
          <text x="1000" y="1888" textAnchor="middle" className="sd-subtitle">Línea discontinua: hipótesis sin dirección causal estimada. La posición y el grosor no miden importancia.</text>
        </svg>
      </div>
      <figcaption>El resaltado cambia el énfasis, nunca la geometría ni el número de conexiones. Las relaciones cualitativas se conservan como hipótesis a contrastar; la densidad no prueba exactitud causal.</figcaption>
    </figure>
    <div className="diagram-inspector">
      <label htmlFor="diagram-relation">Consultar una relación</label>
      <select id="diagram-relation" value={selected} onChange={e=>setSelected(e.target.value)}><option value="">Selecciona una relación o pulsa una línea</option>{edges.map(e=><option key={e.id} value={e.id}>{relationName(e)}{e.loop?` · ${e.loop}`:' · hipótesis'}</option>)}</select>
      <div aria-live="polite">{selectedEdge ? <>
        <h3>{relationName(selectedEdge)}</h3>
        <p>{selectedEdge.loop?`${selectedEdge.loop} · Signo ${selectedEdge.sign}${selectedEdge.delay?' · Con retardo':''}. ${loopInfo[selectedEdge.loop].note}`:'Hipótesis editorial conservada del mapa. No se asigna dirección, signo, magnitud ni probabilidad. Para validarla hacen falta variables operativas, un periodo, un territorio y evidencia que separe el mecanismo de otras explicaciones.'}</p>
        <p>Fuentes de contexto de los ámbitos implicados; no constituyen por sí solas una estimación causal de esta conexión:</p>
        <ul>{contextIds.map(id=>{const s=sources.find(s=>s.id===id)!;return <li key={id}><a href={s.url}>{id} · {s.title} ↗</a></li>;})}</ul>
      </>:<p>Los mecanismos B1, R1 y R2 tienen signos explícitos y supuestos. El resto son relaciones cualitativas; puedes revisar cada una sin perder la red completa.</p>}</div>
    </div>
    <div className="diagram-loops">{Object.entries(loopInfo).map(([id,loop])=><article key={id}><h3>{id} · {loop.title}</h3><p>{loop.note}</p></article>)}</div>
    <p className="diagram-reference"><a href="https://github.com/santos-sanz/como-arreglar-espana/blob/main/docs/revision-diagrama.md">Método, revisión y limitaciones ↗</a> · <a href="#mapa">Explorar las fichas de subsistemas ↑</a></p>
  </section>;
}
