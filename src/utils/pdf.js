import jsPDF from 'jspdf';

export const generatePDF = (data) => {
  const { otId, sitio, cliente, tecnico, ubicacion, observaciones, iaResult, photos, firma, nombreCliente } = data;

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  let yPos = 20;

  // Header
  pdf.setFillColor(0, 0, 0);
  pdf.rect(0, 0, pageWidth, 30, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('HenkanCX Synk', 15, 18);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Orden de Trabajo', 15, 25);

  yPos = 40;
  pdf.setTextColor(0, 0, 0);

  // Información básica
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`OT: ${otId}`, 15, yPos);
  yPos += 10;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  
  const info = [
    ['Sitio', sitio || 'N/A'],
    ['Cliente', cliente || 'N/A'],
    ['Técnico', tecnico],
    ['Fecha', new Date().toLocaleDateString('es-ES')],
  ];

  info.forEach(([label, value]) => {
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${label}: `, 15, yPos);
    pdf.setFont('helvetica', 'normal');
    pdf.text(value, 40, yPos);
    yPos += 6;
  });

  if (ubicacion) {
    yPos += 3;
    pdf.setFont('helvetica', 'bold');
    pdf.text('GPS: ', 15, yPos);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${ubicacion.latitude.toFixed(6)}, ${ubicacion.longitude.toFixed(6)}`, 40, yPos);
    yPos += 10;
  }

  // Observaciones
  if (observaciones) {
    pdf.setFont('helvetica', 'bold');
    pdf.text('Observaciones:', 15, yPos);
    yPos += 7;
    pdf.setFont('helvetica', 'normal');
    const lines = pdf.splitTextToSize(observaciones, pageWidth - 30);
    lines.forEach(line => {
      if (yPos > 270) {
        pdf.addPage();
        yPos = 20;
      }
      pdf.text(line, 15, yPos);
      yPos += 6;
    });
    yPos += 5;
  }

  // Análisis IA
  if (iaResult) {
    if (yPos > 250) {
      pdf.addPage();
      yPos = 20;
    }
    pdf.setFont('helvetica', 'bold');
    pdf.text('Análisis IA:', 15, yPos);
    yPos += 7;
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Estado: ${iaResult.estado}`, 15, yPos);
    yPos += 6;
    if (iaResult.daños_detectados?.length > 0) {
      pdf.text(`Daños: ${iaResult.daños_detectados.join(', ')}`, 15, yPos);
      yPos += 6;
    }
    if (iaResult.resumen) {
      const resumenLines = pdf.splitTextToSize(iaResult.resumen, pageWidth - 30);
      resumenLines.forEach(line => {
        pdf.text(line, 15, yPos);
        yPos += 6;
      });
    }
    yPos += 5;
  }

  // Fotos
  if (photos?.length > 0) {
    if (yPos > 200) {
      pdf.addPage();
      yPos = 20;
    }
    pdf.setFont('helvetica', 'bold');
    pdf.text('Evidencia Fotográfica:', 15, yPos);
    yPos += 10;

    photos.slice(0, 4).forEach((photo, index) => {
      if (index > 0 && index % 2 === 0) {
        yPos += 65;
        if (yPos > 250) {
          pdf.addPage();
          yPos = 20;
        }
      }
      const xPos = index % 2 === 0 ? 15 : pageWidth / 2 + 5;
      try {
        pdf.addImage(photo, 'JPEG', xPos, yPos, 80, 60);
      } catch (e) {
        console.error('Error añadiendo foto', e);
      }
    });
    yPos += 70;
  }

  // Firma
  if (firma) {
    if (yPos > 230) {
      pdf.addPage();
      yPos = 20;
    }
    pdf.setFont('helvetica', 'bold');
    pdf.text('Firma del Cliente:', 15, yPos);
    yPos += 10;
    try {
      pdf.addImage(firma, 'PNG', 15, yPos, 60, 30);
    } catch (e) {
      console.error('Error añadiendo firma', e);
    }
    yPos += 35;
    if (nombreCliente) {
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Nombre: ${nombreCliente}`, 15, yPos);
    }
  }

  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(128, 128, 128);
  pdf.text(
    `Generado: ${new Date().toLocaleString('es-ES')} - HenkanCX Synk`,
    pageWidth / 2,
    pdf.internal.pageSize.getHeight() - 10,
    { align: 'center' }
  );

  return pdf;
};

export const downloadPDF = (data) => {
  try {
    const pdf = generatePDF(data);
    pdf.save(`OT-${data.otId}.pdf`);
    return true;
  } catch (error) {
    console.error('Error generando PDF:', error);
    return false;
  }
};
