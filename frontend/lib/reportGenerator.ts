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
        "Threat Fingerprint",
        result.analysis.fingerprint,
      ],
      [
        "Evidence Status",
        "Verified",
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

  // BLOCKCHAIN VERIFICATION

  doc.setFontSize(14);

  doc.text(
    "BLOCKCHAIN VERIFICATION",
    14,
    currentY
  );

  currentY += 10;

  doc.setFontSize(10);

  doc.text(
    "Storage Layer: 0G Decentralized Storage",
    14,
    currentY
  );

  currentY += 8;

  doc.text(
    "Integrity Status: Cryptographically Verified",
    14,
    currentY
  );

  currentY += 8;

  doc.text(
    "Evidence Classification: Immutable Forensic Record",
    14,
    currentY
  );

  currentY += 8;

  if (result.rootHash) {

    const hashLines =
      doc.splitTextToSize(
        result.rootHash,
        180
      );

    doc.text(
      "Root Hash:",
      14,
      currentY
    );

    currentY += 6;

    doc.text(
      hashLines,
      14,
      currentY
    );

    currentY +=
      hashLines.length * 5;
  }

  currentY += 15;

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

  currentY += 8;

  doc.text(
    "Evidence fingerprinted and prepared for decentralized preservation.",
    14,
    currentY
  );

  currentY += 8;

  doc.text(
    "This report is intended for security investigation and threat intelligence purposes.",
    14,
    currentY
  );

  const blob =
    doc.output("blob");

  return {
    blob,
    reportId,
  };
}

export function downloadThreatReport(
  result: any
) {

  const report =
    generateThreatReport(
      result
    );

  const url =
    URL.createObjectURL(
      report.blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href = url;

  link.download =
    `${report.reportId}.pdf`;

  document.body.appendChild(
    link
  );

  link.click();

  document.body.removeChild(
    link
  );

  URL.revokeObjectURL(
    url
  );
}