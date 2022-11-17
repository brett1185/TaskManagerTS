import Button from "react-bootstrap/Button";
import { Col, Form, Row, Stack } from "react-bootstrap";
import CreatableReactSelect from 'react-select/creatable';
import { Link } from "react-router-dom";
import { FormEvent, useRef, useState} from "react";
import { NoteData, Tag } from "./App";

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
}
export function NoteForm({onSubmit}: NoteFormProps){
    const titleRef = useRef<HTMLInputElement>(null)
    const markDown = useRef<HTMLTextAreaElement>(null)
    const[selectedTags, setSelectedTags] = useState<Tag[]>([])

    function handleSubmit(e: FormEvent){
        e.preventDefault()
        onSubmit({
            title: titleRef.current!.value,
            markdown: markDown.current!.value,
            tags: selectedTags
        })

    }
    return(
    <Form onSubmit={handleSubmit}>
        <Stack gap = {4}>
            <Row>
                <Col>
                <Form.Group controlId='title'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control required ref = {titleRef}/>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId='tags'>
                    <Form.Label>Tag</Form.Label>
                    <CreatableReactSelect value = {selectedTags.map(tag => {
                        return {label: tag.label, value: tag.id}
                    })}
                    onChange ={tags => {
                        setSelectedTags(tags.map(tag => {
                            return {label: tag.label, id: tag.value}
                        }))
                    }}
                    isMulti/>
                </Form.Group>
                </Col>
            </Row>
            
                <Form.Group controlId='markdown'>
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as = 'textarea' rows = {15} ref = {markDown}/>
                </Form.Group>
                <Stack direction = 'horizontal' gap = {3} className='justify-content-end'>
                    <Button type = 'submit' variant = 'primary'>Save</Button>
                    <Link to = '..'>
                        <Button type = 'button' variant= 'secondary'>Cancel</Button>
                    </Link>
                </Stack>
                

        </Stack>
    </Form>
    )
}