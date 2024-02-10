import { parse } from "https://deno.land/std@0.208.0/yaml/mod.ts"

type Data = Record<string, Record<string, string[]>>

const init = parse(await Deno.readTextFile("data/entryjs.yaml")) as Data

const result = Object.entries(init)
    .map(([type, v]) =>
        Object.entries(v)
            .map(([category, features]) =>
                Object.entries(features).map(([name]) => ({
                    name,
                    category,
                    type,
                    stat: {
                        // entryjs: "O",
                    } as Record<string, string>
                }))
            )
    ).flat().flat().flat()

const projectList = [] as string[]

for await (const { name: fileName } of Deno.readDir(`data/`)) {
    const project = fileName.replace(".yaml", "")
    projectList.push(project)

    const src = parse(await Deno.readTextFile(`data/${fileName}`)) as Data

    Object.entries(src)
        .forEach(([type, v]) =>
            Object.entries(v)
                .forEach(([category, features]) =>
                    Object.entries(features).forEach(([name_, status]) => {
                        const target = result.find(({name}) => name == name_)
                        if (!target) {
                            console.log("Invalid feature name", {
                                project,
                                fileName,
                                type,
                                category,
                                name_,
                            })
                        } else {
                            target.stat[project] = status
                        }
                    })
                )
        )
}

const meta = {} as Record<string /* type */,
    Record<string /* category */,
        Record<string /* featureName */,
            { template: string }
        >
    >
>

for await (const dir of Deno.readDir("meta/")) {
    meta[dir.name.replace(".yaml", "")] = parse(await Deno.readTextFile(`meta/${dir.name}`)) as Record<string /* category */,
        Record<string /* featureName */,
            { template: string }
        >
    >
}

/*
<tr>
    <th scope="row">
        {시작하기 버튼을 클릭했을 때}
        <br>
        <span class="id">
            when_run_button_click
        </span>
    </th>
    <td o>0.1.0</td>
    <td x>x</td>
</tr>
*/

const gen = result.map(
    ({name: name_, category, type, stat}) => `
        <tr>
            <th scope="row" category="${category}">
                ${meta[type][category][name_]?.template}
                <br>
                <span class="id">
                    ${name_}
                </span>
            </th>
            ${
                projectList.map(project => {
                    if (stat[project]) {
                        if (stat[project].endsWith("*")) {
                            return `<td partial>${stat[project]}</td>`
                        } else if (stat[project].endsWith("-")) {
                            return `<td skip>${stat[project]}</td>`
                        } {
                            return `<td o>${stat[project]}</td>`
                        }
                    } else {
                        return "<td x>x</td>"
                    }
                }).join("\n")
            }
        </tr>
    `
).join("\n")

const template = await Deno.readTextFile("./index.html")

export default template.replace(
    /<!-- Here -->.*<!-- There -->/s,
    gen,
)
