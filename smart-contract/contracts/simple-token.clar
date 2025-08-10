;; Simple Token - SIP-010 Standard Implementation
;; Workshop Version: Minimal but compliant

;; Implement SIP-010 fungible token trait
(impl-trait 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip-010-trait-ft-standard.sip-010-trait)

;; Define the token
(define-fungible-token eco-token)

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u101))
(define-constant err-insufficient-balance (err u102))
(define-constant err-burn-failed (err u103))

;; Token metadata (customizable token configuration)
(define-constant token-name "Eco Token")
(define-constant token-symbol "ECO")
(define-constant token-decimals u6)
(define-constant token-uri u"https://workshop.blockdev.id/token.json")

;; SIP-010 required functions
(define-read-only (get-name)
  (ok token-name)
)

(define-read-only (get-symbol)
  (ok token-symbol)
)

(define-read-only (get-decimals)
  (ok token-decimals)
)

(define-read-only (get-balance (user principal))
  (ok (ft-get-balance eco-token user))
)

(define-read-only (get-total-supply)
  (ok (ft-get-supply eco-token))
)

(define-read-only (get-token-uri)
  (ok (some token-uri))
)

;; SIP-010 transfer function
(define-public (transfer
    (amount uint)
    (from principal)
    (to principal)
    (memo (optional (buff 34)))
  )
  (begin
    (asserts! (is-eq from tx-sender) err-not-token-owner)
    (ft-transfer? eco-token amount from to)
  )
)

;; Mint function (owner only)
(define-public (mint
    (amount uint)
    (to principal)
  )
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (ft-mint? eco-token amount to)
  )
)

;; Redeem token for users
(define-public (redeem-tokens (amount uint))
  (let (
      ;; unwrap! to get the actual uint balance
      (current-balance (unwrap! (get-balance tx-sender) err-insufficient-balance))
    )
    (begin
      ;; Check sender has enough balance
      (asserts! (>= current-balance amount) err-insufficient-balance)

      ;; Burn tokens directly (SIP-010)
      (unwrap! (ft-burn? eco-token amount tx-sender) err-burn-failed)

      ;; Log the redemption
      (print {
        action: "redeem",
        user: tx-sender,
        amount: amount,
      })

      (ok amount)
    )
  )
)