var getBlockTemplate =
    blockId => {
        const block = Entry.block[blockId]

        /*
        console.log(block)
        console.log(block.skeleton)
        console.log(block.params)
        console.log(Lang.template[blockId])
        */

        const statements = block.statements

        const params = block.params.map(param => {
            if (param.type == "Block") {
                if (param.accept == "boolean") {
                    return "<참>"
                }
                if (param.accept == "string") {
                    return "(10)"
                }
            }
            if (param.type == "Dropdown") {
                return `[${param.options.map(x => x[0]).join(" | ")}]`
            }
            if (param.type == "Text") {
                return param.text
            }
            if (param.type == "Indicator") {
                return ""
            }
            if (param.type == "LineBreak") {
                statements.shift(1)
                return "{ }"
            }
            if (param.type == "Keyboard") {
                return `[${param.value}]`
            }
        })
        let result = (Lang.template[blockId] || "")
            .replace("%1", params[0])
            .replace("%2", params[1])
            .replace("%3", params[2])
            .replace("%4", params[3])
            .replace("  ", " ")
            .trim()
        
        block.statements?.forEach(() => result += " { }")

        switch (block.skeleton) {
            case "basic_event":
            case "basic":
            case "basic_without_next":
            case "basic_loop":
            case "basic_double_loop":
                result = `{${result}}`
                break
            case "basic_string_field":
                result = `(${result})`
                break
            case "basic_boolean_field":
                result = `<${result}>`
                break
            case "basic_button":
            case "basic_text":
            case "clickable_text":
            default:
                break
        }

        return result
    }

const result = Object.fromEntries(
    EntryStatic
        .getAllBlocks()
        .toSpliced(-1)
        .map(({ category, blocks }) => [
            category,
            Object.fromEntries(
                blocks.map(blockId => [
                    blockId, 
                    {
                        template: getBlockTemplate(blockId),
                    },
                ])
            )
        ])
)

copy(JSON.stringify(result))