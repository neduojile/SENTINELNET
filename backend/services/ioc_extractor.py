import re


def clean_values(values):

    cleaned = []

    for value in values:

        value = value.strip()

        value = value.rstrip(
            ".,;:!?)]}>\"'"
        )

        if value:
            cleaned.append(value)

    return list(
        set(cleaned)
    )


def extract_iocs(content: str):

    # ==========================
    # URLs
    # ==========================

    urls = re.findall(
        r"https?://[^\s<>\"']+",
        content
    )

    urls = clean_values(
        urls
    )

    # ==========================
    # Domains
    # ==========================

    domains = re.findall(
        r"\b(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\b",
        content
    )

    domains = clean_values(
        domains
    )

    # ==========================
    # Emails
    # ==========================

    emails = re.findall(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        content
    )

    emails = clean_values(
        emails
    )

    # ==========================
    # IPv4
    # ==========================

    ips = re.findall(
        r"\b(?:\d{1,3}\.){3}\d{1,3}\b",
        content
    )

    ips = clean_values(
        ips
    )

    # ==========================
    # Phone Numbers
    # ==========================

    phone_numbers = re.findall(
        r"\+?\d[\d\s\-]{7,15}\d",
        content
    )

    phone_numbers = clean_values(
        phone_numbers
    )

    # ==========================
    # MD5
    # ==========================

    md5_hashes = re.findall(
        r"\b[a-fA-F0-9]{32}\b",
        content
    )

    # ==========================
    # SHA256
    # ==========================

    sha256_hashes = re.findall(
        r"\b[a-fA-F0-9]{64}\b",
        content
    )

    file_hashes = clean_values(
        md5_hashes +
        sha256_hashes
    )

    # ==========================
    # Bitcoin Wallets
    # ==========================

    bitcoin_wallets = re.findall(
        r"\b(?:bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}\b",
        content
    )

    # ==========================
    # Ethereum Wallets
    # ==========================

    ethereum_wallets = re.findall(
        r"\b0x[a-fA-F0-9]{40}\b",
        content
    )

    wallets = clean_values(
        bitcoin_wallets +
        ethereum_wallets
    )

    # ==========================
    # IOC Statistics
    # ==========================

    total_iocs = (
        len(urls)
        + len(domains)
        + len(emails)
        + len(ips)
        + len(wallets)
        + len(phone_numbers)
        + len(file_hashes)
    )

    return {

        "domains": domains,

        "emails": emails,

        "ips": ips,

        "wallets": wallets,

        "urls": urls,

        "phone_numbers": phone_numbers,

        "file_hashes": file_hashes,

        "ioc_statistics": {
            "total_iocs": total_iocs,
            "url_count": len(urls),
            "domain_count": len(domains),
            "email_count": len(emails),
            "ip_count": len(ips),
            "wallet_count": len(wallets),
            "phone_count": len(phone_numbers),
            "hash_count": len(file_hashes)
        }
    }