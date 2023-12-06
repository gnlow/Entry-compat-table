# Entry-compat-table
Entry compatibility table

## 엔트리 블록 목록
```js
EntryStatic.getAllBlocks()
```
```js
copy(JSON.stringify(Object.fromEntries(EntryStatic.getAllBlocks().toSpliced(10).map(({category, blocks}) => [category, Object.fromEntries(blocks.map(x => [x, "o"]))]))))
```
## 엔트리 카테고리별 색상
```js
Object.entries(EntryStatic.colorSet.block.default).map(([k, v]) => k.toLowerCase() + "\n" + v).join("\n")
```