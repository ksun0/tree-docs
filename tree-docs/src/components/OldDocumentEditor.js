import { useState } from 'react';
import { Accordion, Button, Container, Icon, Form } from 'semantic-ui-react'
import { useLocation } from 'react-router-dom';

function DocumentEditor() {

    const { state } = useLocation();

    let fakeSection1 = {
        id: 1,
        title: "Title1",
        text: "lorem ipsum",
        active: false
    }

    let fakeSection2 = {
        id: 2,
        title: "Title2",
        text: "lorem ipsum2",
        active: false
    }

    const [sections, setSections] = useState([fakeSection1, fakeSection2])

    function addSection() {
        console.log(state);
        setSections([...sections, {id: 3, title: "Title3", text: "new"}])
    }

    function deleteSection(e, id) {
        e.stopPropagation();
        setSections(sections.filter((elem) => {
            return elem.id !== id
        }));
    }

    function toggleSection(e, titleProps) {
        let newArr = [...sections]
        newArr[titleProps.index].active = !titleProps.active
        setSections(newArr)
    }

    function moveUp(e, id, index) {
        e.stopPropagation()
        let newArr = [...sections]
        let temp = newArr[index]
        newArr[index] = newArr[index - 1]
        newArr[index - 1] = temp
        setSections(newArr)
    }

    function moveDown(e, id, index) {
        e.stopPropagation()
        let newArr = [...sections]
        let temp = newArr[index]
        newArr[index] = newArr[index + 1]
        newArr[index + 1] = temp
        setSections(newArr)
    }

    function handleTitleClick(e) {
        e.stopPropagation();
    }

    return (
        <Container style={{marginTop: "50px"}}>
            <Button onClick={addSection} icon="plus"/>

            <Accordion styled style={{marginTop: "20px"}}>
                {sections.length ? sections.map((section, index) => {
                    return (
                        <span key={section.id}>
                            <Accordion.Title active={section.active} index={index} onClick={toggleSection}>
                                <Form>
                                    <Form.Group inline>
                                        <Form.Input icon="dropdown" iconPosition="left" size="massive" transparent placeholder="Title" width={15} defaultValue={section.title} onClick={(e) => handleTitleClick(e)} />
                                        {index > 0 && <Form.Button size="mini" icon onClick={(e) => moveUp(e, section.id, index)}>
                                            <Icon name='angle up'/>
                                        </Form.Button>}
                                        {index < sections.length - 1 && <Form.Button size="mini" icon onClick={(e) => moveDown(e, section.id, index)}>
                                            <Icon name='angle down'/>
                                        </Form.Button>}
                                        <Form.Button icon size="mini" width={1} onClick={(e) => deleteSection(e, section.id)}>
                                            <Icon name="trash"/>
                                        </Form.Button>
                                    </Form.Group>
                                </Form>
                            </Accordion.Title>
                            <Accordion.Content active={section.active}>
                                <Form>
                                    <Form.TextArea placeholder="Content" defaultValue={section.text} />
                                </Form>
                            </Accordion.Content>
                        </span>
                    )
                }) : <h1>No sections yet!</h1>}
            </Accordion>

        </Container>
    );
}

export default DocumentEditor;
