import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { apiUrl } from "../../../../shared/config";
// import Swal from 'sweetalert2'

function StudyMaterials() {
    const [studyData, setStudyData] = useState([]);
    const [totalResult, setTotalResult] = useState(0);
    const { course_id } = useParams();
    // console.log(teacherId)
    useEffect(() => {
        axios
            .get(
                apiUrl + "study-materials/" + course_id
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                // ,{headers: { "Content-Type": "multipart/form-data" }}
            )
            .then((response) => {
                setStudyData(response.data);
                setTotalResult(response.data.length);
                console.log(response.data);
            });
    }, [totalResult]);
    const Swal = require("sweetalert2");
    const handleDeleteClick = (study_id) => {
        Swal.fire({
            title: "Подтвердите действие!",
            text: "Вы собираетесь удалить главу, вы уверены?",
            icon: "info",
            confirmButtonText: "Все равно удалить",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios
                        .delete(apiUrl + "study-material/" + study_id)
                        .then((response) => {
                            Swal.fire("success", "Данные были удалены");
                            setTotalResult(response.data.length);
                        });
                    // Swal.fire('success', 'Данные были удалены')
                } catch (error) {
                    Swal.fire("error", "Данные не были удалены");
                }
            } else {
                Swal.fire("error", "Данные не были удалены");
            }
        });
    };
    const downloadFile = (file_url) => {
        window.location.href = file_url;
    };
    return (
        <>
            <Card>
                <Card.Header>
                    Все материалы курса ({totalResult}){" "}
                    <Button
                        className="float-end"
                        as={Link}
                        to={"/teacher-profile/add-study-material/" + course_id}
                    >
                        Добавить учебный материал
                    </Button>{" "}
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Загрузка</th>
                                <th>комментарии</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studyData.map((materials, index) => (
                                <tr key={index}>
                                    <td>{materials.title}</td>
                                    <td>
                                        <Button
                                            onClick={() =>
                                                downloadFile(materials.upload)
                                            }
                                            variant="primary"
                                        >
                                            Скачать
                                        </Button>{" "}
                                    </td>
                                    <td>{materials.comment}</td>
                                    <td>
                                        <Button
                                            onClick={() =>
                                                handleDeleteClick(materials.id)
                                            }
                                            variant="danger"
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrashCan}
                                            />
                                        </Button>{" "}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    );
}
export default StudyMaterials;
