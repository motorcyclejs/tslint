var path = require('path');

var nodeModulesPath = path.dirname(path.dirname(require.resolve('tslint-eslint-rules')));

module.exports = {
  "rulesDirectory": [
    path.join(__dirname, 'dist'),
    path.join(nodeModulesPath, 'tslint-eslint-rules/dist/rules'),
    path.join(nodeModulesPath, 'vrsource-tslint-rules/rules'),
    path.join(nodeModulesPath, 'tslint-immutable/rules'),
    path.join(nodeModulesPath, 'tslint-microsoft-contrib')
  ],
  "rules": {
    "adjacent-overload-signatures": true,
    "ban-types": [
      false
    ],
    "member-access": [
      true,
      "check-accesor"
    ],
    "member-ordering": [
      true,
      {
        "order": [
          "static-field",
          "instance-field",
          "constructor",
          "public-instance-method",
          "protected-instance-method",
          "private-instance-method"
        ]
      }
    ],
    "no-any": false,
    "no-empty-interface": false,
    "no-import-side-effect": [
      true,
      {
        "ignore-module": "(\\.html|\\.css|\\.sass|\\.scss)"
      }
    ],
    "no-inferrable-types": [
      true,
      "ignore-params",
      "ignore-properties"
    ],
    "no-internal-module": true,
    "no-magic-numbers": [
      false
    ],
    "no-namespace": false,
    "no-non-null-assertion": true,
    "no-reference": true,
    "no-var-requires": true,
    "only-arrow-functions": [
      false,
      "allow-declarations"
    ],
    "prefer-for-of": true,
    "typedef": [
      true,
      "parameter",
      "property-declaration"
    ],
    "typedef-whitespace": [
      true,
      {
        "call-signature": "nospace",
        "index-signature": "nospace",
        "parameter": "nospace",
        "property-declaration": "nospace",
        "variable-declaration": "nospace"
      },
      {
        "call-signature": "onespace",
        "index-signature": "onespace",
        "parameter": "onespace",
        "property-declaration": "onespace",
        "variable-declaration": "onespace"
      }
    ],
    "unified-signatures": true,
    "ban": [
      false
    ],
    "curly": false,
    "forin": true,
    "import-blacklist": [
      false
    ],
    "label-position": true,
    "no-arg": true,
    "no-bitwise": true,
    "no-conditional-assignment": true,
    "no-console": [
      false
    ],
    "no-construct": true,
    "no-debugger": true,
    "no-duplicate-super": true,
    "no-duplicate-variable": true,
    "no-empty": true,
    "no-eval": true,
    "no-invalid-this": true,
    "no-misused-new": true,
    "no-null-keyword": false,
    "no-shadowed-variable": true,
    "no-string-literal": true,
    "no-string-throw": true,
    "no-switch-case-fall-through": true,
    "no-unsafe-finally": true,
    "no-unused-expression": [
      true,
      "allow-fast-null-checks"
    ],
    "no-unused-new": true,
    "no-unused-variable": [
      true,
      "check-parameters"
    ],
    "no-use-before-declare": false,
    "no-var-keyword": true,
    "radix": true,
    "switch-default": true,
    "triple-equals": [
      true
    ],
    "typeof-compare": true,
    "use-isnan": true,
    // maintainability
    "cyclomatic-complexity": [
      true,
      20
    ],
    "eofline": true,
    "indent": [
      true,
      "spaces"
    ],
    "linebreak-style": [
      true,
      "LF"
    ],
    "max-classes-per-file": [
      true,
      5
    ],
    "max-file-line-count": [
      true,
      300
    ],
    "max-line-length": [
      true,
      100
    ],
    "no-default-export": true,
    "no-mergeable-namespace": true,
    "no-require-imports": false,
    "object-literal-sort-keys": false,
    "prefer-const": true,
    "trailing-comma": [
      true,
      {
        "multiline": "always",
        "singleline": "never"
      }
    ],
    "align": [
      true,
      "statements"
    ],
    "array-type": [
      true,
      "generic"
    ],
    "arrow-parens": [
      true
    ],
    "arrow-return-shorthand": [
      true
    ],
    "class-name": true,
    "comment-format": [
      true,
      "check-space"
    ],
    "completed-docs": [
      false
    ],
    "file-header": [
      false
    ],
    "import-spacing": true,
    "interface-name": [
      true,
      "never-prefix"
    ],
    "interface-over-type-literal": false,
    "jsdoc-format": true,
    "newline-before-return": true,
    "new-parens": true,
    "no-angle-bracket-type-assertion": true,
    "no-consecutive-blank-lines": [true],
    "no-parameter-properties": true,
    "no-trailing-whitespace": true,
    "no-unnecessary-initializer": true,
    "object-literal-key-quotes": [
      true,
      "as-needed"
    ],
    "object-literal-shorthand": true,
    "one-line": [
      true,
      "check-whitespace"
    ],
    "one-variable-per-declaration": [
      true,
      "ignore-for-loop"
    ],
    "ordered-imports": [
      false
    ],
    "prefer-function-over-method": [
      true
    ],
    "prefer-method-signature": false,
    "quotemark": [
      true,
      "single",
      "avoid-escape"
    ],
    "semicolon": [
      true,
      "never"
    ],
    "space-before-function-paren": [
      true,
      "never"
    ],
    "variable-name": [
      true,
      "check-format",
      "allow-pascal-case",
      "ban-keywords"
    ],
    "whitespace": [
      true,
      "check-branch",
      "check-decl",
      "check-operator",
      "check-module",
      "check-separator",
      "check-type",
      "check-typecast",
      "check-preblock"
    ],
    "no-control-regex": true,
    "no-duplicate-case": true,
    "no-empty-character-class": true,
    "no-ex-assign": true,
    "no-extra-semi": true,
    "no-inner-declarations": true,
    "no-invalid-regexp": true,
    "no-irregular-whitespace": true,
    "no-sparse-arrays": true,
    "no-unexpected-multiline": true,
    "no-multi-spaces": true,
    "array-bracket-spacing": [
      true,
      "always"
    ],
    "block-spacing": true,
    "brace-style": [false],
    "motorcycle-brace-style": [
      true,
      "allman",
      {
        "allowSingleLine": true
      }
    ],
    "ter-indent": [
      true,
      2
    ],
    "object-curly-spacing": [
      true,
      "always"
    ],
    "space-in-parens": [
      true,
      "never"
    ],
    "ter-arrow-body-style": [
      true,
      "as-needed"
    ],
    "ter-arrow-spacing": [
      true
    ],
    "conditional-expression-parens": true,
    "ext-variable-name": [
      false
    ],
    "max-params": [
      true,
      5
    ],
    "multiline-arrow": [
      true,
      "require-parens"
    ],
    "no-duplicate-imports": true,
    "no-param-reassign": true,
    "prefer-literal": [
      "object",
      "function"
    ],
    "readonly-interface": true,
    "readonly-indexer": true,
    "readonly-array": false,
    "no-let": false,
    "no-this": false,
    "no-class": false,
    "no-new": false,
    "no-mixed-interface": true,
    "no-expression-statement": false,
    "no-arguments": true,
    "no-label": false,
    "no-semicolon-interface": false,
    "mocha-avoid-only": true,
    "no-banned-terms": true,
    "no-empty-line-after-opening-brace": true,
    "no-unnecessary-bind": true,
    "no-unnecessary-semicolons": true
  }
}
