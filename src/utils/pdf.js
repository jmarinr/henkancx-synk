import jsPDF from 'jspdf';

export async function generateInspectionPDF() {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pad = 36;
  let y = pad;

  const title = 'Reporte de Inspección – HenkanCX Synk';
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(title, pad, y);
  y += 28;

  // Datos básicos
  doc.setFontSize(13);
  doc.text('Datos del sitio', pad, y);
  y += 10;
  doc.setFontSize(11);

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
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, pad, y);
    doc.setFont('helvetica', 'normal');
    doc.text(String(value), pad + 150, y);
  });

  // Separador
  y += 25;
  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.line(pad, y, 560, y);
  y += 25;

  // Placeholder para secciones de formularios
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Resumen de formularios (demo)', pad, y);
  y += 18;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('Los datos detallados de los formularios se incluirán en la siguiente versión.', pad, y);

  // Footer
  doc.setFontSize(10);
  doc.text(`Generado el ${new Date().toLocaleString()}`, pad, 800);

  doc.save('reporte-inspeccion.pdf');
}
