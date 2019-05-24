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

var basic = require('../wwwbasic.js');

function BASIC_TEST(suite, name, code, expected_log, expected_error) {
  const full_name = suite + '.' + name;
  console.log('...... ' + full_name);

  function StripLeading(s) {
    if (s[0] == '\n') {
      return s.substr(1);
    } else {
      return s;
    }
  }

  code = StripLeading(code);
  expected_log = StripLeading(expected_log);
  if (expected_error !== undefined) {
    expected_error = StripLeading(expected_error);
  }

  let result_log = '';
  let result_error = '';
  const console_log = console.log;
  const console_error = console.error;
  try {
    console.log = function(msg) {
      result_log += msg + '\n';
    };
    console.error = function(msg) {
      result_error += msg + '\n';
    };
    basic.Basic(code);
    if (result_log != expected_log ||
        (expected_error !== undefined && result_error != expected_error)) {
      throw 'Result:\n' + result_log +
        '\nExpected:\n' + expected_log +
        '\nResult error:\n' + result_error +
        '\nExpected error:\n' + expected_error;
    }
  } finally {
    console.log = console_log;
    console.error = console_error;
  }
  console.log('[ OK ]');
}

exports.BASIC_TEST = BASIC_TEST;
