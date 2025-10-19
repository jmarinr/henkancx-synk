import { jsPDF } from 'jspdf';

export const downloadPDF = (data) => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);
    let yPos = 20;

    // Helper functions
    const addText = (text, x, y, size = 10, style = 'normal', color = [0, 0, 0]) => {
      doc.setFontSize(size);
      doc.setFont('helvetica', style);
      doc.setTextColor(...color);
      doc.text(text, x, y);
    };

    const addLine = (y, color = [200, 200, 200]) => {
      doc.setDrawColor(...color);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);
    };

    const addBox = (x, y, w, h, fillColor = [240, 240, 240]) => {
      doc.setFillColor(...fillColor);
      doc.rect(x, y, w, h, 'F');
    };

    const checkNewPage = (requiredSpace = 30) => {
      if (yPos + requiredSpace > pageHeight - 20) {
        doc.addPage();
        yPos = 20;
        return true;
      }
      return false;
    };

    const addSection = (title, color = [0, 123, 255]) => {
      checkNewPage(15);
      addBox(margin, yPos - 5, contentWidth, 10, color);
      addText(title, margin + 3, yPos + 1, 12, 'bold', [255, 255, 255]);
      yPos += 12;
    };

    const addField = (label, value, fullWidth = false) => {
      checkNewPage();
      const val = value || 'N/A';
      addText(label + ':', margin + 2, yPos, 9, 'bold', [60, 60, 60]);
      addText(val.toString(), fullWidth ? margin + 2 : margin + 65, fullWidth ? yPos + 5 : yPos, 9, 'normal', [0, 0, 0]);
      yPos += fullWidth ? 10 : 6;
    };

    const addFieldRow = (fields) => {
      checkNewPage();
      const fieldWidth = contentWidth / fields.length;
      fields.forEach((field, idx) => {
        const x = margin + (fieldWidth * idx);
        addText(field.label + ':', x, yPos, 8, 'bold', [60, 60, 60]);
        addText((field.value || 'N/A').toString(), x, yPos + 4, 8, 'normal');
      });
      yPos += 10;
    };

    // ========== ENCABEZADO ==========
    addBox(0, 0, pageWidth, 35, [45, 55, 72]);
    addText('INFORME DE INSPECCIÓN', pageWidth / 2, 15, 18, 'bold', [255, 255, 255]);
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(10);
    doc.text('Sistema HenkanCX Synk', pageWidth / 2, 22, { align: 'center' });
    doc.text('Mantenimiento Preventivo de Generadores', pageWidth / 2, 28, { align: 'center' });
    
    yPos = 45;

    // ========== INFORMACIÓN BÁSICA ==========
    addSection('INFORMACIÓN GENERAL', [34, 139, 34]);
    addFieldRow([
      { label: 'OT ID', value: data.otId },
      { label: 'Técnico', value: data.tecnico },
      { label: 'Cliente', value: data.cliente }
    ]);
    addFieldRow([
      { label: 'Sitio', value: data.sitio },
      { label: 'Fecha', value: new Date().toLocaleDateString('es-ES') }
    ]);
    
    if (data.horaInicio) {
      const inicio = new Date(data.horaInicio).toLocaleString('es-ES');
      const fin = data.horaFin ? new Date(data.horaFin).toLocaleString('es-ES') : 'N/A';
      const duracion = data.horaFin ? Math.round((data.horaFin - data.horaInicio) / 60000) : 'N/A';
      addFieldRow([
        { label: 'Inicio', value: inicio },
        { label: 'Fin', value: fin },
        { label: 'Duración', value: duracion + ' min' }
      ]);
    }

    if (data.ubicacion) {
      addField('Ubicación GPS', `${data.ubicacion.latitude.toFixed(6)}, ${data.ubicacion.longitude.toFixed(6)}`);
    }
    yPos += 3;

    // ========== DATOS DEL GENERADOR ==========
    addSection('DATOS DEL GENERADOR', [0, 123, 255]);
    addFieldRow([
      { label: 'Hodómetro', value: data.hodometro },
      { label: 'Marca Planta', value: data.marcaPlanta },
      { label: 'Modelo Planta', value: data.modeloPlanta }
    ]);
    addFieldRow([
      { label: 'Marca Motor', value: data.marcaMotor },
      { label: 'Modelo Motor', value: data.modeloMotor },
      { label: 'N° Serie Planta', value: data.nSeriePlanta }
    ]);
    addFieldRow([
      { label: 'N° Serie Motor', value: data.nSerieMotor },
      { label: 'Capacidad KW', value: data.capacidadKW },
      { label: 'Capacidad HP', value: data.capacidadHP }
    ]);
    addField('Capacidad Amp', data.capacidadAmp);
    yPos += 3;

    // ========== DATOS ATS ==========
    addSection('DATOS ATS', [0, 123, 255]);
    addFieldRow([
      { label: 'Marca', value: data.atsMarca },
      { label: 'Modelo', value: data.atsModelo },
      { label: 'N° Serie', value: data.atsNumSerie }
    ]);
    addFieldRow([
      { label: 'Capacidad', value: data.atsCapacidad },
      { label: 'Reloj Ejercicio', value: data.atsReloj }
    ]);
    yPos += 3;

    // ========== COMBUSTIBLE ==========
    addSection('SISTEMA DE COMBUSTIBLE', [255, 140, 0]);
    addFieldRow([
      { label: 'Cap. Tanque 1', value: data.capacidadTanque1 },
      { label: 'Cap. Tanque 2', value: data.capacidadTanque2 },
      { label: 'Nivel', value: data.nivelCombustible }
    ]);
    addFieldRow([
      { label: 'Estado Tanque', value: data.estadoTanque },
      { label: 'Estado Tuberías', value: data.estadoTuberias }
    ]);
    yPos += 3;

    // ========== MEDICIONES ELÉCTRICAS ==========
    checkNewPage(50);
    addSection('MEDICIONES DE VOLTAJE - MOTOR GENERADOR', [220, 53, 69]);
    addFieldRow([
      { label: 'L1-N (110±21V)', value: data.voltajeL1N + ' V' },
      { label: 'L2-N (110±21V)', value: data.voltajeL2N + ' V' },
      { label: 'L1-L2 (220±42V)', value: data.voltajeL1L2 + ' V' }
    ]);
    addField('Neutral a Tierra', (data.voltajeNeutralTierra || 'N/A') + ' V');
    yPos += 3;

    addSection('MEDICIONES DE VOLTAJE - RED COMERCIAL', [220, 53, 69]);
    addFieldRow([
      { label: 'L1-N', value: data.voltajeRedL1N + ' V' },
      { label: 'L2-N', value: data.voltajeRedL2N + ' V' },
      { label: 'L1-L2', value: data.voltajeRedL1L2 + ' V' }
    ]);
    addField('Neutral a Tierra', (data.voltajeRedNeutralTierra || 'N/A') + ' V');
    yPos += 3;

    addSection('MEDICIONES DE CORRIENTE', [220, 53, 69]);
    addFieldRow([
      { label: 'L1', value: data.corrienteL1 + ' A' },
      { label: 'L2', value: data.corrienteL2 + ' A' },
      { label: 'Neutral', value: data.corrienteNeutral + ' A' }
    ]);
    yPos += 3;

    // ========== BATERÍA ==========
    addSection('SISTEMA DE BATERÍA', [156, 39, 176]);
    addFieldRow([
      { label: 'Fecha Batería', value: data.fechaBateria },
      { label: 'Estado Físico', value: data.estadoBateria },
      { label: 'Marca/Modelo', value: data.bateriaMarca }
    ]);
    addFieldRow([
      { label: 'Estado Bornes', value: data.estadoBornes },
      { label: 'Estado Cables', value: data.estadoCables },
      { label: 'Electrolito', value: data.estadoElectrolito }
    ]);
    addFieldRow([
      { label: 'V. Con Cargador', value: data.voltageBatCargador + ' V' },
      { label: 'V. Sin Cargador', value: data.voltageBatSinCargador + ' V' },
      { label: 'V. Alternador', value: data.voltageAlternador + ' V' }
    ]);
    addField('Caída Voltaje Arranque', (data.caidaVoltaje || 'N/A') + ' V');
    yPos += 3;

    // ========== LECTURAS GENERALES ==========
    checkNewPage(35);
    addSection('LECTURAS GENERALES DEL GENERADOR', [52, 152, 219]);
    addFieldRow([
      { label: 'Presión Aceite', value: data.presionAceite + ' PSI' },
      { label: 'Frecuencia', value: data.frecuencia + ' Hz' },
      { label: 'Temperatura', value: data.temperatura + ' °C' }
    ]);
    addFieldRow([
      { label: 'Amperaje', value: data.amperaje },
      { label: 'Voltaje General', value: data.voltajeGeneral },
      { label: 'Nivel Aceite', value: data.nivelAceite }
    ]);
    yPos += 3;

    // ========== PRUEBAS ==========
    addSection('PRUEBAS DE ARRANQUE Y ALARMAS', [231, 76, 60]);
    addFieldRow([
      { label: 'Arranque Manual', value: data.arranqueManual },
      { label: 'Arranque Automático', value: data.arranqueAutomatico }
    ]);
    addFieldRow([
      { label: 'Fallo Red Comercial', value: data.falloRedComercial },
      { label: 'Generador Operando', value: data.generadorOperando }
    ]);
    addFieldRow([
      { label: 'Fallo Generador', value: data.falloGenerador },
      { label: 'Bajo Combustible', value: data.bajoNivelCombustible }
    ]);
    yPos += 3;

    // ========== MEDICIONES AMBIENTALES ==========
    addSection('MEDICIONES AMBIENTALES', [46, 204, 113]);
    addFieldRow([
      { label: 'Ruido Aceptado', value: data.nivelRuidoAceptado },
      { label: 'Ruido Medido', value: data.medicionRuido }
    ]);
    yPos += 2;
    addText('Emanación de Gases:', margin + 2, yPos, 9, 'bold');
    yPos += 5;
    addFieldRow([
      { label: 'CO%', value: `${data.coMedicion || 'N/A'} (Aceptado: ${data.coNivelAceptado || 'N/A'})` },
      { label: 'HCM ppm', value: `${data.hcmMedicion || 'N/A'} (Aceptado: ${data.hcmNivelAceptado || 'N/A'})` }
    ]);
    addField('Alícuota S/2 SMN', `${data.alicuotaMedicion || 'N/A'} (Aceptado: ${data.alicuotaNivelAceptado || 'N/A'})`);
    yPos += 3;

    // ========== INSUMOS CAMBIADOS ==========
    addSection('INSUMOS CAMBIADOS', [255, 193, 7]);
    addText('Filtros:', margin + 2, yPos, 9, 'bold');
    yPos += 5;
    addFieldRow([
      { label: 'Aceite Viejo', value: data.filtroAceiteViejo },
      { label: 'Aceite Nuevo', value: data.filtroAceiteNuevo }
    ]);
    addFieldRow([
      { label: 'Aire Viejo', value: data.filtroAireViejo },
      { label: 'Aire Nuevo', value: data.filtroAireNuevo }
    ]);
    addFieldRow([
      { label: 'Diesel Viejo', value: data.filtroDieselViejo },
      { label: 'Diesel Nuevo', value: data.filtroDieselNuevo }
    ]);
    yPos += 3;

    // ========== OBSERVACIONES ==========
    checkNewPage(40);
    addSection('OBSERVACIONES DEL SERVICIO', [220, 53, 69]);
    if (data.observaciones) {
      doc.setFontSize(9);
      const lines = doc.splitTextToSize(data.observaciones, contentWidth - 4);
      doc.text(lines, margin + 2, yPos);
      yPos += (lines.length * 5) + 5;
    }

    // Análisis IA
    if (data.iaResult) {
      yPos += 3;
      checkNewPage(30);
      addBox(margin, yPos - 3, contentWidth, 8, [147, 51, 234]);
      addText('ANÁLISIS INTELIGENTE', margin + 3, yPos + 2, 11, 'bold', [255, 255, 255]);
      yPos += 10;

      const estado = data.iaResult.estado || 'normal';
      const estadoColor = estado === 'critico' ? [220, 53, 69] : estado === 'atencion' ? [255, 193, 7] : [40, 167, 69];
      addBox(margin, yPos - 3, contentWidth, 6, estadoColor);
      addText(`Estado: ${estado.toUpperCase()}`, margin + 3, yPos + 1, 10, 'bold', [255, 255, 255]);
      yPos += 8;

      if (data.iaResult.alarmas?.length > 0) {
        addText('ALARMAS CRITICAS:', margin + 2, yPos, 9, 'bold', [220, 53, 69]);
        yPos += 5;
        data.iaResult.alarmas.forEach(item => {
          checkNewPage();
          const lines = doc.splitTextToSize('• ' + item, contentWidth - 6);
          doc.setFontSize(8);
          doc.text(lines, margin + 4, yPos);
          yPos += lines.length * 4;
        });
        yPos += 2;
      }

      if (data.iaResult.reemplazos?.length > 0) {
        checkNewPage(15);
        addText('REEMPLAZOS NECESARIOS:', margin + 2, yPos, 9, 'bold', [255, 152, 0]);
        yPos += 5;
        data.iaResult.reemplazos.forEach(item => {
          checkNewPage();
          const lines = doc.splitTextToSize('• ' + item, contentWidth - 6);
          doc.setFontSize(8);
          doc.text(lines, margin + 4, yPos);
          yPos += lines.length * 4;
        });
        yPos += 2;
      }

      if (data.iaResult.revisiones?.length > 0) {
        checkNewPage(15);
        addText('REVISIONES RECOMENDADAS:', margin + 2, yPos, 9, 'bold', [0, 123, 255]);
        yPos += 5;
        data.iaResult.revisiones.forEach(item => {
          checkNewPage();
          const lines = doc.splitTextToSize('• ' + item, contentWidth - 6);
          doc.setFontSize(8);
          doc.text(lines, margin + 4, yPos);
          yPos += lines.length * 4;
        });
      }
    }

    // ========== EVIDENCIAS FOTOGRÁFICAS ==========
    if (data.photos && data.photos.length > 0) {
      doc.addPage();
      yPos = 20;
      addSection('EVIDENCIAS FOTOGRÁFICAS', [52, 152, 219]);
      
      const photosPerRow = 2;
      const photoWidth = (contentWidth - 10) / photosPerRow;
      const photoHeight = photoWidth * 0.75;
      
      data.photos.forEach((photo, idx) => {
        const col = idx % photosPerRow;
        const row = Math.floor(idx / photosPerRow);
        
        if (yPos + photoHeight + 15 > pageHeight - 20 && idx > 0) {
          doc.addPage();
          yPos = 20;
        }
        
        const x = margin + (col * (photoWidth + 5));
        const y = yPos + (row % 3) * (photoHeight + 10);
        
        try {
          doc.addImage(photo, 'JPEG', x, y, photoWidth, photoHeight);
          doc.setFontSize(8);
          doc.text(`Foto ${idx + 1}`, x + photoWidth / 2, y + photoHeight + 4, { align: 'center' });
        } catch (e) {
          console.error('Error adding photo:', e);
        }
        
        if ((idx + 1) % (photosPerRow * 3) === 0) {
          yPos = 20;
        } else if (col === photosPerRow - 1) {
          yPos += photoHeight + 10;
        }
      });
    }

    // ========== FIRMA ==========
    doc.addPage();
    yPos = 20;
    addSection('FIRMA DEL CLIENTE', [52, 58, 64]);
    
    if (data.nombreCliente) {
      addField('Nombre', data.nombreCliente, true);
      yPos += 5;
    }
    
    if (data.firma) {
      try {
        doc.addImage(data.firma, 'PNG', margin, yPos, 80, 30);
        yPos += 35;
      } catch (e) {
        console.error('Error adding signature:', e);
      }
    }
    
    addLine(yPos);
    yPos += 5;
    addText('Firma del Cliente', pageWidth / 2, yPos, 9, 'italic', [100, 100, 100]);

    // ========== FOOTER ==========
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Página ${i} de ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
      doc.text(`Generado: ${new Date().toLocaleString('es-ES')}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
      doc.text('HenkanCX Synk', margin, pageHeight - 10);
    }

    // Guardar
    doc.save(`Inspeccion_${data.sitio || 'Generador'}_${Date.now()}.pdf`);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};
