#lang racket
(require 2htdp/batch-io)

(define resolution 0.001)

(define (calculate-term coef pow x)
  (* coef (expt x pow)))

(define (calculate-y coefs pows x)
  (foldl (lambda (coef pow accum) (+ (calculate-term coef pow x) accum)) 0 coefs pows))

(define (calculate-area coefs pows bounds)
  (let ([domain (sequence->list (in-range (car bounds) (car (cdr bounds)) resolution))])
    (* resolution (foldl (lambda (x accum) (+ (calculate-y coefs pows (+ x resolution)) accum)) 0 domain) )))

(define (calculate-volume coefs pows bounds)
   (let ([domain (sequence->list (in-range (car bounds) (car (cdr bounds)) resolution))])
     (* resolution (foldl (lambda (x accum) (+ (* pi (expt (calculate-y coefs pows (+ x resolution)) 2)) accum)) 0 domain))
  )
)

(define (solve parameters)
  (let ([coefs (list-ref parameters 0)]
        [pows (list-ref parameters 1)]
        [bounds (list-ref parameters 2)])
        (list
         (calculate-area coefs pows bounds)
         (calculate-volume coefs pows bounds))))

(define (unwrap-line line)
  (map string->number (string-split line)))

(define (unwrap-input lines)
  (map unwrap-line lines))

(for-each displayln (solve (unwrap-input (read-lines 'stdin))))