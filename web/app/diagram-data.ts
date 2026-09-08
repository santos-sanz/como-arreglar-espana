export const groups = [
  ['vivienda','Vivienda',260,180,'#b21f48'], ['demografia','Demografía',800,180,'#7547a6'], ['pensiones','Pensiones y finanzas públicas',1360,180,'#9d6600'],
  ['educacion','Educación',230,400,'#267347'], ['empleo','Empleo',690,410,'#b21f48'], ['instituciones','Justicia e instituciones',1130,410,'#2464a2'],
  ['movilidad','Movilidad',230,630,'#2464a2'], ['productividad','Productividad',780,650,'#2464a2'], ['turismo','Turismo',1410,440,'#16776e'],
  ['energia','Energía',230,860,'#137e91'], ['agua','Agua y clima',250,1100,'#267347'], ['innovacion','Ciencia e innovación',800,1080,'#963482'],
  ['sanidad','Sanidad',1400,650,'#b21f48'], ['cuidados','Cuidados',1370,870,'#7547a6'], ['agro','Alimentación y campo',1350,1100,'#a24d16'],
].map(([id,title,_x,_y,color], index)=>{
 const positions: Record<string, number[]> = { vivienda:[330,330],demografia:[1000,330],pensiones:[1670,330],educacion:[300,650],empleo:[940,650],instituciones:[1650,650],movilidad:[330,970],productividad:[1020,970],turismo:[1680,970],energia:[310,1290],agua:[970,1290],sanidad:[1680,1290],innovacion:[330,1610],cuidados:[1000,1610],agro:[1660,1610] };
 const [x,y] = positions[String(id)];
 return {id:String(id),title:String(title),x,y,color:String(color),index};
});
const definitions: Record<string,string[]> = {
 vivienda:['Precio de vivienda','Incentivo a construir','Oferta disponible','Suelo y permisos'], demografia:['Emancipación','Decisiones familiares','Migración','Envejecimiento'], pensiones:['Deuda nominal','Intereses','Déficit','Cotizaciones','Gasto en pensiones'], educacion:['Aprendizaje','Capacidades'], empleo:['Empleo sostenido','Renta del hogar'], instituciones:['Capacidad administrativa','Reglas previsibles','Confianza'], movilidad:['Transporte útil','Acceso a oportunidades'], productividad:['Inversión','Valor por hora','Margen para invertir'], turismo:['Visitantes','Empleo turístico','Presión residencial'], energia:['Renovables','Red y flexibilidad','Energía utilizable'], agua:['Sequía','Disponibilidad de agua','Extracción'], innovacion:['Investigación','Transferencia'], sanidad:['Atención','Salud y autonomía'], cuidados:['Servicios de apoyo','Tiempo disponible'], agro:['Producción agraria','Renta rural']
};
export const nodes = groups.flatMap(g=>definitions[g.id].map((label,i)=>{
 const positions = definitions[g.id].length===2 ? [[-125,15],[125,70]] : [[-165,0],[155,0],[0,100],[-165,150],[160,150]];
 return {id:`${g.id}-${i}`,group:g.id,label,x:g.x+positions[i][0],y:g.y+positions[i][1]};
}));
export type Edge = {from:string;to:string;loop?:string;sign?:string;delay?:boolean};
const rawEdges: Edge[] = [
 ...['vivienda','productividad','pensiones'].flatMap((g,k)=>[{from:`${g}-0`,to:`${g}-1`,loop:['B1','R1','R2'][k],sign:'+',delay:k===1},{from:`${g}-1`,to:`${g}-2`,loop:['B1','R1','R2'][k],sign:'+',delay:k===0},{from:`${g}-2`,to:`${g}-0`,loop:['B1','R1','R2'][k],sign:k===0?'−':'+'}]),
 ...[
 ['vivienda-3','vivienda-2'],['vivienda-2','demografia-0'],['demografia-0','demografia-1'],['demografia-2','empleo-0'],['demografia-2','turismo-2'],['demografia-3','pensiones-4'],['demografia-3','cuidados-0'],['demografia-3','sanidad-0'],['empleo-0','pensiones-3'],['pensiones-3','pensiones-2'],['pensiones-4','pensiones-2'],['empleo-0','empleo-1'],['empleo-1','demografia-0'],['educacion-0','educacion-1'],['educacion-1','empleo-0'],['educacion-1','productividad-1'],['innovacion-0','innovacion-1'],['innovacion-1','productividad-1'],['productividad-2','innovacion-0'],['cuidados-0','cuidados-1'],['cuidados-1','empleo-0'],['sanidad-0','sanidad-1'],['sanidad-1','empleo-0'],['turismo-0','turismo-1'],['turismo-1','empleo-1'],['turismo-0','turismo-2'],['turismo-2','vivienda-0'],['turismo-0','agua-2'],['energia-0','energia-1'],['energia-1','energia-2'],['energia-2','productividad-1'],['energia-2','agro-0'],['agua-0','agua-1'],['agua-1','agro-0'],['agua-2','agua-1'],['agro-0','agro-1'],['movilidad-0','movilidad-1'],['movilidad-1','empleo-0'],['movilidad-1','demografia-0'],['instituciones-0','vivienda-3'],['instituciones-0','cuidados-0'],['instituciones-1','productividad-0'],['instituciones-2','instituciones-0'],['agro-1','demografia-2'],['empleo-1','vivienda-0'],['vivienda-0','movilidad-1'],['innovacion-1','energia-1'],['energia-2','agua-2'],['agua-1','energia-2'],['sanidad-1','cuidados-0'],['cuidados-1','demografia-1'],['educacion-1','innovacion-0'],['instituciones-0','sanidad-0'],['pensiones-2','instituciones-0'],['turismo-0','movilidad-0'],['agro-1','empleo-1'],['productividad-1','empleo-1'],['demografia-2','vivienda-2'],['instituciones-1','innovacion-0'],['energia-0','agro-0'],['movilidad-0','energia-2'],['agua-0','sanidad-0'],['empleo-0','cuidados-1'],['instituciones-2','productividad-0'],['demografia-3','empleo-0'],['agro-0','agua-2'],['turismo-2','demografia-0'],['innovacion-1','sanidad-0'],['vivienda-3','movilidad-0'],['educacion-0','instituciones-2'],['pensiones-4','empleo-1'],['sanidad-1','educacion-0']
 ].map(([from,to])=>({from,to}))
];

