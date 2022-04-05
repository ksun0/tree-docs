import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getDiff } from "../api/Database";
import NavBar from "../components/NavBar";

function DiffView() {
    // const [searchParams] = useSearchParams();
    // const did1 = searchParams.get("did1");
    // const did2 = searchParams.get("did2");

    const did1 = 1;
    const did2 = 3;

    const [diff, setDiff] = useState(null);
    const [final, setFinal] = useState(null);

    useEffect(async () => {
        const data = await getDiff(did1, did2);

        var tempFinal = [];

        await data.rows.forEach((row) => {
            var leftIndex = 0;
            var rightIndex = 0;
            var tempFinalRow = [];

            while (
                leftIndex < row.left.chunks.length &&
                rightIndex < row.right.chunks.length
            ) {
                if (
                    row.left.chunks[leftIndex].type === "remove" &&
                    row.right.chunks[rightIndex].type !== "insert"
                ) {
                    row.right.chunks.splice(rightIndex, 0, {
                        value: "❌",
                        type: "placeholder",
                    });
                } else if (
                    row.right.chunks[rightIndex].type === "insert" &&
                    row.left.chunks[leftIndex].type !== "remove"
                ) {
                    row.left.chunks.splice(leftIndex, 0, {
                        value: "❌",
                        type: "placeholder",
                    });
                } else if (
                    row.left.chunks[leftIndex].type === "equal" &&
                    row.right.chunks[rightIndex].type === "equal"
                ) {
                    console.log("hi");
                    tempFinalRow[leftIndex] = row.left.chunks[leftIndex].value;
                }

                leftIndex++;
                rightIndex++;
            }

            if (row.left.chunks.length == 0 && row.right.chunks.length > 0) {
                if (row.right.chunks[0].type === "insert") {
                    row.left.chunks.push({ value: "❌", type: "placeholder" });
                }
            } else if (
                row.left.chunks.length > 0 &&
                row.right.chunks.length == 0
            ) {
                if (row.left.chunks[0].type === "remove") {
                    row.right.chunks.push({ value: "❌", type: "placeholder" });
                }
            } else if (
                leftIndex >= row.left.chunks.length &&
                rightIndex < row.right.chunks.length
            ) {
                if (row.right.chunks[rightIndex].type === "insert") {
                    row.left.chunks.push({ value: "❌", type: "placeholder" });
                }
            } else if (
                leftIndex < row.left.chunks.length &&
                rightIndex >= row.right.chunks.length
            ) {
                if (row.left.chunks[leftIndex].type === "remove") {
                    row.right.chunks.push({ value: "❌", type: "placeholder" });
                }
            }

            tempFinal.push(tempFinalRow);
        });

        console.log(data);

        setDiff(data);
        setFinal(tempFinal);
    }, []);

    function selectVersion(row, chunk, side, isPlaceholder) {
        var tempFinal = [...final];

        if (isPlaceholder) {
            tempFinal[row][chunk] = "";
        } else {
            tempFinal[row][chunk] = side
                ? diff.rows[row].right.chunks[chunk].value
                : diff.rows[row].left.chunks[chunk].value;
        }

        setFinal(tempFinal);
    }

    return (
        <main style={{ display: "flex", flexDirection: "column" }}>
            <NavBar />

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px",
                    marginTop: "70px"
                }}
            >
                {diff != null &&
                    diff.rows.map((value, index) => (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                padding: "20px",
                                alignItems: "center",
                            }}
                        >
                            <div style={{ width: "33%" }}>
                                {value.left.chunks.map((chunk, chunkIndex) => {
                                    if (chunk.type === "equal") {
                                        return <span>{chunk.value}</span>;
                                    } else {
                                        return (
                                            <a
                                                onClick={() =>
                                                    selectVersion(
                                                        index,
                                                        chunkIndex,
                                                        false,
                                                        chunk.type ===
                                                            "placeholder"
                                                    )
                                                }
                                            >
                                                {chunk.value}
                                            </a>
                                        );
                                    }
                                })}
                            </div>
                            <div style={{ width: "33%" }}>
                                {value.right.chunks.map((chunk, chunkIndex) => {
                                    if (chunk.type === "equal") {
                                        return <span>{chunk.value}</span>;
                                    } else {
                                        return (
                                            <a
                                                onClick={() =>
                                                    selectVersion(
                                                        index,
                                                        chunkIndex,
                                                        true,
                                                        chunk.type ===
                                                            "placeholder"
                                                    )
                                                }
                                            >
                                                {chunk.value}
                                            </a>
                                        );
                                    }
                                })}
                            </div>
                            <div style={{ width: "33%" }}>
                                {final != null && final[index].join("")}
                            </div>
                        </div>
                    ))}
            </div>
        </main>
    );
}

export default DiffView;
