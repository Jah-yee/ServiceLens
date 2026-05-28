# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| latest (main) | Yes |
| older commits | No |

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

If you discover a security vulnerability in ServiceLens, please report it responsibly:

1. Go to the [GitHub Security Advisories](https://github.com/RishavRajSingh44/ServiceLens/security/advisories/new) page and submit a private advisory.
2. Alternatively, contact the maintainer directly via GitHub: [@RishavRajSingh44](https://github.com/RishavRajSingh44).

Please include:
- A description of the vulnerability
- Steps to reproduce it
- The potential impact
- Any suggested fix (optional but appreciated)

## What to Expect

- Acknowledgement within **48 hours**
- A status update within **7 days**
- A fix or mitigation plan within **30 days** for critical issues

## Scope

The following are in scope:
- Malicious code execution triggered by inspected network request data
- Content Security Policy bypass in the DevTools panel
- chrome.storage data leakage to untrusted origins
- XSS via unescaped URL or header content rendered in the panel
- Privilege escalation via the extension's `storage` permission

The following are **out of scope**:
- Vulnerabilities in Chrome itself or the DevTools APIs
- Issues only reproducible with a malicious extension already installed
- Rate limiting or DoS on the inspected page's own backend

## Security Measures in Place

- Dependency audit on every PR (`npm audit` via `security.yml`)
- Dependency review action on pull requests — fails on moderate+ CVEs
- OpenSSF Scorecard analysis on every push to `main` and weekly schedule
- Manifest V3 — no broad host permissions; extension only reads `chrome.devtools.network` events
- All request data is processed locally — nothing is sent to external servers
- MIT license with no warranty clause

## MIT License Note

ServiceLens is provided **as-is** under the MIT license. While security issues will be addressed promptly, the software carries no warranty. See [LICENSE](LICENSE) for full terms.
