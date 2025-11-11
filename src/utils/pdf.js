import jsPDF from 'jspdf';

/**
 * Genera el PDF de la inspección leyendo la información guardada en localStorage.
 * Secciones:
 *  - Encabezado
 *  - Datos del sitio (incluye vehículo e identificación del técnico)
 *  - Resumen de cada formulario (preventivo, tierras, torre, inventario, mantenimiento sitio)
 *  - Footer con fecha/hora
 */
export async function generateInspectionPDF() {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const M = 36;              // margen
  const PAGE_W = 595.28;     // ancho a4 pt
  const RIGHT = PAGE_W - M;
  let y = M;

  // Helpers
  const line = () => { doc.setDrawColor(200); doc.line(M, y, RIGHT, y); y += 14; };
  const space = (h = 10) => { y += h; };
  const label = (t) => { doc.setFont('helvetica', 'bold'); doc.setFontSize(12); doc.text(String(t), M, y); };
  const text = (t, x = M) => { doc.setFont('helvetica', 'normal'); doc.setFontSize(11); doc.text(String(t ?? '—'), x, y); };
  const kv = (k, v) => { label(`${k}:`); text(v, M + 160); y += 18; checkPage(); };
  const title = (t) => { doc.setFont('helvetica', 'bold'); doc.setFontSize(18); doc.text(t, M, y); y += 26; };
  const subtitle = (t) => { doc.setFont('helvetica', 'bold'); doc.setFontSize(13); doc.text(t, M, y); y += 14; };
  const checkPage = () => {
    if (y > 790) {
      doc.addPage();
      y = M;
    }
  };

  // ---- Datos desde localStorage
  const get = (k) => { try { return JSON.parse(localStorage.getItem(k) || '{}'); } catch { return {}; } };
  const basic   = get('basicInfo');
  const pm      = get('pmData');
  const ground  = get('groundData');
  const tower   = get('towerData');
  const inv     = get('inventoryData');
  const sitepm  = get('sitepmData');

  const techName = localStorage.getItem('technicianName') || '';
  const techId   = localStorage.getItem('technicianId') || '';

  // ---- Encabezado
  title('Reporte de Inspección – HenkanCX Synk');

  // ---- Datos del sitio
  subtitle('Datos del sitio');
  kv('Nombre del Sitio', basic.siteName);
  kv('ID del Sitio', basic.siteId);
  kv('Fecha programada', basic.scheduledDate);
  kv('Fecha y hora ejecutada', basic.executedDateTime);
  kv('Coordenadas', basic.coords);
  kv('Ingeniero responsable', basic.engineer);
  kv('# Orden de trabajo (OT)', basic.workOrder);
  kv('Proveedor / Empresa', basic.provider);
  kv('Vehículo', `${basic.vehicleMake || ''} ${basic.vehicleModel || ''}${basic.vehiclePlate ? ` (${basic.vehiclePlate})` : ''}`.trim());
  kv('Técnico', `${techName}${techId ? ` (${techId})` : ''}`);

  space(6); line(); space(2);

  // ---- Mantenimiento preventivo
  subtitle('1) Mantenimiento preventivo (Generador/Baterías)');
  kv('Generador OK', pm.generatorOk);
  kv('Baterías OK', pm.batteriesOk);
  kv('Nivel de aceite OK', pm.oilLevelOk);
  kv('Nivel de refrigerante OK', pm.coolantLevelOk);
  if (pm.observations) { kv('Observaciones', pm.observations); }

  space(6); line(); space(2);

  // ---- Sistema de tierras
  subtitle('2) Medición de sistema de tierras');
  kv('Resistencia puesta a tierra (Ω)', ground.earthingOhms);
  kv('Método', ground.method);
  if (ground.observations) { kv('Observaciones', ground.observations); }

  space(6); line(); space(2);

  // ---- Infraestructura de torre
  subtitle('3) Infraestructura de torre');
  kv('Estado de la torre', tower.towerStatus);
  kv('Accesos / escaleras', tower.accessStatus);
  if (tower.observations) { kv('Observaciones', tower.observations); }

  space(6); line(); space(2);

  // ---- Inventario (resumen)
  subtitle('4) Inventario de equipos (resumen)');
  if (inv) {
    kv('Observaciones', inv.observations);
    // Muestra primeras 5 filas presentes
    for (let i = 1, shown = 0; i <= 10 && shown < 5; i++) {
      const name = inv[`row${i}_name`];
      const brand = inv[`row${i}_brand`];
      const model = inv[`row${i}_model`];
      const serial = inv[`row${i}_serial`];
      const qty = inv[`row${i}_qty`];
      if (name || brand || model || serial || qty) {
        label(`• ${name || 'Equipo'}`); text(`Marca: ${brand || '—'} | Modelo: ${model || '—'} | Serie: ${serial || '—'} | Cant.: ${qty || '—'}`, M + 16);
        y += 18; checkPage();
        shown++;
      }
    }
  }

  space(6); line(); space(2);

  // ---- Mantenimiento general del sitio
  subtitle('5) Mantenimiento general del sitio');
  kv('Perímetro / cercas', sitepm.fenceStatus);
  kv('Accesos / caminos', sitepm.roadStatus);
  kv('Limpieza', sitepm.cleanliness);
  kv('Señalización / seguridad', sitepm.signage);
  if (sitepm.observations) { kv('Observaciones', sitepm.observations); }

  // ---- Footer
  y = 820;
  doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
  doc.text(`Generado el ${new Date().toLocaleString()}`, M, y);
  doc.text('HenkanCX Synk', RIGHT - 100, y, { align: 'right' });

  // Guardar
  doc.save('reporte-inspeccion.pdf');
}
