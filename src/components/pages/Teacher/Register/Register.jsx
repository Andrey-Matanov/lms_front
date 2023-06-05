import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api/teacher/'
function TeacherRegister() {
  const [teacherRegisterData, setTeacherRegisterData] = useState({
    full_name: "",
    email: "",
    password: "",
    qualification: "",
    phone: "",
    skills: "",
    status: ""
  })

  const handleChange = (event) => {
    setTeacherRegisterData({
      ...teacherRegisterData,
      [event.target.name]: event.target.value
    })
    //   console.log("teacherRegisterData : ")
    // console.log(teacherRegisterData)
  }




  const submitForm = (e) => {
    e.preventDefault();
    // const teacherFormRegisterData = new FormData()
    // console.log(userData)
    // console.log(teacherRegisterData)
    try {
      axios
        .post(baseUrl, teacherRegisterData
          // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
        )
        .then(response => {
          console.log(response)
          setTeacherRegisterData({
            full_name: "",
            email: "",
            password: "",
            qualification: "",
            phone: "",
            skills: "",
            status: "success"
          })
          // Handle response

        });
    } catch (error) {
      console.log(error)
      setTeacherRegisterData({ "status": "error" })
    }

  }
  // useEffect(()=>{
  //   document.title = 'Регистрация наставника'
  // })
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
  if (teacherLoginStatus == 'true') {
    window.location.href = '/teacher-profile/dashboard'
  }
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header><h3>Регистрация нового пользователя</h3></Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicfull_name">
                    <Form.Label>ФИО</Form.Label>
                    <Form.Control value={teacherRegisterData.full_name} name="full_name" onChange={handleChange} type="text" placeholder="Введите ваше ФИО" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>email</Form.Label>
                    <Form.Control value={teacherRegisterData.email} name="email" onChange={handleChange} type="email" placeholder="Введите ваш email" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicqualification">
                    <Form.Label>Квалификация</Form.Label>
                    <Form.Control value={teacherRegisterData.qualification} name="qualification" onChange={handleChange} type="text" placeholder="Введите вашу квалификацию" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicphone">
                    <Form.Label>Номер телефона</Form.Label>
                    <Form.Control value={teacherRegisterData.phone} name="phone" onChange={handleChange} type="text" placeholder="Введите имя пользователя" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicskills">
                    <Form.Label>Навыки</Form.Label>
                    <Form.Control value={teacherRegisterData.skills} name="skills" onChange={handleChange} as="textarea" placeholder="Введите имя пользователя" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control value={teacherRegisterData.password} name="password" onChange={handleChange} type="password" placeholder="Введите пароль" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check name="checkbox" onChange={handleChange} type="checkbox" label="Запомнить меня" />
                  </Form.Group>
                  <Button onClick={submitForm} variant="primary" type="submit">
                    Регистрация
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )

}

export default TeacherRegister