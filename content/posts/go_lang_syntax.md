+++
title = "Go lang yourself"
date = "2023-11-04T22:25:51+01:00"
author = ""
authorTwitter = "" #do not include @
cover = ""
tags = ["", ""]
keywords = ["", ""]
description = ""
showFullContent = false
readingTime = false
draft = true
+++

# Go lang yourself

## Returning multiple values

```go
package main
import "fmt"
func main() {
    a, b := 1, 2
    fmt.Println(a, b)
    a, b = b, a
    fmt.Println(a, b)
}
```
it can be reused

## Named return values

```go
package main
import "fmt"
func swap(a, b int) (x, y int) {
    x, y = b, a
    return
} // implicit returning x and y
```
## Enums

```go
package main
import "fmt"
type Color int
const (
    Red Color = iota
    Green
    Blue
)
func main() {
    var c Color = Green
    fmt.Println(c) // Output: 1
    fmt.Println(Red, Green, Blue) // Output: 0 1 2
}
```

## Type assertion

```go
package main
import "fmt"
func main() {
    var i interface{} = "hello"
    s, ok := i.(string) // whats the intuition behind this?
    if ok {
        fmt.Println(s) // Output: hello
    } else {
        fmt.Println("Not a string")
    }
}
```

## If exploitation

```go
var val interface{} = "hello"

if s, ok := val.(string); ok { // this is just hard to read
    fmt.Println("It's a string:", s)
} else {
    fmt.Println("Not a string")
}
```

## Iota??

```go
package main
import "fmt"
func main() {
    const (
        a = iota // 0
        b = iota // 1
        c = iota // 2
    )
    fmt.Println(a, b, c) // Output: 0 1 2

    const (
        d = iota + 1 // 1
        e            // 2
        f            // 3
    )
    fmt.Println(d, e, f) // Output: 1 2 3
}
```

## Default values

```go
package main
import "fmt"
func main() {
    var a int
    var b string
    var c bool
    fmt.Println(a, b, c) // Output: 0 "" false
}
```
Relevant for maps

## Nil checking of pointers

```go 
package main
import "fmt"
type Person struct {
    Name string
}
func main() {
    var p *Person // p is nil
    if p != nil { // if you forget this check, it will panic
        fmt.Println(p.Name)
    } else {
        fmt.Println("p is nil") // Output: p is nil
    }
    
    p = &Person{Name: "Alice"}
    if p != nil {
        fmt.Println(p.Name) // Output: Alice
    }
}
```

## Imports are weird

```go
package main
import (
    "fmt"
    "math/rand"
    "time"
)
func main() {
    rand.Seed(time.Now().UnixNano())
    fmt.Println("Random number:", rand.Intn(100)) // Output: Random number
    // between 0 and 99
    fmt.Println("Current time:", time.Now()) // Output: Current 
```

## goto ??

```go
package main
import "fmt"
func main() {
    i := 0
    for {
        if i >= 5 {
            goto end // jumps to the end label
        }
        fmt.Println(i)
        i++
    }
end:
    fmt.Println("Done") // Output: Done
}
```
## Creating methods
Why not just create a keyword?

```go
// Define a method on type pair. Pair now implements Stringer because Pair has defined all the methods in the interface.
func (p pair) String() string { // p is called the "receiver"
	// Sprintf is another public function in package fmt.
	// Dot syntax references fields of p.
	return fmt.Sprintf("(%d, %d)", p.x, p.y)
}
// alterntively
method (p pair) String() string {
    return fmt.Sprintf("(%d, %d)", p.x, p.y)
}
```
## Hard to differentiate between values and types

## Unsafe concurrent programming




