import jsPDF from 'jspdf';

export async function generateInspectionPDF() {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pad = 36;
  let y = pad;

  // Título
  doc.setFont('helvetica', 'bold'); doc.setFontSize(18);
  doc.text('Reporte de Inspección – HenkanCX Synk', pad, y); y += 28;

  // Datos básicos
  doc.setFont('helvetica', 'bold'); doc.setFontSize(13);
  doc.text('Datos del sitio', pad, y); y += 10;
  doc.setFont('helvetica', 'normal'); doc.setFontSize(11);

  const basic = JSON.parse(localStorage.getItem('basicInfo') || '{}');
  const techName = localStorage.getItem('technicianName') || '';
  const techId = localStorage.getItem('technicianId') || '';

  const rows = [
    ['Sitio', basic.siteName || ''],
    ['ID del sitio', basic.siteId || ''],
    ['Fecha programada', basic.scheduledDate || ''],
    ['Ejecutada', basic.executedDateTime || ''],
    ['Coordenadas', basic.coords || ''],
    ['Ingeniero responsable', basic.engineer || ''],
    ['Orden de trabajo (OT)', basic.workOrder || ''],
    ['Proveedor/Empresa', basic.provider || ''],
    ['Vehículo', `${basic.vehicleMake || ''} ${basic.vehicleModel || ''} (${basic.vehiclePlate || ''})`],
    ['Técnico', `${techName} (${techId})`],
  ];

  rows.forEach(([label, value]) => {
    y += 18;
    doc.setFont('helvetica', 'bold'); doc.text(`${label}:`, pad, y);
    doc.setFont('helvetica', 'normal'); doc.text(String(value), pad + 150, y);
  });

  // Separador
  y += 25; doc.setDrawColor(0); doc.setLineWidth(0.5); doc.line(pad, y, 560, y); y += 25;

  // Resumen de formularios (puedes ir trayendo cada estado guardado)
  doc.setFont('helvetica', 'bold'); doc.setFontSize(13);
  doc.text('Resumen de formularios', pad, y); y += 18;
  doc.setFont('helvetica', 'normal'); doc.setFontSize(11);

  // Ejemplo: Preventive Maintenance
  const pm = JSON.parse(localStorage.getItem('pmData') || '{}');
  doc.text(`Mantenimiento preventivo:`, pad, y); y += 16;
  doc.text(`• Generador en buen estado: ${pm.generatorOk || '-'}`, pad + 12, y); y += 16;
  doc.text(`• Baterías en buen estado: ${pm.batteriesOk || '-'}`, pad + 12, y); y += 16;
  if (pm.observations) { doc.text(`• Observaciones: ${pm.observations}`, pad + 12, y); y += 16; }

  // Footer
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
  doc.text(`Generado el ${new Date().toLocaleString()}`, pad, 800);

  doc.save('reporte-inspeccion.pdf');
}
