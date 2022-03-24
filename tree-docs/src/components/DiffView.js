import { getDocuments } from "../api/Database";
import { ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendar,
    faUser,
    faFolderBlank,
    faFile,
} from "@fortawesome/free-solid-svg-icons";
import { Container } from "semantic-ui-react";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getDiff } from "../api/Database";
import App from "../App";
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
        const tempDiff = await getDiff(did1, did2);
        setDiff(tempDiff);

        var tempFinal = [];

        tempDiff.rows.forEach((row) => {
            tempFinal.push(Array(row.left.chunks.length).fill(""));
        });

        console.log(diff);

        setFinal(tempFinal);
    }, []);

    // const selectVersion = (row, chunk, side) => {
    //     var tempFinal = [...final];
    //     tempFinal[row][chunk] = side ? diff.rows[row].left.chunks[chunk].left : diff.rows[row].left.chunks[chunk].right;
    //     setFinal(tempFinal);
    // }

    const [documents] = useState(getDocuments());

    let alt = false;
    let navigate = useNavigate();

    function handleItemClick(id) {
        console.log(id);
        navigate("/tree", { state: { nodeID: id } });
    }

    const selectVersion = (row, chunk, side) => {
        var tempFinal = [...final];
        tempFinal[row][chunk] = side
            ? diff.rows[row].left.chunks[chunk].left
            : diff.rows[row].left.chunks[chunk].right;
        setFinal(tempFinal);
    };

    return (
        <>
            <NavBar light={true} />

            <div>
                {diff != null &&
                    diff.rows.map((value, index) => (
                        <div>
                            <div>
                                {value.left.chunks.map((chunk, chunkIndex) => {
                                    chunk.type === "equal" ? (
                                        <span>{chunk.value}</span>
                                    ) : (
                                        <a
                                            onClick={selectVersion(
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
                            {/* <div>
                            {value.right.chunks.map((chunk, chunkIndex) => {
                                {
                                    chunk.type === "equal" ? (
                                        <span>{chunk.value}</span>
                                    ) : (
                                        <a
                                            onClick={selectVersion(
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
                        <div>{final[index].join("")}</div> */}
                        </div>
                    ))}
            </div>
        </>
    );
}

export default DiffView;

// import { useEffect, useState } from 'react'
// import { useSearchParams } from 'react-router-dom';
// import { getDiff } from '../api/Database';
// import App from '../App'
// import NavBar from '../components/NavBar';

// function DiffView() {
// const [searchParams] = useSearchParams();
// const did1 = searchParams.get("did1");
// const did2 = searchParams.get("did2");

// const [diff, setDiff] = useState(null);
// const [final, setFinal] = useState(null);

// useEffect(() => {
//     const tempDiff = getDiff(did1, did2)
//     setDiff(tempDiff);

//     var tempFinal = []

//     tempDiff.rows.array.forEach((row) => {
//         tempFinal.append(Array(row.left.chunks.length).fill(""))
//     })

//     setFinal(tempFinal);
// }, [])

// const selectVersion = (row, chunk, side) => {
//     var tempFinal = [...final];
//     tempFinal[row][chunk] = side ? diff.rows[row].left.chunks[chunk].left : diff.rows[row].left.chunks[chunk].right;
//     setFinal(tempFinal);
// }

//     return (

//         <>
//             <div>
//                 awieho;awhefia
//             </div>
//             <NavBar light={true}/>

//             <div>
//                 {diff.rows.map((value, index) => (
//                     <div>
//                         <div>
//                             {
//                                 value.left.chunks.map((chunk, chunkIndex) => {
//                                     {chunk.type === "equal" ? <span>{chunk.value}</span> : <a onClick={selectVersion(index, chunkIndex, false)}>{chunk.value}</a>}
//                                 })
//                             }
//                         </div>
//                         <div>
//                             {
//                                 value.right.chunks.map((chunk, chunkIndex) => {
//                                     {chunk.type === "equal" ? <span>{chunk.value}</span> : <a onClick={selectVersion(index, chunkIndex, true)}>{chunk.value}</a>}
//                                 })
//                             }
//                         </div>
//                         <div>
//                             {
//                                 final[index].join("")
//                             }
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </>
//     )
// }

// export default DiffView;
