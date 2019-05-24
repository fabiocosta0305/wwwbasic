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

basic_test.BASIC_TEST('Formatting', 'CRLF',
  'FOR i = 1 TO 3\r\n' +
    '  PRINT i\r\n' +
    'NEXT i\r\n'
  , `
1
2
3
`);

basic_test.BASIC_TEST('Formatting', 'Tabs',
  'FOR i = 1 TO 3\n' +
    '\tPRINT i\n' +
    'NEXT i\n'
  , `
1
2
3
`);