// Grey relationships are undirected: a reciprocal duplicate adds no information.
export const edges = rawEdges.filter((e, i, all) => e.loop || all.findIndex(other =>
 !other.loop && [other.from, other.to].sort().join('|') === [e.from, e.to].sort().join('|')) === i)
 .map(e => ({...e, id: e.loop ? `${e.from}->${e.to}` : [e.from,e.to].sort().join('~')}));

export const loopInfo: Record<string, {title:string; note:string; sourceIds:string[]}> = {
 B1: {title:'Respuesta de la oferta', note:'Mecanismo económico simplificado: el incentivo solo se convierte en oferta con suelo, permisos, financiación y tiempo, en lugares con demanda. La reducción de precios es respecto a un escenario comparable.', sourceIds:['S01','S19','S20']},
 R1: {title:'Acumulación productiva', note:'Hipótesis condicionada: invertir debe mejorar capacidades o capital útil; producir más valor debe ampliar el margen, y parte de ese margen debe reinvertirse. No es una garantía de rentabilidad ni de salarios.', sourceIds:['S08','S17','S31']},
 R2: {title:'Deuda e intereses', note:'Mecanismo contable simplificado para el conjunto de administraciones, dado el tipo efectivo y el saldo primario. Se omiten ajustes stock–flujo. La ratio deuda/PIB también depende del crecimiento del denominador.', sourceIds:['S11','S18']}
};

// Stable geometry: highlighting never changes paths or removes relationships.
export function edgeGeometry(e: Edge) {
 const a=nodes.find(n=>n.id===e.from)!, b=nodes.find(n=>n.id===e.to)!;
 const dx=b.x-a.x, dy=b.y-a.y, length=Math.hypot(dx,dy);
 const bend=e.loop ? 80 : (([...e.from+e.to].reduce((s,c)=>s+c.charCodeAt(0),0)%7)-3)*45;
 const cx=(a.x+b.x)/2-dy/length*bend, cy=(a.y+b.y)/2+dx/length*bend;
 const startAngle=Math.atan2(cy-a.y,cx-a.x),endAngle=Math.atan2(b.y-cy,b.x-cx);
 const start={x:a.x+Math.cos(startAngle)*13,y:a.y+Math.sin(startAngle)*13};
 const end={x:b.x-Math.cos(endAngle)*16,y:b.y-Math.sin(endAngle)*16};
 return {path:`M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}`,x:(start.x+2*cx+end.x)/4,y:(start.y+2*cy+end.y)/4};
}
