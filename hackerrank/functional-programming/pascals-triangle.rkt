#lang racket
; Enter your code here. Read input from STDIN. Print output to STDOUT

(define (factorial-rec n accum)
     (cond
        [(eq? n 0) 1]
        [(eq? n 1) accum]
        [else (factorial-rec (- n 1) (* n accum))]))

(define (factorial n)
    (factorial-rec n 1))
    
(define (cell n r)
  (/ (factorial n) (* (factorial r) (factorial (- n r)))))

(define (row n)
    (for/list ([r (in-range (+ n 1))])
        (cell n r)))

(define (pascals-triangle n)
    (for/list ([i (in-range n)])
      (row i)))

(define (solve n)
    (pascals-triangle n))

(define (get-number) 
    (read))

(define (get-number-mock)
    10)

(define (display-row lst)
  (for ([element lst]) (printf "~a " element))
  (displayln ""))

(for-each display-row (solve (get-number)))
