# Security Specification: Live Chat Security System

This specification outlines the data invariants, threat model, "Dirty Dozen" invalid payloads, and security design pattern for securing the global Diginfotech live support chat.

## 1. Data Invariants
- A chat document must contain exactly 7 properties: `id`, `sessionId`, `sender`, `text`, `visitorName`, `visitorEmail`, `createdAt`.
- No additional phantom fields are allowed to prevent storage injection or privilege escalation.
- Message text must be less than 2000 characters to prevent spam.
- Timestamps must rely strictly on the database server timestamp (`request.time`).

## 2. Threat Model & The "Dirty Dozen" Payloads
The following payloads are explicitly designed to test boundaries and must return `PERMISSION_DENIED`:
1. **Empty text message:** Attempting to store zero characters.
2. **Infinite string message:** Attempting to store a 1MB message.
3. **Impersonated Sender:** A guest setting `sender` to `agent`.
4. **Invalid Keys Scheme:** Attempting to write field `role: "admin"`.
5. **Modified Creator IP:** Forging network status.
6. **Spoofed Creation Date:** Specifying historical Unix epochs instead of `request.time`.
7. **Phantom properties:** Injected `isVerified: true` key.
8. **Malicious ID poisoning:** Appending long strings like `%2F..%2F` as Document ID.
9. **SQL injection injection patterns** inside ID strings.
10. **Null values** for mandatory keys like `sessionId`.
11. **Session hijack attempts** of other active connections.
12. **Blanket non-deterministic writes** ignoring standard templates.
