import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generateThreatReport(result: any) {
  const doc = new jsPDF();

  doc.setFontSize(24);
  doc.text("SENTINELNET", 14, 20);

  doc.setFontSize(12);
  doc.text(
    "Threat Intelligence Investigation Report",
    14,
    30
  );

  doc.setFontSize(10);
  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    38
  );

  autoTable(doc, {
    startY: 50,
    head: [["Field", "Value"]],
    body: [
      [
        "Threat Category",
        result.analysis.threat_category,
      ],
      [
        "Risk Level",
        result.analysis.risk_level,
      ],
      [
        "Confidence",
        `${result.analysis.confidence}%`,
      ],
      [
        "Fingerprint",
        result.analysis.fingerprint,
      ],
    ],
  });

  let currentY =
    (doc as any).lastAutoTable.finalY + 15;

  doc.setFontSize(14);
  doc.text(
    "Executive Summary",
    14,
    currentY
  );

  currentY += 10;

  doc.setFontSize(10);

  const summaryLines =
    doc.splitTextToSize(
      result.analysis.summary,
      180
    );

  doc.text(
    summaryLines,
    14,
    currentY
  );

  currentY +=
    summaryLines.length * 5 + 15;

  doc.setFontSize(14);
  doc.text(
    "Recommended Actions",
    14,
    currentY
  );

  currentY += 10;

  if (
    result.analysis.recommendations &&
    result.analysis.recommendations.length
  ) {
    result.analysis.recommendations.forEach(
      (
        action: string,
        index: number
      ) => {
        doc.text(
          `${index + 1}. ${action}`,
          18,
          currentY
        );

        currentY += 8;
      }
    );
  }

  doc.save(
    `sentinelnet-report-${Date.now()}.pdf`
  );
}