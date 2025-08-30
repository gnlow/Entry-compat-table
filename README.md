# Entry-compat-table
Entry compatibility table

## 엔트리 블록 목록 (`data/entryjs.yaml`)
- playentry.org/ws 에서 실행 후
- 온라인 json->yaml 변환기에서 변환
- `data/entryjs.yaml`의 `block:`에 붙여넣기
- 필요없는 것들은 주석처리
```js
copy(JSON.stringify(Object.fromEntries(EntryStatic.getAllBlocks().toSpliced(12).map(({category, blocks}) => [category, Object.fromEntries(blocks.map(x => [x, "o"]))]))))
```

## 블록 템플릿 (`meta/block.yaml`)
- `getBlockTemplate.js` 복사해서 playentry.org/ws 에서 실행
- 온라인 json->yaml 변환기에서 변환
- `meta/block.yaml`에 붙여넣기

## 엔트리 카테고리별 색상
```js
Object.entries(EntryStatic.colorSet.block.default).map(([k, v]) => k.toLowerCase() + "\n" + v).join("\n")
```