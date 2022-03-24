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

        // todo: populate equal chunks
        data.rows.forEach((row) => {
            tempFinal.push(Array(row.left.chunks.length).fill(""));
        });

        console.log(diff);

        setFinal(tempFinal);
    }, []);

    function selectVersion(row, chunk, side) {

        console.log(diff.rows[row].left.chunks[chunk].value)

        var tempFinal = [...final];
        tempFinal[row][chunk] = side
            ? diff.rows[row].right.chunks[chunk].value
            : diff.rows[row].left.chunks[chunk].value;
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
        </>
    );
}

export default DiffView;
