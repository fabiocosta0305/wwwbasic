// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

var basic_test = require('./basic-tester.js');

basic_test.BASIC_TEST('Functions', 'Classic', `
DEF FNdist(x, y) = SQR(x^2 + y^2)
a = 3
b = 4
PRINT FNdist(a, b)
`, `
5
`);

basic_test.BASIC_TEST('Functions', 'NewStyle', `
FUNCTION Dist(x, y)
  Dist = SQR(x^2 + y^2)
END FUNCTION
a = 3
b = 4
PRINT Dist(a, b)
`, `
5
`);

basic_test.BASIC_TEST('Functions', 'CallLayers', `
FUNCTION Inc(x)
  Inc = x + 1
END FUNCTION
PRINT Inc(Inc(Inc(Inc(3))))
`, `
7
`);

basic_test.BASIC_TEST('Functions', 'DefLayers', `
FUNCTION Baz(x)
  Baz = x * 2
END FUNCTION

FUNCTION Bar(x)
  Bar = Baz(x) * 3
END FUNCTION

FUNCTION Foo(x)
  Foo = Bar(x) * 5
END FUNCTION

a = 1
PRINT Foo(a)
`, `
30
`);

basic_test.BASIC_TEST('Functions', 'RecursiveImplicit', `
FUNCTION Factorial(n)
  IF n = 0 OR n = 1 THEN
    Factorial = 1
  ELSE
    Factorial = n * Factorial(n - 1)
  END IF
END FUNCTION

a = 4
PRINT Factorial(a)
`, `
24
`);

basic_test.BASIC_TEST('Functions', 'RecursiveExplicit', `
FUNCTION Factorial(n AS INTEGER) AS INTEGER
  IF n = 0 OR n = 1 THEN
    Factorial = 1
  ELSE
    Factorial = n * Factorial(n - 1)
  END IF
END FUNCTION

a = 4
PRINT Factorial(a)
`, `
24
`);

basic_test.BASIC_TEST('Functions', 'RecursiveExplicitWithLocal', `
FUNCTION Factorial(n AS INTEGER) AS INTEGER
  IF n = 0 OR n = 1 THEN
    Factorial = 1
  ELSE
    temp = n * Factorial(n - 1)
    Factorial = temp
  END IF
END FUNCTION

a = 4
PRINT Factorial(a)
`, `
24
`);

basic_test.BASIC_TEST('Functions', 'Predeclare', `
DECLARE FUNCTION Adder(x AS INTEGER, y AS INTEGER) AS INTEGER
PRINT Adder(1, 2)
FUNCTION Adder(x AS INTEGER, y AS INTEGER) AS INTEGER
  Adder = x + y
END FUNCTION
`, `
3
`);

basic_test.BASIC_TEST('Functions', 'ByRef', `
FUNCTION Changer(x as INTEGER)
  x = 2
  Changer = 3
END FUNCTION
a = 1
PRINT Changer(a)
PRINT a
`, `
3
2
`);

basic_test.BASIC_TEST('Functions', 'Multi', `
FUNCTION Plus1(x as INTEGER)
  Plus1 = x + 1
END FUNCTION
PRINT Plus1(3) + Plus1(4) + Plus1(6)
`, `
16
`);

basic_test.BASIC_TEST('Functions', 'TreeSize', `
FUNCTION TreeSize(n)
  IF n = 1 THEN
    TreeSize = 1
  ELSE
    TreeSize = TreeSize(n - 1) + TreeSize(n - 1) + 1
  END IF
END FUNCTION
PRINT TreeSize(5)
`, `
31
`);

basic_test.BASIC_TEST('Subroutines', 'Depth', `
a = stackdepth()
b = basedepth()

FUNCTION Foo(a$)
  b$ = a$
  print "Foo sp: "; stackdepth() - a
  print "Foo bp: "; basedepth() - b
  Foo = 1
END FUNCTION

FUNCTION Bar()
  print "Bar sp: "; stackdepth() - a
  print "Bar bp: "; basedepth() - b
  Bar = Foo("hi")
  print "Bar sp: "; stackdepth() - a
  print "Bar bp: "; basedepth() - b
END FUNCTION

print "Root sp: "; stackdepth() - a
print "Root bp: "; basedepth() - b
PRINT Bar()
print "Root sp: "; stackdepth() - a
print "Root bp: "; basedepth() - b
`, `
Root sp: 0
Root bp: 0
Bar sp: 32
Bar bp: 8
Foo sp: 72
Foo bp: 40
Bar sp: 32
Bar bp: 8
1
Root sp: 0
Root bp: 0
`);

