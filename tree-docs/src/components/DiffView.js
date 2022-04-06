import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getDiff, getDiff_html } from "../api/Database";
import NavBar from "../components/NavBar";
import css from "../components/diff.css";
import { fontSize } from "@mui/system";

const xObj = { value: "ⓧ", type: "placeholder" };

function DiffView() {
    const [searchParams] = useSearchParams();
    const did1 = searchParams.get("did1");
    const did2 = searchParams.get("did2");

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
                    row.right.chunks.splice(rightIndex, 0, xObj);
                } else if (
                    row.right.chunks[rightIndex].type === "insert" &&
                    row.left.chunks[leftIndex].type !== "remove"
                ) {
                    row.left.chunks.splice(leftIndex, 0, xObj);
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
                    row.left.chunks.push(xObj);
                }
            } else if (
                row.left.chunks.length > 0 &&
                row.right.chunks.length == 0
            ) {
                if (row.left.chunks[0].type === "remove") {
                    row.right.chunks.push(xObj);
                }
            } else if (
                leftIndex >= row.left.chunks.length &&
                rightIndex < row.right.chunks.length
            ) {
                if (row.right.chunks[rightIndex].type === "insert") {
                    row.left.chunks.push(xObj);
                }
            } else if (
                leftIndex < row.left.chunks.length &&
                rightIndex >= row.right.chunks.length
            ) {
                if (row.left.chunks[leftIndex].type === "remove") {
                    row.right.chunks.push(xObj);
                }
            }

            tempFinal.push(tempFinalRow);
        });

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
                    marginTop: "70px",
                }}
            >
                {diff != null && (
                    <>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                marginTop: "20px",
                                marginBottom: "7px",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{
                                    width: "33%",
                                    marginLeft: "50px",
                                    marginRight: "50px",
                                    textAlign: "center",
                                    fontSize: "30px",
                                }}
                            >
                                Version 1
                            </div>
                            <div
                                style={{
                                    width: "33%",
                                    marginLeft: "50px",
                                    marginRight: "50px",
                                    textAlign: "center",
                                    fontSize: "30px",
                                }}
                            >
                                Version 2
                            </div>
                            <div
                                style={{
                                    width: "33%",
                                    marginLeft: "50px",
                                    marginRight: "50px",
                                    textAlign: "center",
                                    fontSize: "30px",
                                }}
                            >
                                Merged
                            </div>
                        </div>

                        {diff.rows.map((value, index) => (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    padding: "20px",
                                    alignItems: "center",
                                }}
                            >
                                <div
                                    style={{
                                        width: "33%",
                                        marginLeft: "50px",
                                        marginRight: "50px",
                                    }}
                                >
                                    {value.left.chunks.map(
                                        (chunk, chunkIndex) => {
                                            if (chunk.type === "equal") {
                                                return (
                                                    <span>{chunk.value}</span>
                                                );
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
                                                        style={{
                                                            backgroundColor:
                                                                "#e65151",
                                                            color: "white",
                                                        }}
                                                    >
                                                        {chunk.value}
                                                    </a>
                                                );
                                            }
                                        }
                                    )}
                                </div>
                                <div
                                    style={{
                                        width: "33%",
                                        marginLeft: "50px",
                                        marginRight: "50px",
                                    }}
                                >
                                    {value.right.chunks.map(
                                        (chunk, chunkIndex) => {
                                            if (chunk.type === "equal") {
                                                return (
                                                    <span>{chunk.value}</span>
                                                );
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
                                                        style={{
                                                            backgroundColor:
                                                                "#6fc754",
                                                            color: "white",
                                                        }}
                                                    >
                                                        {chunk.value}
                                                    </a>
                                                );
                                            }
                                        }
                                    )}
                                </div>
                                <div
                                    style={{
                                        width: "33%",
                                        marginLeft: "50px",
                                        marginRight: "50px",
                                    }}
                                >
                                    {final != null && final[index].join("")}
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </main>
    );
}

export default DiffView;
