import jsPDF from 'jspdf';

// Generación básica; puedes extender con datos/fotos de cada formulario
export async function generateInspectionPDF() {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pad = 36;
  let y = pad;

  const title = 'Reporte de Inspección – HenkanCX Synk';
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(title, pad, y);
  y += 20;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);

  const basicRaw = localStorage.getItem('basicInfo') || '{}';
  const basic = JSON.parse(basicRaw || '{}');

  const techName = localStorage.getItem('technicianName') || '';
  const techId = localStorage.getItem('technicianId') || '';

  const lines = [
    `Sitio: ${basic.siteName || ''}`,
    `ID: ${basic.siteId || ''}`,
    `Fecha programada: ${basic.scheduledDate || ''}`,
    `Ejecutada: ${basic.executedDateTime || ''}`,
    `Coordenadas: ${basic.coords || ''}`,
    `Ingeniero: ${basic.engineer || ''}`,
    `OT: ${basic.workOrder || ''}`,
    `Proveedor: ${basic.provider || ''}`,
    `Vehículo: ${basic.vehicleMake || ''} ${basic.vehicleModel || ''} ${basic.vehiclePlate || ''}`,
    `Técnico: ${techName} (${techId})`
  ];

  lines.forEach((t) => { doc.text(t, pad, y); y += 16; });

  doc.addPage();
  doc.text('Formularios (resumen)', pad, pad);

  // TODO: traer y renderizar datos/fotos de cada formulario (pmData, etc.)
  // Para imágenes: doc.addImage(dataURL, 'JPEG', x, y, w, h)

  doc.save('inspeccion.pdf');
}
