/// <reference path="fourslash.ts" />

// @filename: pyrightconfig.json
//// {
////   "useLibraryCodeForTypes": true
//// }

// @filename: test.py
//// import testLib
//// obj = testLib.[|/*marker1*/Validator|]()
//// obj.is[|/*marker2*/|]
//// obj.read[|/*marker3*/|]

// @filename: testLib/__init__.pyi
// @library: true
//// class Validator:
////     '''The validator class'''
////     def is_valid(self, text: str) -> bool:
////         '''Checks if the input string is valid.'''
////         pass
////     @property
////     def read_only_prop(self) -> bool:
////         '''The read-only property.'''
////         pass
////     @property
////     def read_write_prop(self) -> bool:
////         '''The read-write property.'''
////         pass
////     @read_write_prop.setter
////     def read_write_prop(self, val: bool):
////         '''The read-write property.'''
////         pass

// @ts-ignore
await helper.verifyCompletion('included', 'markdown', {
    marker1: {
        completions: [
            {
                label: 'Validator',
                kind: Consts.CompletionItemKind.Class,
                documentation: '```python\nclass Validator()\n```\n---\nThe validator class',
            },
        ],
    },
    marker2: {
        completions: [
            {
                label: 'is_valid',
                kind: Consts.CompletionItemKind.Method,
                documentation: '```python\nis_valid(text: str) -> bool\n```\n---\nChecks if the input string is valid.',
            },
        ],
    },
    marker3: {
        completions: [
            {
                label: 'read_only_prop',
                kind: Consts.CompletionItemKind.Property,
                documentation: '```python\nread_only_prop: bool (property)\n```\n---\nThe read-only property.',
            },
            {
                label: 'read_write_prop',
                kind: Consts.CompletionItemKind.Property,
                documentation: '```python\nread_write_prop: bool (property)\n```\n---\nThe read-write property.',
            },
        ],
    },
});
