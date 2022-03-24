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

        setDiff(data);
        console.log(data);

        var tempFinal = [];

        data.rows.forEach((row) => {
            tempFinal.push(Array(row.left.chunks.length).fill(""));
        });

        console.log(diff);

        setFinal(tempFinal);
    }, []);

    function selectVersion(row, chunk, side) {
        var tempFinal = [...final];
        tempFinal[row][chunk] = side
            ? diff.rows[row].left.chunks[chunk].left
            : diff.rows[row].left.chunks[chunk].right;
        setFinal(tempFinal);
    }

    return (
        <>
            <NavBar />

            <div>
                {diff != null &&
                    diff.rows.map((value, index) => (
                        <div>
                            <div>awef</div>
                            <div>
                                {value.left.chunks.map((chunk, chunkIndex) => {
                                    chunk.type === "equal" ? (
                                        <span>{chunk.value}</span>
                                    ) : (
                                        <a
                                            onClick={() => selectVersion(
                                                index,
                                                chunkIndex,
                                                false
                                            )}
                                        >
                                            {chunk.value}
                                        </a>
                                    );
                                })}
                            </div>
                            <div>
                                {value.right.chunks.map((chunk, chunkIndex) => {
                                    {
                                        chunk.type === "equal" ? (
                                            <span>{chunk.value}</span>
                                        ) : (
                                            <a
                                                onClick={() => selectVersion(
                                                    index,
                                                    chunkIndex,
                                                    true
                                                )}
                                            >
                                                {chunk.value}
                                            </a>
                                        );
                                    }
                                })}
                            </div>
                            <div>{final != null && final[index].join("")}</div>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default DiffView;
