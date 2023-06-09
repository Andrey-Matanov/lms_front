import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from "react"
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api/'
function MyTeacherCourses() {
  const [courseData, setCourseData] = useState([])
  const teacherId = localStorage.getItem('teacherId')
  // const [avgRatingStatus, setAvgRatingStatus] = useState("")
  // console.log(teacherId)
  useEffect(() => {
    axios
      .get(baseUrl + 'teacher-courses/' + teacherId
        // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
        // ,{headers: { "Content-Type": "multipart/form-data" }}
      )
      .then(response => {
        setCourseData(response.data)
        console.log(response.data)
        // setAvgRatingStatus
      })
  }, [])
  console.log(courseData)
  return (
    <>
      <Card>
        <Card.Header>Мои курсы</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>

                <th>Название курса</th>
                <th>Обложка</th>
                <th>Учеников на курсе</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {courseData.map((course, index) =>
                <tr key={index}>
                  <td>
                    <Link to={'/teacher-profile/all-chapters/' + course.id}>{course.title}</Link>
                    <hr />
                    {course.course_rating && 
                    <span>рейтинг курса:{course.course_rating}/5 </span>
                    }
                                  {!course.course_rating && 
                    <span>Ваш курс еще не оценили </span>
                    }
                    </td>
                  <td><img src={course.course_image} width="80" className="rounded float-start" alt={course.title} /></td>
                  <td><Link to={'/teacher-profile/enrolled-students/'+ course.id}>{course.total_enrolled_students}</Link> </td>
                  <td>
                    <Button as={Link} to={'/teacher-profile/edit-course/' + course.id} variant="info">Редактировать <br/> данные курса</Button>{' '}
                    <Button as={Link} to={'/teacher-profile/add-chapter/' + course.id} variant="primary">добавить главу <br/> в курс</Button>{' '}
                    <Button variant="danger">Удалить <br/> курс</Button>{' '}
                  </td>
                </tr>
              )}


            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  )
}
export default MyTeacherCourses