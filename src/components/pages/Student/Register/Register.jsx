import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { apiUrl } from "../../../../shared/config";

function StudentRegister() {
    const [studentRegisterData, setStudentRegisterData] = useState({
        full_name: "",
        email: "",
        password: "",
        username: "",
        interested_categories: "",
        status: "",
    });

    const handleChange = (event) => {
        setStudentRegisterData({
            ...studentRegisterData,
            [event.target.name]: event.target.value,
        });
    };
    const submitForm = (e) => {
        e.preventDefault();
        // const teacherFormRegisterData = new FormData()
        // console.log(userData)
        // console.log(teacherRegisterData)
        try {
            axios
                .post(
                    apiUrl + "student/",
                    studentRegisterData
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                )
                .then((response) => {
                    console.log(response);
                    setStudentRegisterData({
                        full_name: "",
                        email: "",
                        password: "",
                        username: "",
                        interested_categories: "",
                        status: "success",
                    });
                    // Handle response
                });
        } catch (error) {
            console.log(error);
            setStudentRegisterData({ status: "error" });
        }
    };
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        {studentRegisterData.status === "success" && (
                            <p className="text-success">
                                регистрация прошла успешно
                            </p>
                        )}
                        {studentRegisterData.status === "error" && (
                            <p className="text-danger">
                                Во время регистрации произошла ошибка
                            </p>
                        )}
                        <Card>
                            <Card.Header>
                                <h3>Регистрация нового пользователя</h3>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicfull_name"
                                    >
                                        <Form.Label>ФИО</Form.Label>
                                        <Form.Control
                                            value={
                                                studentRegisterData.full_name
                                            }
                                            name="full_name"
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Введите ваше ФИО"
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                    >
                                        <Form.Label>email</Form.Label>
                                        <Form.Control
                                            value={studentRegisterData.email}
                                            name="email"
                                            onChange={handleChange}
                                            type="email"
                                            placeholder="Введите ваш email"
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                    >
                                        <Form.Label>
                                            Имя пользователя
                                        </Form.Label>
                                        <Form.Control
                                            value={studentRegisterData.username}
                                            name="username"
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Введите имя пользователя"
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                    >
                                        <Form.Label>Интересы</Form.Label>
                                        <Form.Control
                                            value={
                                                studentRegisterData.interested_categories
                                            }
                                            name="interested_categories"
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Например: php, laravel, javascript"
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicPassword"
                                    >
                                        <Form.Label>Пароль</Form.Label>
                                        <Form.Control
                                            value={studentRegisterData.password}
                                            name="password"
                                            onChange={handleChange}
                                            type="password"
                                            placeholder="Введите пароль"
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicCheckbox"
                                    >
                                        <Form.Check
                                            type="checkbox"
                                            label="Запомнить меня"
                                        />
                                    </Form.Group>
                                    <Button
                                        onClick={submitForm}
                                        variant="primary"
                                        type="submit"
                                    >
                                        Регистрация
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default StudentRegister;
