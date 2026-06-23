import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function getAttribution(
  category: string
) {
  if (
    category?.includes("Phishing")
  ) {
    return "Credential Harvesting Campaign";
  }

  if (
    category?.includes("Malware")
  ) {
    return "Malware Delivery Operation";
  }

  if (
    category?.includes("Crypto")
  ) {
    return "Financially Motivated Threat Actor";
  }

  return "Unknown Threat Actor";
}

export function generateThreatReport(
  result: any
) {
  const doc = new jsPDF();

  const reportId =
    `STN-${new Date().getFullYear()}-${Date.now()}`;

  doc.setFontSize(24);
  doc.text(
    "SENTINELNET",
    14,
    20
  );

  doc.setFontSize(12);

  doc.text(
    "THREAT INTELLIGENCE REPORT",
    14,
    30
  );

  doc.text(
    "Classification: Internal Use",
    14,
    38
  );

  doc.text(
    `Report ID: ${reportId}`,
    14,
    46
  );

  doc.setFontSize(10);

  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    54
  );

  autoTable(doc, {
    startY: 65,
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

  // EXECUTIVE SUMMARY

  doc.setFontSize(14);

  doc.text(
    "EXECUTIVE SUMMARY",
    14,
    currentY
  );

  currentY += 10;

  doc.setFontSize(10);

  const summaryLines =
    doc.splitTextToSize(
      result.analysis.summary ||
        "No summary available.",
      180
    );

  doc.text(
    summaryLines,
    14,
    currentY
  );

  currentY +=
    summaryLines.length * 5 + 15;

  // THREAT ATTRIBUTION

  doc.setFontSize(14);

  doc.text(
    "THREAT ATTRIBUTION",
    14,
    currentY
  );

  currentY += 10;

  doc.setFontSize(10);

  doc.text(
    `Likely Objective: ${getAttribution(
      result.analysis.threat_category
    )}`,
    14,
    currentY
  );

  currentY += 15;

  // RECOMMENDED ACTIONS

  doc.setFontSize(14);

  doc.text(
    "RECOMMENDED ACTIONS",
    14,
    currentY
  );

  currentY += 10;

  doc.setFontSize(10);

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
  } else {
    doc.text(
      "No recommendations available.",
      18,
      currentY
    );

    currentY += 10;
  }

  // THREAT FINGERPRINT

  currentY += 10;

  doc.setFontSize(14);

  doc.text(
    "THREAT FINGERPRINT",
    14,
    currentY
  );

  currentY += 10;

  doc.setFontSize(10);

  doc.text(
    result.analysis.fingerprint ||
      "Unavailable",
    14,
    currentY
  );

  currentY += 20;

  // ANALYST NOTES

  doc.setFontSize(14);

  doc.text(
    "ANALYST NOTES",
    14,
    currentY
  );

  currentY += 10;

  doc.setFontSize(10);

  doc.text(
    "Generated automatically by SentinelNet Threat Genome Engine.",
    14,
    currentY
  );

  currentY += 10;

  doc.text(
    "This report is intended for security investigation and threat intelligence purposes.",
    14,
    currentY
  );

  doc.save(
    `sentinelnet-report-${Date.now()}.pdf`
  );
}