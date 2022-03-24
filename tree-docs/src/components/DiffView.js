import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getDiff, getDiff_html } from "../api/Database";
import NavBar from "../components/NavBar";
import css from "../components/diff.css";

function DiffView() {
    // const [searchParams] = useSearchParams();
    // const did1 = searchParams.get("did1");
    // const did2 = searchParams.get("did2");

    const did1 = 1;
    const did2 = 3;

    const [diff, setDiff] = useState(null);
    const [final, setFinal] = useState(null);
    const [html_ret, setHtml]  = useState(null);

    useEffect(async () => {
        const data = await getDiff(did1, did2);

        const html = await getDiff_html(did1, did2);
        console.log(html);
        setHtml(html);

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
            <NavBar light={true}/>
            <div id="hero" class="hero overlay subpage-hero blog-hero">
            <div class="hero-content">
                <div class="hero-text">
                    <h1>Merge Documents</h1>
                    <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item">Documents</li>
                    </ol>
                    </div>
                </div>
            </div>
            <div style = {{paddingTop: "50px"}}>
                <div dangerouslySetInnerHTML={{__html: html_ret == null ? '' : html_ret.html}} />    
            </div>
            

            {/* <div>
                {diff != null &&
                    diff.rows.map((value, index) => (
                        <div>
                            <div>
                                {value.left.chunks.map((chunk, chunkIndex) => {
                                    if (chunk.type === "equal") {
                                        return (<span>{chunk.value}</span>)
                                    } else {
                                        return (
                                            <a
                                                onClick={() => selectVersion(
                                                    index,
                                                    chunkIndex,
                                                    false
                                                )}
                                            >
                                                {chunk.value}
                                            </a>
                                        )
                                    }
                                })}
                            </div>
                            <div>
                                {value.right.chunks.map((chunk, chunkIndex) => {
                                    if (chunk.type === "equal") {
                                        return (<span>{chunk.value}</span>)
                                    } else {
                                        return (
                                            <a
                                                onClick={() => selectVersion(
                                                    index,
                                                    chunkIndex,
                                                    true
                                                )}
                                            >
                                                {chunk.value}
                                            </a>
                                        )
                                    }
                                })}
                            </div>
                            <div>{final != null && final[index].join("")}</div>
                        </div>
                    ))}
            </div> */}
        </>
    );
}

export default DiffView;
